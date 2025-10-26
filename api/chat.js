

const HEMANTH_KNOWLEDGE_BASE = `
You are Hemanth's AI assistant on his portfolio website. You know everything about Hemanthsaikumar Challapalli and should provide helpful, accurate information about him. Here's what you need to know:

PERSONAL INFORMATION:
- Name: Hemanthsaikumar Challapalli
- Title: AI Engineer & Data Scientist
- Location: Redmond, WA
- Email: challapallihemanthsaikumar@gmail.com
- Phone: 856-656-8253
- LinkedIn: https://www.linkedin.com/in/challapalli-hemanth-sai-kumar-7595931b0/
- YouTube: https://www.youtube.com/@hemanthchowdary8184
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
- Databases: Fabric, Azure SQL, AISearch,pqsql

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
// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ error: "Message is required" });
//   }

//   try {
//     // Combine knowledge base with user message
//     const prompt = `${HEMANTH_KNOWLEDGE_BASE}\n\nUser question: ${message}\n\nPlease provide a helpful and informative response about Hemanth:`;

//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-goog-api-key": process.env.GEMINI_API_KEY || "",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`API call failed: ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Extract the actual text response from Gemini API
//     const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!aiResponse) {
//       throw new Error("No valid response from Gemini API");
//     }

//     // Return the AI response
//     res.status(200).json({ response: aiResponse });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).json({ 
//       error: "Failed to get response from AI",
//       details: error instanceof Error ? error.message : "Unknown error"
//     });
//   }
// }

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in environment" });
  }
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const prompt = `${HEMANTH_KNOWLEDGE_BASE}\n\nUser question: ${message}\n\nPlease provide a helpful and informative response about Hemanth:`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error("No valid response from Gemini API");
    }

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      error: error.message || "Unknown error occurred" 
    });
  }
}