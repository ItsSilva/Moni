export type Variant = 'a' | 'b';
export type Attribution = { variant: Variant; firstVariant: Variant; crossExposure: boolean; campaign: Record<string,string>; source: 'campaign' | 'direct'; isTest: boolean; visitorId: string; expiresAt: number };
function randomId():string {
 if(typeof crypto.randomUUID==='function')return crypto.randomUUID();
 const bytes=crypto.getRandomValues(new Uint8Array(16));
 bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
 const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
 return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
export function getAttribution(search: string, previous?: Attribution | null, now = Date.now()): Attribution {
 const p = new URLSearchParams(search);
 const explicit = p.get('variant') === 'a' || p.get('variant') === 'b';
 const variant: Variant = p.get('variant') === 'b' ? 'b' : 'a';
 const prior = previous && previous.isTest === (p.get('test') === '1') && previous.expiresAt > now && /^[a-f0-9-]{36}$/.test(previous.visitorId) && ['a','b'].includes(previous.firstVariant) ? previous : null;
 const campaign: Record<string,string> = {};
 for (const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
  const value = p.get(k); if (value) campaign[k] = value.slice(0,160);
 }
 return { variant, firstVariant: prior?.firstVariant ?? variant, crossExposure: Boolean(prior?.crossExposure || (prior && prior.firstVariant !== variant)), campaign, source: explicit ? 'campaign' : 'direct', isTest: p.get('test') === '1', visitorId: prior?.visitorId ?? randomId(), expiresAt: prior?.expiresAt ?? now + 30*86400000 };
}
export function loadAttribution() {
 const key=new URLSearchParams(location.search).get('test')==='1'?'moni-research-v2-test':'moni-research-v2-live';
 let previous: Attribution | null = null;
 try { previous = JSON.parse(localStorage.getItem(key) || 'null'); } catch { /* Storage may be disabled. */ }
 const current = getAttribution(location.search, previous);
 try { localStorage.setItem(key, JSON.stringify(current)); } catch { /* Form works; visitor counts may overestimate. */ }
 return current;
}
