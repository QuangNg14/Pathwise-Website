import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadImageFromUrl } from '@/lib/cloudinary';

/**
 * Sync Facebook posts to MongoDB
 * POST /api/facebook/sync
 */
export async function POST(request) {
  try {
    const { limit = 10 } = await request.json();

    const groupId = process.env.FACEBOOK_GROUP_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!groupId || !accessToken) {
      return NextResponse.json(
        { error: 'Facebook credentials not configured' },
        { status: 500 }
      );
    }

    // Step 1: Fetch posts from Facebook
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

    // Step 2: Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('posts');

    let syncedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Step 3: Process each post
    for (const post of data.data) {
      try {
        // Check if post already exists
        const existingPost = await postsCollection.findOne({ facebookId: post.id });

        if (existingPost) {
          skippedCount++;
          continue;
        }

        // Upload image to Cloudinary if exists
        let cloudinaryUrl = null;
        let cloudinaryPublicId = null;

        if (post.full_picture) {
          const uploadResult = await uploadImageFromUrl(post.full_picture);
          if (uploadResult.success) {
            cloudinaryUrl = uploadResult.url;
            cloudinaryPublicId = uploadResult.publicId;
          }
        }

        // Prepare post document
        const postDocument = {
          facebookId: post.id,
          message: post.message || '',
          originalImage: post.full_picture || null,
          cloudinaryImage: cloudinaryUrl,
          cloudinaryPublicId: cloudinaryPublicId,
          createdTime: new Date(post.created_time),
          author: post.from?.name || 'Unknown',
          authorId: post.from?.id || null,
          permalink: post.permalink_url || null,
          attachments: post.attachments?.data || [],
          syncedAt: new Date(),
          status: 'active',
        };

        // Insert into MongoDB
        await postsCollection.insertOne(postDocument);
        syncedCount++;

      } catch (postError) {
        console.error(`Error processing post ${post.id}:`, postError);
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sync completed',
      stats: {
        synced: syncedCount,
        skipped: skippedCount,
        errors: errorCount,
        total: data.data.length,
      },
    });

  } catch (error) {
    console.error('Error syncing Facebook posts:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Get sync status and stats
 * GET /api/facebook/sync
 */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('posts');

    const totalPosts = await postsCollection.countDocuments();
    const latestPost = await postsCollection
      .find()
      .sort({ createdTime: -1 })
      .limit(1)
      .toArray();

    return NextResponse.json({
      success: true,
      stats: {
        totalPosts,
        latestPost: latestPost[0] || null,
      },
    });

  } catch (error) {
    console.error('Error getting sync stats:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

