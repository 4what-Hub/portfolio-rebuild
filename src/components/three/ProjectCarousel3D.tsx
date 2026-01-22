'use client';

import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, MeshReflectorMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

function ProjectCard({ project, position, rotation, isActive, onClick }: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;

      // Scale on hover
      const targetScale = hovered || isActive ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial
            color={hovered || isActive ? '#ffffff' : '#e8dcd3'}
            emissive={hovered || isActive ? '#c76447' : '#000000'}
            emissiveIntensity={hovered || isActive ? 0.2 : 0}
          />
        </mesh>

        {/* Project Image */}
        <Image
          url={project.image}
          position={[0, 0, 0.01]}
          scale={[2.8, 1.8]}
          transparent
        />

        {/* Glowing border effect */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.1, 2.1]} />
          <meshStandardMaterial
            color={isActive ? '#c76447' : '#6b9fa3'}
            emissive={isActive ? '#c76447' : '#6b9fa3'}
            emissiveIntensity={hovered || isActive ? 0.5 : 0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

interface CarouselProps {
  projects: Project[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

function Carousel({ projects, activeIndex, setActiveIndex }: CarouselProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const radius = Math.min(viewport.width * 0.4, 6);
  const angleStep = (Math.PI * 2) / projects.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation to active project
      const targetRotation = -activeIndex * angleStep;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        delta * 2
      );
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = index * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;
        const rotationY = -angle;

        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        color="#c76447"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ projects, activeIndex, setActiveIndex }: CarouselProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#6b9fa3" intensity={0.5} />

      <Carousel
        projects={projects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />

      <FloatingParticles />

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1a1816"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
    </>
  );
}

interface ProjectCarousel3DProps {
  projects: Project[];
}

export default function ProjectCarousel3D({ projects }: ProjectCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <Scene
            projects={projects}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Project Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 left-0 right-0 text-center px-4"
          >
            <p className="text-[var(--accent-primary)] text-sm uppercase tracking-widest mb-2">
              {activeProject.tagline}
            </p>
            <h3 className="text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-4">
              {activeProject.title}
            </h3>
            <Link
              href={`/projects/${activeProject.slug}`}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-full hover:bg-[var(--accent-primary)]/90 transition-colors"
            >
              View Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 pointer-events-auto">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-[var(--bg-secondary)]/80 backdrop-blur-sm border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex items-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[var(--accent-primary)] w-8'
                    : 'bg-[var(--text-secondary)]/50 hover:bg-[var(--text-secondary)]'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[var(--bg-secondary)]/80 backdrop-blur-sm border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-colors"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-secondary)]/50 z-[-1]" />
    </div>
  );
}
