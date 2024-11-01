// src/helpers/supabaseStorageHelper.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use process.env here
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SECRET_KEY
);
console.log(process.env.VITE_SUPABASE_URL);
console.log(process.env.VITE_SUPABASE_SECRET_KEY);

/**
 * Uploads an image to the Supabase storage bucket
 * @param {Object} file - The file object from multer (req.file)
 * @param {String} filename - The desired filename in the bucket
 * @returns {String} - The public URL of the uploaded file
 */
export async function uploadImage(file, filename) {
  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filename, file.buffer, { contentType: file.mimetype });

    if (error) throw error;

    // Retrieve and log the public URL
    const { data: urlData, error: urlError } = supabase.storage
      .from("uploads")
      .getPublicUrl(filename);

    if (urlError) throw urlError;
    console.log("Public URL generated:", urlData.publicURL); // Should show the URL here

    return urlData.publicURL; // Ensure we return the URL for further processing
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Generates a signed URL for private bucket files
 * @param {String} filename - The filename in the bucket
 * @param {Number} expiresIn - Expiry time in seconds for the URL
 * @returns {String} - The signed URL
 */
export async function getSignedUrl(filename, expiresIn = 60) {
  const { data, error } = await supabase.storage
    .from("uploads")
    .createSignedUrl(filename, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
