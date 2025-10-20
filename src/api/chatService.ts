import { personalInfo, projects, certifications, skills } from '../data/portfolioData';

// Knowledge base about Hemanth for the AI chatbot
export const HEMANTH_KNOWLEDGE_BASE = `
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
Innovative AI/NLP Engineer and Data Scientist with extensive hands-on experience in designing, optimizing, and deploying cutting-edge generative AI and machine learning solutions. 

KEY PROJECTS:
1. Voice-Enabled AI Agent - Advanced voice processing with NLP capabilities
2. Microsoft OAuth with AWS Bedrock - Secure authentication for AI agents (has YouTube tutorial)
3. Multi-Modal Generative LLM - Cross-modal framework using Diffusion Models and CLIP
4. Meta Llama 2 Fine-tuning Pipeline - Custom model on Hugging Face: https://huggingface.co/Hemanthchallapalli/lora-llama2-about-me


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

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key not found');
    return "I am not available right now contact hemanth directly via email challapallihemanthsaikumar@gmail.com";
  }


    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      return data
    } catch (error) {
      console.error("Error:", error);
      return "error"
    }
  };

//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-goog-api-key': apiKey,
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `${HEMANTH_KNOWLEDGE_BASE}

// User Message: "${userMessage}"

// Please respond as Hemanth's AI assistant. Be helpful, professional, and provide specific information about his work when relevant. Keep responses conversational and not too long (2-3 paragraphs max). If the user wants to contact Hemanth or provide feedback, mention that you can help them with that.`
//                 }
//               ]
//             }
//           ],
//           generationConfig: {
//             temperature: 0.7,
//             topK: 40,
//             topP: 0.95,
//             maxOutputTokens: 512,
//           },
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     if (data.candidates && data.candidates[0] && data.candidates[0].content) {
//       return data.candidates[0].content.parts[0].text;
//     } else {
//       throw new Error('Invalid response format from Gemini API');
//     }
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     return "I am not available right now contact hemanth directly via email challapallihemanthsaikumar@gmail.com";
//   }
// };
