import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { pushGTMEvent } from '../services/gtmService';

const Transfer: React.FC = () => {
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    accountNumber: '',
    ifsc: '',
    amount: '',
    remarks: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
    pushGTMEvent({
      event: 'transfer_review',
      amount: formData.amount,
      beneficiary_type: 'other_bank'
    });
  };

  const handleConfirm = () => {
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      pushGTMEvent({
        event: 'transfer_complete',
        transaction_id: `TXN${Date.now()}`,
        amount: formData.amount,
        currency: 'INR'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transfer Funds</h1>

        {step === 'input' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in fade-in slide-in-from-bottom-4">
            <form onSubmit={handleReview} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    name="beneficiaryName"
                    required
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                        type="password"
                        name="accountNumber"
                        required
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none"
                    />
                   </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                        type="text"
                        name="ifsc"
                        required
                        value={formData.ifsc}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none uppercase"
                        placeholder="NOVA0123456"
                    />
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    required
                    min="1"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-xl font-bold text-gray-900 border rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none"
                    placeholder="e.g. Rent, Gift"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg">
                  Proceed to Review <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation Modal logic simulated inline or via Step */}
        {step === 'confirm' && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in zoom-in duration-200">
              <div className="text-center mb-6">
                <AlertCircle size={48} className="mx-auto text-nova-orange mb-2" />
                <h2 className="text-xl font-bold">Confirm Transaction</h2>
                <p className="text-gray-500">Please review the details before proceeding</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-8 text-sm">
                 <div className="flex justify-between">
                    <span className="text-gray-500">To</span>
                    <span className="font-bold text-gray-900">{formData.beneficiaryName}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Account</span>
                    <span className="font-mono text-gray-900">{formData.accountNumber}</span>
                 </div>
                 <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-xl text-nova-blue">₹ {Number(formData.amount).toLocaleString('en-IN')}</span>
                 </div>
              </div>

              <div className="flex gap-4">
                 <Button variant="ghost" className="flex-1" onClick={() => setStep('input')}>Back</Button>
                 <Button variant="primary" className="flex-1" onClick={handleConfirm}>Confirm & Pay</Button>
              </div>
           </div>
        )}

        {step === 'success' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful</h2>
                <p className="text-gray-600 mb-8">
                    Transaction ID: <span className="font-mono font-bold">TXN{Date.now()}</span>
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => window.print()}>Print Receipt</Button>
                    <Button onClick={() => { setStep('input'); setFormData({...formData, amount: ''}) }}>Make Another Transfer</Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;