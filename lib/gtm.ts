/**
 * GTM-Compliant dataLayer Utility
 * 
 * This module provides a safe, production-ready way to push events to Google Tag Manager.
 * 
 * IMPORTANT PRINCIPLES:
 * 1. NEVER override window.dataLayer.push - this breaks GTM's internal mechanisms
 * 2. ALWAYS push plain objects with an "event" property
 * 3. Let GTM handle all dataLayer logic - we just provide clean data
 * 4. Check for typeof window to ensure SSR safety (CMS, Next.js, Vite SSR)
 * 5. Only fire events from useEffect or event handlers, never during module evaluation
 */

/**
 * Base GTM event interface
 * Every event MUST have an "event" property with the event name
 */
export interface GTMEventObject {
  event: string;
  [key: string]: any;
}

/**
 * Initialize window.dataLayer if it doesn't exist
 * This function is safe and idempotent - can be called multiple times
 * 
 * NOTE: The GTM script tag should already create dataLayer[] before this runs,
 * but this provides a fallback for development/testing scenarios
 */
function initDataLayer(): void {
  if (typeof window === 'undefined') { 
    return;
  }
  
  // CRITICAL: Restore the original GTM dataLayer reference
  // This prevents React's Proxy from intercepting GTM event detection
  if (window.__GTM_DATA_LAYER__) {
    window.dataLayer = window.__GTM_DATA_LAYER__;
  } else {
    // Fallback if no stored reference (shouldn't happen in normal operation)
    window.dataLayer = window.dataLayer || [];
    window.__GTM_DATA_LAYER__ = window.dataLayer;
  }
}

/**
 * Push a GTM event to the dataLayer
 * 
 * This is the ONLY function you need to track events in your app.
 * It ensures:
 * - SSR safety (checks for window)
 * - dataLayer is initialized
 * - Only plain objects are pushed
 * - Event property is always present
 * - No override of push method
 * - Production-ready error handling
 * 
 * @param eventName - The event name (e.g., "promo_click", "form_submit")
 * @param params - Optional event parameters/context
 * 
 * @example
 * // Inside a click handler
 * <button onClick={() => pushToDataLayer("promo_click", { promo_id: "summer2024" })}>
 *   View Offer
 * </button>
 * 
 * @example
 * // Inside useEffect for page views in SPA
 * useEffect(() => {
 *   pushToDataLayer("page_view", { page_title: "Dashboard", page_path: "/dashboard" });
 * }, [location.pathname]);
 */
export function pushToDataLayer(
  eventName: string,
  params?: Record<string, any>
): void {
  // SSR Safety: Exit silently if window is undefined (server-side rendering)
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize dataLayer if needed (backup for edge cases)
  initDataLayer();

  try {
    // CRITICAL: Before pushing, ensure we have the original GTM dataLayer reference
    // This is essential because React may have wrapped it in a Proxy
    if (window.__GTM_DATA_LAYER__) {
      window.dataLayer = window.__GTM_DATA_LAYER__;
    }

    // Construct the event object
    // The "event" property MUST be first and always present - GTM requires this
    const eventObject: GTMEventObject = {
      event: eventName,
      ...params
    };

    // Push the plain object to dataLayer
    // CRITICAL: We use the push method directly on the original, un-proxied dataLayer.
    // GTM's dataLayer expects to receive plain objects via push()
    window.dataLayer.push(eventObject);

    // Development logging (removed in production builds)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GTM] Event pushed: "${eventName}"`, params || {});
    }
  } catch (error) {
    // Fail silently in production, but warn in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[GTM] Failed to push "${eventName}":`, error);
    }
  }
}

/**
 * Declare window properties for GTM
 * Extend the global Window interface to include dataLayer and storage reference
 */
declare global {
  interface Window {
    dataLayer?: any[];
    __GTM_DATA_LAYER__?: any[]; // Stored reference to prevent React Proxy wrapping
  }
}
