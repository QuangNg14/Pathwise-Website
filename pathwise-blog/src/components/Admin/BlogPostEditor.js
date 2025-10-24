'use client';
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Send, Eye, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import './BlogPostEditor.css';

const BlogPostEditor = ({ onPostCreated, editPost = null }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(editPost?.title || '');
  const [content, setContent] = useState(editPost?.content || '');
  const [excerpt, setExcerpt] = useState(editPost?.excerpt || '');
  const [category, setCategory] = useState(editPost?.tags?.[0] || 'Resources');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editPost?.imageUrl || null);
  const [status, setStatus] = useState(editPost?.status || 'draft');
  const [featured, setFeatured] = useState(editPost?.featured || false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  // Available categories
  const categories = ['Resources', 'Job Applications', 'Careers'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (publishStatus) => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide both title and content');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('excerpt', excerpt || content.substring(0, 200));
      formData.append('author', currentUser.displayName || currentUser.email);
      formData.append('authorId', currentUser.uid);
      formData.append('status', publishStatus);
      formData.append('featured', featured);
      formData.append('tags', JSON.stringify([category]));
      
      if (image) {
        formData.append('image', image);
      }

      const url = editPost 
        ? `/api/admin/posts/${editPost.id}` 
        : '/api/admin/posts';
      
      const method = editPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(editPost ? 'Post updated successfully!' : 'Post created successfully!');
        
        // Reset form
        if (!editPost) {
          setTitle('');
          setContent('');
          setExcerpt('');
          setCategory('Resources');
          setImage(null);
          setImagePreview(null);
          setStatus('draft');
          setFeatured(false);
        }
        
        if (onPostCreated) {
          onPostCreated();
        }
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="post-preview">
        <div className="preview-header">
          <h2>Preview</h2>
          <button onClick={() => setShowPreview(false)} className="close-preview-btn">
            <X size={24} />
          </button>
        </div>
        <div className="preview-content">
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="preview-image" />
          )}
          <h1 className="preview-title">{title}</h1>
          <div className="preview-meta">
            <span>By {currentUser.displayName || currentUser.email}</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="preview-tags">
            <span className="preview-tag">#{category}</span>
          </div>
          <div className="preview-body" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-editor">
      <div className="editor-header">
        <h2>{editPost ? 'Edit Post' : 'Create New Post'}</h2>
      </div>

      <div className="editor-form">
        {/* User Info */}
        <div className="user-info">
          <div className="user-avatar">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="User" />
            ) : (
              <div className="avatar-placeholder">
                {(currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-details">
            <span className="user-name">{currentUser.displayName || currentUser.email}</span>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="status-select"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        {/* Content Input */}
        <textarea
          placeholder="What's on your mind? Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
          rows={8}
        />

        {/* Excerpt Input */}
        <textarea
          placeholder="Short excerpt (optional - will use first 200 chars if not provided)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="excerpt-input"
          rows={2}
        />

        {/* Category Selection */}
        <div className="category-selection">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Post Toggle */}
        <div className="featured-toggle">
          <label className="featured-checkbox">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="featured-label">
              ⭐ Featured Post (Show at top of Popular Posts)
            </span>
          </label>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button onClick={removeImage} className="remove-image-btn">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="editor-actions">
          <div className="left-actions">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="action-btn photo-btn"
              disabled={loading}
            >
              <ImageIcon size={20} />
              <span>Add Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            
            <button
              onClick={() => setShowPreview(true)}
              className="action-btn preview-btn"
              disabled={loading || !title || !content}
            >
              <Eye size={20} />
              <span>Preview Post</span>
            </button>
          </div>

          <div className="right-actions">
            <button
              onClick={() => handleSubmit('draft')}
              className="save-draft-btn"
              disabled={loading || !title || !content}
            >
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Draft'}</span>
            </button>
            
            <button
              onClick={() => handleSubmit('published')}
              className="publish-btn"
              disabled={loading || !title || !content}
            >
              <Send size={20} />
              <span>{loading ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;

