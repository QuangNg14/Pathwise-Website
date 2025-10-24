import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// GET - Fetch reactions for a post
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const reactionsRef = doc(db, 'reactions', id);
    const reactionsSnap = await getDoc(reactionsRef);

    if (!reactionsSnap.exists()) {
      return NextResponse.json({
        success: true,
        reactions: { love: 0, helpful: 0, fire: 0 },
        userReaction: null
      });
    }

    const data = reactionsSnap.data();
    
    // Check if user has reacted
    let userReaction = null;
    if (userId && data.users && data.users[userId]) {
      userReaction = data.users[userId];
    }
    
    return NextResponse.json({
      success: true,
      reactions: {
        love: data.love || 0,
        helpful: data.helpful || 0,
        fire: data.fire || 0
      },
      userReaction
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add a reaction (only one per user)
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { type, userId, previousReaction } = await request.json();

    if (!['love', 'helpful', 'fire'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reaction type' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const reactionsRef = doc(db, 'reactions', id);
    const reactionsSnap = await getDoc(reactionsRef);

    if (!reactionsSnap.exists()) {
      // Create new reactions document
      await setDoc(reactionsRef, {
        love: type === 'love' ? 1 : 0,
        helpful: type === 'helpful' ? 1 : 0,
        fire: type === 'fire' ? 1 : 0,
        users: {
          [userId]: type
        }
      });
    } else {
      const currentData = reactionsSnap.data();
      const users = currentData.users || {};
      
      // If user previously reacted, decrement that reaction
      if (previousReaction && users[userId]) {
        await updateDoc(reactionsRef, {
          [previousReaction]: Math.max(0, (currentData[previousReaction] || 0) - 1),
          [type]: (currentData[type] || 0) + 1,
          [`users.${userId}`]: type
        });
      } else {
        // New reaction
        await updateDoc(reactionsRef, {
          [type]: (currentData[type] || 0) + 1,
          [`users.${userId}`]: type
        });
      }
    }

    // Fetch updated reactions
    const updatedSnap = await getDoc(reactionsRef);
    const updatedData = updatedSnap.data();

    return NextResponse.json({
      success: true,
      reactions: {
        love: updatedData.love || 0,
        helpful: updatedData.helpful || 0,
        fire: updatedData.fire || 0
      }
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Remove a reaction
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { type, userId } = await request.json();

    if (!['love', 'helpful', 'fire'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid reaction type' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const reactionsRef = doc(db, 'reactions', id);
    const reactionsSnap = await getDoc(reactionsRef);

    if (reactionsSnap.exists()) {
      const currentData = reactionsSnap.data();
      const users = currentData.users || {};
      
      // Remove user's reaction
      if (users[userId]) {
        delete users[userId];
        
        await updateDoc(reactionsRef, {
          [type]: Math.max(0, (currentData[type] || 0) - 1),
          users: users
        });
      }
    }

    // Fetch updated reactions
    const updatedSnap = await getDoc(reactionsRef);
    const updatedData = updatedSnap.exists() ? updatedSnap.data() : {};

    return NextResponse.json({
      success: true,
      reactions: {
        love: updatedData.love || 0,
        helpful: updatedData.helpful || 0,
        fire: updatedData.fire || 0
      }
    });
  } catch (error) {
    console.error('Error removing reaction:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

