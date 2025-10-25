import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch blog post by ID and increment view count
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');

    // Find the post
    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    );

    // Transform MongoDB _id to id
    const formattedPost = {
      ...post,
      id: post._id.toString(),
      _id: undefined,
      views: (post.views || 0) + 1, // Return incremented view count
      createdAt: post.createdAt?.toISOString() || null,
      updatedAt: post.updatedAt?.toISOString() || null,
    };

    return NextResponse.json({
      success: true,
      post: formattedPost
    });
  } catch (error) {
    console.error('Error reading blog content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Handle reactions (love, helpful, fire)
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reactionType, userId } = body;

    if (!reactionType || !userId) {
      return NextResponse.json(
        { error: 'Missing reactionType or userId' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'pathwise');
    const postsCollection = db.collection('blogPosts');
    const reactionsCollection = db.collection('reactions');

    // Check if user already reacted
    const existingReaction = await reactionsCollection.findOne({
      postId: id,
      userId: userId
    });

    if (existingReaction) {
      // Remove old reaction count
      await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { [`reactions.${existingReaction.reactionType}`]: -1 } }
      );

      if (existingReaction.reactionType === reactionType) {
        // User is removing their reaction
        await reactionsCollection.deleteOne({
          postId: id,
          userId: userId
        });

        return NextResponse.json({
          success: true,
          message: 'Reaction removed'
        });
      } else {
        // User is changing their reaction
        await reactionsCollection.updateOne(
          { postId: id, userId: userId },
          { $set: { reactionType: reactionType, updatedAt: new Date() } }
        );

        await postsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { [`reactions.${reactionType}`]: 1 } }
        );

        return NextResponse.json({
          success: true,
          message: 'Reaction updated'
        });
      }
    } else {
      // New reaction
      await reactionsCollection.insertOne({
        postId: id,
        userId: userId,
        reactionType: reactionType,
        createdAt: new Date()
      });

      await postsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { [`reactions.${reactionType}`]: 1 } }
      );

      return NextResponse.json({
        success: true,
        message: 'Reaction added'
      });
    }
  } catch (error) {
    console.error('Error handling reaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
