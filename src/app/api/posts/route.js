import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

/**
 * Get all posts from MongoDB
 * GET /api/posts
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || 'active';

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('posts');

    // Fetch posts sorted by creation time (newest first)
    const posts = await postsCollection
      .find({ status: status })
      .sort({ createdTime: -1 })
      .limit(limit)
      .toArray();

    // Transform to match blog post format
    const formattedPosts = posts.map(post => ({
      id: post._id.toString(),
      facebookId: post.facebookId,
      title: post.message ? post.message.split('\n')[0].substring(0, 100) : 'Facebook Post',
      excerpt: post.message ? post.message.substring(0, 200) + (post.message.length > 200 ? '...' : '') : '',
      image: post.cloudinaryImage || post.originalImage || '/images/default-blog.jpg',
      date: new Date(post.createdTime).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      author: post.author,
      permalink: post.permalink,
      type: 'facebook', // Mark as Facebook post
      category: 'Resources', // Default category for synced posts
    }));

    return NextResponse.json({
      success: true,
      posts: formattedPosts,
      count: formattedPosts.length,
    });

  } catch (error) {
    console.error('Error fetching posts from MongoDB:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

