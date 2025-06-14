"use client";

import { useEffect, useState } from "react";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import IndividualBlogPost from "@/components/componentForBlogPage/IndividualBlogPost/IndividualBlogPost";
import FooterComponent from "@/components/footer/Footer";
import HeaderComponent from "@/components/header/header";

export default function BlogPage({ params }) {
  const [id, setId] = useState(null);
  const [content, setContent] = useState(null);
  const router = useRouter();
  const [current, setCurrent] = useState("blog");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

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
        const response = await fetch(`/api/blog/${id}`);
        if (response.status === 404) {
          // router.push("/404");
          return;
        }

        const data = await response.json();
        setContent(data.content); // Use raw markdown content
      } catch (error) {
        console.error("Error fetching blog content:", error);
      }
    };

    fetchBlogContent();
  }, [id, router]);

  if (!id || !content) {
    return (
      <Layout style={{ backgroundColor: "#fff" }}>
        <HeaderComponent current={current} handleClick={handleClick} />
        <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
        <FooterComponent />
      </Layout>
    );
  }

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <HeaderComponent current={current} handleClick={handleClick} />
      <IndividualBlogPost content={content} id={id} />
      <FooterComponent />
    </Layout>
  );
}
