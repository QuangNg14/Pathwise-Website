'use client';
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Send, Eye, Save, Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Code, Quote, Minus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './BlogPostEditor.css';

const BlogPostEditor = ({ onPostCreated, editPost = null }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(editPost?.title || '');
  const [content, setContent] = useState(editPost?.content || '');
  const [excerpt, setExcerpt] = useState(editPost?.excerpt || '');
  const [category, setCategory] = useState(editPost?.category || 'Resources');
  const [tags, setTags] = useState(editPost?.tags?.join(', ') || editPost?.category || 'Resources');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(editPost?.coverImage || editPost?.imageUrl || null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImagePreview, setPreviewImagePreview] = useState(editPost?.previewImage || null);
  const [contentImages, setContentImages] = useState(editPost?.contentImages || []);
  const [uploadingContentImages, setUploadingContentImages] = useState(false);
  const [status, setStatus] = useState(editPost?.status || 'draft');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const coverImageInputRef = useRef(null);
  const previewImageInputRef = useRef(null);
  const contentImagesInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  const CATEGORIES = ['Resources', 'Job Applications', 'Careers'];

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };

  const removePreviewImage = () => {
    setPreviewImage(null);
    setPreviewImagePreview(null);
    if (previewImageInputRef.current) {
      previewImageInputRef.current.value = '';
    }
  };

  const handleContentImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingContentImages(true);
    const uploadedUrls = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.success && data.imageUrl) {
          uploadedUrls.push(data.imageUrl);
        } else {
          alert(`Failed to upload image: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Error uploading image: ${error.message}`);
      }
    }

    setUploadingContentImages(false);
    
    // Also store URLs in contentImages array
    if (uploadedUrls.length > 0) {
      setContentImages(prev => [...prev, ...uploadedUrls]);
    }
    
    // Insert images into content markdown at cursor position
    if (uploadedUrls.length > 0) {
      const textarea = contentTextareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const imageMarkdown = uploadedUrls.map(url => `<img src="${url}" alt="Image" style="width: 100%; height: auto; border-radius: 8px; margin: 20px 0; display: block;" />`).join('\n\n');
        const newContent = 
          content.substring(0, start) + 
          '\n' + imageMarkdown + '\n\n' +
          content.substring(start);
        setContent(newContent);
        
        // Reset cursor position
        setTimeout(() => {
          const newCursorPos = start + imageMarkdown.length + 3;
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    }
    
    if (contentImagesInputRef.current) {
      contentImagesInputRef.current.value = '';
    }
  };

  // Markdown formatting helpers
  const insertMarkdown = (before, after = '', placeholder = '') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatBold = () => insertMarkdown('**', '**', 'bold text');
  const formatItalic = () => insertMarkdown('*', '*', 'italic text');
  const formatHeading1 = () => insertMarkdown('# ', '', 'Heading 1');
  const formatHeading2 = () => insertMarkdown('## ', '', 'Heading 2');
  const formatHeading3 = () => insertMarkdown('### ', '', 'Heading 3');
  const formatBulletList = () => insertMarkdown('- ', '', 'list item');
  const formatNumberedList = () => insertMarkdown('1. ', '', 'list item');
  const formatCode = () => insertMarkdown('`', '`', 'code');
  const formatLink = () => insertMarkdown('[', '](url)', 'link text');
  const formatBlockquote = () => insertMarkdown('> ', '', 'quote text');
  const formatHorizontalRule = () => insertMarkdown('\n---\n', '', '');

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setTags(selectedCategory); // Auto-fill tags with category
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
      
      // Use category as the main tag, or split if user typed custom tags
      const tagsArray = category ? [category] : tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      formData.append('tags', JSON.stringify(tagsArray));
      formData.append('category', category);
      
      if (coverImage) {
        formData.append('image', coverImage); // Cover image
      }
      
      if (previewImage) {
        formData.append('previewImage', previewImage);
      }
      
      // Send content images as JSON array
      if (contentImages.length > 0) {
        formData.append('contentImages', JSON.stringify(contentImages));
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
          setTags('Resources');
          setCoverImage(null);
          setCoverImagePreview(null);
          setPreviewImage(null);
          setPreviewImagePreview(null);
          setContentImages([]);
          setStatus('draft');
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
          {coverImagePreview && (
            <img src={coverImagePreview} alt="Preview" className="preview-image" />
          )}
          <h1 className="preview-title">{title}</h1>
          <div className="preview-meta">
            <span>By {currentUser.displayName || currentUser.email}</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          {tags && (
            <div className="preview-tags">
              {tags.split(',').map((tag, idx) => (
                <span key={idx} className="preview-tag">#{tag.trim()}</span>
              ))}
            </div>
          )}
          <ReactMarkdown
            className="preview-body"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
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
        <div className="markdown-toolbar">
          <button type="button" onClick={formatBold} className="toolbar-btn" title="Bold"><Bold size={18} /></button>
          <button type="button" onClick={formatItalic} className="toolbar-btn" title="Italic"><Italic size={18} /></button>
          <div className="toolbar-divider"></div>
          <button type="button" onClick={formatHeading1} className="toolbar-btn" title="Heading 1"><Heading1 size={18} /></button>
          <button type="button" onClick={formatHeading2} className="toolbar-btn" title="Heading 2"><Heading2 size={18} /></button>
          <button type="button" onClick={formatHeading3} className="toolbar-btn" title="Heading 3"><Heading3 size={18} /></button>
          <div className="toolbar-divider"></div>
          <button type="button" onClick={formatBulletList} className="toolbar-btn" title="Bullet List"><List size={18} /></button>
          <button type="button" onClick={formatNumberedList} className="toolbar-btn" title="Numbered List"><ListOrdered size={18} /></button>
          <div className="toolbar-divider"></div>
          <button type="button" onClick={formatLink} className="toolbar-btn" title="Link"><LinkIcon size={18} /></button>
          <button type="button" onClick={formatCode} className="toolbar-btn" title="Code"><Code size={18} /></button>
          <div className="toolbar-divider"></div>
          <input
            ref={contentImagesInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleContentImagesUpload}
            style={{ display: 'none' }}
          />
          <button 
            type="button" 
            onClick={() => contentImagesInputRef.current?.click()} 
            className="toolbar-btn" 
            title="Add Images"
            disabled={uploadingContentImages}
          >
            <ImageIcon size={18} />
          </button>
          <div className="toolbar-divider"></div>
          <button type="button" onClick={formatBlockquote} className="toolbar-btn" title="Quote"><Quote size={18} /></button>
          <button type="button" onClick={formatHorizontalRule} className="toolbar-btn" title="Horizontal Rule"><Minus size={18} /></button>
        </div>
        {uploadingContentImages && <div style={{ padding: '10px', color: '#666' }}>Uploading images...</div>}
        <textarea
          ref={contentTextareaRef}
          placeholder="What's on your mind? Share your thoughts... (Supports Markdown)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
          rows={8}
          spellCheck={false}
        />

        {/* Excerpt Input */}
        <textarea
          placeholder="Short excerpt (optional - will use first 200 chars if not provided)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="excerpt-input"
          rows={2}
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Image Previews and Uploads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Cover Image */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1c1e21' }}>
              Cover Image (Main header)
            </label>
            <input
              ref={coverImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => coverImageInputRef.current?.click()}
              className="action-btn"
              disabled={loading}
              type="button"
            >
              <ImageIcon size={20} />
              <span>{coverImagePreview ? 'Change Cover' : 'Upload Cover'}</span>
            </button>
            {coverImagePreview && (
              <div className="image-preview" style={{ marginTop: '10px' }}>
                <img src={coverImagePreview} alt="Cover" />
                <button onClick={removeCoverImage} className="remove-image-btn">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Preview Image */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1c1e21' }}>
              Preview Image (Thumbnail for list)
            </label>
            <input
              ref={previewImageInputRef}
              type="file"
              accept="image/*"
              onChange={handlePreviewImageChange}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => previewImageInputRef.current?.click()}
              className="action-btn"
              disabled={loading}
              type="button"
            >
              <ImageIcon size={20} />
              <span>{previewImagePreview ? 'Change Preview' : 'Upload Preview'}</span>
            </button>
            {previewImagePreview && (
              <div className="image-preview" style={{ marginTop: '10px' }}>
                <img src={previewImagePreview} alt="Preview" />
                <button onClick={removePreviewImage} className="remove-image-btn">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="editor-actions">
          <div className="left-actions">
            <button
              onClick={() => contentImagesInputRef.current?.click()}
              className="action-btn"
              disabled={loading || uploadingContentImages}
            >
              <ImageIcon size={20} />
              <span>{uploadingContentImages ? 'Uploading...' : 'Photo'}</span>
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="action-btn"
              disabled={loading || !title || !content}
            >
              <Eye size={20} />
              <span>Preview</span>
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
