import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // First, try to find it in MongoDB (Facebook posts)
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || 'pathwise');
      const postsCollection = db.collection('posts');

      // Try to find by MongoDB _id
      let post = null;
      if (ObjectId.isValid(id)) {
        post = await postsCollection.findOne({ _id: new ObjectId(id) });
      }

      // If found in MongoDB, return Facebook post content
      if (post) {
        // Split message into title and content
        const lines = post.message.split('\n').filter(line => line.trim());
        const title = lines[0] || 'Facebook Post';
        const contentText = lines.slice(1).join('\n\n') || post.message;
        
        // Format as markdown to match existing blog post style
        const content = `# ${title}

![${title}](${post.cloudinaryImage || post.originalImage})

${contentText}

---

**Tác giả:** ${post.author}  
**Ngày đăng:** ${new Date(post.createdTime).toLocaleDateString('vi-VN', { 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
})}

${post.permalink ? `\n[Xem bài viết gốc trên Facebook →](${post.permalink})` : ''}`;

        return NextResponse.json({ 
          content: content,
          type: 'facebook',
          post: post
        });
      }
    } catch (mongoError) {
      console.log('Not found in MongoDB, trying markdown files...', mongoError.message);
    }

    // If not in MongoDB, try markdown files (original posts)
    const blogPath = path.join(
      process.cwd(),
      `src/content/blogs/${id}/index.md`
    );

    // Check if the file exists
    if (!fs.existsSync(blogPath)) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Read and send the markdown content
    const markdownContent = fs.readFileSync(blogPath, "utf8");
    return NextResponse.json({ content: markdownContent, type: 'markdown' });
  } catch (error) {
    console.error("Error reading blog content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
