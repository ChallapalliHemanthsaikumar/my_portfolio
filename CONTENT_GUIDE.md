# Portfolio Content Management

This portfolio is designed for easy content updates without touching the code. All content is managed through the `src/data/portfolioData.ts` file.

## Quick Update Guide

### 1. Personal Information
Update your basic information in the `personalInfo` object:
- Name, title, location, contact details
- Intro video URL (when ready)
- Summary/bio
- Social media links

### 2. Adding Projects
Add new projects to the `projects` array:
```typescript
{
  id: "unique-project-id",
  title: "Project Name",
  description: "Detailed description of your project",
  techStack: ["Technology", "Stack", "Used"],
  githubUrl: "https://github.com/username/repo",
  liveUrl: "https://your-live-demo.com",
  featured: true, // Set to true for featured projects
  category: "AI/ML" // Choose from available categories
}
```

### 3. YouTube Videos
Add videos to the `youtubeVideos` array:
```typescript
{
  id: "video-id",
  title: "Video Title",
  description: "Video description",
  videoId: "YOUTUBE_VIDEO_ID", // From YouTube URL
  thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  publishedAt: "2024-01-15",
  category: "Tutorial Category"
}
```

### 4. Skills & Certifications
- Update skills in the `skills` object by category
- Add certifications to the `certifications` array

### 5. GitHub Integration
The GitHub section automatically fetches your repositories using the `githubUsername` from `personalInfo`.

## Adding Your Video Introduction

1. Record a 1-2 minute introduction video
2. Upload to your preferred hosting (YouTube, Vimeo, or direct hosting)
3. Update the `introVideoUrl` in `personalInfo`

## Customizing Colors and Styling

The portfolio uses a consistent color scheme defined in:
- `tailwind.config.js` - Main color palette
- `src/index.css` - CSS custom properties and component styles

### Primary Colors:
- Primary: Blue shades (#0ea5e9, #0284c7, #0369a1)
- Secondary: Gray shades for text and backgrounds

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push your code to GitHub
2. Connect GitHub to Netlify
3. Deploy with build command: `npm run build`

### Option 2: Vercel
1. Push code to GitHub
2. Connect to Vercel
3. Auto-deploy on commits

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d build"`
3. Run: `npm run build && npm run deploy`

## Local Development

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Content Update Checklist

When updating content:
- [ ] Update personal information
- [ ] Add new projects with proper categories
- [ ] Update skills and certifications
- [ ] Add YouTube videos (if any)
- [ ] Test locally with `npm start`
- [ ] Commit and push changes
- [ ] Verify deployment

## Tips for Best Results

1. **Images**: Use high-quality images for projects (recommended: 800x600px)
2. **Videos**: Keep intro video under 2 minutes
3. **Descriptions**: Be concise but informative
4. **Categories**: Use consistent categorization for projects
5. **Links**: Always test external links

## Getting Help

If you need to modify the design or add new features:
1. The code is well-documented with TypeScript
2. Each component is in `src/components/`
3. Styling uses Tailwind CSS classes
4. Animations use Framer Motion

## Performance Tips

- Optimize images before adding them
- Keep video files reasonably sized
- Test on mobile devices
- Use the React DevTools for debugging