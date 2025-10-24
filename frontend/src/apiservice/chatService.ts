export const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.response || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling chat API:", error);
    return "I am not available right now. Please contact Hemanth directly via email: challapallihemanthsaikumar@gmail.com";
  }
};

