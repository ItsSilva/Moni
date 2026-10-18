import type { VercelRequest, VercelResponse } from '@vercel/node';
import { begin, allowRequest, parseLead, digest, redis, RETENTION_SECONDS, NOTICE_VERSION, LEAD_SCRIPT } from '../server/research.js';
export default async function handler(req: VercelRequest, res: VercelResponse) {
 const body=begin(req,res); if(!body) return;
 if(body.website) { res.status(400).json({error:'invalid'}); return; }
 let lead; try { lead=parseLead(body); } catch { res.status(400).json({error:'invalid'}); return; }
 try {
  if(!await allowRequest(req,'lead')) { res.setHeader('Retry-After','600'); res.status(429).json({error:'rate'}); return; }
  const { visitorId, ...attribution } = lead.attribution;
  const key=`moni:${attribution.isTest?'test':'live'}:lead:${digest(lead.email)}`;
  const record={...lead,attribution,visitorHash:digest(visitorId),createdAt:new Date().toISOString(),noticeVersion:NOTICE_VERSION,submissions:1};
  await redis(['EVAL',LEAD_SCRIPT,1,key,JSON.stringify(record),RETENTION_SECONDS]);
  // Identical responses avoid revealing whether an address is already registered.
  res.status(200).json({ok:true});
 } catch { res.status(503).json({error:'temporarily-unavailable'}); }
}
