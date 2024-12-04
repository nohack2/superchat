// src/components/Chat/AccountDetails.tsx
import React, { useState } from 'react';
import BrokerModal from '../Chat/BrokerModal';

const AccountDetails = ({ onClose }: { onClose: () => void }) => { // Accept onClose prop
    const [isBrokerModalOpen, setBrokerModalOpen] = useState(false);

    return (
        <div className="p-30">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Your Broker Account Details</h2>
            <div className="mb-4 flex space-x-2">
                <button 
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => setBrokerModalOpen(true)}
                >
                    Add New Broker
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded">
                    Delete
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded">
                    Sync
                </button>
            </div>
            <BrokerModal 
                isOpen={isBrokerModalOpen} 
                onClose={() => setBrokerModalOpen(false)}
            />
            <div className="mb-2">
                <div className="grid grid-cols-6 gap-4 font-bold border-b border-gray-300 pb-2 text-black">
                    <div>Action</div>
                    <div>Sr. No.</div>
                    <div>Broker</div>
                    <div>Account Name</div>
                    <div>Status</div>
                    <div>Last Sync Date & Time</div>
                </div>
            </div>
            <div className="space-y-4">
                {/* Row for MetaTrader 5 */}
                <div className="flex items-center border-b border-gray-300 pb-2 text-black">
                    <div className="flex-grow">
                        <input type="checkbox" className="mr-2" />
                    </div>
                    <div className="flex-grow">1</div>
                    <div className="flex-grow">
                        <strong>MetaTrader 5</strong>
                    </div>
                    <div className="flex-grow">Gaurav</div>
                    <div className="flex-grow">Active</div>
                    <div className="flex-grow">2024-12-01 16:26:03</div>
                </div>
                {/* Row for Binance */}
                <div className="flex items-center border-b border-gray-300 pb-2 text-black">
                    <div className="flex-grow">
                        <input type="checkbox" className="mr-2" />
                    </div>
                    <div className="flex-grow">2</div>
                    <div className="flex-grow">
                        <strong>Binance</strong>
                    </div>
                    <div className="flex-grow">User456</div>
                    <div className="flex-grow">Inactive</div>
                    <div className="flex-grow">2023-09-30 10:00 AM</div>
                </div>
                {/* Add more rows as needed */}
            </div>
            <button onClick={onClose} className="mt-4 py-2 px-4 rounded bg-red-500 text-white"> {/* Close button */}
                Close
            </button>
        </div>
    );
};

export default AccountDetails;