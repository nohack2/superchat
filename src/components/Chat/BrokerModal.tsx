// src/components/Chat/BrokerModal.tsx
import React, { FC, useState } from 'react';
import MT5Modal from '../brokerForm/MT5Form';
import AccountDetails from './AccountDetails'; // Import AccountDetails
import { FaPlusCircle } from 'react-icons/fa'; // Importing an icon from react-icons

interface BrokerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BrokerModal: FC<BrokerModalProps> = ({ isOpen, onClose }) => {
    const [showMT5Modal, setShowMT5Modal] = useState(false);
    const [showAccountDetails, setShowAccountDetails] = useState(false); // State for AccountDetails visibility

    const handleShowAccountDetails = () => {
        // setShowAccountDetails(true); // Show AccountDetails
        setShowMT5Modal(false); // Close MT5Modal if it's open
        onClose(); // Close BrokerModal when showing AccountDetails
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/4 h-auto">
                <h2 className="text-xl font-bold mb-2 text-black dark:text-white">Connect New Broker</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Please select the broker you want to add:</p>
                <ul>
                    <li className="mb-2">
                        <button
                            className="w-full py-2 px-4 rounded text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex items-center"
                            onClick={() => setShowMT5Modal(true)}
                        >
                            <FaPlusCircle className="mr-2" /> {/* Circle plus icon */}
                            MetaTrader 5
                        </button>
                    </li>
                    <li className="mb-2">
                        <button className="w-full py-2 px-4 rounded text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex items-center">
                            <FaPlusCircle className="mr-2" /> {/* Circle plus icon */}
                            Binance
                        </button>
                    </li>
                    <li>
                        <button className="w-full py-2 px-4 rounded text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 flex items-center">
                            <FaPlusCircle className="mr-2" /> {/* Circle plus icon */}
                            Coinbase
                        </button>
                    </li>
                </ul>
                <button onClick={onClose} className="mt-4 py-2 px-4 rounded bg-red-500 text-white">
                    Close
                </button>
            </div>
            {showMT5Modal && (
                <MT5Modal 
                    isOpen={showMT5Modal} 
                    onClose={() => {
                        setShowMT5Modal(false); // Close MT5Modal
                        onClose(); // Close BrokerModal
                    }} 
                    onShowAccountDetails={handleShowAccountDetails}
                />
            )}
            {showAccountDetails && <AccountDetails onClose={() => setShowAccountDetails(false)} />} {/* Pass onClose to AccountDetails */}
        </div>
    );
};

export default BrokerModal;