import { Timestamp } from 'firebase/firestore';

// ========================================
// Project Types
// ========================================

export type ProjectCategory = 'animation' | 'character-design' | 'diorama' | 'collaborative';
export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface ProjectImage {
  url: string;
  alt: string;
  type: 'hero' | 'concept' | 'render' | 'turnaround' | 'detail' | 'process';
  width?: number;
  height?: number;
}

export interface ProjectVideo {
  title: string;
  vimeoId?: string;
  youtubeId?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'text' | 'image-grid' | 'video' | 'gallery' | 'feature';
  images?: ProjectImage[];
}

export interface ProjectMetadata {
  technologies?: string[];
  collaborators?: string[];
  duration?: string;
  credits?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  images: ProjectImage[];
  videos?: ProjectVideo[];
  sections?: ProjectSection[];
  metadata?: ProjectMetadata;
  featured: boolean;
  displayOrder: number;
  status: ProjectStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// For forms and client-side use (without Timestamp)
export interface ProjectInput {
  title: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  images: ProjectImage[];
  videos?: ProjectVideo[];
  sections?: ProjectSection[];
  metadata?: ProjectMetadata;
  featured: boolean;
  displayOrder: number;
  status: ProjectStatus;
}

// ========================================
// Gallery Types
// ========================================

export type GalleryCategory =
  | 'character-art'
  | 'concept-art'
  | 'finished-pieces'
  | 'sketches'
  | 'personal-work';

export interface GalleryImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: GalleryImage;
  category: GalleryCategory;
  order: number;
  projectId?: string; // Optional link to a project
  createdAt: Timestamp;
}

export interface GalleryItemInput {
  title: string;
  description?: string;
  image: GalleryImage;
  category: GalleryCategory;
  order: number;
  projectId?: string;
}

// ========================================
// Site Configuration Types
// ========================================

export type SocialPlatform = 'instagram' | 'linkedin' | 'twitter' | 'facebook' | 'behance' | 'artstation';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  display: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
}

export interface SiteInfo {
  siteName: string;
  tagline: string;
  description: string;
  ownerName: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  order: number;
  children?: NavigationItem[];
}

export interface SiteConfig {
  id: string;
  siteInfo: SiteInfo;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  navigation: NavigationItem[];
  footer: {
    copyright: string;
  };
  updatedAt: Timestamp;
}

// ========================================
// About Page Types
// ========================================

export interface AboutSection {
  id: string;
  title?: string;
  content: string;
  order: number;
  images?: {
    url: string;
    alt: string;
    alignment: 'left' | 'right' | 'full';
  }[];
}

export interface AboutContent {
  id: string;
  heroTitle: string;
  heroSubtitle?: string;
  bioText: string;
  sections: AboutSection[];
  updatedAt: Timestamp;
}

// ========================================
// Contact Form Types
// ========================================

export type InquiryType = 'collaboration' | 'commission' | 'inquiry' | 'feedback' | 'general';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: InquiryType;
  projectInterest?: string;
  read: boolean;
  archived: boolean;
  createdAt: Timestamp;
  userAgent?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: InquiryType;
  projectInterest?: string;
}

// ========================================
// Newsletter Types
// ========================================

export type SubscriptionSource = 'homepage' | 'gallery' | 'contact' | 'footer';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: SubscriptionSource;
  active: boolean;
  subscribedAt: Timestamp;
  unsubscribedAt?: Timestamp;
}

// ========================================
// UI Component Types
// ========================================

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export type CardVariant = 'default' | 'inverse' | 'accent-primary' | 'accent-secondary' | 'accent-tertiary';

export interface CardProps {
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ========================================
// Filter & Sort Types
// ========================================

export interface ProjectFilters {
  category?: ProjectCategory;
  featured?: boolean;
  status?: ProjectStatus;
}

export interface GalleryFilters {
  category?: GalleryCategory;
  projectId?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortOptions {
  field: string;
  direction: SortDirection;
}
