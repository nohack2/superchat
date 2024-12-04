'use client';

import LeftNav from '@/components/Chat/LeftNav';
import AccountDetails from '@/components/Chat/AccountDetails';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrokerDetailsPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(true);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <LeftNav onAddBrokerClick={() => {}} isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 relative">
        <div className="absolute top-4 right-4 z-10">
          <label className="toggle-switch">
            <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
            <span className="slider"></span>
          </label>
        </div>
        <div className="bg-white p-8 rounded shadow-md w-full h-full px-4">
          {showAccountDetails && <AccountDetails onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
} 