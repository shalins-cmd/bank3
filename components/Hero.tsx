import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Smartphone } from 'lucide-react';
import Button from './ui/Button';
import { pushGTMEvent } from '../services/gtmService';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-nova-blue overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-nova-orange opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Banking for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-orange to-yellow-400">
                Digital Age
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl">
              Experience seamless banking with Nova. From high-interest savings to instant loans, manage your wealth with confidence and AI-powered insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                gtmId="hero-open-account"
                onClick={() => pushGTMEvent({ event: 'cta_click', cta_location: 'hero', cta_text: 'Open Account' })}
              >
                Open Account
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-nova-blue"
                gtmId="hero-learn-more"
                onClick={() => pushGTMEvent({ event: 'cta_click', cta_location: 'hero', cta_text: 'Learn More' })}
              >
                View Products
              </Button>
            </div>

            <div className="pt-8 flex items-center space-x-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={20} className="text-green-400" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} className="text-green-400" />
                <span className="text-sm font-medium">High Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone size={20} className="text-green-400" />
                <span className="text-sm font-medium">Digital First</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative animate-in slide-in-from-right duration-700 delay-100 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="https://picsum.photos/600/400?random=1" 
                alt="Happy family using banking app" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Card UI Element */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                     <TrendingUp size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Interest Earned</p>
                    <p className="text-sm font-bold text-gray-900">+ ₹12,450.00</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;