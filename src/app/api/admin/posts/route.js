import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// GET - Fetch all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');

    const postsRef = collection(db, 'blogPosts');
    let q;

    if (status === 'all') {
      q = query(postsRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(
        postsRef, 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null,
    })).slice(0, limit);

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length
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
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags')) : [];
    const image = formData.get('image');

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Upload image to Firebase Storage if provided
    if (image && image.size > 0) {
      const imageRef = ref(storage, `blog-images/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Create blog post document
    const postData = {
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      author: author || 'Anonymous',
      authorId,
      imageUrl,
      status,
      tags,
      views: 0,
      likes: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'blogPosts'), postData);

    return NextResponse.json({
      success: true,
      postId: docRef.id,
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

