'use client';

import dynamic from 'next/dynamic';

interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDescription?: string;
  image: string;
}

interface ProjectCarouselWrapperProps {
  projects: Project[];
}

function CarouselSkeleton() {
  return (
    <div className="w-full h-[600px] md:h-[700px] bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--text-secondary)]">Loading 3D Experience...</p>
      </div>
    </div>
  );
}

const ProjectCarousel3D = dynamic(
  () => import('./ProjectCarousel3D'),
  { ssr: false, loading: () => <CarouselSkeleton /> }
);

export default function ProjectCarouselWrapper({ projects }: ProjectCarouselWrapperProps) {
  return <ProjectCarousel3D projects={projects} />;
}
