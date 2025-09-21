import { generateChatResponse } from './chatService';

// Mock API service for development - will be replaced with Vercel serverless functions
export class ApiService {
  private static baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-portfolio-domain.vercel.app' 
    : 'http://localhost:3000';

  static async sendChatMessage(message: string, context: string = 'portfolio_chat'): Promise<string> {
    try {
      // In production, this will call Vercel serverless function
      if (process.env.NODE_ENV === 'production') {
        const response = await fetch(`${this.baseUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, context }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
      } else {
        // For development, use local service
        return await generateChatResponse(message);
      }
    } catch (error) {
      console.error('Error in chat API:', error);
      throw error;
    }
  }

  static async sendContactForm(contactData: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending contact form:', error);
      return false;
    }
  }

  static async sendFeedback(feedbackData: {
    rating: number;
    feedback: string;
    email?: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending feedback:', error);
      return false;
    }
  }
}