import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getFirestoreDb, COLLECTIONS, DOC_IDS, isFirebaseConfigured } from './config';
import type {
  Project,
  ProjectInput,
  ProjectFilters,
  GalleryItem,
  GalleryItemInput,
  GalleryFilters,
  SiteConfig,
  AboutContent,
  ContactSubmission,
  ContactFormData,
  NewsletterSubscriber,
  SortOptions,
} from '@/types';

// Helper to get db with error handling
function getDb() {
  const db = getFirestoreDb();
  if (!db) {
    throw new Error('Firebase is not configured. Please set up environment variables.');
  }
  return db;
}

// ========================================
// Projects
// ========================================

export async function getProjects(
  filters?: ProjectFilters,
  sort?: SortOptions,
  pageSize: number = 10,
  lastDoc?: DocumentSnapshot
): Promise<{ projects: Project[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: QueryConstraint[] = [];

  // Apply filters
  if (filters?.category) {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters?.featured !== undefined) {
    constraints.push(where('featured', '==', filters.featured));
  }
  if (filters?.status) {
    constraints.push(where('status', '==', filters.status));
  } else {
    // Default to published projects only
    constraints.push(where('status', '==', 'published'));
  }

  // Apply sorting
  if (sort) {
    constraints.push(orderBy(sort.field, sort.direction));
  } else {
    constraints.push(orderBy('displayOrder', 'asc'));
  }

  // Apply pagination
  constraints.push(limit(pageSize));
  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(getDb(), COLLECTIONS.PROJECTS), ...constraints);
  const snapshot = await getDocs(q);

  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];

  const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  return { projects, lastDoc: newLastDoc };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const q = query(
    collection(getDb(), COLLECTIONS.PROJECTS),
    where('slug', '==', slug),
    where('status', '==', 'published'),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Project;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(getDb(), COLLECTIONS.PROJECTS, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as Project;
}

export async function getFeaturedProjects(count: number = 4): Promise<Project[]> {
  const q = query(
    collection(getDb(), COLLECTIONS.PROJECTS),
    where('featured', '==', true),
    where('status', '==', 'published'),
    orderBy('displayOrder', 'asc'),
    limit(count)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

export async function createProject(data: ProjectInput): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.PROJECTS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<ProjectInput>): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.PROJECTS, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.PROJECTS, id);
  await deleteDoc(docRef);
}

// ========================================
// Gallery
// ========================================

export async function getGalleryItems(
  filters?: GalleryFilters,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ items: GalleryItem[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: QueryConstraint[] = [];

  if (filters?.category) {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters?.projectId) {
    constraints.push(where('projectId', '==', filters.projectId));
  }

  constraints.push(orderBy('order', 'asc'));
  constraints.push(limit(pageSize));

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(getDb(), COLLECTIONS.GALLERY), ...constraints);
  const snapshot = await getDocs(q);

  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GalleryItem[];

  const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  return { items, lastDoc: newLastDoc };
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const docRef = doc(getDb(), COLLECTIONS.GALLERY, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as GalleryItem;
}

export async function createGalleryItem(data: GalleryItemInput): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.GALLERY), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItemInput>): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.GALLERY, id);
  await updateDoc(docRef, data);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.GALLERY, id);
  await deleteDoc(docRef);
}

// ========================================
// Site Configuration
// ========================================

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const docRef = doc(getDb(), COLLECTIONS.SITE_CONFIG, DOC_IDS.SITE_CONFIG);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as SiteConfig;
}

export async function updateSiteConfig(data: Partial<SiteConfig>): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.SITE_CONFIG, DOC_IDS.SITE_CONFIG);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ========================================
// About Content
// ========================================

export async function getAboutContent(): Promise<AboutContent | null> {
  const docRef = doc(getDb(), COLLECTIONS.ABOUT, DOC_IDS.ABOUT);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as AboutContent;
}

export async function updateAboutContent(data: Partial<AboutContent>): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.ABOUT, DOC_IDS.ABOUT);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ========================================
// Contact Submissions
// ========================================

export async function submitContactForm(data: ContactFormData): Promise<string> {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.CONTACT_SUBMISSIONS), {
    ...data,
    read: false,
    archived: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getContactSubmissions(
  includeArchived: boolean = false,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ submissions: ContactSubmission[]; lastDoc: DocumentSnapshot | null }> {
  const constraints: QueryConstraint[] = [];

  if (!includeArchived) {
    constraints.push(where('archived', '==', false));
  }

  constraints.push(orderBy('createdAt', 'desc'));
  constraints.push(limit(pageSize));

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  const q = query(collection(getDb(), COLLECTIONS.CONTACT_SUBMISSIONS), ...constraints);
  const snapshot = await getDocs(q);

  const submissions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ContactSubmission[];

  const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  return { submissions, lastDoc: newLastDoc };
}

export async function markSubmissionAsRead(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.CONTACT_SUBMISSIONS, id);
  await updateDoc(docRef, { read: true });
}

export async function archiveSubmission(id: string): Promise<void> {
  const docRef = doc(getDb(), COLLECTIONS.CONTACT_SUBMISSIONS, id);
  await updateDoc(docRef, { archived: true });
}

// ========================================
// Newsletter
// ========================================

export async function subscribeToNewsletter(
  email: string,
  source: 'homepage' | 'gallery' | 'contact' | 'footer'
): Promise<string> {
  // Check if already subscribed
  const q = query(
    collection(getDb(), COLLECTIONS.NEWSLETTER),
    where('email', '==', email),
    limit(1)
  );
  const existing = await getDocs(q);

  if (!existing.empty) {
    const existingDoc = existing.docs[0];
    // Reactivate if previously unsubscribed
    if (!existingDoc.data().active) {
      await updateDoc(doc(getDb(), COLLECTIONS.NEWSLETTER, existingDoc.id), {
        active: true,
        subscribedAt: serverTimestamp(),
        unsubscribedAt: null,
      });
    }
    return existingDoc.id;
  }

  const docRef = await addDoc(collection(getDb(), COLLECTIONS.NEWSLETTER), {
    email,
    source,
    active: true,
    subscribedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function unsubscribeFromNewsletter(email: string): Promise<void> {
  const q = query(
    collection(getDb(), COLLECTIONS.NEWSLETTER),
    where('email', '==', email),
    limit(1)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = doc(getDb(), COLLECTIONS.NEWSLETTER, snapshot.docs[0].id);
    await updateDoc(docRef, {
      active: false,
      unsubscribedAt: serverTimestamp(),
    });
  }
}
