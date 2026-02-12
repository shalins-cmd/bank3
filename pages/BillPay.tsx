import React, { useState } from 'react';
import { Smartphone, Zap, Wifi, Droplet, Monitor } from 'lucide-react';
import Button from '../components/ui/Button';
import { pushGTMEvent } from '../services/gtmService';

const CATEGORIES = [
  { id: 'mobile', label: 'Mobile Prepaid', icon: Smartphone },
  { id: 'electricity', label: 'Electricity', icon: Zap },
  { id: 'broadband', label: 'Broadband', icon: Wifi },
  { id: 'water', label: 'Water', icon: Droplet },
  { id: 'dth', label: 'DTH', icon: Monitor },
];

const BillPay: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('mobile');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    pushGTMEvent({
        event: 'bill_payment_init',
        category: selectedCat
    });
    
    setTimeout(() => {
        setIsProcessing(false);
        alert(`Bill Payment for ${selectedCat} successful!`);
        pushGTMEvent({
            event: 'bill_payment_complete',
            category: selectedCat,
            amount: 500 // Mock amount
        });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Bill Payments & Recharge</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Categories */}
            <div className="md:col-span-1 space-y-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            selectedCat === cat.id 
                            ? 'bg-nova-blue text-white shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-blue-50'
                        }`}
                    >
                        <cat.icon size={20} />
                        <span className="font-medium">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Payment Form */}
            <div className="md:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 capitalize">{selectedCat} Payment</h2>
                    
                    <form onSubmit={handlePay} className="space-y-6 max-w-lg">
                        {selectedCat === 'mobile' && (
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="Enter 10 digit number" required />
                             </div>
                        )}
                        {(selectedCat === 'electricity' || selectedCat === 'water') && (
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Consumer Number</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" required />
                             </div>
                        )}
                        
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Operator / Board</label>
                             <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none bg-white">
                                <option>Select Provider</option>
                                <option>Airtel</option>
                                <option>Jio</option>
                                <option>Tata Power</option>
                                <option>Adani Electricity</option>
                             </select>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                             <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-orange focus:outline-none" placeholder="₹" required />
                        </div>

                        <Button type="submit" disabled={isProcessing} className="w-full">
                            {isProcessing ? 'Processing...' : 'Proceed to Pay'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BillPay;