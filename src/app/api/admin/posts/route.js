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

// GET - Fetch all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    let query = {};
    if (status !== 'all') {
      query.status = status;
    }

    const posts = await postsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    // Transform MongoDB _id to id and format dates
    const formattedPosts = posts.map(post => ({
      ...post,
      id: post._id.toString(),
      _id: undefined,
      views: post.views || 0,
      featured: post.featured || false,
      // Backward compatibility: prioritize new fields, fallback to old
      image: post.previewImage || post.coverImage || post.imageUrl || post.image || null,
      imageUrl: post.coverImage || post.imageUrl || post.image || null,
      previewImage: post.previewImage || null,
      coverImage: post.coverImage || null,
      createdAt: post.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toISOString() || new Date().toISOString(),
      date: post.createdAt?.toLocaleDateString() || new Date().toLocaleDateString(),
      excerpt: post.excerpt || post.content?.substring(0, 200) + '...' || '',
    }));

    return NextResponse.json({
      success: true,
      posts: formattedPosts,
      count: formattedPosts.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const content = formData.get('content');
    const excerpt = formData.get('excerpt');
    const author = formData.get('author');
    const authorId = formData.get('authorId');
    const status = formData.get('status') || 'draft';
    const featured = formData.get('featured') === 'true';
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags')) : [];
    const category = formData.get('category') || null;
    const image = formData.get('image'); // This will be the cover image
    const previewImage = formData.get('previewImage'); // Optional thumbnail
    const contentImagesJson = formData.get('contentImages'); // JSON array of image URLs for content
    const contentImages = contentImagesJson ? JSON.parse(contentImagesJson) : [];

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Upload images
    const coverImageData = await uploadToCloudinary(image);
    const previewImageData = await uploadToCloudinary(previewImage);
    
    const coverImageUrl = coverImageData?.url || null;
    const coverImagePublicId = coverImageData?.publicId || null;
    const previewImageUrl = previewImageData?.url || null;
    const previewImagePublicId = previewImageData?.publicId || null;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    // Create blog post document
    const postData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      author: author || 'Anonymous',
      authorId,
      coverImage: coverImageUrl,
      coverImagePublicId: coverImagePublicId,
      previewImage: previewImageUrl,
      previewImagePublicId: previewImagePublicId,
      contentImages: contentImages, // Array of image URLs for content
      status,
      tags,
      category,
      views: 0,
      featured: featured,
      reactions: {
        love: 0,
        helpful: 0,
        fire: 0
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await postsCollection.insertOne(postData);

    return NextResponse.json({
      success: true,
      postId: result.insertedId.toString(),
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

