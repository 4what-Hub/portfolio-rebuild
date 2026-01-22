import type { Metadata } from 'next';
import { Changa_One, Zilla_Slab } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

// Heading font
const changaOne = Changa_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-changa-one',
  display: 'swap',
});

// Body font
const zillaSlab = Zilla_Slab({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-zilla-slab',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Iwan Crafford | 3D Animation Portfolio',
    template: '%s | Iwan Crafford',
  },
  description:
    'Simply Beautiful - Finding Beauty in the Ordinary. Portfolio of Iwan Crafford, a 3D animator and character designer showcasing western-inspired animations and fine art.',
  keywords: [
    '3D animation',
    'character design',
    'portfolio',
    'Iwan Crafford',
    'South African artist',
    'digital art',
    'concept art',
  ],
  authors: [{ name: 'Iwan Crafford' }],
  creator: 'Iwan Crafford',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iwancrafford.com',
    siteName: 'Iwan Crafford Portfolio',
    title: 'Iwan Crafford | 3D Animation Portfolio',
    description:
      'Simply Beautiful - Finding Beauty in the Ordinary. Portfolio of Iwan Crafford, a 3D animator and character designer.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Iwan Crafford Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iwan Crafford | 3D Animation Portfolio',
    description:
      'Simply Beautiful - Finding Beauty in the Ordinary. Portfolio of Iwan Crafford, a 3D animator and character designer.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${changaOne.variable} ${zillaSlab.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
