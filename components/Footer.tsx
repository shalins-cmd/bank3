import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nova-dark text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold">About Nova Bank</h4>
            <p className="text-sm leading-relaxed">
              Leading the digital banking revolution with secure, fast, and intelligent financial solutions powered by next-gen AI technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-nova-orange transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-nova-orange transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-nova-orange transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-nova-orange transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Personal Banking</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Business Banking</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Corporate Info</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Investor Relations</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Careers</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Savings Accounts</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Credit Cards</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Home Loans</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Personal Loans</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all">Insurance</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-nova-orange shrink-0 mt-0.5" />
                <span>1800 123 4567 (Toll Free)</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-nova-orange shrink-0 mt-0.5" />
                <span>support@novabank.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-nova-orange shrink-0 mt-0.5" />
                <span>Nova Towers, Financial District, Mumbai, India - 400051</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 Nova Bank Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;