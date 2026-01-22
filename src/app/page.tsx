import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { Button, Card, CardImage, CardTitle, CardDescription } from '@/components/ui';
import ProjectCarouselWrapper from '@/components/three/ProjectCarouselWrapper';

// Placeholder data - will be replaced with Firestore data
const featuredProjects = [
  {
    id: '1',
    title: 'Frieda en Rus',
    slug: 'frieda-en-rus',
    tagline: 'Saddle up for style.',
    shortDescription: 'A post-post apocalyptic wilderness. Welcome to the Wild West of the Nieu-Transvaal.',
    image: '/images/Hansie_Front_Render.png',
  },
  {
    id: '2',
    title: 'Nou Gaan Ons Braai',
    slug: 'braai',
    tagline: 'A classic South African phrase.',
    shortDescription: 'Celebrating the rich cultural tradition of the South African braai.',
    image: '/images/CoalStove_Presentation_V01_1.png',
  },
  {
    id: '3',
    title: 'The Professor',
    slug: 'professor',
    tagline: 'From concept to character.',
    shortDescription: 'A detailed character study of Dr. Johann Hagen.',
    image: '/images/Johan_Hagen_Bust_Still-1.png',
  },
  {
    id: '4',
    title: 'Unexpected Visitors',
    slug: 'unexpected-visitors',
    tagline: "If aliens ever did come to earth they'd come to SA first.",
    shortDescription: 'A sci-fi exploration of humanoid visitors in Cape Town.',
    image: '/images/Early_Concept_Exploration.jpg',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)]">
        {/* Background gradient/animation placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]" />

        {/* Hero Content */}
        <Container className="relative z-10 text-center">
          <p className="eyebrow mb-4 animate-fade-in">3D Animation &amp; Character Design</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 animate-slide-up">
            Simply Beautiful
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Finding Beauty in the Ordinary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[var(--text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* 3D Project Carousel Section */}
      <section className="relative bg-[var(--bg-primary)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-transparent to-[var(--bg-primary)]" />
        <Container className="relative z-10">
          <div className="text-center pt-16 pb-8">
            <p className="eyebrow mb-2">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-heading">Explore My Work</h2>
            <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              Navigate through my featured projects in 3D. Click and drag to explore.
            </p>
          </div>
        </Container>
        <ProjectCarouselWrapper projects={featuredProjects} />
      </section>

      {/* Featured Projects Grid (Accessible fallback) */}
      <section className="section bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">All Projects</p>
            <h2 className="text-3xl md:text-4xl font-heading">Featured Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <Card variant="default" padding="none" hoverable className="overflow-hidden">
                  <CardImage
                    aspectRatio="video"
                    src={project.image}
                    alt={project.title}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-6">
                    <p className="text-sm text-[var(--accent-primary)] mb-1">
                      {project.tagline}
                    </p>
                    <CardTitle className="group-hover:text-[var(--accent-primary)] transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {project.shortDescription}
                    </CardDescription>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" asChild>
              <Link href="/gallery">View All Work</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* About Preview Section */}
      <section className="section bg-[var(--bg-secondary)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-2">About Me</p>
              <h2 className="text-3xl md:text-4xl font-heading mb-6">
                A Journey Through Art
              </h2>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                I&apos;m a 3D animation student with a passion for bringing characters to life.
                My work explores themes of South African culture, western aesthetics, and
                the beauty found in everyday moments.
              </p>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                From concept sketches to fully realized 3D characters, I approach each
                project with dedication to craft and storytelling.
              </p>
              <Button variant="primary" asChild>
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-primary)]">
                <Image
                  src="/images/For-Hano.jpg"
                  alt="Iwan Crafford artwork"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--accent-primary)]">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
            Let&apos;s Create Something Amazing
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Whether you have a project in mind or just want to say hello,
            I&apos;d love to hear from you.
          </p>
          <Button variant="inverse" size="lg" asChild>
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
