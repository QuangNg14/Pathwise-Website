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
      image: post.imageUrl || post.image || 'https://via.placeholder.com/1200x500/667eea/ffffff?text=Blog+Post',
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
    const image = formData.get('image');

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrl = null;
    let cloudinaryPublicId = null;

    // Upload image to Cloudinary if provided
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
      
      imageUrl = result.secure_url;
      cloudinaryPublicId = result.public_id;
    }

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
      imageUrl,
      cloudinaryPublicId,
      status,
      tags,
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

