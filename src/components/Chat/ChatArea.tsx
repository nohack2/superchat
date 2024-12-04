import MessageInput from "./MessageInput";
import { ChatContext, ChatMessage, ComponentType } from "./Chat";
import Suggestion, { SuggestionProps } from "./Suggestion";
import { StockChart } from "../tradingview/stock-chart";
import { useEffect, useRef, useState } from "react";

interface ChatAreaProps {
  chatContext: ChatContext;
  handleUserQuery: (query: string) => void;
  handleSuggestionClick: any;
  loading: boolean;
}

function renderComponent(chatMessage: ChatMessage) {
  const role = chatMessage.role;
  if (role === 'user') {
    return (
      <div className="">
        <div className="">
          <div className={`p-2 rounded text-white inline-block bg-[#E0E0E0] dark:bg-gray-500 px-6 py-1`}>
            {chatMessage.text}
          </div>
        </div>
      </div>
    );
  } else if (role === 'system') {
    if (typeof chatMessage.componentType !== 'undefined' &&
      chatMessage.componentType.provider === 'tradingview'
    ) {
      return (
        <div className="">
          <div className="">
            <div className={`p-2 rounded text-black dark:text-white rounded-lg inline-block w-8/12 bg-white dark:bg-gray-700`}>
              <chatMessage.componentType.chart symbol="AAPL"></chatMessage.componentType.chart>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="">
        <div className="">
          <div className={`p-2 rounded text-black dark:text-white rounded-lg inline-block`}>
            {chatMessage.text}
          </div>
        </div>
      </div>
    );
  }
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatContext, handleUserQuery, handleSuggestionClick, loading }) => {
  const chatHistory = chatContext.chatHistory;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const newScrollTop = chatContainer.scrollHeight - chatContainer.clientHeight / 2;
      chatContainer.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  const [inputFilter, setInputFilter] = useState<string>("");

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 p-4"
      >
        {chatContext.chatHistory.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {renderComponent(msg)}
          </div>
        ))}
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>
      <Suggestion handleSuggestionClick={handleSuggestionClick} filter={inputFilter} />
      <MessageInput onSend={handleUserQuery} onInputChange={setInputFilter} />
      <p className="text-sm text-gray-400 p-4">AI answers are not perfect. Verify independently.</p>
    </div>
  );
};

export default ChatArea;
