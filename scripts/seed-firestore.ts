/**
 * Firestore Seeding Script
 *
 * Run with: npx ts-node --esm scripts/seed-firestore.ts
 *
 * Make sure to set up your Firebase credentials before running:
 * export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
 */

import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin
// You'll need to download your service account key from Firebase Console
// and either set GOOGLE_APPLICATION_CREDENTIALS env var or pass it directly
const app = initializeApp();
const db = getFirestore(app);

// Seed data
const projectsData = [
  {
    title: 'Frieda en Rus',
    slug: 'frieda-en-rus',
    tagline: 'Saddle up for style.',
    shortDescription: 'A post-post apocalyptic wilderness. Welcome to the Wild West of the Nieu-Transvaal.',
    fullDescription: `Set in the barren wastelands of the post-post-apocalyptic Free State, Frieda en Rus is a powerful short-form narrative exploring themes of survival, identity, and the enduring spirit of South African culture.

The project began as a character study but evolved into a fully realized world with its own history, culture, and visual language. Drawing inspiration from classic westerns and Afrikaans folklore, the Nieu-Transvaal represents a future that feels both alien and deeply familiar.

Every element, from the weathered textures of the characters' clothing to the harsh beauty of the landscape, was designed to tell a story of resilience and adaptation.`,
    category: 'animation',
    images: [
      { url: '/images/Early_Concept_Exploration.jpg', alt: 'Early concept exploration', type: 'concept' },
      { url: '/images/Hansie_Front.jpg', alt: 'Hansie character front view', type: 'character' },
      { url: '/images/Whipshot_Rifle.jpg', alt: 'Whipshot rifle design', type: 'prop' },
    ],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'Substance Painter', 'Arnold'],
      duration: '10 months',
    },
    featured: true,
    displayOrder: 1,
    status: 'published',
  },
  {
    title: 'Nou Gaan Ons Braai',
    slug: 'braai',
    tagline: 'A classic South African phrase.',
    shortDescription: 'Celebrating the rich cultural tradition of the South African braai through character design and world-building.',
    fullDescription: `"Nou Gaan Ons Braai" - a phrase that resonates with every South African. This project celebrates the rich cultural tradition of the braai, transforming this beloved pastime into a visual narrative.

Through character design and environmental storytelling, the project captures the warmth, community, and sensory experience of gathering around the fire. Each character represents a different facet of South African braai culture, from the confident braai master to the eager helpers.

The color palette draws from the warm oranges of flames, the deep browns of braaied meat, and the cool evening sky of a typical South African sunset.`,
    category: 'character-design',
    images: [
      { url: '/images/Coal_Stove_Presentation.jpg', alt: 'Coal stove presentation', type: 'prop' },
      { url: '/images/Lantern_Presentation.jpg', alt: 'Lantern presentation', type: 'prop' },
    ],
    metadata: {
      technologies: ['Maya', 'Substance Painter', 'Photoshop'],
      duration: '6 months',
    },
    featured: true,
    displayOrder: 2,
    status: 'published',
  },
  {
    title: 'The Professor',
    slug: 'professor',
    tagline: 'From concept to character.',
    shortDescription: 'A detailed character study of Dr. Johann Hagen, exploring the journey from initial concept sketches to fully realized 3D character.',
    fullDescription: `Dr. Johann Hagen, known simply as "The Professor," began as a simple sketch and evolved into one of my most detailed character studies.

This project documents the complete journey from initial concept to final 3D character, showcasing the iterative process of character development. Each stage reveals new insights into the character's personality, history, and visual identity.

The Professor embodies wisdom tempered by experience, his weathered features telling stories of countless experiments and discoveries. His design balances academic authority with approachable warmth.`,
    category: 'diorama',
    images: [
      { url: '/images/Johan_Hagen_Bust.jpg', alt: 'Johan Hagen bust render', type: 'character' },
    ],
    metadata: {
      technologies: ['ZBrush', 'Maya', 'Substance Painter', 'Arnold'],
      duration: '4 months',
    },
    featured: true,
    displayOrder: 3,
    status: 'published',
  },
  {
    title: 'Unexpected Visitors',
    slug: 'unexpected-visitors',
    tagline: "If aliens ever did come to earth they'd come to SA first.",
    shortDescription: 'A sci-fi exploration of humanoid visitors arriving in Cape Town, blending South African culture with extraterrestrial intrigue.',
    fullDescription: `What if first contact happened not in New York or Tokyo, but in Cape Town? "Unexpected Visitors" explores this premise through a uniquely South African lens.

The project imagines humanoid visitors arriving in Cape Town, their otherworldly presence contrasted against the iconic backdrop of Table Mountain and the vibrant streets of the Mother City. The designs blend sci-fi aesthetics with local cultural elements.

This collaborative project brought together multiple artists to create a cohesive vision of this alternate reality, each contributing their unique perspective to the shared universe.`,
    category: 'collaborative',
    images: [],
    metadata: {
      technologies: ['Maya', 'ZBrush', 'After Effects'],
      duration: '8 months',
      collaborators: ['Team collaboration project'],
    },
    featured: true,
    displayOrder: 4,
    status: 'published',
  },
];

