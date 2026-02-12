import React from 'react';
import Button from '../components/ui/Button';
import { Tag, Clock } from 'lucide-react';
import { pushGTMEvent } from '../services/gtmService';

const OFFERS = [
  { id: 'off_dining_01', title: '20% Off on Dining', merchant: 'Zomato', description: 'Get flat 20% off on orders above ₹500 using Nova Debit Card.', code: 'NOVAZOM20', expiry: '30 Oct' },
  { id: 'off_travel_02', title: 'Flat ₹2000 Off on Flights', merchant: 'MakeMyTrip', description: 'Valid on domestic flights booking. Minimum transaction ₹5000.', code: 'NOVAMMT', expiry: '15 Nov' },
  { id: 'off_shopping_03', title: '5% Cashback on Amazon', merchant: 'Amazon', description: 'Shop for electronics and get instant cashback directly to your card.', code: 'No Code Req', expiry: '31 Dec' },
  { id: 'off_movie_04', title: 'Buy 1 Get 1 Free', merchant: 'BookMyShow', description: 'Valid on Saturday and Sunday movie shows using Ruby Credit Card.', code: 'NOVABMS', expiry: '20 Nov' },
];

const Offers: React.FC = () => {
  const handleActivate = (offerId: string) => {
    pushGTMEvent({
        event: 'offer_activate',
        offer_id: offerId
    });
    alert('Offer activated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Exclusive Offers for You</h1>
            <p className="text-gray-600 mt-2">Handpicked deals across dining, travel, and shopping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer) => (
                <div key={offer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                        <Tag size={40} className="text-nova-blue opacity-50" />
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-nova-orange bg-orange-50 px-2 py-1 rounded uppercase tracking-wide">{offer.merchant}</span>
                            <div className="flex items-center text-xs text-gray-400">
                                <Clock size={12} className="mr-1" /> {offer.expiry}
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden">{offer.description}</p>
                        
                        <div className="border-t border-dashed border-gray-200 my-4"></div>
                        
                        <div className="flex justify-between items-center">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{offer.code}</code>
                            <button 
                                onClick={() => handleActivate(offer.id)}
                                className="text-sm font-bold text-nova-blue hover:underline"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;