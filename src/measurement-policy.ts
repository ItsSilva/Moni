export type Choices = { analytics: boolean; ads: boolean };
export const DENIED: Choices = { analytics: false, ads: false };
export const CONSENT_KEY = 'moni-measurement-v1';
export const CONSENT_TTL = 180 * 24 * 60 * 60 * 1000;

export function readConsent(value: string | null, now = Date.now()): Choices | null {
  try {
    const saved = JSON.parse(value || 'null');
    if (saved?.version !== 1 || typeof saved.analytics !== 'boolean' || typeof saved.ads !== 'boolean' ||
      !Number.isFinite(saved.expiresAt) || saved.expiresAt <= now || saved.expiresAt > now + CONSENT_TTL) return null;
    return { analytics: saved.analytics, ads: saved.ads };
  } catch { return null; }
}

export function measurementConfig(env: Record<string, unknown>, href: string) {
  const url = new URL(href);
  const ga = String(env.VITE_GA4_MEASUREMENT_ID || '');
  const meta = String(env.VITE_META_PIXEL_ID || '');
  const gaId = /^G-[A-Z0-9]{6,15}$/.test(ga) ? ga : '';
  const metaId = /^\d{5,20}$/.test(meta) ? meta : '';
  // Preview, QA and unrecognised URLs cannot enable production vendors.
  const allowedKeys = /^(variant|utm_source|utm_medium|utm_campaign|utm_content|utm_term|fbclid|gclid|test)$/;
  const safeQuery = [...url.searchParams].every(([key, value]) => allowedKeys.test(key) && /^[\w.~-]{0,256}$/.test(value));
  const enabled = env.VITE_MEASUREMENT_ENABLED === 'true' && url.hostname === env.VITE_MEASUREMENT_HOST &&
    (url.protocol === 'https:' || url.hostname === '127.0.0.1') && url.pathname === '/' &&
    !url.searchParams.has('test') && safeQuery && /^(#(inicio|contenido|registro|preguntas|como-funciona))?$/.test(url.hash);
  return { gaId, metaId, enabled: enabled && Boolean(gaId || metaId) };
}

export function analyticsLocation(href: string) {
  const source = new URL(href);
  const clean = new URL(source.origin + '/');
  for (const key of ['variant', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = source.searchParams.get(key);
    if (value && /^[\w.~-]{1,160}$/.test(value)) clean.searchParams.set(key, value);
  }
  return clean.href;
}
