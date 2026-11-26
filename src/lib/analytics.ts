/**
 * Lead-event instrumentation for GTM (GTM-KB2QR723, loaded in index.html).
 *
 * The site pushes two custom events to window.dataLayer. GTM tags are wired to
 * these event names, so do not rename them without updating the container:
 *
 *   phone_click    { phone_number, page_path }  any tel: link clicked
 *   generate_lead  { form_source }              Formspree accepted a submission
 *
 * Browser-only. Every function is a no-op during SSR/prerender.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushDataLayer(payload: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Call only after Formspree returns a 2xx response. */
export function trackGenerateLead(formSource: 'homepage' | 'contact'): void {
  pushDataLayer({ event: 'generate_lead', form_source: formSource });
}

let phoneTrackingInstalled = false;

/**
 * One delegated, capture-phase click listener on the document, so every tel:
 * link on every page (header, footer, CTAs, body copy) is covered without
 * touching individual components, including links rendered after hydration.
 */
export function installPhoneClickTracking(): void {
  if (typeof document === 'undefined' || phoneTrackingInstalled) return;
  phoneTrackingInstalled = true;

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href^="tel:" i]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      pushDataLayer({
        event: 'phone_click',
        phone_number: href.replace(/^tel:/i, ''),
        page_path: window.location.pathname,
      });
    },
    { capture: true }
  );
}
