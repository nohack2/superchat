interface SuggestionProps {
    handleSuggestionClick: (query: string) => void;
  }
  
  const Suggestion: React.FC<SuggestionProps> = ({ handleSuggestionClick }) => {
    const suggestions = ["Show AAPL stock chart", "Stock screener", "Top gainers today"];
  
    return (
      <div className="p-4 bg-gray-100 border-t border-gray-300">
        <p className="text-sm text-gray-500 mb-2"></p>
        <div className="flex space-x-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="rounded-lg bg-slate-200 hover:cursor-pointer hover:bg-white">
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="py-1 px-3 rounded text-black"
              >
                {suggestion}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Suggestion;
  