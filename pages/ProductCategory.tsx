import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { pushGTMEvent, pushProductEvent } from '../services/gtmService';

interface ProductCategoryProps {
  title: string;
  description: string;
  features: string[];
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ title, description, features }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Track Page View manually for SPA if GTM History Change trigger isn't sufficient
    pushGTMEvent({
      event: 'virtual_page_view',
      page_path: location.pathname,
      page_title: title
    });
  }, [location, title]);

  const handleApply = () => {
    pushGTMEvent({
      event: 'application_start',
      product_name: title,
      category: location.pathname.split('/')[1]
    });
    // Redirect to the wizard with product query param
    navigate(`/apply?product=${encodeURIComponent(title)}`);
  };

  return (
    <div className="pt-8 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / {location.pathname.split('/')[1]} / <span className="text-gray-900 font-medium">{title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="inline-block px-3 py-1 bg-blue-100 text-nova-blue text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
                Best Seller
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-lg text-gray-600 mb-8">{description}</p>
              
              <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleApply} 
                  variant="primary" 
                  size="lg"
                  gtmId="product-page-apply-btn"
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => pushProductEvent('download_brochure', title)}
                >
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-100 relative min-h-[300px]">
              <img 
                src={`https://picsum.photos/800/800?random=${title.length}`} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <p className="text-white text-sm font-medium">Terms and conditions apply. Image for illustration purposes only.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparison</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600">Features</th>
                  <th className="p-4 font-semibold text-nova-blue">Standard</th>
                  <th className="p-4 font-semibold text-nova-orange">Premium (Selected)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 text-gray-600">Interest Rate</td>
                  <td className="p-4 font-medium">3.5%</td>
                  <td className="p-4 font-bold text-green-600">7.0%</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-600">Annual Fee</td>
                  <td className="p-4">Free</td>
                  <td className="p-4">₹500 (Waived on spend)</td>
                </tr>
                 <tr>
                  <td className="p-4 text-gray-600">Reward Points</td>
                  <td className="p-4">2x</td>
                  <td className="p-4">10x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;