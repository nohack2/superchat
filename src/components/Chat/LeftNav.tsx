import React from 'react';
import { useRouter } from 'next/navigation';

interface LeftNavProps {
    onAddBrokerClick: () => void;
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const LeftNav: React.FC<LeftNavProps> = ({ onAddBrokerClick, isDarkTheme, toggleTheme }) => {
    const router = useRouter();

    const handleAddBrokerClick = () => {
        router.push('/brokerdetails');
    };

    return (
        <div className="w-64 flex flex-col bg-gray-800">
            <h1 className="text-2xl font-bold p-4"></h1>
            <div className="p-4">
                <div className="p-2 hover:bg-gray-700 rounded-3xl mb-4">
                    <button
                        className="w-full py-2 px-4 rounded font-bold text-white"
                        onClick={handleAddBrokerClick}
                    >
                        Add Broker
                    </button>
                </div>
                <div className="p-2 hover:bg-gray-700 rounded-3xl">
                    <button className="w-full py-2 px-4 rounded text-white font-bold">
                        Show Chart
                    </button>
                </div>
                {/* <div className="mt-4">
                    <label className="toggle-switch">
                        <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                        <span className="slider"></span>
                    </label>
                </div> */}
            </div>
        </div>
    );
};

export default LeftNav;