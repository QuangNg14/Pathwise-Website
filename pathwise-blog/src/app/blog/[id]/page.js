"use client";

import { useEffect, useState } from "react";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
        
        // First, try to fetch from Firestore (new admin posts) and increment view count
        const firestoreResponse = await fetch(`/api/admin/posts/${id}?incrementView=true`);
        
        if (firestoreResponse.ok) {
          const firestoreData = await firestoreResponse.json();
          if (firestoreData.success && firestoreData.post) {
            // Format Firestore post for display
            setContent({
              title: firestoreData.post.title,
              content: firestoreData.post.content,
              excerpt: firestoreData.post.excerpt,
              author: firestoreData.post.author,
              date: new Date(firestoreData.post.createdAt).toLocaleDateString('vi-VN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              imageUrl: firestoreData.post.imageUrl,
              tags: firestoreData.post.tags,
              isFirestore: true
            });
            setLoading(false);
            return;
          }
        }
        
        // If not found in Firestore, try markdown files (legacy posts)
        const markdownResponse = await fetch(`/api/blog/${id}`);
        
        if (markdownResponse.status === 404) {
          router.push("/");
          return;
        }

        const markdownData = await markdownResponse.json();
        setContent({
          ...markdownData,
          isFirestore: false
        });
      } catch (error) {
        console.error("Error fetching blog content:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [id, router]);

  if (loading || !content) {
    return (
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
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Header current="blog" />
      <BlogPost content={content} id={id} />
      <Footer />
    </Layout>
  );
}


