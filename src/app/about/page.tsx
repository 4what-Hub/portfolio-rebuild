import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Iwan Crafford - a 3D animation student with a passion for bringing characters to life through South African cultural themes and western aesthetics.',
};

// About content - will be replaced with Firestore data
const aboutContent = {
  heroTitle: 'A perfectly ordinary name...',
  heroSubtitle: 'that speaks to a most extraordinary journey...',
  sections: [
    {
      id: 'intro',
      title: 'The Beginning',
      content: `I was born in 2003, in the main city of Mpumalanga - Mbombela. From a young age, I found myself drawn to art and storytelling, spending countless hours sketching characters and imagining worlds beyond my own.`,
      image: '/images/about-1.jpg',
      imageAlt: 'Young Iwan sketching',
      alignment: 'right' as const,
    },
    {
      id: 'growth',
      title: 'Finding My Path',
      content: `As I grew in confidence and prowess, my artistic pursuits evolved from simple sketches to complex character designs. I discovered 3D animation and knew immediately that this was where I belonged - bringing characters to life in ways that traditional art never could.`,
      image: '/images/about-2.jpg',
      imageAlt: 'Working on 3D projects',
      alignment: 'left' as const,
    },
    {
      id: 'present',
      title: 'Simply Beautiful',
      content: `Today, my work is guided by a simple philosophy: finding beauty in the ordinary. Whether it's the weathered face of a character or the warm glow of a South African sunset, I believe that the most powerful art comes from authentic moments and genuine emotion.`,
      image: '/images/about-3.jpg',
      imageAlt: 'Current work',
      alignment: 'right' as const,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[var(--bg-secondary)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-50" />
        <Container className="relative z-10 text-center">
          <p className="eyebrow mb-4">About Me</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4">
            {aboutContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] italic">
            {aboutContent.heroSubtitle}
          </p>
        </Container>
      </section>

      {/* Content Sections */}
      {aboutContent.sections.map((section, index) => (
        <section
          key={section.id}
          className={`section ${index % 2 === 0 ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)]'}`}
        >
          <Container>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                section.alignment === 'left' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div className={section.alignment === 'left' ? 'lg:order-2' : ''}>
                <h2 className="text-3xl md:text-4xl font-heading mb-6">
                  {section.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  {section.content}
                </p>
              </div>

              {/* Image */}
              <div
                className={`relative ${section.alignment === 'left' ? 'lg:order-1' : ''}`}
              >
                <div className="aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-secondary)]">
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)]">
                    {/* Placeholder - replace with actual images */}
                    <span>Image: {section.imageAlt}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Skills/Tools Section */}
      <section className="section bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Skills & Tools</p>
            <h2 className="text-3xl md:text-4xl font-heading">What I Work With</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Maya', category: '3D Animation' },
              { name: 'ZBrush', category: 'Sculpting' },
              { name: 'Substance Painter', category: 'Texturing' },
              { name: 'Arnold', category: 'Rendering' },
              { name: 'Photoshop', category: 'Concept Art' },
              { name: 'After Effects', category: 'Compositing' },
              { name: 'Premiere Pro', category: 'Editing' },
              { name: 'Blender', category: '3D Modeling' },
            ].map((tool) => (
              <div
                key={tool.name}
                className="p-6 bg-[var(--bg-primary)] rounded-[var(--radius-lg)] border border-[var(--border-primary)] text-center hover:border-[var(--accent-primary)] transition-colors"
              >
                <h3 className="font-heading text-lg mb-1">{tool.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{tool.category}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--accent-tertiary)]">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
            Want to Work Together?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Button variant="inverse" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
