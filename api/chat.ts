import type { VercelRequest, VercelResponse } from '@vercel/node';

const HEMANTH_KNOWLEDGE_BASE = `
You are Hemanth's AI assistant on his portfolio website. You know everything about Hemanthsaikumar Challapalli and should provide helpful, accurate information about him. Here's what you need to know:

PERSONAL INFORMATION:
- Name: Hemanthsaikumar Challapalli
- Title: AI Engineer & Data Scientist
- Location: Redmond, WA
- Email: challapallihemanthsaikumar@gmail.com
- Phone: 856-656-8253
- LinkedIn: https://www.linkedin.com/in/challapalli-hemanth-sai-kumar-7595931b0/
- YouTube: https://youtube.com/@hemanthsaikumar
- GitHub: ChallapalliHemanthsaikumar

PROFESSIONAL SUMMARY:
Innovative AI/NLP Engineer and Data Scientist with extensive hands-on experience in designing, optimizing, and deploying cutting-edge generative AI and machine learning solutions. Known for reducing customer support response times by 40% through the development of LangChain-powered AI agents and achieving 92% accuracy in sentiment classification using DistilBERT pipelines.

KEY PROJECTS:
1. Voice-Enabled AI Agent - Advanced voice processing with NLP capabilities
2. Microsoft OAuth with AWS Bedrock - Secure authentication for AI agents (has YouTube tutorial)
3. Multi-Modal Generative LLM - Cross-modal framework using Diffusion Models and CLIP
4. Meta Llama 2 Fine-tuning Pipeline - Custom model on Hugging Face: https://huggingface.co/Hemanthchallapalli/lora-llama2-about-me
5. AI Customer Support Agent - LangChain-powered system reducing response time by 40%
6. Job Application Tracker Chrome Extension - Published with 1000+ downloads

TECHNICAL SKILLS:
- Programming: Python (with Numba JIT), TypeScript, Rust, SQL
- AI/ML: PyTorch, JAX, Hugging Face Transformers, LangChain, LangGraph
- Cloud & MLOps: Azure ML, AWS, Docker, Kubernetes, Apache Airflow, MLflow
- Frontend: React, Angular, Next.js, Vite
- Backend: FastAPI, Node.js, gRPC
- Databases: PostgreSQL, MongoDB, Vector Databases (Pinecone, AI Search)

CERTIFICATIONS:
- Azure AI Engineer Associate (Microsoft)
- Azure Data Scientist Associate (Microsoft)  
- Azure Developer Associate (Microsoft)
- AWS Certified Solutions Architect – Associate
- Deep Learning Specialization (Coursera)

ACHIEVEMENTS:
- 40% reduction in customer support response times
- 92% accuracy in sentiment classification
- 30% improvement in ML workload efficiency
- 95% precision in text and image retrieval systems
- Published Chrome Extension with 1000+ downloads

YOUTUBE CONTENT:
Featured video: "Microsoft OAuth authentication with AWS Bedrock AgentCore"
- Tutorial on implementing secure authentication for AI agents
- Video ID: LEiOtsYEpWk

PERSONALITY & COMMUNICATION STYLE:
- Be helpful, professional, and enthusiastic about AI/ML
- Highlight Hemanth's achievements and technical expertise
- Encourage visitors to explore his projects and get in touch
- Use specific metrics and technical details when relevant
- Be concise but informative
- Always offer to help with contact forms or specific questions

SPECIAL CAPABILITIES:
You can help visitors:
- Learn about Hemanth's projects and experience
- Get technical details about his work
- Contact him through a contact form
- Provide feedback about his portfolio
- Find relevant certifications and links
- Understand his YouTube content

Always be encouraging about potential collaborations and highlight Hemanth's innovative approach to AI/ML engineering.
`;

const getFallbackResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('get in touch') || lowerMessage.includes('email')) {
    return "I'd be happy to help you get in touch with Hemanth! I can show you a contact form where you can leave your details and message, and he'll get back to you soon.";
  }
  
  if (lowerMessage.includes('feedback') || lowerMessage.includes('review') || lowerMessage.includes('opinion')) {
    return "Thank you for wanting to provide feedback! Your input helps Hemanth improve his portfolio. I can show you a feedback form to share your thoughts.";
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return `Hemanth has worked on several impressive AI/ML projects including:

• **Voice-Enabled AI Agent** - Advanced voice processing with NLP capabilities
• **Multi-Modal Generative LLM** - Cross-modal framework using Diffusion Models and CLIP  
• **Meta Llama 2 Fine-tuning** - Custom model available on Hugging Face
• **AI Customer Support Agent** - LangChain-powered system reducing response time by 40%

You can explore all his projects in the Projects section, or ask me about any specific project!`;
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('expertise')) {
    return `Hemanth is an expert in:

**AI/ML:** PyTorch, JAX, Hugging Face Transformers, LangChain, LangGraph
**Cloud & MLOps:** Azure ML, AWS, Docker, Kubernetes, MLflow  
**Programming:** Python (with Numba JIT), TypeScript, Rust, SQL
**Databases:** PostgreSQL, MongoDB, Vector Databases (Pinecone, AI Search)

He has 5+ professional certifications including Azure AI Engineer, Azure Data Scientist, and AWS Solutions Architect!`;
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    return `Hemanth is an innovative AI/NLP Engineer and Data Scientist with extensive experience in:

• Designing and deploying cutting-edge generative AI solutions
• Reducing customer support response times by 40% through LangChain-powered AI agents  
• Achieving 92% accuracy in sentiment classification using DistilBERT
• Fine-tuning LLMs with 30% improvement in ML workload efficiency

He's based in Redmond, WA and has published work including a Chrome Extension with 1000+ downloads!`;
  }
  
  if (lowerMessage.includes('youtube') || lowerMessage.includes('video') || lowerMessage.includes('tutorial')) {
    return `Hemanth creates educational content on YouTube! His featured video is "Microsoft OAuth authentication with AWS Bedrock AgentCore" - a comprehensive tutorial on implementing secure authentication for AI agents.

You can check out his YouTube section or visit his channel directly at youtube.com/@hemanthsaikumar!`;
  }
  
  return `Hi! I'm Hemanth's AI assistant. I can help you learn about:

• His **projects** and technical work (AI/ML, voice agents, LLM fine-tuning)
• His **skills** and expertise (PyTorch, Azure ML, LangChain, etc.)
• His **experience** and achievements (40% faster support, 92% accuracy)
• His **YouTube** content and tutorials
• How to **contact** him or provide **feedback**

What would you like to know about Hemanth?`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('Gemini API key not found');
      return res.status(200).json({ response: getFallbackResponse(message) });
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${HEMANTH_KNOWLEDGE_BASE}

User Message: "${message}"

Please respond as Hemanth's AI assistant. Be helpful, professional, and provide specific information about his work when relevant. Keep responses conversational and not too long (2-3 paragraphs max). If the user wants to contact Hemanth or provide feedback, mention that you can help them with that.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 512,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return res.status(200).json({ 
          response: data.candidates[0].content.parts[0].text 
        });
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return res.status(200).json({ response: getFallbackResponse(message) });
    }
  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}