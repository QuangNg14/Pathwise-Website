import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Build the path to the markdown file dynamically
    const blogPath = path.join(
      process.cwd(),
      `src/content/blogs/${id}/index.md`
    );

    // Check if the file exists; if not, return a 404 response
    if (!fs.existsSync(blogPath)) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Read and send the markdown content
    const markdownContent = fs.readFileSync(blogPath, "utf8");
    return NextResponse.json({ content: markdownContent });
  } catch (error) {
    console.error("Error reading blog content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
