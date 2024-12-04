import React, { useState } from "react";
import LeftNav from "./LeftNav";
import ChatArea from "./ChatArea";
import AccountDetails from "./AccountDetails";
import BrokerModal from "./BrokerModal";
import { SuggestionItem } from "./Suggestion";
import { StockChart } from "../tradingview/stock-chart";
import { StockScreener } from "../tradingview/stock-screener";
import { MarketHeatmap } from "../tradingview/market-heatmap";
import { StockPrice } from "../tradingview/stock-price";

export interface ChatMessage {
  role: 'user' | 'system'
  text?: string;
  data?: string;
  componentType?: ComponentType
}

export interface ComponentType {
  provider: 'internal' | 'tradingview'
  chart: React.ComponentType<any>; // React component reference, allows props
}

export interface ChatContext {
  chatHistory:  ChatMessage[]
}

export default function Chat() {
  const [chatContext, setChatContext] = useState<ChatContext>({
    chatHistory: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showAccountDetails, setShowAccountDetails] = useState<boolean>(false);
  const [showAddBroker, setShowAddBroker] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const handleUserQuery = async (query: string, componentType?: ComponentType) => {
    setChatContext((prev) => ({
      chatHistory: [...prev.chatHistory, { role: "user", text: query }],
    }));  
    setLoading(true);

    try {
      let newMessage: ChatMessage = { 
        role: "system", 
        text: "", 
        componentType: componentType
      };
      let newTextMessage: ChatMessage = { 
        role: "system", 
        text: "Please let me know if you have more questions related to the data shown.", 
      };
      setChatContext((prev) => ({
        chatHistory: [...prev.chatHistory, newMessage, newTextMessage],
      }));
    } catch (error) {
      setChatContext((prev) => ({
        chatHistory: [...prev.chatHistory, { role: "system", text: "Some issue in our system" }],
      }));
    } finally {
      setLoading(false);
    }
  };

  interface SuggestionComponent {
    name: string,
    componentType: ComponentType
  }

  const handleSuggestionClick = async (suggestionItem: SuggestionItem) => {
    const suggestionComponentMap: SuggestionComponent[] = [
      {
        name: 'StockChart',
        componentType: {
          provider: 'tradingview',
          chart: StockChart
        }
      },
      {
        name: 'StockScreener',
        componentType: {
          provider: 'tradingview',
          chart: StockScreener
        }
      },
      {
        name: 'MarketHeatMap',
        componentType: {
          provider: 'tradingview',
          chart: MarketHeatmap
        }
      },
      {
        name: 'StockPrice',
        componentType: {
          provider: 'tradingview',
          chart: StockPrice
        }
      }
    ]
    const suggestionComponent = suggestionComponentMap.filter(el => el.name === suggestionItem.type)[0];
    handleUserQuery(suggestionItem.text, suggestionComponent.componentType)
  }

  const handleAddBrokerClick = () => {
    setShowAddBroker(true);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="absolute top-4 right-4 z-10">
        <label className="toggle-switch">
          <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
      {showAddBroker ? (
        <div className="w-1/6">
          <BrokerModal isOpen={showAddBroker} onClose={() => setShowAddBroker(false)} />
        </div>
      ) : (
        <div className={`w-1/6 ${isDarkTheme ? 'text-white' : 'text-black'} bg-gray-800`}>
          <LeftNav onAddBrokerClick={handleAddBrokerClick} isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </div>
      )}
      <div className="flex-1 flex flex-col items-center p-1">
        {showAccountDetails ? (
          <AccountDetails onClose={() => setShowAccountDetails(false)} />
        ) : (
          <div className={`w-full max-w-5xl ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
            <ChatArea chatContext={chatContext} handleUserQuery={handleUserQuery} handleSuggestionClick={handleSuggestionClick} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
