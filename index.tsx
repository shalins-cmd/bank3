import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// CRITICAL: Preserve the original GTM dataLayer reference BEFORE React initializes
// GTM script (in index.html) creates window.dataLayer before this code runs
// We store it to prevent React from wrapping it in a Proxy
window.dataLayer = window.dataLayer || [];
window.__GTM_DATA_LAYER__ = window.dataLayer;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// After React renders, ensure we restore the original GTM dataLayer reference
// This prevents React's Proxy from breaking GTM event detection
if (window.__GTM_DATA_LAYER__) {
  window.dataLayer = window.__GTM_DATA_LAYER__;
}