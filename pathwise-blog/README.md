# Pathwise Blog

A modern, standalone blog website built with Next.js featuring smooth animations, gradient backgrounds, and support for both markdown posts and Facebook post redirects.

## 🚀 Features

- **Standalone Blog Platform**: Completely separate from the main Pathwise website
- **Beautiful UI**: Animated gradient background with smooth transitions
- **Dual Content Types**: 
  - Markdown blog posts with full formatting support
  - Facebook post redirects for external content
- **Responsive Design**: Works perfectly on all devices
- **Modern Stack**: Built with Next.js 15, React 18, and Ant Design
- **SEO Optimized**: Clean URLs and meta tags
- **Fast Performance**: Optimized for speed with Next.js

## 📁 Project Structure

```
pathwise-blog/
├── src/
│   ├── app/
│   │   ├── api/blog/[id]/      # API routes for markdown content
│   │   ├── blog/[id]/          # Individual blog post pages
│   │   ├── globals.css         # Global styles with animations
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Homepage (blog listing)
│   ├── components/
│   │   ├── BlogListing/        # Blog listing component
│   │   ├── BlogPost/           # Individual post component
│   │   ├── Header/             # Header component
│   │   └── Footer/             # Footer component
│   └── content/
│       └── blogs/              # Markdown blog posts
│           ├── aitools/
│           ├── getinternship/
│           ├── response/
│           ├── resume/
│           └── techlayoff/
├── public/
│   └── images/                 # Blog images
├── package.json
├── next.config.mjs
└── README.md
```

## 🛠️ Installation

1. **Navigate to the blog directory:**
   ```bash
   cd pathwise-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3001`

## 📝 Adding New Blog Posts

### Option 1: Markdown Post

1. Create a new folder in `src/content/blogs/` with your post ID:
   ```
   src/content/blogs/your-post-id/
   ```

2. Add an `index.md` file with your content:
   ```markdown
   <img src="/images/your-image.jpg" alt="Title" width="100%" height="auto">

   # Your Blog Post Title

   Your content here...
   ```

3. Add the post to `src/app/page.js`:
   ```javascript
   {
     id: "your-post-id",
     title: "Your Post Title",
     date: "DD Tháng MM, YYYY",
     excerpt: "Short description",
     image: "/images/your-image.jpg",
     type: "markdown",
   }
   ```

### Option 2: Facebook Post Redirect

Simply add to `src/app/page.js`:
```javascript
{
  id: "facebook-post-1",
  title: "Your Facebook Post Title",
  date: "DD Tháng MM, YYYY",
  excerpt: "Description",
  image: "/images/your-image.jpg",
  type: "facebook",
  facebookLink: "https://www.facebook.com/yourpage/posts/123456789",
}
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Set up custom domain:**
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add `blog.pathwise.com`
   - Follow DNS configuration instructions

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repository

3. **Set up custom domain:**
   - Go to "Domain settings"
   - Add `blog.pathwise.com`

### Option 3: Manual Hosting

1. **Build:**
   ```bash
   npm run build
   npm run start
   ```

2. **Use a process manager:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "pathwise-blog" -- start
   ```

## 🌐 Domain Setup

### Using Subdomain (blog.pathwise.com)

1. **In your DNS provider (e.g., Cloudflare, GoDaddy):**
   - Add CNAME record:
     - Name: `blog`
     - Value: Your hosting URL (e.g., `your-app.vercel.app`)

2. **In your hosting platform:**
   - Add custom domain `blog.pathwise.com`
   - SSL will be automatically configured

### Switching to Different Domain Later

To change from `blog.pathwise.com` to `blogblogblog.com`:

1. Purchase new domain
2. In hosting platform, add new domain
3. Update DNS for new domain
4. Set up redirect from old domain (optional)

No code changes needed! ✨

## 🎨 Customization

### Change Colors

Edit `src/app/globals.css`:
```css
body {
  background: linear-gradient(-45deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  /* Change these colors to your preference */
}
```

### Modify Animations

Adjust animation duration in components or `globals.css`:
```css
@keyframes gradientFlow {
  /* Modify animation here */
}
```

### Update Header Links

Edit `src/components/Header/Header.js` to change navigation items.

## 📊 Analytics (Optional)

To add Google Analytics:

1. Install package:
   ```bash
   npm install @next/third-parties
   ```

2. Add to `src/app/layout.js`:
   ```javascript
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   // In component:
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

## 🔧 Environment Variables

Create `.env.local` if needed:
```
NEXT_PUBLIC_SITE_URL=https://blog.pathwise.com
```

## 🐛 Troubleshooting

**Images not loading:**
- Ensure images are in `public/images/`
- Use paths like `/images/your-image.jpg`

**Build errors:**
- Run `npm install` again
- Delete `.next` folder and rebuild

**Port already in use:**
- Change port in `package.json`: `"dev": "next dev -p 3002"`

## 📦 Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 Updating from Main Site

This blog is now completely independent. To update the main Pathwise site:

1. Remove blog routes from main site
2. Update navigation to link to new blog URL
3. Keep main site and blog separate

## 📝 License

Copyright © 2024 Pathwise. All rights reserved.

## 🤝 Contributing

This is a private project for Pathwise.

## 📞 Support

For issues or questions, contact the Pathwise team.

---

**Happy Blogging! 🎉**



