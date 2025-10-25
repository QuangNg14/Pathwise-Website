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
    const { id } = params;
    
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
    const { id } = params;
    const formData = await request.formData();
    
    const title = formData.get('title');
    const content = formData.get('content');
    const excerpt = formData.get('excerpt');
    const status = formData.get('status');
    const featured = formData.get('featured');
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags')) : null;
    const image = formData.get('image');

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

    // Upload new image if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary
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
      
      updateData.imageUrl = result.secure_url;
      updateData.cloudinaryPublicId = result.public_id;

      // Delete old image from Cloudinary if exists
      if (existingPost.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(existingPost.cloudinaryPublicId);
        } catch (error) {
          console.log('Error deleting old image:', error);
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
    const { id } = params;
    
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
