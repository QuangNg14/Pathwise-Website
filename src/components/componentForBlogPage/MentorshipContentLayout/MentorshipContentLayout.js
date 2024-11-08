// src/components/MentorshipContentLayout.js

import React from "react";
import { Row, Col, Card, Typography, Layout, Input } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./MentorshipContentLayout.css";

const { Title, Text } = Typography;
const { Search } = Input;

// Sample data for demonstration
const featuredContent = [
  {
    title: "What to Include in a Resume to Land Your Dream Job in Tech",
    image: "https://via.placeholder.com/500x300",
    description: "Examples and Best Practices",
  },
  {
    title: "Career Connect: Message a Hiring Manager the Right Way",
    image: "https://via.placeholder.com/500x300",
    description: "A Guide",
  },
  {
    title: "Best resume format for ATS",
    image: "https://via.placeholder.com/250x150",
    description: "2023 Update",
  },
  {
    title: "The Most Common Interview Questions",
    image: "https://via.placeholder.com/250x150",
    description: "with Answers",
  },
  {
    title: "Should a Resume Be One Page?",
    image: "https://via.placeholder.com/250x150",
    description: "Top Tips",
  },
  //   {
  //     title: "Amazon Salary Negotiation Guide",
  //     image: "https://via.placeholder.com/250x150",
  //     description: "A Comprehensive Guide",
  //   },
];

const MentorshipContentLayout = ({ blogPosts }) => {
  const router = useRouter();

  return (
    <Layout className="mentorship-layout">
      {/* Search Bar */}
      <div className="search-bar">
        <Search
          placeholder="Search..."
          enterButton="Search"
          className="search-input"
        />
      </div>

      {/* Featured Content */}
      <div className="featured-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              cover={<img alt="example" src={featuredContent[0].image} />}
              className="featured-card large-card"
              onClick={() => router.push(`/blog/${featuredContent[0].title}`)}
            >
              <Title level={4}>{featuredContent[0].title}</Title>
              <Text>{featuredContent[0].description}</Text>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              cover={<img alt="example" src={featuredContent[1].image} />}
              className="featured-card large-card"
              onClick={() => router.push(`/blog/${featuredContent[1].title}`)}
            >
              <Title level={4}>{featuredContent[1].title}</Title>
              <Text>{featuredContent[1].description}</Text>
            </Card>
          </Col>
          {featuredContent.slice(2).map((item, index) => (
            <Col xs={12} sm={8} md={8} key={index}>
              <Card
                cover={<img alt={item.title} src={item.image} />}
                className="featured-card small-card"
                onClick={() => router.push(`/blog/${item.title}`)}
              >
                <Title level={5}>{item.title}</Title>
                <Text>{item.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Blog List with Sidebar */}
      <div className="blog-list-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            {blogPosts.map((post, index) => (
              <Card key={index} className="blog-card">
                <Row gutter={16}>
                  <Col xs={8} md={6}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-image"
                    />
                  </Col>
                  <Col xs={16} md={18}>
                    <Text className="blog-date">{post.date}</Text>
                    <Title level={5}>
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </Title>
                    <Text>{post.excerpt}</Text>
                    <br />
                    <button
                      onClick={() => router.push(`/blog/${post.id}`)}
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
          <Col xs={24} md={8}>
            <div className="sidebar">
              <Title level={5}>Popular Posts</Title>
              <ul className="sidebar-list">
                <li>
                  <a href="#">Is Pathrise Worth It?</a>
                </li>
                <li>
                  <a href="#">
                    A Review Of We Work Remotely To Find Remote Jobs
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default MentorshipContentLayout;
