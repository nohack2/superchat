import MessageInput from "./MessageInput";
import { ChatContext, ChatMessage, ComponentType } from "./Chat";
import Suggestion from "./Suggestion";
import { StockChart } from "../tradingview/stock-chart";

interface ChatAreaProps {
  chatContext: ChatContext;
  handleUserQuery: (query: string) => void;
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
    if (chatMessage.componentType &&
      chatMessage.componentType.provider === 'tradingview'
    ) {
      return (
        <div className="">
          <div className="">
            <div className={`p-2 rounded text-black rounded-lg inline-block`}>
              <StockChart symbol="AAPL"></StockChart>
            </div>
          </div>
        </div>
      );
    }
    return (
    <div className="">
      <div className="">
        <div className={`p-2 rounded text-black rounded-lg inline-block`}>
          {chatMessage.text}
        </div>
      </div>
    </div>
    );
  }
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatContext, handleUserQuery, loading }) => {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {chatContext.chatHistory.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {
              renderComponent(msg)
            }
          </div>
        ))}
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>
      <Suggestion handleSuggestionClick={handleUserQuery} />
      <MessageInput onSend={handleUserQuery} />
      <p className="text-sm text-gray-400 p-4">AI answers are not perfect. Verify independently.</p>
    </div>
  );
};

export default ChatArea;
