/**
 * GTM-Compliant dataLayer Utility
 *
 * Safe helpers for GTM + GA4 in a React SPA.
 *
 * IMPORTANT PRINCIPLES:
 * 1. Never override `window.dataLayer` or its `push` method after GTM loads
 * 2. Always push plain objects with an `event` property
 * 3. Track page views centrally on route change for SPA navigation
 * 4. Only fire events from `useEffect` or event handlers, never during module evaluation
 * 5. Keep event names in `lowercase_with_underscores` for GTM/GA4 compatibility
 */

export interface GTMEventObject {
  event: string;
  [key: string]: unknown;
}

export interface PageViewParams extends Record<string, unknown> {
  page_title?: string;
  page_path?: string;
  page_location?: string;
  page_referrer?: string;
}

function isDebugMode(): boolean {
  return typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

function initDataLayer(): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
}

function emitDebugEvent(eventObject: GTMEventObject): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<GTMEventObject>('gtm:dataLayerPush', {
      detail: eventObject,
    })
  );
}

export function pushToDataLayer(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') {
    return;
  }

  initDataLayer();

  try {
    const eventObject: GTMEventObject = {
      event: eventName,
      ...params,
    };

    window.dataLayer!.push(eventObject);
    emitDebugEvent(eventObject);

    if (isDebugMode()) {
      console.log(`[GTM] Event pushed: "${eventName}"`, params);
    }
  } catch (error) {
    if (isDebugMode()) {
      console.error(`[GTM] Failed to push "${eventName}":`, error);
    }
  }
}

export function trackPageView(params: PageViewParams = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const pagePath =
    params.page_path ??
    `${window.location.pathname}${window.location.search}${window.location.hash}`;

  pushToDataLayer('page_view', {
    page_title: params.page_title ?? document.title,
    page_path: pagePath,
    page_location: params.page_location ?? window.location.href,
    page_referrer: params.page_referrer ?? document.referrer,
    ...params,
  });
}


