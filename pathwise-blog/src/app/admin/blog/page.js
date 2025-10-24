'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import BlogPostEditor from '@/components/Admin/BlogPostEditor';
import { Trash2, Edit, Eye, Plus, RefreshCw } from 'lucide-react';
import './page.css';

export default function AdminBlogPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { isAdmin, isEditor, loading: roleLoading } = useRole();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!roleLoading && !isEditor && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, isEditor, roleLoading, router]);

  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser, filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/posts?status=${filter}&limit=100`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Post deleted successfully!');
        fetchPosts();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handlePostCreated = () => {
    setShowEditor(false);
    setEditingPost(null);
    fetchPosts();
  };

  if (roleLoading || !currentUser) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isEditor && !isAdmin) {
    return null;
  }

  return (
    <div className="admin-blog-page">
      <div className="admin-container">
        <div className="admin-header">
          <div className="header-left">
            <h1>Blog Management</h1>
            <p>Create and manage your blog posts - Just like Facebook!</p>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setShowEditor(!showEditor);
            }}
            className="create-post-btn"
          >
            <Plus size={20} />
            <span>{showEditor ? 'View Posts' : 'Create Post'}</span>
          </button>
        </div>

        {showEditor ? (
          <BlogPostEditor 
            onPostCreated={handlePostCreated}
            editPost={editingPost}
          />
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="filter-tabs">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All Posts
              </button>
              <button
                className={filter === 'published' ? 'active' : ''}
                onClick={() => setFilter('published')}
              >
                Published
              </button>
              <button
                className={filter === 'draft' ? 'active' : ''}
                onClick={() => setFilter('draft')}
              >
                Drafts
              </button>
              <button
                onClick={fetchPosts}
                className="refresh-btn"
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? 'spinning' : ''} />
              </button>
            </div>

            {/* Posts List */}
            <div className="posts-list">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="empty-state">
                  <p>No posts found</p>
                  <button onClick={() => setShowEditor(true)} className="empty-create-btn">
                    Create Your First Post
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="post-item">
                    {post.imageUrl && (
                      <div className="post-thumbnail">
                        <img src={post.imageUrl} alt={post.title} />
                      </div>
                    )}
                    <div className="post-details">
                      <div className="post-header">
                        <h3>{post.title}</h3>
                        <span className={`status-badge ${post.status}`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-meta">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="post-tags">
                              {post.tags.map((tag, idx) => (
                                <span key={idx} className="tag">#{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="post-actions">
                      <button
                        onClick={() => router.push(`/blog/${post.id}`)}
                        className="action-btn view-btn"
                        title="View Post"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="action-btn edit-btn"
                        title="Edit Post"
                      >
                        <Edit size={18} />
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="action-btn delete-btn"
                          title="Delete Post"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

