export type Variant = 'a' | 'b';
export type Attribution = { variant: Variant; firstVariant: Variant; crossExposure: boolean; campaign: Record<string,string>; source: 'campaign' | 'direct'; isTest: boolean; visitorId: string; expiresAt: number };
export function getAttribution(search: string, previous?: Attribution | null, now = Date.now()): Attribution {
 const p = new URLSearchParams(search);
 const explicit = p.get('variant') === 'a' || p.get('variant') === 'b';
 const variant: Variant = p.get('variant') === 'b' ? 'b' : 'a';
 const prior = previous && previous.expiresAt > now && /^[a-f0-9-]{36}$/.test(previous.visitorId) && ['a','b'].includes(previous.firstVariant) ? previous : null;
 const campaign: Record<string,string> = {};
 for (const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
  const value = p.get(k); if (value) campaign[k] = value.slice(0,160);
 }
 return { variant, firstVariant: prior?.firstVariant ?? variant, crossExposure: Boolean(prior?.crossExposure || (prior && prior.firstVariant !== variant)), campaign, source: explicit ? 'campaign' : 'direct', isTest: p.get('test') === '1', visitorId: prior?.visitorId ?? crypto.randomUUID(), expiresAt: prior?.expiresAt ?? now + 30*86400000 };
}
export function loadAttribution() {
 let previous: Attribution | null = null;
 try { previous = JSON.parse(localStorage.getItem('moni-research') || 'null'); } catch { /* Storage may be disabled. */ }
 const current = getAttribution(location.search, previous);
 try { localStorage.setItem('moni-research', JSON.stringify(current)); } catch { /* Form works; visitor counts may overestimate. */ }
 return current;
}
