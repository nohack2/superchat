import MessageInput from "./MessageInput";
import { ChatMessage } from "./Chat";
import Suggestion from "./Suggestion";

interface ChatAreaProps {
  chatHistory: ChatMessage[];
  handleUserQuery: (query: string) => void;
  loading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatHistory, handleUserQuery, loading }) => {
  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.type === "user" ? "text-right" : "text-left"}`}>
            {msg.type === "user" ? (
              <div className="">
                <div className="">
                  <div className={`p-2 rounded text-black rounded-lg inline-block bg-[#e2e8f0] px-5 py-1`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="">
                  <div className={`p-2 rounded text-black rounded-lg inline-block`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            )}
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
