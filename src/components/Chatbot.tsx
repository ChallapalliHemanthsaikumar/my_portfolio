import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Mail,
  Star,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { marked } from "marked";


interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'contact_form' | 'feedback_form';
}

interface UserInfo {
  name: string;
  email: string;
  company?: string;
  message: string;
}

interface Feedback {
  rating: number;
  feedback: string;
  email?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi! I'm Hemanth's AI assistant. I can help you learn about his work, projects, and experience. I can also help you get in touch or provide feedback about his portfolio. How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [feedback, setFeedback] = useState<Feedback>({
    rating: 5,
    feedback: '',
    email: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = useCallback(async (content: string, isUser: boolean = true) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    if (isUser) {
      setIsTyping(true);
      
      // Simulate typing delay and get AI response
      setTimeout(async () => {
        const response = await getAIResponse(content);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: response,
          isUser: false,
          timestamp: new Date(),
        }]);
        setIsTyping(false);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Check if we're in development mode and have API key in environment
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      if (isDevelopment && process.env.REACT_APP_GEMINI_API_KEY) {
        // Direct Gemini API call for development
        return await callGeminiAPI(userMessage);
      } else {
        // Try to call the Vercel API for production
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Check if the response suggests showing forms
          const lowerMessage = userMessage.toLowerCase();
          const lowerResponse = data.response.toLowerCase();
          
          if ((lowerMessage.includes('contact') || lowerMessage.includes('get in touch') || lowerMessage.includes('email')) &&
              (lowerResponse.includes('contact') || lowerResponse.includes('get in touch'))) {
            setTimeout(() => setShowContactForm(true), 500);
          }
          
          if ((lowerMessage.includes('feedback') || lowerMessage.includes('review') || lowerMessage.includes('opinion')) &&
              (lowerResponse.includes('feedback') || lowerResponse.includes('review'))) {
            setTimeout(() => setShowFeedbackForm(true), 500);
          }
          return data.response;
          // return data.response;
        } else {
          console.warn('API call failed, using offline response');
          return getOfflineResponse(userMessage);
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      return getOfflineResponse(userMessage);
    }
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      
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

Remember to be helpful, professional, and knowledgeable about Hemanth's background and achievements.
`;

      const prompt = `${HEMANTH_KNOWLEDGE_BASE}\n\nUser question: ${userMessage}\n\nPlease provide a helpful and informative response about Hemanth:`;
      
      const ai = new GoogleGenAI({
        apiKey: process.env.REACT_APP_GEMINI_API_KEY!
      });
const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text || "Sorry, I could not generate a response.";
      // const response = await ai.models.generateContent({
      //   model: "gemini-2.5-flash",
      //   contents: prompt,
      //   config: {
      //     thinkingConfig: {
      //       thinkingBudget: 0, // Disable thinking for faster responses
      //     },
      //   }
      // });

      // const aiResponse = response.text || 'Sorry, I could not generate a response.';
      
      // // Check if the response suggests showing forms
  
      
      // return aiResponse;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  };

  const getOfflineResponse = (userMessage: string): string => {
    return "error"
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
      // Maintain focus after sending message
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [inputMessage, sendMessage]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For development, just show success message
      sendMessage(`Thank you ${userInfo.name}! Your message has been sent to Hemanth. He'll get back to you at ${userInfo.email} soon!`, false);
      setShowContactForm(false);
      setUserInfo({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error sending contact form:', error);
      sendMessage("Sorry, there was an issue sending your message. Please try again or contact Hemanth directly at " + personalInfo.email, false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For development, just show success message
      sendMessage(`Thank you for your ${feedback.rating}-star feedback! Your input helps Hemanth improve his portfolio and work.`, false);
      setShowFeedbackForm(false);
      setFeedback({ rating: 5, feedback: '', email: '' });
    } catch (error) {
      console.error('Error sending feedback:', error);
      sendMessage("Thank you for your feedback! Your input is valuable.", false);
      setShowFeedbackForm(false);
      setFeedback({ rating: 5, feedback: '', email: '' });
    }
  };

  const ChatWindow = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 ${
        isMinimized ? 'h-12' : 'h-96'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white p-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <span className="font-medium">Hemanth's AI Assistant</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
  {!message.isUser && <Bot size={16} className="mt-1 flex-shrink-0" />}
  <div
    className="text-sm whitespace-pre-line"
    dangerouslySetInnerHTML={{ __html: marked.parse(message.content) as string }}
  />
  {message.isUser && <User size={16} className="mt-1 flex-shrink-0" />}
</div>
                  {/* <div className="flex items-start gap-2">
                    {!message.isUser && <Bot size={16} className="mt-1 flex-shrink-0" />}
                    <div className="text-sm whitespace-pre-line">{marked.parse(message.content)}</div>
                    {message.isUser && <User size={16} className="mt-1 flex-shrink-0" />} */}
                  </div>
                {/* </div> */}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot size={16} />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about Hemanth..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  ), [messages, isTyping, inputMessage, isMinimized, handleSubmit]);

  const ContactForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowContactForm(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Mail size={20} />
            Contact Hemanth
          </h3>
          <button
            onClick={() => setShowContactForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={userInfo.name}
              onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={userInfo.email}
              onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              value={userInfo.company}
              onChange={(e) => setUserInfo(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              required
              rows={4}
              value={userInfo.message}
              onChange={(e) => setUserInfo(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </motion.div>
  );

  const FeedbackForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowFeedbackForm(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Star size={20} />
            Portfolio Feedback
          </h3>
          <button
            onClick={() => setShowFeedbackForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className={`p-1 ${
                    star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback *
            </label>
            <textarea
              required
              rows={4}
              value={feedback.feedback}
              onChange={(e) => setFeedback(prev => ({ ...prev, feedback: e.target.value }))}
              placeholder="What did you think about the portfolio? Any suggestions?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
              placeholder="For follow-up if needed"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && ChatWindow}
      </AnimatePresence>

      {/* Forms */}
      <AnimatePresence>
        {showContactForm && <ContactForm />}
        {showFeedbackForm && <FeedbackForm />}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;