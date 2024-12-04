'use client';

import React, { useState } from 'react';
import ProgressIndicator from '../../components/RiskProfile/ProgressIndicator';
import ScreenOne from '../../components/RiskProfile/ScreenOne';
import ScreenTwo from '../../components/RiskProfile/ScreenTwo'; // Assume other screens are imported
import ScreenThree from '../../components/RiskProfile/ScreenThree';
import ScreenFour from '../../components/RiskProfile/ScreenFour';
import ScreenFive from '../../components/RiskProfile/ScreenFive';
import ScreenSix from '../../components/RiskProfile/ScreenSix';
import ScreenSeven from '../../components/RiskProfile/ScreenSeven';
import { useRouter } from 'next/navigation';

const RiskProfile: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    //screen1
    age: '',
    investmentExperience: '',
    investmentKnowledge: '',
    liquidityNeeds: '',
    financialObligations: '',

    //screen2
    investmentGoal: '',

    //screen3
    investmentHorizon: '',

    //screen4
    riskWillingness: '',
    marketVolatilityComfort: '',
    marketDownturnReaction: '',
    lossTolerance: '',

    //screen5
    marketVolatilityComfortRange:'',

    //screen6
    currentFinancialSituation:'',

  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const requiredFields = ["age", "investmentExperience", "riskTolerance"];
    const isValid = requiredFields.every((field) => formData[field]);

    // if (!isValid) {
    //   alert('Please fill out all required fields.');
    //   return;
    // }
    // TODO: validate profile fields.
    try {
      const response = await fetch('/api/saveRiskProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileData: formData })
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }

    // TODO: handle profile savign error.
    alert('Profile submitted!');
    router.push('/');
  };


  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-8 px-4">
      <ProgressIndicator step={step} totalSteps={totalSteps} onBack={handleBack} />
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-2 flex flex-col justify-between min-h-[60vh]">
        <div>
          {step === 1 && <ScreenOne formData={formData} handleChange={handleChange} />}
          {step === 2 && <ScreenTwo formData={formData} handleChange={handleChange}/>}
          {step === 3 && <ScreenThree formData={formData} handleChange={handleChange} />}
          {step === 4 && <ScreenFour formData={formData} handleChange={handleChange} />}
          {step === 5 && <ScreenFive formData={formData} handleChange={handleChange} />}
          {step === 6 && <ScreenSix formData={formData} handleChange={handleChange} />}
          {step === 7 && <ScreenSeven onSubmit={handleSubmit}/>}
          {/* Other screens */}
        </div>
        <div className="mt-4 self-center">
        {step <=5 &&
          <button
            onClick={handleNext}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Next
          </button>
        }
        {step === 6 &&
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            submit
          </button>
        }
        </div>
      </div>
    </div>
  );

};

export default RiskProfile;