const galleryData = [
  { title: 'For Hano', category: 'character-art', image: { url: '/images/For-Hano.jpg', alt: 'For Hano' }, order: 1 },
  { title: 'Michael Picture', category: 'personal-work', image: { url: '/images/Michael_Picture.jpg', alt: 'Michael Picture' }, order: 2 },
  { title: 'Matias Woord', category: 'finished-pieces', image: { url: '/images/Matias_Woord.webp', alt: 'Matias Woord' }, order: 3 },
  { title: 'Wian Woord Final', category: 'character-art', image: { url: '/images/Wian_WoordFinal.jpg', alt: 'Wian Woord Final' }, order: 4 },
  { title: 'Tannie Ella Woord', category: 'character-art', image: { url: '/images/Tannie_Ella_Woord.jpg', alt: 'Tannie Ella Woord' }, order: 5 },
  { title: 'Sunette Doodle', category: 'sketches', image: { url: '/images/Sunette_Doodle.jpg', alt: 'Sunette Doodle' }, order: 6 },
  { title: 'Hansie Front', category: 'character-art', image: { url: '/images/Hansie_Front.jpg', alt: 'Hansie Front' }, order: 7 },
  { title: 'Johan Hagen Bust', category: 'character-art', image: { url: '/images/Johan_Hagen_Bust.jpg', alt: 'Johan Hagen Bust' }, order: 8 },
  { title: 'Whipshot Rifle', category: 'concept-art', image: { url: '/images/Whipshot_Rifle.jpg', alt: 'Whipshot Rifle' }, order: 9 },
  { title: 'Lantern Presentation', category: 'finished-pieces', image: { url: '/images/Lantern_Presentation.jpg', alt: 'Lantern Presentation' }, order: 10 },
  { title: 'Coal Stove', category: 'finished-pieces', image: { url: '/images/Coal_Stove_Presentation.jpg', alt: 'Coal Stove' }, order: 11 },
  { title: 'Early Concept Exploration', category: 'concept-art', image: { url: '/images/Early_Concept_Exploration.jpg', alt: 'Early Concept Exploration' }, order: 12 },
];

const siteConfigData = {
  siteInfo: {
    siteName: 'iwan.crafford',
    tagline: 'Simply Beautiful - Finding Beauty in the Ordinary',
    description: '3D Animation Portfolio showcasing western-inspired animations and fine art',
    ownerName: 'Iwan Crafford',
  },
  contactInfo: {
    email: 'iwan.crafford@gmail.com',
    phone: '+27 73 824 0610',
    location: 'Blouberg, Western Cape',
  },
  socialLinks: [
    { platform: 'instagram', url: 'https://www.instagram.com/thegreatbig_scrapbook', display: true },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/iwancrafford/', display: true },
  ],
  navigation: [
    { label: 'Projects', href: '/projects', order: 1 },
    { label: 'About', href: '/about', order: 2 },
    { label: 'Gallery', href: '/gallery', order: 3 },
    { label: 'Contact', href: '/contact', order: 4 },
  ],
  footer: {
    copyright: `All rights reserved © ${new Date().getFullYear()} Iwan Crafford.`,
  },
};

const aboutData = {
  heroTitle: 'A perfectly ordinary name...',
  heroSubtitle: 'that speaks to a most extraordinary journey...',
  bioText: "I'm a 3D animation student with a passion for bringing characters to life. My work explores themes of South African culture, western aesthetics, and the beauty found in everyday moments.",
  sections: [
    {
      id: 'intro',
      title: 'The Beginning',
      content: 'I was born in 2003, in the main city of Mpumalanga - Mbombela. From a young age, I found myself drawn to art and storytelling, spending countless hours sketching characters and imagining worlds beyond my own.',
      order: 1,
      images: [{ url: '/images/about-1.jpg', alt: 'Young Iwan sketching', alignment: 'right' }],
    },
    {
      id: 'growth',
      title: 'Finding My Path',
      content: 'As I grew in confidence and prowess, my artistic pursuits evolved from simple sketches to complex character designs. I discovered 3D animation and knew immediately that this was where I belonged - bringing characters to life in ways that traditional art never could.',
      order: 2,
      images: [{ url: '/images/about-2.jpg', alt: 'Working on 3D projects', alignment: 'left' }],
    },
    {
      id: 'present',
      title: 'Simply Beautiful',
      content: "Today, my work is guided by a simple philosophy: finding beauty in the ordinary. Whether it's the weathered face of a character or the warm glow of a South African sunset, I believe that the most powerful art comes from authentic moments and genuine emotion.",
      order: 3,
      images: [{ url: '/images/about-3.jpg', alt: 'Current work', alignment: 'right' }],
    },
  ],
};

async function seedProjects() {
  console.log('Seeding projects...');
  const batch = db.batch();

  for (const project of projectsData) {
    const docRef = db.collection('projects').doc();
    batch.set(docRef, {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  await batch.commit();
  console.log(`✓ Seeded ${projectsData.length} projects`);
}

async function seedGallery() {
  console.log('Seeding gallery...');
  const batch = db.batch();

  for (const item of galleryData) {
    const docRef = db.collection('gallery').doc();
    batch.set(docRef, {
      ...item,
      createdAt: Timestamp.now(),
    });
  }

  await batch.commit();
  console.log(`✓ Seeded ${galleryData.length} gallery items`);
}

async function seedSiteConfig() {
  console.log('Seeding site config...');
  await db.collection('site_config').doc('main').set({
    ...siteConfigData,
    updatedAt: Timestamp.now(),
  });
  console.log('✓ Seeded site config');
}

async function seedAbout() {
  console.log('Seeding about content...');
  await db.collection('about').doc('main').set({
    ...aboutData,
    updatedAt: Timestamp.now(),
  });
  console.log('✓ Seeded about content');
}

async function main() {
  console.log('Starting Firestore seed...\n');

  try {
    await seedProjects();
    await seedGallery();
    await seedSiteConfig();
    await seedAbout();

    console.log('\n✅ Seeding complete!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();
