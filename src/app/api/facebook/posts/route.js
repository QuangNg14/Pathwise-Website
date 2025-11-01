import { NextResponse } from 'next/server';

/**
 * Fetch posts from Facebook Group
 * GET /api/facebook/posts
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';

    const groupId = process.env.FACEBOOK_GROUP_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!groupId || !accessToken) {
      return NextResponse.json(
        { error: 'Facebook credentials not configured' },
        { status: 500 }
      );
    }

    // Fetch posts from Facebook Group
    // Using fields to get: id, message, full_picture, created_time, from (author), attachments
    const fbApiUrl = `https://graph.facebook.com/v18.0/${groupId}/feed?fields=id,message,full_picture,created_time,from,attachments{media,url,type},permalink_url&limit=${limit}&access_token=${accessToken}`;

    const response = await fetch(fbApiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Facebook API Error:', data.error);
      return NextResponse.json(
        { error: 'Failed to fetch Facebook posts', details: data.error },
        { status: 400 }
      );
    }

    // Transform the data to a cleaner format
    const posts = data.data.map(post => ({
      facebookId: post.id,
      message: post.message || '',
      image: post.full_picture || null,
      createdTime: post.created_time,
      author: post.from?.name || 'Unknown',
      authorId: post.from?.id || null,
      permalink: post.permalink_url || null,
      attachments: post.attachments?.data || [],
    }));

    return NextResponse.json({
      success: true,
      posts: posts,
      count: posts.length,
    });

  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

