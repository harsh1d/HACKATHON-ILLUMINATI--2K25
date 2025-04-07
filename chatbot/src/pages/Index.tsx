
import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { LoadingDots } from "@/components/LoadingDots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  isBot: boolean;
  content: string;
  sections?: string[];
  jailTime?: string;
}

const genAI = new GoogleGenerativeAI("AIzaSyBDoK5X63ctEnL7B3m2ifrXfmIrU3XM6rw");

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      isBot: true,
      content: "Hello, I'm your legal assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processResponse = (response: string) => {
    const sections: string[] = [];
    let jailTime = "";

    // Look for IPC sections in the response
    const sectionMatches = response.match(/Section \d+[A-Z]?/g);
    if (sectionMatches) {
      sections.push(...sectionMatches);
    }

    // Look for punishment/jail time information
    const jailTimeMatch = response.match(/(?:punishment|imprisonment)[\s\S]*?(?:\.|$)/i);
    if (jailTimeMatch) {
      jailTime = jailTimeMatch[0];
    }

    return {
      content: response,
      sections: sections.length > 0 ? sections : undefined,
      jailTime: jailTime || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { isBot: false, content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are an expert in Indian law, specifically the Indian Penal Code (IPC). 
        Please analyze this query and provide relevant IPC sections, punishments, and explanations: ${userMessage}, remove any * from message and create a new linefor every *
        Format your response to include:
        1. Relevant IPC sections
        2. Associated punishments/penalties
        3. Brief explanation`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const processedResponse = processResponse(response.text());

      setMessages((prev) => [...prev, { isBot: true, ...processedResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          isBot: true,
          content: "I apologize, but I'm unable to process your request at the moment. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm min-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-black" />
            <h1 className="text-2xl font-bold text-black">Legal Assistant</h1>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {isLoading && <LoadingDots />}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query here..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-legal-accent hover:bg-legal-accent/90"
            >
              Enter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
