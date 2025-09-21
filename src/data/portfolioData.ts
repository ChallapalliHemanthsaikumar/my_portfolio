export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'AI/ML' | 'Full Stack' | 'Data Science' | 'Cloud' | 'Other';
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  thumbnail: string;
  publishedAt: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'certification' | 'publication' | 'award' | 'contribution';
  url?: string;
  organization?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  introVideoUrl?: string;
  summary: string;
  githubUsername: string;
  linkedinUrl: string;
  youtubeChannelUrl: string;
  resumeUrl?: string;
}

// Configuration data - easily editable
export const personalInfo: PersonalInfo = {
  name: "Hemanth sai kumar Challapalli",
  title: "AI Engineer & Data Scientist",
  location: "Redmond, WA",
  email: "challapallihemanthsaikumar@gmail.com",
  phone: "856-656-8253",
  introVideoUrl: "/videos/Intro_Video_Generation_For_Hemanth.mp4", // Your intro video
  summary: "Innovative AI/NLP Engineer and Data Scientist with extensive hands-on experience in designing, optimizing, and deploying cutting-edge generative AI and machine learning solutions.",
  githubUsername: "ChallapalliHemanthsaikumar",
  linkedinUrl: "https://www.linkedin.com/in/challapalli-hemanth-sai-kumar-7595931b0/",
  youtubeChannelUrl: "https://www.youtube.com/@hemanthchowdary8184",
  resumeUrl: "https://drive.google.com/file/d/1WvCFcCc4A7CbU_eLu84gEGe0boob2gw8/view?usp=sharing"
};

export const skills = {
  "Programming Languages": [
    "Python (with Numba JIT)",
    "TypeScript",
    "Rust",
    "SQL"
  ],
  "AI/ML Frameworks": [
    "PyTorch (TorchScript, TorchServe)",
    "JAX",
    "Hugging Face Transformers",
    "LangChain",
    "LangGraph"
  ],
  "Cloud & MLOps": [
    "Azure ML",
    "AWS",
    "Docker",
    "Kubernetes",
    "Apache Airflow",
    "MLflow"
  ],
  "Frontend": [
    "React",
    "Angular",
    "Next.js",
    "Vite"
  ],
  "Backend": [
    "FastAPI",
    "Node.js",
    "gRPC"
  ],
  "Databases": [
    "PostgreSQL",
    "MongoDB",
    "Vector Databases (Pinecone, AI Search)"
  ]
};

export const certifications: Achievement[] = [
  {
    id: "azure-ai",
    title: "Azure AI Engineer Associate",
    description: "Microsoft Azure AI Engineer certification",
    date: "2024",
    type: "certification",
    organization: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/ChallapalliHemanthsaikumar-2058/D85F22BD18EF47B7?sharingId=D7EC6CEBF4C8F5BC"
  },
  {
    id: "azure-data",
    title: "Azure Data Scientist Associate",
    description: "Microsoft Azure Data Scientist certification",
    date: "2024",
    type: "certification",
    organization: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/ChallapalliHemanthsaikumar-2058/D7F25A8DC02E7E0A?sharingId=D7EC6CEBF4C8F5BC"
  },
  {
    id: "azure-dev",
    title: "Azure Developer Associate",
    description: "Microsoft Azure Developer certification",
    date: "2024",
    type: "certification",
    organization: "Microsoft",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/ChallapalliHemanthsaikumar-2058/A7CDD54CCDF88ABA?sharingId=D7EC6CEBF4C8F5BC"
  },
  {
    id: "aws-sa",
    title: "AWS Certified Solutions Architect – Associate",
    description: "Amazon Web Services Solutions Architect certification",
    date: "2024",
    type: "certification",
    organization: "AWS",
    url: "https://www.credly.com/badges/95c00c86-0bdb-42fe-ae3e-5a0f25e4e1b4/linked_in_profile"
  },
  {
    id: "deep-learning",
    title: "Deep Learning Specialization",
    description: "Comprehensive deep learning course specialization",
    date: "2023",
    type: "certification",
    organization: "Coursera"
  }
];

