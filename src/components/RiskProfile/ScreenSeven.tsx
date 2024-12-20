import React, { useState } from 'react';

interface ScreenSevenProps {
  onSubmit: (profileData: any) => void;
}

const ScreenSeven: React.FC<ScreenSevenProps> = ({ onSubmit }) => {
  const [profileData, setProfileData] = useState({});

  const handleSubmit = () => {
    onSubmit(profileData);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Submit Your Profile</h1>
      <div className="mt-6 w-full max-w-md text-center">
        <p className="text-gray-600">Ensure all your choices are accurate.</p>
      </div>
    </div>
  );
};

export default ScreenSeven;
