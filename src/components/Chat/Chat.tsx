import { useState } from "react";
import LeftNav from "./LeftNav";
import ChatArea from "./ChatArea";

export interface ChatMessage {
  role: 'user' | 'system'
  text?: string;
  data?: string;
  componentType?: ComponentType
}

export interface ComponentType {
  provider: 'internal' | 'tradingview'
}

export interface ChatContext {
  chatHistory:  ChatMessage[]
}

export default function Chat() {
  const [chatContext, setChatContext] = useState<ChatContext>({
    chatHistory: [],
  });
  // const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserQuery = async (query: string) => {
    // setChatHistory((prev) => [...prev, { role: "user", text: query }]);
    // setChatContext((prev) => {
    //   const chatHistory =  [...prev.chatHistory, { role: "user", text: query }];
    //   // return {
    //   //   componentType: prev.componentType,
    //   //   chatHistory
    //   // };
    //   return prev;
    // });
    setChatContext((prev) => ({
      chatHistory: [...prev.chatHistory, { role: "user", text: query }],
    }));  
    setLoading(true);

    try {
      // const response = await fetch("/api/handler", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query }),
      // });

      // const data = await response.json();
      let newMessage: ChatMessage = { 
        role: "system", 
        text: "", 
        componentType: {
          provider: 'tradingview'
        }
      };
      setChatContext((prev) => ({
        chatHistory: [...prev.chatHistory, newMessage],
      }));
    } catch (error) {
      setChatContext((prev) => ({
        chatHistory: [...prev.chatHistory, { role: "system", text: "Some issue in our system" }],
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
            {/* LeftNav Sidebar */}
      <div className="w-1/6 text-black bg-gray-100">
        <LeftNav />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Chat Area Content */}
          <ChatArea chatContext={chatContext} handleUserQuery={handleUserQuery} loading={loading} />
        </div>
      </div>
    </div>
  );
}
