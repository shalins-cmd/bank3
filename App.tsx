import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import ApplicationWizard from './pages/ApplicationWizard';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import BillPay from './pages/BillPay';
import Offers from './pages/Offers';
import FDCalculator from './components/calculators/FDCalculator';
import EMICalculator from './components/calculators/EMICalculator';
import Modal from './components/ui/Modal';
import Button from './components/ui/Button';
import ChatBot from './components/ChatBot';
import DebugPanel from './components/DebugPanel';
import { pushGTMEvent } from './services/gtmService';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  onLoginRequest: () => void;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isLoggedIn, onLoginRequest, children }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
        <p className="text-gray-600 mb-6">Please login to access your dashboard.</p>
        <Button onClick={onLoginRequest}>Login Now</Button>
      </div>
    );
  }
  return <>{children}</>;
};

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginStep === 1) {
      setLoginStep(2);
      // GTM track step 1
      pushGTMEvent({ event: 'login_step_complete', step: 1, method: 'user_id' });
    } else {
      setIsLoginModalOpen(false);
      setLoginStep(1);
      setIsLoggedIn(true);
      // GTM track login success
      pushGTMEvent({ 
        event: 'login_success', 
        user_id_hash: btoa(userId) // Simulate hashing PII
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    pushGTMEvent({ event: 'logout' });
    window.location.hash = '/';
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-gray-900">
        <Navbar 
          isLoggedIn={isLoggedIn}
          userName={userId}
          onLogout={handleLogout}
          onLoginClick={() => {
            setIsLoginModalOpen(true);
            pushGTMEvent({ event: 'login_modal_open', source: 'navbar' });
          }} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} onLoginRequest={() => setIsLoginModalOpen(true)}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/transfer" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} onLoginRequest={() => setIsLoginModalOpen(true)}>
                <Transfer />
              </ProtectedRoute>
            } />
            <Route path="/bill-pay" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} onLoginRequest={() => setIsLoginModalOpen(true)}>
                <BillPay />
              </ProtectedRoute>
            } />
            <Route path="/offers" element={<Offers />} />

            {/* Public Routes */}
            <Route path="/apply" element={<ApplicationWizard />} />
            <Route path="/support/contact" element={<ContactUs />} />
            <Route path="/support/locate" element={<div className="p-20 text-center text-2xl">Branch Locator Module (Coming Soon)</div>} />

            {/* Calculator Routes */}
            <Route path="/calculators/fd" element={
              <div className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Financial Tools</h1>
                <FDCalculator />
              </div>
            } />
            <Route path="/calculators/emi" element={
              <div className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Financial Tools</h1>
                <EMICalculator />
              </div>
            } />

            {/* Product Routes */}
            <Route path="/personal/savings" element={
              <ProductCategory 
                title="Platinum Savings Account"
                description="Maximize your savings with our highest interest rates and premium privileges."
                features={["7% Interest p.a.", "Free Debit Card", "Unlimited ATM Withdrawals"]}
              />
            } />
            <Route path="/personal/salary" element={
              <ProductCategory 
                title="Corporate Salary Account"
                description="Zero balance account with reimbursement benefits for employees."
                features={["Zero Balance", "Free Insurance Cover", "Overdraft Facility"]}
              />
            } />
            <Route path="/business/current" element={
              <ProductCategory 
                title="Business Advantage Current Account"
                description="Designed for high volume transactions with low fees."
                features={["Higher Cash Deposit Limits", "Free NEFT/RTGS", "Business Debit Card"]}
              />
            } />

            <Route path="/personal/cards" element={
              <ProductCategory 
                title="Ruby Credit Card"
                description="Experience luxury with our premium lifestyle credit card designed for travelers."
                features={["Zero Annual Fee", "Free Airport Lounge Access", "1% Fuel Surcharge Waiver"]}
              />
            } />
            <Route path="/personal/debit" element={
              <ProductCategory 
                title="Titanium Debit Card"
                description="Secure and convenient access to your funds worldwide."
                features={["High Withdrawal Limits", "Insurance Protection", "Deals on Dining"]}
              />
            } />
             <Route path="/personal/forex" element={
              <ProductCategory 
                title="Multi-Currency Forex Card"
                description="Carry up to 16 currencies on a single card."
                features={["Locked-in Exchange Rates", "No Markup Fees", "Free Backup Card"]}
              />
            } />

             <Route path="/personal/loans" element={
              <ProductCategory 
                title="Instant Home Loan"
                description="Get closer to your dream home with paperless approval in 30 minutes."
                features={["Rates from 8.50%", "30 Year Tenure", "Zero Processing Fee Offer"]}
              />
            } />
            <Route path="/personal/personal-loans" element={
              <ProductCategory 
                title="Personal Loan"
                description="Funds for travel, marriage, or medical emergencies without collateral."
                features={["Disbursal in 4 hours", "Loans up to ₹40 Lakhs", "Flexible Repayment"]}
              />
            } />
            <Route path="/personal/car-loans" element={
              <ProductCategory 
                title="Car Loan"
                description="Drive your dream car today with 100% on-road funding."
                features={["100% On-road Funding", "7 Year Tenure", "Instant Approval"]}
              />
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
        <ChatBot />
        <DebugPanel />

        {/* Login Modal */}
        <Modal 
          isOpen={isLoginModalOpen} 
          onClose={() => {
            setIsLoginModalOpen(false);
            setLoginStep(1);
            pushGTMEvent({ event: 'login_modal_close' });
          }}
          title="Internet Banking Login"
        >
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginStep === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input 
                    type="text" 
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-orange"
                    placeholder="Enter your User ID"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                   <a href="#" className="text-nova-blue hover:underline">Forgot User ID?</a>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-3 rounded text-sm text-nova-blue mb-4">
                  Welcome back, <span className="font-bold">{userId}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-orange"
                    placeholder="Enter your password"
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full">
              {loginStep === 1 ? 'Proceed' : 'Login'}
            </Button>
            
            <div className="text-center text-xs text-gray-500 mt-4">
              By logging in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </form>
        </Modal>
      </div>
    </HashRouter>
  );
}

export default App;