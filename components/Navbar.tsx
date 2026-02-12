import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Lock, LogOut } from 'lucide-react';
import { NAVIGATION, LOGGED_IN_NAVIGATION } from '../constants';
import { pushNavigationEvent, pushPromoEvent } from '../services/gtmService';
import Button from './ui/Button';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn, onLogout, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const currentNavigation = isLoggedIn ? LOGGED_IN_NAVIGATION : NAVIGATION;

  const handleNavClick = (label: string, path: string) => {
    // Push navigation event to GTM
    pushNavigationEvent(label, path, isLoggedIn);
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to={isLoggedIn ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
            onClick={() => handleNavClick('Logo', isLoggedIn ? '/dashboard' : '/')}
          >
            <div className="w-10 h-10 bg-nova-orange rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              N
            </div>
            <span className="text-2xl font-bold text-nova-blue tracking-tight">Nova<span className="text-nova-orange">Bank</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {currentNavigation.map((item) => (
              <div 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith(item.path) 
                      ? 'text-nova-orange' 
                      : 'text-gray-700 hover:text-nova-orange'
                  }`}
                  onClick={() => handleNavClick(item.label, item.path)}
                >
                  <span>{item.label}</span>
                  {item.subItems && <ChevronDown size={14} />}
                </Link>
                
                {/* Dropdown */}
                {item.subItems && activeSubmenu === item.label && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 rounded-md shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-nova-lightBlue hover:text-nova-blue"
                        onClick={() => handleNavClick(`${item.label} > ${subItem.label}`, subItem.path)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
             <Button 
              variant="ghost" 
              size="sm"
              gtmId="nav-locate-branch"
              onClick={() => pushPromoEvent('locate_branch_click')}
            >
              Locate Branch
            </Button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                 <div className="flex items-center space-x-2 text-nova-blue font-medium bg-blue-50 px-3 py-1.5 rounded-full">
                    <User size={16} />
                    <span>{userName || 'User'}</span>
                 </div>
                 <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  gtmId="nav-logout-btn"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                gtmId="nav-login-btn"
                onClick={onLoginClick}
                className="shadow-md"
              >
                <Lock size={16} className="mr-2" />
                Internet Banking
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentNavigation.map((item) => (
              <React.Fragment key={item.label}>
                <Link
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-nova-orange"
                  onClick={() => handleNavClick(item.label, item.path)}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <div className="pl-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-nova-orange"
                        onClick={() => handleNavClick(`${item.label} > ${subItem.label}`, subItem.path)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="mt-4 px-3">
              {isLoggedIn ? (
                 <Button 
                  variant="outline" 
                  className="w-full justify-center text-red-600 border-red-200"
                  onClick={onLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout ({userName})
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  className="w-full justify-center"
                  onClick={onLoginClick}
                >
                  <Lock size={16} className="mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;