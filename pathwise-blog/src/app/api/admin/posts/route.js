import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
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

    const postsRef = collection(db, 'blogPosts');
    
    // Simple query without compound index - fetch all posts
    const q = query(postsRef);
    const snapshot = await getDocs(q);
    
    // Get all posts and convert to array
    let posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        views: data.views || 0,
        featured: data.featured || false,
        image: data.imageUrl || data.image || 'https://via.placeholder.com/1200x500/667eea/ffffff?text=Blog+Post',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        date: data.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString(),
        excerpt: data.excerpt || data.content?.substring(0, 200) + '...' || '',
      };
    });

    // Filter by status if needed (client-side filtering - no index required)
    if (status !== 'all') {
      posts = posts.filter(post => post.status === status);
    }

    // Sort by featured first, then by date (newest first)
    posts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Apply limit
    posts = posts.slice(0, limit);

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

