import React from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./IndividualBlogPost.css";

export default function IndividualBlogPost({ content }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/blog");
  };

  return (
    <div className="individual-blog-layout">
      <div className="content-container">
        <div className="go-back-icon" onClick={handleGoBack}>
          <ArrowLeftOutlined />
        </div>
        <ReactMarkdown
          className="blog-content"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
      <aside className="sidebar">
        <h5>Popular Posts</h5>
        <ul>
          <li>
            <a href="#">Is Pathrise Worth It?</a>
          </li>
          <li>
            <a href="#">A Review Of We Work Remotely To Find Remote Jobs</a>
          </li>
          <li>
            <a href="#">What To Include In A Tech Resume</a>
          </li>
          <li>
            <a href="#">Best Practices for Creating a Tech Resume</a>
          </li>
          <li>
            <a href="#">A Review Of Bootcamp Digital</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
