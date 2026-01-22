// Firebase configuration and initialization
export {
  getFirebaseApp,
  getFirestoreDb,
  getFirebaseStorage,
  getFirebaseAuth,
  getFirebaseAnalytics,
  COLLECTIONS,
  DOC_IDS,
} from './config';

// Firestore operations
export {
  // Projects
  getProjects,
  getProjectBySlug,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  // Gallery
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  // Site Config
  getSiteConfig,
  updateSiteConfig,
  // About
  getAboutContent,
  updateAboutContent,
  // Contact
  submitContactForm,
  getContactSubmissions,
  markSubmissionAsRead,
  archiveSubmission,
  // Newsletter
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from './firestore';

// Storage operations
export {
  STORAGE_PATHS,
  uploadFile,
  uploadFileWithProgress,
  uploadMultipleFiles,
  deleteFileByUrl,
  deleteFileByPath,
  deleteMultipleFiles,
  listFiles,
  getFileUrl,
  generateFileName,
  isValidImageType,
  isValidFileSize,
  compressImage,
} from './storage';

// Auth operations
export {
  signIn,
  signOut,
  getCurrentUser,
  onAuthChange,
  isAuthenticated,
  waitForAuth,
} from './auth';
export type { AuthContextType } from './auth';
