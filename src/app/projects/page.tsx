import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card, CardImage, CardTitle, CardDescription, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of 3D animation projects including character design, world-building, and collaborative works.',
};

// Projects data - will be replaced with Firestore data
const projects = [
  {
    id: '1',
    title: 'Frieda en Rus',
    slug: 'frieda-en-rus',
    tagline: 'Saddle up for style.',
    shortDescription: 'A post-post apocalyptic wilderness. Welcome to the Wild West of the Nieu-Transvaal. Set in the barren wastelands of the post-post-apocalyptic Free State.',
    category: 'animation',
    image: '/images/Hansie_Front_Render.png',
    featured: true,
  },
  {
    id: '2',
    title: 'Nou Gaan Ons Braai',
    slug: 'braai',
    tagline: 'A classic South African phrase.',
    shortDescription: 'Celebrating the rich cultural tradition of the South African braai through character design and world-building.',
    category: 'character-design',
    image: '/images/CoalStove_Presentation_V01_1.png',
    featured: true,
  },
  {
    id: '3',
    title: 'The Professor',
    slug: 'professor',
    tagline: 'From concept to character.',
    shortDescription: 'A detailed character study of Dr. Johann Hagen, exploring the journey from initial concept sketches to fully realized 3D character.',
    category: 'diorama',
    image: '/images/Johan_Hagen_Bust_Still-1.png',
    featured: true,
  },
  {
    id: '4',
    title: 'Unexpected Visitors',
    slug: 'unexpected-visitors',
    tagline: "If aliens ever did come to earth they'd come to SA first.",
    shortDescription: 'A sci-fi exploration of humanoid visitors arriving in Cape Town, blending South African culture with extraterrestrial intrigue.',
    category: 'collaborative',
    image: '/images/Early_Concept_Exploration.jpg',
    featured: true,
  },
];

const categoryLabels: Record<string, string> = {
  animation: 'Animation',
  'character-design': 'Character Design',
  diorama: 'Diorama',
  collaborative: 'Collaborative',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-[var(--bg-secondary)] pb-8">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-heading mb-4">My Projects</h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              A collection of 3D animation projects spanning character design, world-building, and collaborative works.
            </p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="section pt-0 bg-[var(--bg-secondary)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <Card variant="default" padding="none" hoverable className="overflow-hidden h-full">
                  <CardImage
                    aspectRatio="video"
                    src={project.image}
                    alt={project.title}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide text-[var(--accent-secondary)]">
                        {categoryLabels[project.category] || project.category}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--accent-primary)] mb-1">
                      {project.tagline}
                    </p>
                    <CardTitle className="group-hover:text-[var(--accent-primary)] transition-colors mb-3">
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.shortDescription}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-[var(--accent-primary)] text-sm font-medium">
                      View Project
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--accent-primary)]">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
            Interested in Collaboration?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            I&apos;m always looking for exciting new projects and creative partnerships.
          </p>
          <Button variant="inverse" size="lg" asChild>
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
