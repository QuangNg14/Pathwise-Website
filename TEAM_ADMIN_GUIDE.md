# 👥 Team Admin Access Guide

## 🎯 Quick Setup for Your Team

### For the Leader (First Person):

**Step 1: Become the First Admin**
1. Go to: `http://localhost:3001/admin/setup`
2. Create your account:
   - Email: your-work-email@example.com
   - Password: (choose a secure password)
   - Name: Your Name
3. Click "Sign Up"
4. ✅ You're now an Admin!

**Step 2: Add Team Members as Admins**
1. Share with your team: "Go to http://localhost:3001 and sign up"
2. After they create accounts, log in as admin
3. Go to: `http://localhost:3001/admin/users`
4. Find each team member's email
5. Click the role dropdown next to their name
6. Change from "User" to "Admin" (or "Editor")
7. ✅ They can now create blog posts!

---

### For Team Members:

**Step 1: Create Your Account**
1. Go to: `http://localhost:3001`
2. Click "Login" button (top-right)
3. Click "Sign Up" tab
4. Create your account with work email
5. Wait for leader to promote you

**Step 2: After Leader Promotes You**
1. Refresh the page
2. Go to: `http://localhost:3001/admin/blog`
3. Click "Create New Post"
4. ✅ Start writing!

---

## 📋 User Roles Explained

| Role | Create Posts | Edit Own Posts | Edit Others' Posts | Manage Users | Delete Posts |
|------|-------------|----------------|-------------------|--------------|--------------|
| **Admin** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Editor** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **User** | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No |

---

## 🔐 Best Practices

### For Leader:
- ✅ Make yourself Admin first
- ✅ Promote trusted team members to Admin
- ✅ Use Editor role for content creators who shouldn't manage users
- ✅ Keep User role for readers/commenters (future feature)

### For Team:
- ✅ Use your work email for easy identification
- ✅ Choose secure passwords
- ✅ Ask leader if you don't have access after 24 hours

---

## 🎨 How to Create a Blog Post

**Once you're an Admin/Editor:**

1. **Go to Admin Dashboard:**
   - URL: `http://localhost:3001/admin/blog`

2. **Click "Create New Post"**

3. **Fill in the form:**
   - **Title**: Your blog post title
   - **Content**: Write using Markdown (see formatting guide below)
   - **Excerpt**: Short summary (2-3 sentences)
   - **Category**: Choose Resources, Job Applications, or Careers
   - **Add Photo**: Upload a cover image
   - **Featured Post**: Check this for important posts ⭐

4. **Preview Your Post:**
   - Click "Preview Post" to see how it looks

5. **Publish:**
   - Change status to "Published"
   - Click "Save Post"
   - ✅ Live immediately!

---

## ✍️ Quick Markdown Guide

```markdown
# Big Heading
## Medium Heading
### Small Heading

**Bold text**
*Italic text*

- Bullet point
- Another bullet

1. Numbered list
2. Second item

> Quote or important note

`code` for technical terms

[Link text](https://url.com)

![Image](image-url.jpg)
```

---

## 🚀 URLs You Need

| Page | URL | Who Can Access |
|------|-----|----------------|
| **Blog Home** | `http://localhost:3001` | Everyone |
| **Admin Setup** | `http://localhost:3001/admin/setup` | First person only |
| **Create Posts** | `http://localhost:3001/admin/blog` | Admin & Editor |
| **Manage Users** | `http://localhost:3001/admin/users` | Admin only |

---

## 🐛 Troubleshooting

### "I can't access /admin/blog"
- ✅ Check: Has leader promoted you to Admin/Editor?
- ✅ Try: Log out and log back in
- ✅ Ask: Leader to check `/admin/users` page

### "I don't see the Login button"
- ✅ Refresh the page
- ✅ Check: Are you on the right URL? (localhost:3001)

### "My post isn't showing on the blog"
- ✅ Check: Did you change status to "Published"?
- ✅ Check: Did you click "Save Post"?
- ✅ Try: Refresh the blog home page

---

## 📞 Need Help?

Ask your team leader or the person who set up the blog!

---

**Happy Blogging! 🎉**

