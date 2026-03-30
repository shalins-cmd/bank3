export interface Product {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  category: 'personal' | 'business' | 'loans';
}

export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Extend window interface for GTM dataLayer
// we only need a generic any[] since events are validated by pushToDataLayer

declare global {
  interface Window {
    dataLayer?: any[];
  }
}