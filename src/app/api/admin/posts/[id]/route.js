import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET - Fetch single post by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const shouldIncrementView = searchParams.get('incrementView') === 'true';
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count if requested (for public viewing)
    if (shouldIncrementView) {
      await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { views: 1 } }
      );
    }

    // Transform MongoDB _id to id
    const formattedPost = {
      ...post,
      id: post._id.toString(),
      _id: undefined,
      createdAt: post.createdAt?.toISOString() || null,
      updatedAt: post.updatedAt?.toISOString() || null,
    };

    return NextResponse.json({
      success: true,
      post: formattedPost
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update post
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    const title = formData.get('title');
    const content = formData.get('content');
    const excerpt = formData.get('excerpt');
    const status = formData.get('status');
    const featured = formData.get('featured');
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags')) : null;
    const category = formData.get('category');
    const image = formData.get('image'); // Cover image
    const previewImage = formData.get('previewImage'); // Preview image
    const contentImagesJson = formData.get('contentImages'); // JSON array of image URLs
    const contentImages = contentImagesJson ? JSON.parse(contentImagesJson) : null;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    // Check if post exists
    const existingPost = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (status) updateData.status = status;
    if (featured !== null) updateData.featured = featured === 'true';
    if (tags) updateData.tags = tags;
    if (category) updateData.category = category;
    if (contentImages !== null) updateData.contentImages = contentImages;

    // Helper function to upload image
    const uploadToCloudinary = async (imageFile) => {
      if (!imageFile || imageFile.size === 0) return null;
      
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'pathwise-blog',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      
      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    };

    // Upload cover image if provided
    if (image && image.size > 0) {
      const coverImageData = await uploadToCloudinary(image);
      updateData.coverImage = coverImageData.url;
      updateData.coverImagePublicId = coverImageData.publicId;

      // Delete old cover image from Cloudinary if exists
      const oldPublicId = existingPost.coverImagePublicId || existingPost.cloudinaryPublicId;
      if (oldPublicId) {
        try {
          await cloudinary.uploader.destroy(oldPublicId);
        } catch (error) {
          console.log('Error deleting old cover image:', error);
        }
      }
    }

    // Upload preview image if provided
    if (previewImage && previewImage.size > 0) {
      const previewImageData = await uploadToCloudinary(previewImage);
      updateData.previewImage = previewImageData.url;
      updateData.previewImagePublicId = previewImageData.publicId;

      // Delete old preview image from Cloudinary if exists
      if (existingPost.previewImagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingPost.previewImagePublicId);
        } catch (error) {
          console.log('Error deleting old preview image:', error);
        }
      }
    }

    await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully'
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    // Check if post exists and get cloudinary info
    const existingPost = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if exists
    if (existingPost.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(existingPost.cloudinaryPublicId);
      } catch (error) {
        console.log('Error deleting image from Cloudinary:', error);
      }
    }

    // Delete post from MongoDB
    await postsCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
