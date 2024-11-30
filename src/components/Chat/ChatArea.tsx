import MessageInput from "./MessageInput";
import { ChatContext, ChatMessage, ComponentType } from "./Chat";
import Suggestion, { SuggestionProps } from "./Suggestion";
import { StockChart } from "../tradingview/stock-chart";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Water from "../../assets/water.jpg";

interface ChatAreaProps {
  chatContext: ChatContext;
  handleUserQuery: (query: string) => void;
  handleSuggestionClick: any;
  loading: boolean;
}

function renderComponent (chatMessage: ChatMessage) {
  const role = chatMessage.role;
  if(role === 'user') {
    return (
      <div className="">
        <div className="">
          <div className={`p-2 rounded text-black rounded-lg inline-block bg-[#e2e8f0] px-5 py-1`}>
            {chatMessage.text}
          </div>
        </div>
      </div>
    )
  }
  else if (role === 'system') {
    if (typeof chatMessage.componentType !== 'undefined' &&
      chatMessage.componentType.provider === 'tradingview'
    ) {
      return (
        <div className="">
          <div className="">
            <div className={`p-2 rounded text-black rounded-lg inline-block w-8/12`}>
            {/* <Image
              src={Water}
              width={500}
              height={500}
              alt="Picture of the author"
            /> */}

              <chatMessage.componentType.chart symbol="AAPL"></chatMessage.componentType.chart>
            </div>
          </div>
        </div>
      );
    }
    return (
    <div className="">
      <div className="w-3/4 text-justify">
        <div className={`p-2 rounded text-black rounded-lg inline-block`}>
          {chatMessage.text}
        </div>
      </div>
    </div>
    );
  }
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatContext, handleUserQuery, handleSuggestionClick, loading }) => {
  const chatHistory = chatContext.chatHistory;
  // Ref for the last message
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // Auto-scroll effect
  useEffect(() => {
    // if (lastMessageRef.current) {
    //   lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    // }
    const chatContainer = chatContainerRef.current;
    console.log(chatContainer);
    if (chatContainer) {
      // Calculate scroll position to keep the last message in the middle
      const newScrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight / 2;
      console.log(newScrollTop);

      // Smoothly scroll to the calculated position
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
      ref={chatContainerRef} // Assign ref to last message
      className="flex-1 overflow-y-auto bg-white p-4">
        {chatContext.chatHistory.map((msg, index) => (
          <div key={index}
           className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {
              renderComponent(msg)
            }
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
