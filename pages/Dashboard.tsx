import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Wallet, Shield, Zap, Smartphone } from 'lucide-react';
import Button from '../components/ui/Button';
import { pushGTMEvent, pushPromoEvent } from '../services/gtmService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string, path: string) => {
    pushGTMEvent({
      event: 'dashboard_quick_action',
      action_name: action
    });
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Dashboard Header */}
      <div className="bg-nova-blue text-white pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Good Morning, User</h1>
              <p className="text-blue-200 text-sm">Last login: Today, 09:41 AM</p>
            </div>
            <div className="mt-4 md:mt-0 bg-blue-800/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-blue-700">
               <span className="text-xs text-blue-200 block">Total Net Worth</span>
               <span className="text-xl font-bold">₹ 14,23,500.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Accounts) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Savings Account Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-lg text-nova-blue">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Platinum Savings</h3>
                    <p className="text-sm text-gray-500 font-mono">XXXX-XXXX-4589</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-900">₹ 8,45,200.50</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                    size="sm" 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => handleQuickAction('Transfer', '/transfer')}
                >
                    Transfer Money
                </Button>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleQuickAction('Statement', '/dashboard')}
                >
                    View Statement
                </Button>
              </div>
            </div>

             {/* Credit Card */}
             <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-md p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
                
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold flex items-center"><CreditCard className="mr-2" size={20} /> Ruby Premium</h3>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">Active</span>
                </div>
                
                <div className="mb-8">
                    <p className="font-mono text-xl tracking-widest">4589 1234 5678 9010</p>
                    <p className="text-xs text-gray-400 mt-1">Valid Thru 12/28</p>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400">Card Holder</p>
                        <p className="font-medium">JOHN DOE</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-gray-400">Unbilled Amount</p>
                         <p className="font-bold text-xl">₹ 24,500.00</p>
                    </div>
                </div>
             </div>

             {/* Recent Transactions */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Amazon India', date: 'Today, 10:30 AM', amount: -2499, type: 'debit' },
                        { title: 'Salary Credit', date: 'Yesterday', amount: 85000, type: 'credit' },
                        { title: 'Starbucks Coffee', date: 'Yesterday', amount: -450, type: 'debit' },
                        { title: 'Netflix Subscription', date: '21 Oct 2024', amount: -649, type: 'debit' },
                    ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{tx.title}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.type === 'credit' ? '+' : '-'} ₹ {Math.abs(tx.amount).toLocaleString('en-IN')}
                            </span>
                        </div>
                    ))}
                </div>
                <button className="w-full text-center text-nova-blue text-sm font-medium mt-4 hover:underline">View All Transactions</button>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             {/* Quick Actions */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Pay</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleQuickAction('Bill Pay', '/bill-pay')}
                        className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-nova-lightBlue hover:text-nova-blue transition-colors group"
                    >
                        <Zap size={24} className="mb-2 text-gray-400 group-hover:text-nova-blue" />
                        <span className="text-xs font-medium">Pay Bills</span>
                    </button>
                    <button 
                        onClick={() => handleQuickAction('Recharge', '/bill-pay?cat=mobile')}
                        className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-nova-lightBlue hover:text-nova-blue transition-colors group"
                    >
                        <Smartphone size={24} className="mb-2 text-gray-400 group-hover:text-nova-blue" />
                        <span className="text-xs font-medium">Recharge</span>
                    </button>
                </div>
             </div>

             {/* Pre-approved Loan Offer */}
             <div className="bg-gradient-to-br from-nova-orange to-red-600 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-medium text-orange-100 mb-1">Exclusive Offer</p>
                    <h3 className="text-xl font-bold mb-2">Pre-approved Personal Loan</h3>
                    <p className="text-2xl font-bold mb-4">₹ 5,00,000</p>
                    <Button 
                        size="sm" 
                        className="bg-white text-nova-orange hover:bg-gray-100"
                        onClick={() => {
                            pushPromoEvent('dashboard_loan_offer');
                            navigate('/personal/personal-loans');
                        }}
                    >
                        Apply Now
                    </Button>
                </div>
                <div className="absolute bottom-0 right-0 -mb-4 -mr-4 text-white opacity-20">
                    <Shield size={100} />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;