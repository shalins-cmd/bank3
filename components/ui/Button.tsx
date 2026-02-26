import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  gtmId?: string; // Specific ID for GTM tracking
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  gtmId,
  ...props 
}) => {
  const baseStyles = "font-semibold rounded transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-nova-orange text-white hover:bg-orange-600 focus:ring-nova-orange",
    secondary: "bg-nova-blue text-white hover:bg-blue-900 focus:ring-nova-blue",
    outline: "border-2 border-nova-blue text-nova-blue hover:bg-nova-blue hover:text-white focus:ring-nova-blue",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      id={gtmId}
      data-testid={gtmId}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;