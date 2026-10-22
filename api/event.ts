import type { VercelRequest, VercelResponse } from '@vercel/node';
import { begin, allowRequest, parseAttribution, digest, redis, RETENTION_SECONDS, NOTICE_VERSION } from '../server/research.js';
const placements: Record<string,readonly string[]> = {
 cta_click:['header','hero','product'], form_start:['form'], engaged_visit:['page'], faq_open:['faq']
};
export default async function handler(req:VercelRequest,res:VercelResponse){
 const body=begin(req,res);if(!body)return;
 if(typeof body.name!=='string'||typeof body.placement!=='string'||!Object.hasOwn(placements,body.name)||!placements[body.name].includes(body.placement)){res.status(400).json({error:'invalid'});return;}
 let a;try{a=parseAttribution(body.attribution);}catch{res.status(400).json({error:'invalid'});return;}
 try{
  if(!await allowRequest(req,'event')){res.status(429).json({error:'rate'});return;}
  const {visitorId,...attribution}=a;const visitorHash=digest(visitorId);
  // Unique browsers per action/placement, not a count of repeated clicks.
  const key=`moni:${a.isTest?'test':'live'}:v2:event:${visitorHash}:${a.source}:${a.variant}:${body.name}:${body.placement}`;
  await redis(['SET',key,JSON.stringify({visitorHash,...attribution,name:body.name,placement:body.placement,createdAt:new Date().toISOString(),noticeVersion:NOTICE_VERSION}),'EX',RETENTION_SECONDS,'NX']);
  res.status(200).json({ok:true});
 }catch{res.status(503).json({error:'temporarily-unavailable'});}
}
