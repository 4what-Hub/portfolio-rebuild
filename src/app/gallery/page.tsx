'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/helpers';

// Gallery items - will be replaced with Firestore data
const galleryItems = [
  // Personal/Portrait Work
  { id: '1', title: 'For Hano', category: 'personal-work', image: '/images/For-Hano.jpg' },
  { id: '2', title: 'Michael Picture', category: 'personal-work', image: '/images/Michael_Picture.jpg' },
  { id: '3', title: 'Matias Woord', category: 'personal-work', image: '/images/Matias_Woord.webp' },
  { id: '4', title: 'Wian Woord Final', category: 'personal-work', image: '/images/Wian_WoordFinal.jpg' },
  { id: '5', title: 'Tannie Ella Woord', category: 'personal-work', image: '/images/Tannie_Ella_Woord.jpg' },
  { id: '6', title: 'Sunette Doodle', category: 'sketches', image: '/images/Sunette_Doodle.jpg' },

  // Character Art
  { id: '7', title: 'Hansie Front Render', category: 'character-art', image: '/images/Hansie_Front_Render.png' },
  { id: '8', title: 'Hansie Back Render', category: 'character-art', image: '/images/Hansie_34Back_Render.png' },
  { id: '9', title: 'Hansie Bust', category: 'character-art', image: '/images/Hansie_Bust_34Front_Render-1.png' },
  { id: '10', title: 'Johan Hagen Bust', category: 'character-art', image: '/images/Johan_Hagen_Bust_Still-1.png' },
  { id: '11', title: 'Character Turntable 1', category: 'character-art', image: '/images/Character_Study_RenderingTurntable01.png' },
  { id: '12', title: 'Character Turntable 2', category: 'character-art', image: '/images/Character_Study_RenderingTurntable02.png' },

  // Concept Art
  { id: '13', title: 'Early Concept Exploration', category: 'concept-art', image: '/images/Early_Concept_Exploration.jpg' },
  { id: '14', title: 'Environment Concept 1', category: 'concept-art', image: '/images/EL_Concept_Exploration01.jpg' },
  { id: '15', title: 'Environment Concept 2', category: 'concept-art', image: '/images/EL_Concept_Exploration04.jpg' },
  { id: '16', title: 'Festival Submission 1', category: 'concept-art', image: '/images/Festival_Submission_Page01_TestV02.jpg' },
  { id: '17', title: 'Festival Submission 2', category: 'concept-art', image: '/images/Festival_Submission_Page02.jpg' },

  // Props & Finished Pieces
  { id: '18', title: 'Lantern Presentation', category: 'finished-pieces', image: '/images/Lantern_Presentation_1_View.png' },
  { id: '19', title: 'Coal Stove', category: 'finished-pieces', image: '/images/CoalStove_Presentation_V01_1.png' },
  { id: '20', title: 'Whipshot Rifle', category: 'finished-pieces', image: '/images/WhipshotRifle_V01_Staged_Adj_1.png' },
  { id: '21', title: 'Tools Staged', category: 'finished-pieces', image: '/images/Tools_StagedV03_1.png' },
  { id: '22', title: 'Tools Render', category: 'finished-pieces', image: '/images/Tools_Staged_1.png' },
  { id: '23', title: 'Rifle Progress', category: 'finished-pieces', image: '/images/WhipshotRifle_Mark01_Progress_Staged_1.png' },

  // Renders & Dioramas
  { id: '24', title: 'Diorama Blocking', category: 'renders', image: '/images/Diorama_Blocking_Scrap_Setup_1.png' },
  { id: '25', title: 'Maya Raw Render', category: 'renders', image: '/images/Maya_RawRender.jpg' },
  { id: '26', title: 'Lighting Key Diorama', category: 'renders', image: '/images/Lighting-Key-Diorama.jpg' },
  { id: '27', title: 'Rifle Wireframe', category: 'renders', image: '/images/Whipshot_Rifle_StudioSetup_Wireframe_0001.png' },
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'character-art', label: 'Character Art' },
  { id: 'concept-art', label: 'Concept Art' },
  { id: 'finished-pieces', label: 'Props & Objects' },
  { id: 'renders', label: 'Renders & Dioramas' },
  { id: 'personal-work', label: 'Personal Work' },
  { id: 'sketches', label: 'Sketches' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-[var(--bg-secondary)] pb-8">
        <Container>
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-heading mb-4">Gallery</h1>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              A collection of my work spanning character design, concept art, and personal projects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-primary)]'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="section pt-0 bg-[var(--bg-secondary)]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative aspect-square rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-heading text-lg">{item.title}</h3>
                    <p className="text-white/70 text-sm capitalize">
                      {item.category.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--text-secondary)]">No items found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="rounded-[var(--radius-lg)] max-h-[80vh] w-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-[var(--radius-lg)]">
                <h3 className="text-white font-heading text-xl mb-1">{selectedImage.title}</h3>
                <p className="text-white/70 capitalize">
                  {selectedImage.category.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
