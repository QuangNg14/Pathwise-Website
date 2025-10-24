"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import "./BlogPost.css";

export default function BlogPost({ content, id }) {
  const router = useRouter();
  const { currentUser, userRole } = useAuth();
  const [popularPosts, setPopularPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [reactions, setReactions] = useState({ love: 0, helpful: 0, fire: 0 });
  const [userReaction, setUserReaction] = useState(null);
  
  // Check if current user is admin
  const isAdmin = userRole === 'admin';

  // Fetch popular posts (sort by featured, then views)
  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        const response = await fetch('/api/admin/posts?status=published&limit=100');
        const data = await response.json();
        
        if (data.success) {
          // Sort by featured first, then by views (highest first)
          const sortedPosts = data.posts.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (b.views || 0) - (a.views || 0);
          }).slice(0, 5); // Top 5 posts
          
          setPopularPosts(sortedPosts.map(post => ({
            id: post.id,
            title: post.title,
            views: post.views || 0,
            featured: post.featured || false
          })));
        }
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      }
    }
    
    fetchPopularPosts();
  }, []);

  // Fetch related posts (same category)
  useEffect(() => {
    async function fetchRelatedPosts() {
      if (!content?.tags || !id) return;
      
      try {
        const response = await fetch('/api/admin/posts?status=published&limit=50');
        const data = await response.json();
        
        if (data.success) {
          // Filter posts with same category, exclude current post
          const related = data.posts
            .filter(post => 
              post.id !== id && 
              post.tags && 
              content.tags.some(tag => post.tags.includes(tag))
            )
            .slice(0, 4); // Top 4 related
          
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    }
    
    fetchRelatedPosts();
  }, [content, id]);

  // Fetch reactions for current post
  useEffect(() => {
    async function fetchReactions() {
      if (!id) return;
      
      try {
        // Get user ID (logged in or anonymous)
        let userId = currentUser?.uid;
        if (!userId) {
          userId = localStorage.getItem('anonUserId');
          if (!userId) {
            userId = `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('anonUserId', userId);
          }
        }
        
        const response = await fetch(`/api/reactions/${id}?userId=${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setReactions(data.reactions);
          setUserReaction(data.userReaction);
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    }
    
    fetchReactions();
  }, [id, currentUser]);

  // Handle reaction click - users can only react once
  const handleReaction = async (type) => {
    if (!id) return;
    
    // If user already reacted with this type, remove it (toggle)
    if (userReaction === type) {
      try {
        const response = await fetch(`/api/reactions/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type,
            userId: currentUser?.uid || localStorage.getItem('anonUserId')
          })
        });
        
        const data = await response.json();
        if (data.success) {
          setReactions(data.reactions);
          setUserReaction(null);
        }
      } catch (error) {
        console.error('Error removing reaction:', error);
      }
      return;
    }
    
    try {
      // Generate or get anonymous user ID
      let userId = currentUser?.uid;
      if (!userId) {
        userId = localStorage.getItem('anonUserId');
        if (!userId) {
          userId = `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('anonUserId', userId);
        }
      }
      
      const response = await fetch(`/api/reactions/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type,
          userId,
          previousReaction: userReaction // Tell API to remove previous reaction
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setReactions(data.reactions);
        setUserReaction(type);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = content?.title || 'Check out this blog post!';

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const handleGoBack = () => {
    router.push("/");
  };

  // Check if content is a Firestore post (object) or markdown string
  const isFirestorePost = content && typeof content === 'object' && content.isFirestore;
  
  return (
    <div className="blog-post-layout">
      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="go-back-button" onClick={handleGoBack}>
          <ArrowLeftOutlined /> Quay lại
        </div>
        
        {isFirestorePost ? (
          // Render Firestore post (from admin system)
          <div className="blog-markdown-content">
            {content.imageUrl && (
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                style={{ 
                  width: '100%', 
                  maxHeight: '500px', 
                  objectFit: 'cover', 
                  borderRadius: '12px',
                  marginBottom: '30px'
                }} 
              />
            )}
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              {content.title}
            </h1>
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginBottom: '30px',
              color: '#666',
              fontSize: '14px'
            }}>
              {content.author && <span>By {content.author}</span>}
              {content.date && <span>• {content.date}</span>}
            </div>
            {content.tags && content.tags.length > 0 && (
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginBottom: '30px',
                flexWrap: 'wrap'
              }}>
                {content.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    background: '#e7f3ff',
                    color: '#1877f2',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap'
            }}>
              {content.content}
            </div>
          </div>
        ) : (
          // Render markdown post (legacy)
          <ReactMarkdown
            className="blog-markdown-content"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {typeof content === 'string' ? content : content?.content || ''}
          </ReactMarkdown>
        )}

        {/* Reactions - Minimal Icons Only */}
        <div className="reactions-minimal">
          <button 
            onClick={() => handleReaction('love')}
            className={`reaction-icon ${userReaction === 'love' ? 'active' : ''}`}
            title="Love it"
          >
            <span className="emoji-icon">❤️</span>
            <span className="count-icon">{reactions.love || 0}</span>
          </button>
          <button 
            onClick={() => handleReaction('helpful')}
            className={`reaction-icon ${userReaction === 'helpful' ? 'active' : ''}`}
            title="Helpful"
          >
            <span className="emoji-icon">👍</span>
            <span className="count-icon">{reactions.helpful || 0}</span>
          </button>
          <button 
            onClick={() => handleReaction('fire')}
            className={`reaction-icon ${userReaction === 'fire' ? 'active' : ''}`}
            title="Amazing"
          >
            <span className="emoji-icon">🔥</span>
            <span className="count-icon">{reactions.fire || 0}</span>
          </button>
        </div>

        {/* Share Buttons - Compact */}
        <div className="share-section-compact">
          <span className="share-label">Share:</span>
          <div className="share-buttons-compact">
            <button onClick={() => handleShare('facebook')} className="share-btn-compact facebook" title="Share on Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button onClick={() => handleShare('twitter')} className="share-btn-compact twitter" title="Share on X (Twitter)">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button onClick={() => handleShare('linkedin')} className="share-btn-compact linkedin" title="Share on LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button onClick={copyLink} className="share-btn-compact copy" title="Copy Link">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="related-posts-section">
            <h3>You might also like</h3>
            <div className="related-posts-grid">
              {relatedPosts.map(post => (
                <a href={`/blog/${post.id}`} key={post.id} className="related-post-card">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="related-post-image" />
                  )}
                  <div className="related-post-content">
                    <h4>{post.title}</h4>
                    {post.tags && post.tags[0] && (
                      <span className="related-post-category">#{post.tags[0]}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {popularPosts.length > 0 && (
        <motion.aside
          className="sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4>Bài Viết Phổ Biến</h4>
          <ul>
            {popularPosts.map((post) => (
              <li key={post.id}>
                <a href={`/blog/${post.id}`}>
                  {post.featured && <span style={{ color: '#FFD700', marginRight: '6px' }}>⭐</span>}
                  {post.title}
                  {isAdmin && post.views > 0 && (
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#999', 
                      marginLeft: '8px',
                      display: 'inline-block'
                    }}>
                      ({post.views} views)
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </motion.aside>
      )}
    </div>
  );
}






