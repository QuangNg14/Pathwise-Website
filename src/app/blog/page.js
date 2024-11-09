"use client";
import MentorshipContentLayout from "@/components/componentForBlogPage/MentorshipContentLayout/MentorshipContentLayout";
import FooterComponent from "@/components/footer/Footer";
import HeaderComponent from "@/components/header/header";
import { Layout } from "antd";
import React from "react";
import { useState } from "react";

// Sample blog post data
const blogPosts = [
  {
    id: "resume",
    title: "6 Best Practices for Creating the Ultimate Tech Resume",
    date: "November 14, 2023",
    excerpt: "Improve your tech resume with these tips.",
  },
  {
    id: "response",
    title: "The 10 Best Job Search Websites",
    date: "November 1, 2024",
    excerpt: "Top sites to find your dream tech job.",
  },
  {
    id: "techlayoff",
    title: "Should you ask for a raise or look for a new job?",
    date: "October 11, 2024",
    excerpt: "Advice on career advancement decisions.",
  },
];

const Blog = () => {
  const [current, setCurrent] = useState("blog");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout>
      <HeaderComponent current={current} handleClick={handleClick} />
      <MentorshipContentLayout blogPosts={blogPosts} />
      <FooterComponent />
    </Layout>
  );
};

export default Blog;
