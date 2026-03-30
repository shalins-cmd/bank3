import { NavItem, Product } from './types';

export const NAVIGATION: NavItem[] = [
  {
    label: 'Accounts',
    path: '/accounts',
    subItems: [
      { label: 'Savings Account', path: '/personal/savings' },
      { label: 'Salary Accounts', path: '/personal/salary' },
      { label: 'Current Account', path: '/business/current' },
    ]
  },
  {
    label: 'Cards',
    path: '/cards',
    subItems: [
      { label: 'Credit Cards', path: '/personal/cards' },
      { label: 'Debit Cards', path: '/personal/debit' },
      { label: 'Forex Cards', path: '/personal/forex' },
    ]
  },
  {
    label: 'Loans',
    path: '/loans',
    subItems: [
      { label: 'Home Loans', path: '/personal/loans' },
      { label: 'Personal Loans', path: '/personal/personal-loans' },
      { label: 'Car Loans', path: '/personal/car-loans' },
    ]
  },
  {
    label: 'Calculators',
    path: '/calculators',
    subItems: [
      { label: 'FD Calculator', path: '/calculators/fd' },
      { label: 'EMI Calculator', path: '/calculators/emi' },
    ]
  },
  {
    label: 'Support',
    path: '/support',
    subItems: [
      { label: 'Contact Us', path: '/support/contact' },
      { label: 'Locate Branch', path: '/support/locate' },
    ]
  }
];

export const LOGGED_IN_NAVIGATION: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'Payments',
    path: '/transfer',
    subItems: [
        { label: 'Transfer Funds', path: '/transfer' },
        { label: 'Pay Bills', path: '/bill-pay' },
        { label: 'Recharge', path: '/bill-pay?cat=mobile' }
    ]
  },
  {
    label: 'Invest',
    path: '/invest',
    subItems: [
        { label: 'Open FD', path: '/calculators/fd' },
        { label: 'Mutual Funds', path: '/offers' }
    ]
  },
  {
    label: 'Exclusive Offers',
    path: '/offers',
  }
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod_savings_platinum',
    title: 'Platinum Savings',
    description: 'Earn up to 7% interest p.a. with our premium savings account.',
    icon: 'wallet',
    category: 'personal',
    link: '/personal/savings'
  },
  {
    id: 'prod_loan_home',
    title: 'Home Loans',
    description: 'Low interest rates starting at 8.50% for your dream home.',
    icon: 'home',
    category: 'loans',
    link: '/personal/loans'
  },
  {
    id: 'prod_card_ruby',
    title: 'Ruby Credit Card',
    description: 'Lifetime free credit card with exclusive travel benefits.',
    icon: 'credit-card',
    category: 'personal',
    link: '/personal/cards'
  },
  {
    id: 'prod_insurance_life',
    title: 'Life Secure',
    description: 'Protect your family with cover up to ₹1 Crore.',
    icon: 'shield',
    category: 'personal',
    link: '/personal/insurance'
  }
];