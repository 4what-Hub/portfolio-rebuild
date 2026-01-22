import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  UserCredential,
  Auth,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';

// Helper to get auth with error handling
function getAuth(): Auth {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase is not configured. Please set up environment variables.');
  }
  return auth;
}

// ========================================
// Authentication Functions
// ========================================

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(getAuth(), email, password);
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  return firebaseSignOut(getAuth());
}

/**
 * Get the current user
 */
export function getCurrentUser(): User | null {
  const auth = getFirebaseAuth();
  return auth?.currentUser ?? null;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    // Return a no-op unsubscribe function
    console.warn('Firebase Auth not configured');
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const auth = getFirebaseAuth();
  return auth?.currentUser !== null && auth?.currentUser !== undefined;
}

/**
 * Wait for auth to be ready
 */
export function waitForAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    const auth = getFirebaseAuth();
    if (!auth) {
      resolve(null);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// ========================================
// Auth Context Types (for React context)
// ========================================

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}
