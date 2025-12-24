"use client";

import { useEffect, useState } from "react";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import Header from "@/components/BlogHeader/Header";
import Footer from "@/components/BlogFooter/Footer";
import BlogPost from "@/components/BlogPost/BlogPost";

export default function BlogPostPage({ params }) {
  const [id, setId] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handle async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchBlogContent = async () => {
      try {
        setLoading(true);
        
        // First, try to fetch from database (new admin posts) and increment view count
        const adminResponse = await fetch(`/api/admin/posts/${id}?incrementView=true`);
        
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          if (adminData.success && adminData.post) {
            // Remove first image tag and first heading from markdown content
            let cleanContent = adminData.post.content;
            // Remove first <img> tag if exists
            cleanContent = cleanContent.replace(/^<img[^>]*>\s*\n?/i, '');
            // Remove first heading if exists (lines starting with #)
            cleanContent = cleanContent.replace(/^#+\s+.+\n?/m, '');
            
            // Format admin post for display
            setContent({
              title: adminData.post.title,
              content: cleanContent,
              excerpt: adminData.post.excerpt,
              author: adminData.post.author,
              date: new Date(adminData.post.createdAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              imageUrl: adminData.post.coverImage || adminData.post.imageUrl,
              tags: adminData.post.tags,
              isFirestore: true
            });
            setLoading(false);
            return;
          }
        }
        
        // If not found in database, try markdown files (legacy posts)
        const markdownResponse = await fetch(`/api/blog/${id}`);
        
        if (markdownResponse.status === 404) {
          router.push("/blog");
          return;
        }

        const markdownData = await markdownResponse.json();
        setContent({
          ...markdownData,
          isFirestore: false
        });
      } catch (error) {
        console.error("Error fetching blog content:", error);
        router.push("/blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [id, router]);

  if (loading || !content) {
    return (
      <div data-blog-page>
        <Layout style={{ minHeight: "100vh", background: "transparent" }}>
          <Header current="blog" />
        <div
          style={{
            padding: "100px 50px",
            textAlign: "center",
            color: "white",
            fontSize: "20px",
          }}
        >
          Loading...
        </div>
        <Footer />
      </Layout>
      </div>
    );
  }

  return (
    <div data-blog-page>
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Header current="blog" />
      <BlogPost content={content} id={id} />
      <Footer />
    </Layout>
    </div>
  );
}
