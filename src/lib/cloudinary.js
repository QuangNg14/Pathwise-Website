import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image from URL to Cloudinary
 * @param {string} imageUrl - URL of the image to upload
 * @param {string} folder - Folder name in Cloudinary (optional)
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export async function uploadImageFromUrl(imageUrl, folder = 'pathwise-blog') {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folder,
      resource_type: 'auto',
    });
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result: result,
    };
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default cloudinary;

