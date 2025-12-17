import { createClient as createBrowserClient } from "./client";
import { createClient as createServerClient } from "./server";

export type StorageBucket = "files" | "profile";

export interface UploadFileOptions {
  bucket: StorageBucket;
  path: string;
  file: File;
  cacheControl?: string;
  upsert?: boolean;
}

export interface DeleteFileOptions {
  bucket: StorageBucket;
  path: string;
}

/**
 * Client-side file upload to Supabase Storage
 * @param options Upload configuration
 * @returns Full path of the uploaded file or null on error
 */
export async function uploadFileClient(
  options: UploadFileOptions
): Promise<string | null> {
  const supabase = createBrowserClient();
  const { bucket, path, file, cacheControl = "3500", upsert = true } = options;

  try {
    const { error, data } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl, upsert });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    return data.fullPath;
  } catch (e) {
    console.error("Unexpected upload error:", e);
    return null;
  }
}

/**
 * Server-side file upload to Supabase Storage
 * @param options Upload configuration
 * @returns Full path of the uploaded file or null on error
 */
export async function uploadFileServer(
  options: UploadFileOptions
): Promise<string | null> {
  const supabase = await createServerClient();
  const { bucket, path, file, cacheControl = "3500", upsert = true } = options;

  try {
    const { error, data } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl, upsert });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    return data.fullPath;
  } catch (e) {
    console.error("Unexpected upload error:", e);
    return null;
  }
}

/**
 * Client-side file deletion from Supabase Storage
 * @param options Delete configuration
 * @returns Success boolean
 */
export async function deleteFileClient(
  options: DeleteFileOptions
): Promise<boolean> {
  const supabase = createBrowserClient();
  const { bucket, path } = options;

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Delete error:", error.message);
      return false;
    }

    return true;
  } catch (e) {
    console.error("Unexpected delete error:", e);
    return false;
  }
}

/**
 * Server-side file deletion from Supabase Storage
 * @param options Delete configuration
 * @returns Success boolean
 */
export async function deleteFileServer(
  options: DeleteFileOptions
): Promise<boolean> {
  const supabase = await createServerClient();
  const { bucket, path } = options;

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Delete error:", error.message);
      return false;
    }

    return true;
  } catch (e) {
    console.error("Unexpected delete error:", e);
    return false;
  }
}

/**
 * Generate file path for project files
 */
export function generateProjectFilePath(
  projectId: string,
  fileName: string
): string {
  const fileExt = fileName.split(".").pop();
  const timestamp = Date.now();
  return `project_files/${projectId}/${projectId}-${timestamp}.${fileExt}`;
}

/**
 * Generate file path for profile images
 */
export function generateProfileImagePath(
  profileId: string,
  fileName: string
): string {
  const fileExt = fileName.split(".").pop();
  const timestamp = Date.now();
  return `profile/${profileId}/profile-${timestamp}.${fileExt}`;
}

/**
 * Generate file path for portfolio images
 */
export function generatePortfolioImagePath(
  profileId: string,
  fileName: string
): string {
  const fileExt = fileName.split(".").pop();
  const timestamp = Date.now();
  return `portfolio/${profileId}/portfolio-${timestamp}.${fileExt}`;
}

/**
 * Get public URL for a storage file
 */
export function getPublicUrl(fullPath: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${fullPath}`;
}

