import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { pushGTMEvent } from '../services/gtmService';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    pushGTMEvent({
      event: 'form_submit',
      form_id: 'contact_us',
      form_destination: 'support_team'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">We're here to help</h1>
          <p className="text-lg text-gray-600">Have questions? Reach out to our 24/7 support team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-nova-blue text-white rounded-2xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="text-nova-orange" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Phone Support</p>
                  <p className="text-blue-200">1800-123-4567 (Toll Free)</p>
                  <p className="text-blue-200">+91 22 4567 8900</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="text-nova-orange" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <p className="text-blue-200">support@novabank.com</p>
                  <p className="text-blue-200">complaints@novabank.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin className="text-nova-orange" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Head Office</p>
                  <p className="text-blue-200 leading-relaxed">
                    Nova Towers, 14th Floor,<br />
                    Financial District, Gachibowli,<br />
                    Mumbai, Maharashtra - 400051
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We've received your query and will get back to you within 24 hours.</p>
                <Button 
                    className="mt-8" 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                >
                    Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none bg-white">
                    <option>General Inquiry</option>
                    <option>Account Issues</option>
                    <option>Loan Query</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-blue focus:outline-none"></textarea>
                </div>

                <Button type="submit" className="w-full" size="lg" gtmId="contact-submit-btn">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;