// Projects - Update these with your actual projects
export const projects: Project[] = [
  {
    id: "ai-voice-agent",
    title: "Voice-Enabled AI Agent",
    description: "Advanced voice-enabled AI agent with real-time speech processing and natural language understanding capabilities.",
    techStack: ["Python", "Speech Recognition", "Natural Language Processing", "AI/ML"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/voice_agent",
    featured: true,
    category: "AI/ML"
  },
  {
    id: "microsoft-auth-bedrock",
    title: "Microsoft OAuth with AWS Bedrock",
    description: "Implementation of Microsoft OAuth authentication integrated with AWS Bedrock for secure AI agent development and deployment.",
    techStack: ["Python", "OAuth", "AWS Bedrock", "Microsoft Authentication", "Cloud Security"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/microsoft-auth-implementation-in-agentcore",
    featured: true,
    category: "Cloud"
  },
  {
    id: "multimodal-llm",
    title: "Multi-Modal Generative LLM",
    description: "Architected a cross-modal generative framework for bidirectional synthesis of text and images using Diffusion Probabilistic Models with U-Net Architecture and CLIP Embeddings. Implemented DDPM-based pipeline with attention-enhanced U-Net and linear beta scheduling.",
    techStack: ["Python", "PyTorch", "Hugging Face", "CLIP", "Diffusion Models", "U-Net", "Scikit-learn"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/multimodal-llm",
    featured: true,
    category: "AI/ML"
  },
  {
    id: "job-tracker-extension",
    title: "Job Application Tracker Chrome Extension",
    description: "Published Chrome Extension for tracking job applications with optimized performance and TypeScript implementation. Features local storage, application status tracking, and user-friendly interface with 15% reduction in memory usage.",
    techStack: ["TypeScript", "Chrome Extension API", "Vite", "Local Storage", "HTML/CSS"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/job_application_tracker",
    liveUrl: "https://chromewebstore.google.com/detail/job-application-tracker/pmebegkjgfjjkphgdchhlafbhdagjhnb",
    featured: true,
    category: "Full Stack"
  },
  {
    id: "Strands_SQL_RAG_with_AgentCore",
    title: "Strands_SQL_RAG_with_AgentCore",
    description: "This project using strands framework and latest aws agentcore  to build sql rag in redhsift ",
    techStack: ["Python", "AWS Lambda", "OAuth", "GitHub API", "LLM Integration", "RBAC"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/Strands_SQL_RAG_with_AgentCore",
    featured: false,
    category: "Cloud"
  },
  {
    id: "llm-fine-tuning",
    title: "Meta Llama 2 Fine-tuning Pipeline",
    description: "Fine-tuned LLMs (Meta Llama 2) on Azure ML using LoRA, QLoRA, Flash Attention, and INT8 quantization for financial text summarization and sentiment analysis.",
    techStack: ["Python", "Meta Llama 3", "Azure ML", "LoRA", "QLoRA", "PyTorch", "Hugging Face"],
    githubUrl: "https://github.com/ChallapalliHemanthsaikumar/llama-lora-personal-finetune",
    liveUrl: "https://huggingface.co/Hemanthchallapalli/lora-llama2-about-me",
    featured: false,
    category: "AI/ML"
  }
];

// YouTube videos - Update these with your actual videos
export const youtubeVideos: YouTubeVideo[] = [
  {
    id: "oauth-bedrock-tutorial",
    title: "Microsoft OAuth authentication with AWS Bedrock AgentCore",
    description: "Complete tutorial on implementing Microsoft OAuth authentication with AWS Bedrock AgentCore for secure AI agent development",
    videoId: "LEiOtsYEpWk",
    thumbnail: "https://img.youtube.com/vi/LEiOtsYEpWk/maxresdefault.jpg",
    publishedAt: "2024-12-01",
    category: "Authentication & AI"
  }
  // Add more videos here
];

export const achievements: Achievement[] = [
  {
    id: "chrome-store",
    title: "Published Chrome Extension in Chrome Store",
    description: "Job Application Tracker extension with 1000+ downloads",
    date: "2024",
    type: "publication",
    url: "https://chromewebstore.google.com/detail/job-application-tracker/pmebegkjgfjjkphgdchhlafbhdagjhnb"
  }
  // Add more achievements here
];