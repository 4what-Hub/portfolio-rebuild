import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase config is available
function isFirebaseConfigured(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

// Initialize Firebase app (singleton pattern)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

function initializeFirebase(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase config not found. Set NEXT_PUBLIC_FIREBASE_* environment variables.');
    return null;
  }

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

// Get Firebase app instance
export function getFirebaseApp(): FirebaseApp | null {
  if (!app) {
    app = initializeFirebase();
  }
  return app;
}

// Get Firestore instance
export function getFirestoreDb(): Firestore | null {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

// Get Storage instance
export function getFirebaseStorage(): FirebaseStorage | null {
  if (!storage) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      storage = getStorage(firebaseApp);
    }
  }
  return storage;
}

// Get Auth instance
export function getFirebaseAuth(): Auth | null {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
}

// Get Analytics instance (only on client side)
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!analytics) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      const supported = await isSupported();
      if (supported) {
        analytics = getAnalytics(firebaseApp);
      }
    }
  }
  return analytics;
}

// Export check function
export { isFirebaseConfigured };

// Export initialized instances for convenience
export { app, db, storage, auth, analytics };

// Collection names as constants
export const COLLECTIONS = {
  PROJECTS: 'projects',
  GALLERY: 'gallery',
  SITE_CONFIG: 'site_config',
  ABOUT: 'about',
  CONTACT_SUBMISSIONS: 'contact_submissions',
  NEWSLETTER: 'newsletter_subscribers',
} as const;

// Document IDs for singleton documents
export const DOC_IDS = {
  SITE_CONFIG: 'main',
  ABOUT: 'main',
} as const;
