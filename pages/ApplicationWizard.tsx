import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Check, ChevronRight, User, Briefcase, FileText } from 'lucide-react';
import { pushGTMEvent } from '../services/gtmService';

const ApplicationWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const productType = searchParams.get('product') || 'Generic Product';

  useEffect(() => {
    // Track funnel step on mount and step change
    pushGTMEvent({
      event: 'funnel_step',
      step_number: step,
      step_name: getStepName(step),
      product: productType
    });
  }, [step, productType]);

  const getStepName = (s: number) => {
    switch(s) {
      case 1: return 'personal_details';
      case 2: return 'employment_details';
      case 3: return 'kyc_verification';
      case 4: return 'success';
      default: return 'unknown';
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying for <span className="font-semibold text-nova-blue">{productType}</span>. 
            Your reference number is <span className="font-mono bg-gray-100 px-2 py-1 rounded">REF-{Math.floor(Math.random()*1000000)}</span>.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for {productType}</h1>
            <p className="text-sm text-gray-500">Complete the steps below to process your application.</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-nova-orange text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step > s ? <Check size={16} /> : s}
                    </div>
                    <span className={`ml-2 text-sm font-medium hidden sm:block ${step >= s ? 'text-nova-blue' : 'text-gray-400'}`}>
                        {getStepName(s).replace('_', ' ').toUpperCase()}
                    </span>
                    {s < 3 && <div className={`w-12 h-0.5 mx-4 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
                </div>
            ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center space-x-2 text-nova-blue mb-4">
                            <User />
                            <h3 className="text-xl font-bold">Personal Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="john@example.com" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center space-x-2 text-nova-blue mb-4">
                            <Briefcase />
                            <h3 className="text-xl font-bold">Employment Details</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none">
                                    <option>Salaried</option>
                                    <option>Self-Employed</option>
                                    <option>Business Owner</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
                                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="₹" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center space-x-2 text-nova-blue mb-4">
                            <FileText />
                            <h3 className="text-xl font-bold">KYC Verification</h3>
                        </div>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-4">
                            Please provide your PAN or Aadhaar number for instant verification.
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                             <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none uppercase" placeholder="ABCDE1234F" />
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                            <input type="checkbox" id="terms" className="w-4 h-4 text-nova-orange rounded" />
                            <label htmlFor="terms" className="text-sm text-gray-600">I agree to the Terms & Conditions and authorize Nova Bank to fetch my credit report.</label>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-between items-center">
                <Button 
                    variant="ghost" 
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className={step === 1 ? 'invisible' : ''}
                >
                    Back
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleNext}
                    className="w-32"
                    gtmId={`step-${step}-next-btn`}
                >
                    {step === 3 ? 'Submit' : 'Next'} <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationWizard;