import React, { useState } from 'react';
import Button from '../ui/Button';
import { Percent } from 'lucide-react';
import { pushGTMEvent } from '../../services/gtmService';

const EMICalculator: React.FC = () => {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(24); // Months
  const [rate, setRate] = useState(10.5);
  const [emi, setEmi] = useState(0);

  const calculate = () => {
    // E = P * r * (1+r)^n / ((1+r)^n - 1)
    const r = rate / 12 / 100;
    const n = tenure;
    const calcEmi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    setEmi(Math.round(calcEmi));

    pushGTMEvent({
      event: 'calculator_use',
      calculator_type: 'EMI',
      input_amount: amount,
      input_tenure: tenure,
      output_emi: Math.round(calcEmi)
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center space-x-2 mb-6 text-nova-blue">
        <Percent size={24} />
        <h2 className="text-xl font-bold">Loan EMI Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-right font-mono focus:ring-nova-blue focus:border-nova-blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (Months)
            </label>
            <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md font-mono"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
            </label>
            <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md font-mono"
                step="0.1"
            />
            </div>
        </div>

        <Button onClick={calculate} variant="secondary" className="w-full" gtmId="emi-calc-btn">
          Calculate EMI
        </Button>

        {emi > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold text-nova-blue">₹ {emi.toLocaleString('en-IN')}</p>
            <p className="text-xs text-blue-600 mt-2">
              Total Payment: ₹ {(emi * tenure).toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;