import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadTask,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { getFirebaseStorage } from './config';

const storage = getFirebaseStorage();

// Storage paths
export const STORAGE_PATHS = {
  PROJECTS: 'projects',
  GALLERY: 'gallery',
  ABOUT: 'about',
  GENERAL: 'uploads',
} as const;

export type StoragePath = (typeof STORAGE_PATHS)[keyof typeof STORAGE_PATHS];

// ========================================
// Upload Functions
// ========================================

interface UploadOptions {
  folder: StoragePath;
  subfolder?: string;
  fileName?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<string> {
  const { folder, subfolder, fileName } = options;

  // Generate unique file name if not provided
  const finalFileName = fileName || `${Date.now()}-${file.name}`;

  // Build the path
  const path = subfolder
    ? `${folder}/${subfolder}/${finalFileName}`
    : `${folder}/${finalFileName}`;

  const storageRef = ref(storage, path);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get and return the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Upload a file with progress tracking
 */
export function uploadFileWithProgress(
  file: File,
  options: UploadOptions
): {
  task: UploadTask;
  promise: Promise<string>;
} {
  const { folder, subfolder, fileName, onProgress } = options;

  const finalFileName = fileName || `${Date.now()}-${file.name}`;
  const path = subfolder
    ? `${folder}/${subfolder}/${finalFileName}`
    : `${folder}/${finalFileName}`;

  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);

  const promise = new Promise<string>((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(task.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });

  return { task, promise };
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  options: Omit<UploadOptions, 'fileName'>
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadFile(file, options));
  return Promise.all(uploadPromises);
}

// ========================================
// Delete Functions
// ========================================

/**
 * Delete a file by its URL
 */
export async function deleteFileByUrl(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    // File might not exist, log but don't throw
    console.warn('Error deleting file:', error);
  }
}

/**
 * Delete a file by its path
 */
export async function deleteFileByPath(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}

/**
 * Delete multiple files by URLs
 */
export async function deleteMultipleFiles(urls: string[]): Promise<void> {
  const deletePromises = urls.map((url) => deleteFileByUrl(url));
  await Promise.all(deletePromises);
}

// ========================================
// List Functions
// ========================================

/**
 * List all files in a folder
 */
export async function listFiles(
  folder: StoragePath,
  subfolder?: string
): Promise<{ name: string; url: string }[]> {
  const path = subfolder ? `${folder}/${subfolder}` : folder;
  const listRef = ref(storage, path);

  const result = await listAll(listRef);

  const files = await Promise.all(
    result.items.map(async (itemRef) => ({
      name: itemRef.name,
      url: await getDownloadURL(itemRef),
    }))
  );

  return files;
}

// ========================================
// Utility Functions
// ========================================

/**
 * Get the download URL for a file path
 */
export async function getFileUrl(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

/**
 * Generate a unique file name
 */
export function generateFileName(originalName: string): string {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}.${extension}`;
}

/**
 * Validate file type
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
}

/**
 * Validate file size (in MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Compress image before upload (using canvas)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if wider than maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
}
