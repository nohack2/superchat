import { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  onInputChange: (input: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, onInputChange }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
      onInputChange("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 flex items-center bg-white dark:bg-gray-800">
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onInputChange(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none text-black dark:text-white bg-white dark:bg-gray-700"
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
