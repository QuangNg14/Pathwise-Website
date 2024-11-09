import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Import rehypeRaw
import "./IndividualBlogPost.css";

export default function IndividualBlogPost({ content, id }) {
  return (
    <div className="individual-blog-layout">
      <div className="content-container">
        <h1 className="blog-title">{id.replace("-", " ").toUpperCase()}</h1>
        <ReactMarkdown
          className="blog-content"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // Enable rehypeRaw
        >
          {content}
        </ReactMarkdown>
      </div>
      <aside className="sidebar">
        <h5>Popular Posts</h5>
        <ul>
          <li>
            <a href="#">Post 1</a>
          </li>
          <li>
            <a href="#">Post 2</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
