import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
try {
  const envPath = path.join(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.includes('=')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
} catch (error) {
  console.error('Error loading .env.local:', error.message);
}

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'pathwise';

if (!uri) {
  console.error('❌ MONGODB_URI not found in environment variables!');
  process.exit(1);
}

// Blog posts to migrate
const blogPosts = [
  {
    id: 'aitools',
    title: 'CHATGPT 4.0 VS GEMINI ADVANCED: ĐÂU LÀ LỰA CHỌN HOÀN HẢO CHO BẠN?',
    slug: 'chatgpt-vs-gemini-advanced',
    excerpt: 'AI đang dần len lỏi vào mọi ngóc ngách của đời sống, và việc lựa chọn một nền tảng AI phù hợp là vô cùng quan trọng.',
    category: 'Resources',
    tags: ['Resources'],
    imageUrl: '/images/aitools.jpg',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'getinternship',
    title: 'Bí kíp "cưa đổ" internship mùa hè cho sinh viên năm nhất, năm hai',
    slug: 'bi-kip-cua-do-internship-mua-he',
    excerpt: 'Mùa hè đến mang theo những cơ hội thực tập đầy hấp dẫn cho sinh viên năm nhất và năm hai.',
    category: 'Job Applications',
    tags: ['Job Applications'],
    imageUrl: '/images/getinternship.jpg',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'response',
    title: '🚀 Chiến Lược Tăng Tỉ Lệ Phản Hồi Khi Apply Intern',
    slug: 'chien-luoc-tang-ti-le-phan-hoi',
    excerpt: 'Nộp hàng trăm đơn xin việc nhưng vẫn chưa nhận được phản hồi từ nhà tuyển dụng?',
    category: 'Job Applications',
    tags: ['Job Applications'],
    imageUrl: '/images/response1.jpg',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'resume',
    title: 'Các mẹo để tạo Resume trong ngành Tech hiệu quả',
    slug: 'meo-tao-resume-tech-hieu-qua',
    excerpt: 'Hãy tưởng tượng bạn vừa tìm thấy một công việc lý tưởng trong ngành công nghệ.',
    category: 'Job Applications',
    tags: ['Job Applications'],
    imageUrl: '/images/resume_heading.png',
    createdAt: new Date('2024-11-09'),
  },
  {
    id: 'techlayoff',
    title: '2023 - Năm đen tối của ngành công nghệ tại Mỹ',
    slug: '2023-nam-den-toi-nganh-cong-nghe',
    excerpt: 'Ngành công nghệ tại Hoa Kỳ đã chứng kiến sự giảm việc làm đáng kể vào năm 2023.',
    category: 'Careers',
    tags: ['Careers'],
    imageUrl: '/images/tech_layoffs.jpg',
    createdAt: new Date('2024-03-01'),
  },
];

async function migratePosts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const postsCollection = db.collection('blogPosts');

    // Check if posts already exist
    const existingPosts = await postsCollection.find({
      slug: { $in: blogPosts.map(p => p.slug) }
    }).toArray();

    if (existingPosts.length > 0) {
      console.log(`\n⚠️  Found ${existingPosts.length} existing posts with these slugs.`);
      console.log('Updating existing posts with new category tags...\n');
      
      // Update existing posts with new tags
      for (const existingPost of existingPosts) {
        const postData = blogPosts.find(p => p.slug === existingPost.slug);
        if (postData) {
          await postsCollection.updateOne(
            { _id: existingPost._id },
            { 
              $set: { 
                category: postData.category,
                tags: postData.tags,
                updatedAt: new Date()
              } 
            }
          );
          console.log(`✅ Updated: ${postData.title} - Tags: ${postData.tags.join(', ')}`);
        }
      }
      console.log(`\n✨ Update complete! ${existingPosts.length} posts updated with new category tags.`);
      return;
    }

    for (const postData of blogPosts) {
      // Read markdown content - go up from scripts/ to project root
      const markdownPath = path.join(
        __dirname,
        '../src/content/blogs',
        `${postData.id}/index.md`
      );

      if (!fs.existsSync(markdownPath)) {
        console.log(`❌ Markdown file not found: ${markdownPath}`);
        continue;
      }

      const content = fs.readFileSync(markdownPath, 'utf8');

      // Create post document
      const postDocument = {
        ...postData,
        content,
        status: 'published',
        featured: false,
        views: 0,
        reactions: {
          love: 0,
          helpful: 0,
          fire: 0,
        },
        updatedAt: new Date(),
        author: 'Quang Nguyen',
        authorId: 'system', // You can update this to a real user ID if needed
      };

      // Remove id field as MongoDB will auto-generate _id
      delete postDocument.id;

      // Insert into MongoDB
      const result = await postsCollection.insertOne(postDocument);
      console.log(`✅ Migrated: ${postData.title} (ID: ${result.insertedId})`);
    }

    console.log(`\n✨ Migration complete! ${blogPosts.length} posts migrated to MongoDB.`);
  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run migration
migratePosts();

