import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';

// Project data - will be replaced with Firestore data
const projectsData: Record<string, {
  title: string;
  slug: string;
  tagline: string;
  fullDescription: string;
  category: string;
  heroImage: string;
  images: { url: string; alt: string; type: string }[];
  metadata?: {
    technologies?: string[];
    duration?: string;
    collaborators?: string[];
  };
}> = {
  'frieda-en-rus': {
    title: 'Frieda en Rus',
    slug: 'frieda-en-rus',
    tagline: 'Saddle up for style.',
    fullDescription: `Set in the barren wastelands of the post-post-apocalyptic Free State, Frieda en Rus is a powerful short-form narrative exploring themes of survival, identity, and the enduring spirit of South African culture.

The project began as a character study but evolved into a fully realized world with its own history, culture, and visual language. Drawing inspiration from classic westerns and Afrikaans folklore, the Nieu-Transvaal represents a future that feels both alien and deeply familiar.

Every element, from the weathered textures of the characters' clothing to the harsh beauty of the landscape, was designed to tell a story of resilience and adaptation.`,
    category: 'animation',
    heroImage: '/images/Hansie_Front_Render.png',
    images: [
      { url: '/images/Early_Concept_Exploration.jpg', alt: 'Early concept exploration', type: 'concept' },
      { url: '/images/Hansie_Front_Render.png', alt: 'Hansie character front view', type: 'character' },
    ],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'Substance Painter', 'Arnold'],
      duration: '10 months',
    },
  },
  'braai': {
    title: 'Nou Gaan Ons Braai',
    slug: 'braai',
    tagline: 'A classic South African phrase.',
    fullDescription: `"Nou Gaan Ons Braai" - a phrase that resonates with every South African. This project celebrates the rich cultural tradition of the braai, transforming this beloved pastime into a visual narrative.

Through character design and environmental storytelling, the project captures the warmth, community, and sensory experience of gathering around the fire. Each character represents a different facet of South African braai culture, from the confident braai master to the eager helpers.

The color palette draws from the warm oranges of flames, the deep browns of braaied meat, and the cool evening sky of a typical South African sunset.`,
    category: 'character-design',
    heroImage: '/images/CoalStove_Presentation_V01_1.png',
    images: [
      { url: '/images/CoalStove_Presentation_V01_1.png', alt: 'Coal stove presentation', type: 'prop' },
      { url: '/images/Lantern_Presentation_1_View.png', alt: 'Lantern presentation', type: 'prop' },
    ],
    metadata: {
      technologies: ['Maya', 'Substance Painter', 'Photoshop'],
      duration: '6 months',
    },
  },
  'professor': {
    title: 'The Professor',
    slug: 'professor',
    tagline: 'From concept to character.',
    fullDescription: `Dr. Johann Hagen, known simply as "The Professor," began as a simple sketch and evolved into one of my most detailed character studies.

This project documents the complete journey from initial concept to final 3D character, showcasing the iterative process of character development. Each stage reveals new insights into the character's personality, history, and visual identity.

The Professor embodies wisdom tempered by experience, his weathered features telling stories of countless experiments and discoveries. His design balances academic authority with approachable warmth.`,
    category: 'diorama',
    heroImage: '/images/Johan_Hagen_Bust_Still-1.png',
    images: [
      { url: '/images/Johan_Hagen_Bust_Still-1.png', alt: 'Johan Hagen bust render', type: 'character' },
    ],
    metadata: {
      technologies: ['ZBrush', 'Maya', 'Substance Painter', 'Arnold'],
      duration: '4 months',
    },
  },
  'unexpected-visitors': {
    title: 'Unexpected Visitors',
    slug: 'unexpected-visitors',
    tagline: "If aliens ever did come to earth they'd come to SA first.",
    fullDescription: `What if first contact happened not in New York or Tokyo, but in Cape Town? "Unexpected Visitors" explores this premise through a uniquely South African lens.

The project imagines humanoid visitors arriving in Cape Town, their otherworldly presence contrasted against the iconic backdrop of Table Mountain and the vibrant streets of the Mother City. The designs blend sci-fi aesthetics with local cultural elements.

This collaborative project brought together multiple artists to create a cohesive vision of this alternate reality, each contributing their unique perspective to the shared universe.`,
    category: 'collaborative',
    heroImage: '/images/Early_Concept_Exploration.jpg',
    images: [
      { url: '/images/Early_Concept_Exploration.jpg', alt: 'Concept exploration', type: 'concept' },
    ],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'After Effects'],
      duration: '8 months',
      collaborators: ['Team collaboration project'],
    },
  },
};

// Generate static params for all projects
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.fullDescription.slice(0, 160) + '...',
    openGraph: {
      title: `${project.title} | Iwan Crafford`,
      description: project.tagline,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    animation: 'Animation',
    'character-design': 'Character Design',
    diorama: 'Diorama',
    collaborative: 'Collaborative',
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end bg-[var(--bg-secondary)]">
        {/* Background Image */}
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/50 to-transparent" />

        <Container className="relative z-10 pb-16">
          <Link
            href="/projects"
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <span className="text-xs uppercase tracking-wide text-[var(--accent-secondary)] block mb-2">
            {categoryLabels[project.category] || project.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--accent-primary)] italic">
            {project.tagline}
          </p>
        </Container>
      </section>

      {/* Project Content */}
      <section className="section bg-[var(--bg-primary)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg prose-invert max-w-none">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {project.metadata?.technologies && (
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-3">
                      Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.metadata.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[var(--bg-secondary)] rounded-full text-sm text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.metadata?.duration && (
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                      Duration
                    </h3>
                    <p className="text-[var(--text-primary)]">{project.metadata.duration}</p>
                  </div>
                )}

                {project.metadata?.collaborators && (
                  <div>
                    <h3 className="text-sm text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                      Team
                    </h3>
                    <p className="text-[var(--text-primary)]">
                      {project.metadata.collaborators.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Images */}
      {project.images.length > 0 && (
        <section className="section bg-[var(--bg-secondary)]">
          <Container>
            <h2 className="text-2xl font-heading mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-primary)]"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Navigation */}
      <section className="section bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/projects">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Projects
              </Link>
            </Button>
            <Button variant="primary" asChild>
              <Link href="/contact">Start a Project Together</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
