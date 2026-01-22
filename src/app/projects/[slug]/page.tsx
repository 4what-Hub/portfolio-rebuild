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
    fullDescription: `Set in the barren wastelands of the post-post-apocalyptic Free State, Frieda en Rus is a powerful short-form narrative that touches on themes of family, forgiveness and heritage. Since its original conception in my second year of study at The Animation School, this story and its world has grown to become so much more than just another assessment.

This project is my means of cultural expression, drawing strongly from a rich South-African ancestry dating back to 1724. As my individual and creative journeys unfold, Frieda en Rus will continue to be the mirror in which I gaze to ponder on self, my history and my future in this beautiful country.

Bring your stories to life with bold, western-inspired animation and a fine art twist. Every frame is a showstopper. From textured brushwork to dynamic lighting, each project is packed with personality and a dash of cowboy charm.`,
    category: 'animation',
    heroImage: '/images/Diorama_Blocking_Scrap_Setup_1.png',
    images: [
      { url: '/images/Early_Concept_Exploration.jpg', alt: 'Early concept exploration', type: 'concept' },
      { url: '/images/EL_Concept_Exploration01.jpg', alt: 'Environment concept', type: 'concept' },
      { url: '/images/EL_Concept_Exploration04.jpg', alt: 'Character concept', type: 'concept' },
      { url: '/images/Festival_Submission_Page01_TestV02.jpg', alt: 'Festival submission', type: 'presentation' },
      { url: '/images/WhipshotRifle_V01_Staged_Adj_1.png', alt: 'Whipshot rifle render', type: 'prop' },
      { url: '/images/Whipshot_Rifle_StudioSetup_Wireframe_0001.png', alt: 'Rifle wireframe', type: 'wireframe' },
      { url: '/images/Tools_StagedV03_1.png', alt: 'Tools staged render', type: 'prop' },
      { url: '/images/Tools_Staged_1.png', alt: 'Tools render', type: 'prop' },
      { url: '/images/Lantern_Presentation_1_View.png', alt: 'Lantern presentation', type: 'prop' },
      { url: '/images/CoalStove_Presentation_V01_1.png', alt: 'Coal stove presentation', type: 'prop' },
    ],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'Substance Painter', 'Arnold'],
      duration: 'Ongoing since 2023',
    },
  },
  'braai': {
    title: 'Nou Gaan Ons Braai',
    slug: 'braai',
    tagline: 'A classic South African phrase.',
    fullDescription: `Tasked with designing and populating a 3-D diorama with an original character as its centerpiece, I created Hansie - the son of an esteemed professor, itching to exchange the confines of his dormitory for the open field.

The entire scene was staged and lit to evoke the atmosphere of Oldie's Films, capturing an air of adventure and free-spiritedness. For the audio track of Hansie's speech, I made use of a clip from one of Barry Hilton's shows - drawing from the rich pool of existing South-African talent to add a distinctly local feel to the performance.

The four words every South African loves to hear...`,
    category: 'character-design',
    heroImage: '/images/Hansie_Front_Render.png',
    images: [
      { url: '/images/Hansie_Front_Render.png', alt: 'Hansie front view', type: 'character' },
      { url: '/images/Hansie_34Back_Render.png', alt: 'Hansie back view', type: 'character' },
      { url: '/images/Hansie_Bust_34Front_Render-1.png', alt: 'Hansie bust render', type: 'character' },
      { url: '/images/Maya_RawRender.jpg', alt: 'Maya raw render', type: 'render' },
      { url: '/images/Character_Study_RenderingTurntable01.png', alt: 'Character turntable 1', type: 'turntable' },
      { url: '/images/Character_Study_RenderingTurntable02.png', alt: 'Character turntable 2', type: 'turntable' },
    ],
    metadata: {
      technologies: ['Maya', 'Substance Painter', 'Arnold', 'After Effects'],
      duration: '6 months',
    },
  },
  'professor': {
    title: 'The Professor',
    slug: 'professor',
    tagline: 'From concept to character.',
    fullDescription: `A student's introduction to digital mastery. This project marked the start of an exciting new chapter in my artistic journey. Concepting, Modeling, Unwrapping, Texturing, Surfacing, Lighting and Compositing - all terms that I had never heard before my first year of study - culminated in this Diorama.

The task of singlehandedly taking these digital assets through the entire 3-D Pipeline seemed impossible to a novice, only familiar with traditional media. Now, however, the product stands not only as a testimony of my potential as an artist, but to my creative growth over the course of the last three years.

Although we were given random traits - both positive and negative - to construct our characters around as part of our assignment brief, Johann Hagen is anything but a haphazard creation. He is a carefully crafted combination of myself, my father and the parts of me I often wish I could get rid of. He is deeply emotive and artistic, studious, incredibly intelligent and brooding - but only when he is completely alone.`,
    category: 'diorama',
    heroImage: '/images/Johan_Hagen_Bust_Still-1.png',
    images: [
      { url: '/images/Johan_Hagen_Bust_Still-1.png', alt: 'Johan Hagen bust', type: 'character' },
      { url: '/images/Empathetic-1.png', alt: 'Empathetic trait', type: 'concept' },
      { url: '/images/Lighting-Key-Diorama.jpg', alt: 'Lighting key diorama', type: 'render' },
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
    fullDescription: `Thirteen third years. Ten months. Three and a half minutes. One of my greatest successes as a creative, 'Unexpected Visitors' is the culmination of three years of combined study.

This project - almost two years in the making - was a joint creative effort between thirteen final-year students as part of our course. We worked 08:00-17:00 days from early February to November, moving through every part of the 3-D Pipeline - from concepting to compositing.

When my grandmother asked me what I would do when I was all grown up, I told her that I'd make movies. Seeing my name in a post-credit roll has been a dream 18 years in the making.`,
    category: 'collaborative',
    heroImage: '/images/Screenshot-2025-11-18-at-10.34.15.png',
    images: [
      { url: '/images/Screenshot-2025-11-18-at-10.34.15.png', alt: 'Film screenshot', type: 'screenshot' },
    ],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'Substance Painter', 'Nuke', 'After Effects'],
      duration: '10 months',
      collaborators: ['13 final-year students at The Animation School'],
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
