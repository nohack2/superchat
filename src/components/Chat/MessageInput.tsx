import { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 flex items-center bg-white">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        &#8594;
      </button>
    </div>
  );
};

export default MessageInput;
