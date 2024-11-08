// components/componentForBlogPage/IndividualBlogPost/IndividualBlogPost.js

import React from "react";
import { Typography, Layout } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./IndividualBlogPost.css";

const { Title, Paragraph } = Typography;

export default function IndividualBlogPost({ content, id }) {
  console.log(content);
  return (
    <Layout className="individual-blog-layout">
      <div className="content-container">
        <Title level={1} className="blog-title">
          {id.replace("-", " ").toUpperCase()}
        </Title>
        <ReactMarkdown
          className="blog-content"
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <Title level={1} {...props} />,
            h2: ({ node, ...props }) => <Title level={2} {...props} />,
            h3: ({ node, ...props }) => <Title level={3} {...props} />,
            p: ({ node, ...props }) => <Paragraph {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <aside className="sidebar">
        <Title level={5}>Popular Posts</Title>
        <ul>
          <li>
            <a href="#">Post 1</a>
          </li>
          <li>
            <a href="#">Post 2</a>
          </li>
        </ul>
      </aside>
    </Layout>
  );
}
