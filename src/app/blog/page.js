"use client";

import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import Header from "@/components/BlogHeader/Header";
import Footer from "@/components/BlogFooter/Footer";
import BlogListing from "@/components/BlogListing/BlogListing";
import ChatBot from "@/components/ChatBot/ChatBot";

// No hardcoded posts - all posts come from database

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        // Fetch from NEW admin system (Firestore/MongoDB)
        const adminResponse = await fetch('/api/admin/posts?status=published&limit=50');
        const adminData = await adminResponse.json();
        
        // Fetch from OLD Facebook sync (MongoDB) 
        const fbResponse = await fetch('/api/posts');
        const fbData = await fbResponse.json();
        
        let allPosts = [];
        
        // Add Firestore admin posts
        if (adminData.success && adminData.posts.length > 0) {
          allPosts = [...adminData.posts];
        }
        
        // Add MongoDB Facebook posts
        if (fbData.success && fbData.posts.length > 0) {
          allPosts = [...allPosts, ...fbData.posts];
        }
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.createdTime || 0);
          const dateB = new Date(b.createdAt || b.createdTime || 0);
          return dateB - dateA;
        });
        
        setBlogPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, []);

  return (
    <div data-blog-page>
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Header current="blog" />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'white' }}>
          <Spin size="large" tip="Loading posts...">
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '12px', minHeight: '100px' }}></div>
          </Spin>
        </div>
      ) : blogPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 50px', color: 'white' }}>
          <h2>No blog posts yet!</h2>
          <p>Go to <a href="/admin/blog" style={{color: '#1890ff'}}>Admin Panel</a> to create your first blog post.</p>
        </div>
      ) : (
        <BlogListing blogPosts={blogPosts} />
      )}
      <Footer />
      <ChatBot />
    </Layout>
    </div>
  );
}
