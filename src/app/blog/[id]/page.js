// app/blog/[id]/page.js

import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import IndividualBlogPost from "@/components/componentForBlogPage/IndividualBlogPost/IndividualBlogPost";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/content/blogs");
  const blogIds = fs.readdirSync(blogDir);

  return blogIds.map((id) => ({
    id,
  }));
}

export default async function BlogPage({ params }) {
  const { id } = params;
  const blogPath = path.join(
    process.cwd(),
    `src/content/blogs/blog${id}/index.md`
  );

  if (!fs.existsSync(blogPath)) {
    notFound();
  }

  const markdownContent = fs.readFileSync(blogPath, "utf8");

  return <IndividualBlogPost content={markdownContent} id={id} />;
}
