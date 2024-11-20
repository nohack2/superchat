import { useState } from "react";
import LeftNav from "./LeftNav";
import ChatArea from "./ChatArea";

export interface ChatMessage {
  type: "user" | "system" | "chart";
  text?: string;
  data?: string;
}

export default function Chat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserQuery = async (query: string) => {
    setChatHistory((prev) => [...prev, { type: "user", text: query }]);
    setLoading(true);

    try {
      const response = await fetch("/api/handler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        { type: "system", text: "Here is the stock chart:" },
        { type: "chart", data: data.chartEmbed },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: "system", text: "Something went wrong, please try again." },
      ]);
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
          <ChatArea chatHistory={chatHistory} handleUserQuery={handleUserQuery} loading={loading} />
        </div>
      </div>
    </div>
  );
}
