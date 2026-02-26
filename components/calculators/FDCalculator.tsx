import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Calculator } from 'lucide-react';
import { pushGTMEvent } from '../../services/gtmService';

const FDCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [rate, setRate] = useState(6.5);
  const [maturity, setMaturity] = useState(0);

  const calculate = () => {
    // Simple Interest for demo: A = P(1 + rt)
    const interest = (amount * rate * (tenure / 12)) / 100;
    const total = amount + interest;
    setMaturity(Math.round(total));

    pushGTMEvent({
      event: 'calculator_use',
      calculator_type: 'FD',
      input_amount: amount,
      input_tenure: tenure,
      output_maturity: total
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center space-x-2 mb-6 text-nova-blue">
        <Calculator size={24} />
        <h2 className="text-xl font-bold">Fixed Deposit Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount (₹)
          </label>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="5000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nova-orange"
          />
          <div className="mt-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-right font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenure (Months)
          </label>
          <input
            type="range"
            min="6"
            max="120"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nova-blue"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>6 Months</span>
            <span className="font-bold text-gray-900">{tenure} Months</span>
            <span>120 Months</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md font-mono"
            step="0.1"
          />
        </div>

        <Button onClick={calculate} className="w-full" gtmId="fd-calc-btn">
          Calculate Maturity
        </Button>

        {maturity > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-sm text-gray-600 mb-1">Maturity Amount</p>
            <p className="text-3xl font-bold text-green-700">₹ {maturity.toLocaleString('en-IN')}</p>
            <p className="text-xs text-green-600 mt-2">
              Interest Earned: ₹ {(maturity - amount).toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FDCalculator;