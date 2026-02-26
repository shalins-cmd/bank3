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

import type { AllGTMEvents } from './services/gtmService';

// Extend window interface for GTM dataLayer
declare global {
  interface Window {
    dataLayer: AllGTMEvents[];
  }
}