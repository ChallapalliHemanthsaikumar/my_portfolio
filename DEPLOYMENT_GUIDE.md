# Portfolio Chatbot Deployment Guide

## 🚀 Deployment to Vercel with Gemini AI

### Prerequisites
1. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your portfolio to GitHub

### Step 1: Setup Environment Variables

#### Local Development
1. Copy `.env.example` to `.env.local`
2. Add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

#### Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `GEMINI_API_KEY`: Your actual Gemini API key
   - `NODE_ENV`: `production`

### Step 2: Deploy to Vercel

#### Option A: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy when you push changes

#### Option B: Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure Domain (Optional)
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update `REACT_APP_PORTFOLIO_DOMAIN` environment variable

### Step 4: Test Deployment
1. Visit your deployed portfolio
2. Click the chatbot icon in bottom-right corner
3. Test the chatbot with questions like:
   - "Tell me about Hemanth's projects"
   - "What are his skills?"
   - "I want to contact him"
   - "I'd like to provide feedback"

## 🤖 Chatbot Features

### Smart Responses
- **Projects**: Detailed information about your AI/ML projects
- **Skills**: Technical expertise and certifications  
- **Experience**: Professional achievements and metrics
- **YouTube**: Information about your tutorial content
- **Contact**: Interactive contact form
- **Feedback**: Star rating and feedback collection

### Fallback System
- Works without API key (uses smart fallback responses)
- Graceful error handling
- Always provides helpful information

### UI Features
- **Floating Chat Widget**: Fixed position, doesn't interfere with content
- **Minimizable**: Users can minimize/maximize the chat window
- **Responsive**: Works on desktop and mobile
- **Animated**: Smooth transitions and typing indicators
- **Modal Forms**: Contact and feedback forms overlay

## 🔧 Customization

### Adding New Responses
Edit `api/chat.ts` and update the `HEMANTH_KNOWLEDGE_BASE` constant with new information.

### Styling
The chatbot uses your existing Tailwind CSS classes and color scheme (primary-600, etc.).

### API Integration
The chatbot is ready for email services like SendGrid. Uncomment the email code in `api/contact.ts` and `api/feedback.ts`.

## 🛠️ Development

### Local Testing
```bash
# Start development server
npm start

# The chatbot will use fallback responses locally
# To test with real Gemini API, add your API key to .env.local
```

### API Testing
```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Hemanth"}'

# Test contact endpoint  
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "message": "Hello"}'
```

## 📦 Files Structure

```
portfolio/
├── api/                    # Vercel serverless functions
│   ├── chat.ts            # Gemini AI chat endpoint
│   ├── contact.ts         # Contact form handler
│   └── feedback.ts        # Feedback handler
├── src/
│   ├── components/
│   │   └── Chatbot.tsx    # Main chatbot component
│   ├── api/
│   │   ├── chatService.ts # Chat service logic
│   │   └── apiService.ts  # API wrapper
│   └── App.tsx            # Updated with chatbot
├── .env.example           # Environment template
├── .env.local            # Local environment (git-ignored)
└── vercel.json           # Vercel deployment config
```

## 🚨 Security Notes

1. **Never commit API keys** to git
2. **Use environment variables** for all sensitive data
3. **Enable CORS** properly for production domain
4. **Rate limiting** - Consider adding rate limiting for production

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test API endpoints individually
4. Check browser console for errors

The chatbot is designed to be robust and will work even if the Gemini API is unavailable, providing intelligent fallback responses about your portfolio.