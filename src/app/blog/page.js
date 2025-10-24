"use client";
import MentorshipContentLayout from "@/components/componentForBlogPage/MentorshipContentLayout/MentorshipContentLayout";
import FooterComponent from "@/components/footer/Footer";
import HeaderComponent from "@/components/header/header";
import { Layout } from "antd";
import React, { useState, useEffect } from "react";

// Legacy blog posts (from markdown files) - kept for backward compatibility
const legacyBlogPosts = [
  {
    id: "resume",
    title: "Cách viết CV hiệu quả để được gọi phỏng vấn",
    date: "10 Tháng 11, 2024",
    excerpt: "Cải thiện hồ sơ xin việc của bạn bằng những cách đơn giản này.",
    image: "/images/resume.jpeg",
    isLegacy: true,
  },
  {
    id: "response",
    title: "Chiến Lược Tăng Tỉ Lệ Phản Hồi Khi Apply Intern",
    date: "5 Tháng 11, 2024",
    excerpt:
      "Các cách để cải thiện hồ sơ và có những advantage nhỏ khi apply việc.",
    image: "/images/response1.jpg",
    isLegacy: true,
  },
  {
    id: "techlayoff",
    title: "2023 - Năm đen tối của ngành công nghệ tại Mỹ",
    date: "20 Tháng 10, 2024",
    excerpt:
      "Ngành công nghệ tại Hoa Kỳ đã chứng kiến sự giảm việc làm đáng kể vào năm 2023.",
    image: "/images/tech_layoff2.jpg",
    isLegacy: true,
  },
  {
    id: "aitools",
    title:
      "CHATGPT 4.0 VS GEMINI ADVANCED: Đâu là sự lựa chọn hoàn hảo cho bạn?",
    date: "11 Tháng 10, 2024",
    excerpt:
      "AI đang dần len lỏi vào mọi ngóc ngách của đời sống, và việc lựa chọn một nền tảng AI phù hợp là vô cùng quan trọng.",
    image: "/images/aitools.jpg",
    isLegacy: true,
  },
  {
    id: "getinternship",
    title: "Bí Kíp Để Có Thực Tập Hè",
    date: "1 Tháng 10, 2024",
    excerpt:
      "Làm thế nào để sinh viên năm nhất và năm hai cưa đổ kỳ thực tập mùa hè.",
    image: "/images/getinternship.jpg",
    isLegacy: true,
  },
];

const Blog = () => {
  const [current, setCurrent] = useState("blog");
  const [blogPosts, setBlogPosts] = useState(legacyBlogPosts);
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    // Fetch blog posts from Firestore
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/posts?status=published&limit=50');
        const data = await response.json();
        
        if (data.success && data.posts.length > 0) {
          // Transform Firestore posts to match the expected format
          const firestorePosts = data.posts.map(post => ({
            id: post.id,
            title: post.title,
            date: new Date(post.createdAt).toLocaleDateString('vi-VN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            excerpt: post.excerpt,
            image: post.imageUrl || '/images/resume.jpeg',
            isLegacy: false,
          }));
          
          // Combine Firestore posts with legacy posts
          setBlogPosts([...firestorePosts, ...legacyBlogPosts]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // If fetch fails, just use legacy posts
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <HeaderComponent current={current} handleClick={handleClick} />
      {loading ? (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <div className="spinner" style={{ 
            width: "40px", 
            height: "40px", 
            border: "4px solid #f0f2f5", 
            borderTopColor: "#1877f2", 
            borderRadius: "50%", 
            animation: "spin 1s linear infinite",
            margin: "0 auto 15px"
          }}></div>
          <p>Loading blog posts...</p>
        </div>
      ) : (
        <MentorshipContentLayout blogPosts={blogPosts} />
      )}
      <FooterComponent />
    </Layout>
  );
};

export default Blog;
