import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/ui/Button';
import { FEATURED_PRODUCTS } from '../constants';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { pushGTMEvent, pushPromoEvent } from '../services/gtmService';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Popular Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of banking solutions designed to meet your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => {
            // Dynamically resolve icon component
            // @ts-ignore
            const IconComponent = Icons[product.icon.charAt(0).toUpperCase() + product.icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())] || Icons.Box;
            
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 group border border-gray-100"
              >
                <div className="w-14 h-14 bg-nova-lightBlue rounded-lg flex items-center justify-center mb-6 group-hover:bg-nova-orange group-hover:text-white transition-colors duration-300 text-nova-blue">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>
                <Link 
                  to={product.link}
                  onClick={() => {
                    pushGTMEvent({
                      event: 'product_click',
                      product_id: product.id,
                      product_name: product.title,
                      product_category: product.category
                    });
                  }}
                  className="text-nova-orange font-semibold flex items-center hover:translate-x-1 transition-transform"
                >
                  Apply Now <Icons.ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nova-dark rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
            <div className="relative z-10 max-w-xl mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Get a Personal Loan in 3 seconds!</h3>
              <p className="text-gray-400 mb-6">Pre-approved offers just for you. No paperwork, instant disbursal.</p>
              <Button 
                variant="primary" 
                gtmId="promo-banner-cta"
                onClick={() => pushPromoEvent('instant_loan_banner')}
              >
                Check Eligibility
              </Button>
            </div>
            <div className="relative z-10">
              <img 
                src="https://picsum.photos/400/300?random=2" 
                alt="Mobile Banking" 
                className="rounded-lg shadow-lg w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;