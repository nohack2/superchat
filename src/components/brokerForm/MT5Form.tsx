import React, { FC, useState } from 'react';
import AccountDetails from '../Chat/AccountDetails';
import { FaArrowLeft } from 'react-icons/fa';

interface MT5ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowAccountDetails: () => void;
}

const MT5Modal: FC<MT5ModalProps> = ({ isOpen, onClose, onShowAccountDetails }) => {
    const [showAccountDetails, setShowAccountDetails] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onShowAccountDetails();
    };

    const handleClose = () => {
        setShowAccountDetails(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white dark:bg-gray-800 p-4 rounded shadow-lg w-1/3 h-auto`}>
                {showAccountDetails ? (
                    <AccountDetails onClose={onClose} />
                ) : (
                    <>
                        <div className="flex items-center mb-4">
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <FaArrowLeft className="mr-2" />
                            </button>
                            <h2 className="text-xl font-bold text-black dark:text-white">Linking MetaTrader 5</h2>
                        </div>
                        <p className="mb-4 text-gray-700 dark:text-gray-300 chat-text">
                            Please select date if you don't want to import all data
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white">User Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter User Name"
                                    className="mt-1 block w-full border rounded p-2 text-black dark:text-white bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white">MetaTrader 5 Account Number</label>
                                <input
                                    type="text"
                                    placeholder="Input Your MetaTrader 5 Account Number"
                                    className="mt-1 block w-full border rounded p-2 text-black dark:text-white bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white">MetaTrader 5 Account Password</label>
                                <input
                                    type="password"
                                    placeholder="Input Your MetaTrader 5 Account Password"
                                    className="mt-1 block w-full border rounded p-2 text-black dark:text-white bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white">Broker Name</label>
                                <input
                                    type="text"
                                    placeholder="Input Broker Name"
                                    className="mt-1 block w-full border rounded p-2 text-black dark:text-white bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white">MT5 Server Name</label>
                                <input
                                    type="text"
                                    placeholder="Select a Server"
                                    className="mt-1 block w-full border rounded p-2 text-black dark:text-white bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="py-2 px-4 rounded bg-blue-500 text-white">
                                    Submit
                                </button>
                                <button type="button" onClick={handleClose} className="py-2 px-4 rounded bg-red-500 text-white">
                                    Close
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default MT5Modal;