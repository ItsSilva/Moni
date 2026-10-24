import { loadAttribution } from './attribution';
export const attribution = loadAttribution();
export const contact = (import.meta.env.VITE_CONTACT_EMAIL || '').trim();
export const controller = (import.meta.env.VITE_DATA_CONTROLLER || '').trim();
export const configured = import.meta.env.VITE_REGISTRATION_ENABLED !== 'false' && Boolean(controller && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact));
export type EventName = 'cta_click' | 'form_start' | 'engaged_visit' | 'faq_open';
export type EventPlacement = 'header' | 'hero' | 'product' | 'form' | 'page' | 'faq';
const sent = new Set<string>();
export function track(name:EventName,placement:EventPlacement) {
 const key=`${name}:${placement}`;
 if(!configured||sent.has(key))return;
 sent.add(key);
 fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,placement,attribution}),keepalive:true})
 .then(r=>{if(!r.ok)sent.delete(key);}).catch(()=>sent.delete(key));
}
export function startMeasurement(){
 if(!configured)return()=>{};
 fetch('/api/visit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({attribution}),keepalive:true}).catch(()=>{});
 // Ten seconds of visible time, excluding background tabs.
 let visibleMs=0;let last=performance.now();
 const interval=setInterval(()=>{const now=performance.now();if(document.visibilityState==='visible')visibleMs+=now-last;last=now;if(visibleMs>=10000){track('engaged_visit','page');clearInterval(interval);}},1000);
 return()=>clearInterval(interval);
}
