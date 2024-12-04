import { useEffect, useState } from "react";

export interface SuggestionItem {
  type: string;
  text: string;
  subtext?: string;
}

export interface SuggestionProps {
  handleSuggestionClick: (suggestionItem: SuggestionItem) => void;
  filter: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ handleSuggestionClick, filter }) => {
  const suggestions: SuggestionItem[] = [{
    "type": 'StockChart',
    "text": "Show me a stockchart",
    "subtext": "of APPLE inc.?",
  }, {
    "type": "StockScreener",
    "text": "Show me a screener",
    "subtext": "to find new stocks"
  }, {
    "type": "MarketHeatMap",
    "text": "How is the stock market",
    "subtext": "performing today by sector?"
  }, {
    "type": "StockPrice",
    "text": "What is the price",
    "subtext": "of Apple Inc?"
  }];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(filter.toLowerCase())
  );

  if (filter.trim() === "") {
    return null;
  }

  return (
    <div className="p-4 bg-gray-100 border-t border-gray-300">
      <div className="flex space-x-2">
        {filteredSuggestions.map((suggestion, index) => (
          <div key={index} className="rounded-lg border-solid border bg-white hover:cursor-pointer hover:bg-slate-200">
            <div
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-0 rounded text-black"
            >
              <div className="font-medium text-[.9rem] pb-0 pt-4 px-7">
                {suggestion.text}
              </div>
              <div className="text-[.7rem] pt-0 px-7 pb-4 text-slate-900" style={{ color: '#9CA3AF' }}>
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
