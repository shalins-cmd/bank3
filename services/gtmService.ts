/**
 * Enterprise-grade GTM (Google Tag Manager) dataLayer service
 * Provides type-safe event pushing with SSR safety and development warnings
 */

// GTM Event Types
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export interface NavigationEvent extends GTMEvent {
  event: 'navigation_click';
  nav_item_label: string;
  nav_item_path: string;
  login_status?: 'logged_in' | 'guest';
}

export interface PromoEvent extends GTMEvent {
  event: 'promo_click';
  promo_id: string;
}

export interface LoginEvent extends GTMEvent {
  event: 'login_step_complete';
  step: number;
  method: string;
}

export interface FormEvent extends GTMEvent {
  event: 'form_submit' | 'page_view';
  form_name?: string;
  page_title?: string;
}

export interface TransactionEvent extends GTMEvent {
  event: 'transaction_complete' | 'transaction_start';
  transaction_type?: string;
  transaction_id?: string;
}

export interface ProductEvent extends GTMEvent {
  event: 'product_view' | 'download_brochure';
  product?: string;
  product_category?: string;
}

export type AllGTMEvents = 
  | NavigationEvent 
  | PromoEvent 
  | LoginEvent 
  | FormEvent 
  | TransactionEvent 
  | ProductEvent 
  | GTMEvent;

/**
 * Safely push an event to the GTM dataLayer
 * 
 * Features:
 * - Type-safe event pushing
 * - SSR-safe (checks for window existence)
 * - Restores the original GTM dataLayer reference (prevents React Proxy issues)
 * - Validates dataLayer is an array before pushing
 * - Development warnings for missing GTM
 * - Production-clean (no console logs in production)
 * 
 * @param event - The GTM event object to push
 * @returns true if event was pushed, false otherwise
 */
export function pushGTMEvent(event: AllGTMEvents): boolean {
  // SSR Safety: Check if window exists (prevents SSR errors)
  if (typeof window === 'undefined') {
    return false;
  }

  // CRITICAL: Restore the original GTM dataLayer reference
  // This prevents React's Proxy from breaking GTM event detection
  if (window.__GTM_DATA_LAYER__) {
    window.dataLayer = window.__GTM_DATA_LAYER__;
  }

  // Check if dataLayer exists and is an array
  if (!window.dataLayer || !Array.isArray(window.dataLayer)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[GTM] dataLayer is not initialized or is not an array. ' +
        'Ensure GTM is properly configured and initialized.'
      );
    }
    return false;
  }

  try {
    window.dataLayer.push(event);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GTM] Failed to push event to dataLayer:', error);
    }
    return false;
  }
}

/**
 * Helper function to push a navigation event
 */
export function pushNavigationEvent(
  label: string, 
  path: string, 
  isLoggedIn: boolean = false
): boolean {
  return pushGTMEvent({
    event: 'navigation_click',
    nav_item_label: label,
    nav_item_path: path,
    login_status: isLoggedIn ? 'logged_in' : 'guest'
  });
}

/**
 * Helper function to push a promo click event
 */
export function pushPromoEvent(promoId: string): boolean {
  return pushGTMEvent({
    event: 'promo_click',
    promo_id: promoId
  });
}

/**
 * Helper function to push a form/page view event
 */
export function pushPageViewEvent(pageTitle: string): boolean {
  return pushGTMEvent({
    event: 'page_view',
    page_title: pageTitle
  });
}

/**
 * Helper function to push a product event
 */
export function pushProductEvent(
  eventType: 'product_view' | 'download_brochure',
  product: string,
  category?: string
): boolean {
  return pushGTMEvent({
    event: eventType,
    product,
    product_category: category
  });
}

/**
 * Declare window properties for GTM
 */
declare global {
  interface Window {
    dataLayer?: any[];
    __GTM_DATA_LAYER__?: any[]; // Stored reference to prevent React Proxy wrapping
  }
}
