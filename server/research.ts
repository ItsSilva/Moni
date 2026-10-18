import { createHmac } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
export const RETENTION_SECONDS = 180 * 86400;
export const NOTICE_VERSION = 'moni-interest-v1';
type RecordValue = Record<string, unknown>;
export function object(value: unknown): RecordValue {
 if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid');
 return value as RecordValue;
}
export function parseAttribution(value: unknown) {
 const a = object(value);
 if (!['a','b'].includes(String(a.variant)) || !['a','b'].includes(String(a.firstVariant)) || !['campaign','direct'].includes(String(a.source)) || typeof a.crossExposure !== 'boolean' || typeof a.isTest !== 'boolean' || typeof a.visitorId !== 'string' || !/^[a-f0-9-]{36}$/.test(a.visitorId)) throw new Error('invalid');
 const campaign: Record<string,string> = {};
 const c = object(a.campaign);
 for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
  if (typeof c[key] === 'string') campaign[key] = c[key].slice(0,160);
 }
 return { variant:a.variant as 'a'|'b', firstVariant:a.firstVariant as 'a'|'b', source:a.source as 'campaign'|'direct', crossExposure:a.crossExposure, isTest:a.isTest, visitorId:a.visitorId, campaign };
}
export function parseLead(value: unknown) {
 const d = object(value);
 if (typeof d.email !== 'string') throw new Error('invalid');
 const email = d.email.trim().toLowerCase();
 if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || d.adult !== true || d.consent !== true || !['cali','other'].includes(String(d.city)) || !['8-11','12-14','both','outside'].includes(String(d.age)) || !['yes','maybe','no'].includes(String(d.willingness))) throw new Error('invalid');
 return { email, city:d.city as string, age:d.age as string, willingness:d.willingness as string, adult:true, consent:true, eligible:d.city === 'cali' && d.age !== 'outside', attribution:parseAttribution(d.attribution) };
}
export function digest(value: string) { return createHmac('sha256', process.env.LEAD_HASH_SECRET!).update(value).digest('hex'); }
export async function redis<T>(command: (string|number)[]): Promise<T> {
 const result = await fetch(process.env.UPSTASH_REDIS_REST_URL!, { method:'POST', headers:{ Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type':'application/json' }, body:JSON.stringify(command), signal:AbortSignal.timeout(8000) });
 if (!result.ok) throw new Error('storage');
 const payload = await result.json() as {result:T; error?:string};
 if (payload.error) throw new Error('storage');
 return payload.result;
}
export function begin(req: VercelRequest, res: VercelResponse): RecordValue | null {
 res.setHeader('Cache-Control','no-store');
 if(req.method !== 'POST') { res.setHeader('Allow','POST'); res.status(405).json({error:'method'}); return null; }
 if (req.headers['sec-fetch-site'] === 'cross-site') { res.status(403).json({error:'origin'}); return null; }
 if (!String(req.headers['content-type']).startsWith('application/json')) { res.status(415).json({error:'content-type'}); return null; }
 if (!process.env.UPSTASH_REDIS_REST_URL?.startsWith('https://') || !process.env.UPSTASH_REDIS_REST_TOKEN || (process.env.LEAD_HASH_SECRET?.length ?? 0) < 32 || !process.env.VITE_DATA_CONTROLLER || !process.env.VITE_CONTACT_EMAIL) { res.status(503).json({error:'not-configured'}); return null; }
 try {
  if (Buffer.byteLength(typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})) > 8192) { res.status(413).json({error:'too-large'}); return null; }
  return object(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
 } catch { res.status(400).json({error:'invalid'}); return null; }
}
export async function allowRequest(req: VercelRequest, kind: 'lead'|'visit') {
 // Only a platform-provided IP is used; raw IP addresses are never stored.
 const ip = String(req.headers['x-vercel-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0];
 const key = `moni:rate:${kind}:${digest(ip)}:${Math.floor(Date.now()/600000)}`;
 const count = await redis<number>(['EVAL',"local n = redis.call('INCR',KEYS[1]); if n == 1 then redis.call('EXPIRE',KEYS[1],600) end; return n",1,key]);
 return count <= (kind === 'lead' ? 10 : 120);
}
export const LEAD_SCRIPT = `
local old = redis.call('GET', KEYS[1])
if old then
 local stored = cjson.decode(old)
 local incoming = cjson.decode(ARGV[1])
 stored.submissions = (stored.submissions or 1) + 1
 stored.attribution.crossExposure = stored.attribution.crossExposure or incoming.attribution.crossExposure or stored.attribution.variant ~= incoming.attribution.variant
 redis.call('SET', KEYS[1], cjson.encode(stored), 'KEEPTTL')
 return 0
end
redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
return 1`;
