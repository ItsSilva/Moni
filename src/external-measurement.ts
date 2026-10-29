import { analyticsLocation, CONSENT_KEY, CONSENT_TTL, DENIED, measurementConfig, readConsent, type Choices } from './measurement-policy';

type Command = (...args: unknown[]) => void;
type Pixel = Command & { queue: unknown[][]; loaded: boolean; version: string; callMethod?: Command; push?: Command };
type VendorWindow = Window & { dataLayer?: unknown[]; gtag?: Command; fbq?: Pixel; _fbq?: Pixel };
const vendors = window as VendorWindow;
export const measurement = measurementConfig(import.meta.env, location.href);
let current: Choices = DENIED;
let gaReady = false, metaReady = false, gaViewed = false, metaViewed = false;
const scripts = new Map<string, Promise<void>>();

export function savedChoices() {
  try { return readConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

function loadScript(src: string) {
  if (!scripts.has(src)) {
    scripts.set(src, new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true; script.src = src;
      script.onload = () => resolve();
      script.onerror = () => { script.remove(); scripts.delete(src); reject(new Error('Measurement unavailable')); };
      document.head.append(script);
    }));
  }
  return scripts.get(src)!;
}

function clearCookies(prefix: RegExp) {
  try { for (const item of document.cookie.split(';')) {
    const name = item.split('=')[0].trim();
    if (!prefix.test(name)) continue;
    const domains = ['', location.hostname, '.' + location.hostname];
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? '; Domain=' + domain : ''}`;
  } } catch { /* Cookie access can be blocked; registration must remain usable. */ }
}

async function startGoogle() {
  if (!vendors.gtag) {
    vendors.dataLayer = [];
    vendors.gtag = function () { vendors.dataLayer!.push(arguments); };
    vendors.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    vendors.gtag('js', new Date());
  }
  await loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurement.gaId}`);
  if (!current.analytics) return;
  vendors.gtag('consent', 'update', { analytics_storage: 'granted' });
  if (!gaReady) {
    gaReady = true;
    vendors.gtag('config', measurement.gaId, { send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, cookie_expires: 60 * 60 * 24 * 180, cookie_update: false,
      page_location: analyticsLocation(location.href), page_referrer: '', page_title: 'Moni' });
  }
  if (!gaViewed) {
    gaViewed = true;
    vendors.gtag('event', 'page_view', { send_to: measurement.gaId, page_location: analyticsLocation(location.href), page_referrer: '', page_title: 'Moni' });
  }
}

async function startMeta() {
  if (!vendors.fbq) {
    const pixel: Pixel = Object.assign(function (...args: unknown[]) {
      if (pixel.callMethod) pixel.callMethod(...args); else pixel.queue.push(args);
    }, { queue: [] as unknown[][], loaded: true, version: '2.0' });
    pixel.push = pixel; vendors.fbq = pixel; vendors._fbq = pixel;
  }
  await loadScript('https://connect.facebook.net/en_US/fbevents.js');
  if (!current.ads) return;
  vendors.fbq('consent', 'grant');
  if (!metaReady) {
    metaReady = true;
    vendors.fbq('set', 'autoConfig', false, measurement.metaId);
    vendors.fbq('init', measurement.metaId);
  }
  if (!metaViewed) { metaViewed = true; vendors.fbq('trackSingle', measurement.metaId, 'PageView'); }
}

export function applyChoices(choices: Choices) {
  if (!measurement.enabled) return;
  current = { analytics: choices.analytics && Boolean(measurement.gaId), ads: choices.ads && Boolean(measurement.metaId) };
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurement.gaId}`] = !current.analytics;
  if (current.analytics) void startGoogle().catch(() => {});
  else {
    vendors.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    clearCookies(/^_ga(?:_|$)/);
  }
  if (current.ads) void startMeta().catch(() => {});
  else { vendors.fbq?.('consent', 'revoke'); clearCookies(/^_fb[pc]$/); }
}

export function saveChoices(choices: Choices) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...choices, version: 1, expiresAt: Date.now() + CONSENT_TTL })); } catch { /* Session-only choice if storage is unavailable. */ }
  applyChoices(choices);
}

export function watchChoices(onChange: (choices: Choices | null) => void) {
  const sync = () => { const saved = savedChoices(); applyChoices(saved || DENIED); onChange(saved); };
  const storage = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) sync(); };
  const visibility = () => { if (document.visibilityState === 'visible') sync(); };
  window.addEventListener('storage', storage); document.addEventListener('visibilitychange', visibility);
  return () => { window.removeEventListener('storage', storage); document.removeEventListener('visibilitychange', visibility); };
}
