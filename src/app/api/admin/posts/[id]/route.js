import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// GET - Fetch single post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const post = {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || null,
    };

    return NextResponse.json({
      success: true,
      post
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
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags')) : null;
    const image = formData.get('image');

    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    const updateData = {
      updatedAt: serverTimestamp(),
    };

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (status) updateData.status = status;
    if (tags) updateData.tags = tags;

    // Upload new image if provided
    if (image && image.size > 0) {
      const imageRef = ref(storage, `blog-images/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      updateData.imageUrl = imageUrl;

      // Delete old image if exists
      const oldImageUrl = docSnap.data().imageUrl;
      if (oldImageUrl) {
        try {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.log('Error deleting old image:', error);
        }
      }
    }

    await updateDoc(docRef, updateData);

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
    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete image from storage if exists
    const imageUrl = docSnap.data().imageUrl;
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.log('Error deleting image:', error);
      }
    }

    await deleteDoc(docRef);

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

