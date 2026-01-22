'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/helpers';

// Gallery items - will be replaced with Firestore data
const galleryItems = [
  { id: '1', title: 'For Hano', category: 'character-art', image: '/images/For-Hano.jpg' },
  { id: '2', title: 'Michael Picture', category: 'personal-work', image: '/images/Michael_Picture.jpg' },
  { id: '3', title: 'Matias Woord', category: 'finished-pieces', image: '/images/Matias_Woord.webp' },
  { id: '4', title: 'Wian Woord Final', category: 'character-art', image: '/images/Wian_WoordFinal.jpg' },
  { id: '5', title: 'Tannie Ella Woord', category: 'character-art', image: '/images/Tannie_Ella_Woord.jpg' },
  { id: '6', title: 'Sunette Doodle', category: 'sketches', image: '/images/Sunette_Doodle.jpg' },
  { id: '7', title: 'Hansie Front', category: 'character-art', image: '/images/Hansie_Front.jpg' },
  { id: '8', title: 'Johan Hagen Bust', category: 'character-art', image: '/images/Johan_Hagen_Bust.jpg' },
  { id: '9', title: 'Whipshot Rifle', category: 'concept-art', image: '/images/Whipshot_Rifle.jpg' },
  { id: '10', title: 'Lantern Presentation', category: 'finished-pieces', image: '/images/Lantern_Presentation.jpg' },
  { id: '11', title: 'Coal Stove', category: 'finished-pieces', image: '/images/Coal_Stove_Presentation.jpg' },
  { id: '12', title: 'Early Concept Exploration', category: 'concept-art', image: '/images/Early_Concept_Exploration.jpg' },
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'character-art', label: 'Character Art' },
  { id: 'concept-art', label: 'Concept Art' },
  { id: 'finished-pieces', label: 'Finished Pieces' },
  { id: 'sketches', label: 'Sketches' },
  { id: 'personal-work', label: 'Personal Work' },
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
                {/* Placeholder - replace with Next/Image when images are ready */}
                <div className="absolute inset-0 flex items-center justify-center text-[var(--text-secondary)]">
                  <span className="text-sm">{item.title}</span>
                </div>

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
            {/* Placeholder for actual image */}
            <div className="bg-[var(--bg-primary)] rounded-[var(--radius-lg)] p-8 text-center">
              <div className="aspect-video bg-[var(--bg-secondary)] rounded-[var(--radius-md)] flex items-center justify-center mb-4">
                <span className="text-[var(--text-secondary)]">{selectedImage.title}</span>
              </div>
              <h3 className="text-white font-heading text-xl mb-2">{selectedImage.title}</h3>
              <p className="text-[var(--text-secondary)] capitalize">
                {selectedImage.category.replace('-', ' ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
