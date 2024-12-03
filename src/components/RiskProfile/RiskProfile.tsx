import React, { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo'; // Assume other screens are imported
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';
import ScreenFive from './ScreenFive';
import ScreenSix from './ScreenSix';

const RiskProfile: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (profileData: any) => {
    await fetch('/api/saveProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileData })
    });
    alert('Profile submitted!');
  };


  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-8 px-4">
      <ProgressIndicator step={step} totalSteps={totalSteps} onBack={handleBack} />
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-2 flex flex-col justify-between min-h-[60vh]">
        <div>
          {step === 1 && <ScreenOne onNext={handleNext} />}
          {step === 2 && <ScreenTwo onNext={handleNext} />}
          {step === 3 && <ScreenThree onNext={handleNext} />}
          {step === 4 && <ScreenFour onNext={handleNext} />}
          {step === 5 && <ScreenFive onNext={handleNext} />}
          {step === 6 && <ScreenSix onSubmit={handleSubmit} />}
          {/* Other screens */}
        </div>
        <div className="mt-4 self-center">
          <button
            onClick={handleNext}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

};

export default RiskProfile;
