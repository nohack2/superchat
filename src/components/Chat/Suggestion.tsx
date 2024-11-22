export interface SuggestionItem {
  type: string;
  text: string;
  subtext?: string;
}

export interface SuggestionProps {
  handleSuggestionClick: (suggestionItem: SuggestionItem) => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ handleSuggestionClick }) => {
  const suggestions: SuggestionItem[] = [{
    "type"    : 'StockChart',
    "text"    : "Show me a stockchart", 
    "subtext" : "of APPLE inc.?",
  }, {
    "type"    : "StockScreener",
    "text": "Show me a screener", 
    "subtext": "to find new stocks"
  }, {
    "type"    : "MarketHeatMap",
    "text": "How is the stock market", 
    "subtext": "performing today by sector?"
  }, {
    "type"    : "StockPrice",
    "text": "What is the price", 
    "subtext": "of Apple Inc?"
  }];

  return (
    <div className="p-4 bg-gray-100 border-t border-gray-300">
      <p className="text-sm text-gray-500 mb-2"></p>
      <div className="flex space-x-2">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="rounded-lg border-solid border bg-white hover:cursor-pointer hover:bg-slate-200">
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-0 rounded text-black"
            >
              <div className="font-medium text-[.9rem] pb-0 pt-4 px-7">
                {suggestion.text}
              </div>
              <div className="text-[.7rem] pt-0 px-7 pb-4 text-slate-900">
                {suggestion.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
