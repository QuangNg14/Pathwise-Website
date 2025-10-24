"use client";

import React, { useState } from "react";
import { Row, Col, Card, Typography, AutoComplete, Input, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import "./BlogListing.css";

const { Title, Text } = Typography;

const BlogListing = ({ blogPosts }) => {
  const router = useRouter();
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All"); // Show all posts by default

  // Handle tab click with toggle functionality
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      // If clicking the same category, toggle to "All"
      setActiveCategory("All");
    } else {
      // Otherwise, switch to the clicked category
      setActiveCategory(category);
    }
  };

  // Filter posts by active category (show all if "All" is selected)
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.tags && post.tags.includes(activeCategory));

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
      setSearchOptions([]);
      return;
    }

    const searchValue = value.toLowerCase();
    const filtered = blogPosts
      .filter((post) => post.title.toLowerCase().includes(searchValue))
      .map((post) => ({
        value: post.title,
        label: (
          <div className="search-option">
            <div className="search-option-title">{post.title}</div>
            <div className="search-option-date">{post.date}</div>
          </div>
        ),
        post: post,
      }));

    setSearchOptions(filtered);
  };

  const handleSelect = (value, option) => {
    const post = option.post;
    setSearchValue("");
    setSearchOptions([]);
    
    // All posts now open on the site (no external links)
    router.push(`/blog/${post.id}`);
  };

  const handlePostClick = (post) => {
    // All posts now open on the site in beautiful format
    router.push(`/blog/${post.id}`);
  };

  return (
    <div className="blog-listing-layout">
      {/* Search Bar */}
      <motion.div
        className="search-bar"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <AutoComplete
          value={searchValue}
          options={searchOptions}
          onSearch={handleSearch}
          onSelect={handleSelect}
          placeholder="Search blog posts by title..."
          className="search-autocomplete"
          notFoundContent={
            searchValue ? <div style={{ padding: "8px" }}>No results found</div> : null
          }
        >
          <Input
            size="large"
            suffix={<SearchOutlined />}
            className="search-input"
          />
        </AutoComplete>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={1} className="hero-title">
          Explore Our Latest Blog Posts
        </Title>
        <Text className="hero-description">
          Những thông tin chuyên sâu mới nhất, đầy đủ, và sâu sắc để tìm việc và
          thăng tiến sự nghiệp trong lĩnh vực công nghệ
        </Text>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="category-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="custom-tabs-wrapper">
          {["Resources", "Job Applications", "Careers"].map((category) => (
            <button
              key={category}
              className={`custom-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="content-wrapper">
        {/* Featured Blog - First Post (Large) */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="featured-blog-card"
              onClick={() => handlePostClick(filteredPosts[0])}
              hoverable
              cover={
                <div className="featured-image-wrapper">
                  <img
                    src={filteredPosts[0].image || filteredPosts[0].imageUrl || 'https://via.placeholder.com/1200x500/667eea/ffffff?text=Blog+Post+Image'}
                    alt={filteredPosts[0].title}
                    className="featured-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x500/667eea/ffffff?text=Blog+Post+Image';
                    }}
                  />
                </div>
              }
            >
              <div className="featured-blog-content">
                <Text className="blog-date">{filteredPosts[0].date}</Text>
                <Title level={2} className="featured-blog-title">
                  {filteredPosts[0].title}
                </Title>
                <Text className="featured-blog-excerpt">
                  {filteredPosts[0].excerpt}
                </Text>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Small Blogs - 3 in a Row */}
        {filteredPosts.length > 1 && (
          <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
            {filteredPosts.slice(1, 4).map((post, index) => (
              <Col xs={24} sm={12} md={8} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                >
                  <Card
                    className="small-blog-card"
                    onClick={() => handlePostClick(post)}
                    hoverable
                    cover={
                      <div className="small-image-wrapper">
                        <img
                          src={post.image || post.imageUrl || 'https://via.placeholder.com/400x300/667eea/ffffff?text=Blog+Post'}
                          alt={post.title}
                          className="small-blog-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Blog+Post';
                          }}
                        />
                      </div>
                    }
                  >
                    <div className="small-blog-content">
                      <Text className="blog-date">{post.date}</Text>
                      <Title level={5} className="small-blog-title">
                        {post.title}
                      </Title>
                      <Text className="small-blog-excerpt">
                        {post.excerpt}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {/* Remaining blogs - Horizontal Rectangle Layout */}
        {filteredPosts.length > 4 && (
          <div style={{ marginTop: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {filteredPosts.slice(4).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className="rectangle-blog-card"
                    onClick={() => handlePostClick(post)}
                    hoverable
                  >
                    <Row gutter={16}>
                      <Col xs={8} md={6}>
                        <div className="rectangle-image-wrapper">
                          <img
                            src={post.image || post.imageUrl || 'https://via.placeholder.com/400x180/667eea/ffffff?text=Blog+Post'}
                            alt={post.title}
                            className="rectangle-blog-image"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x180/667eea/ffffff?text=Blog+Post';
                            }}
                          />
                        </div>
                      </Col>
                      <Col xs={16} md={18}>
                        <div className="rectangle-blog-content">
                          <Text className="blog-date">{post.date}</Text>
                          <Title level={5} className="rectangle-blog-title">
                            {post.title}
                          </Title>
                          <Text className="rectangle-blog-excerpt">
                            {post.excerpt}
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;

