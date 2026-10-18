import type { VercelRequest, VercelResponse } from '@vercel/node';
import { begin, allowRequest, parseAttribution, digest, redis, RETENTION_SECONDS } from '../server/research.js';
export default async function handler(req: VercelRequest, res: VercelResponse) {
 const body=begin(req,res); if(!body) return;
 let a; try { a=parseAttribution(body.attribution); } catch { res.status(400).json({error:'invalid'}); return; }
 try {
  if(!await allowRequest(req,'visit')) { res.status(429).json({error:'rate'}); return; }
  const {visitorId,...attribution}=a;
  const visitorHash=digest(visitorId);
  const key=`moni:${a.isTest?'test':'live'}:visit:${visitorHash}:${a.source}:${a.variant}`;
  await redis(['SET',key,JSON.stringify({visitorHash,...attribution,createdAt:new Date().toISOString()}),'EX',RETENTION_SECONDS,'NX']);
  res.status(200).json({ok:true});
 } catch { res.status(503).json({error:'temporarily-unavailable'}); }
}
