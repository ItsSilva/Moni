import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAttribution } from '../src/attribution';
import { parseLead, parseAttribution, RETENTION_SECONDS } from '../server/research';
import leadHandler from '../api/lead';
import visitHandler from '../api/visit';
import eventHandler from '../api/event';
import type { VercelRequest, VercelResponse } from '@vercel/node';
const attr = () => getAttribution('?variant=a&utm_source=meta&utm_campaign=control');
const input = () => ({email:' Adult@Example.com ',city:'cali',willingness:'no',adult:true,consent:true,attribution:attr()});
const response = () => { const r = {code:0,body:undefined as unknown,setHeader:vi.fn(),status:vi.fn(),json:vi.fn()};r.status.mockImplementation((n:number)=>{r.code=n;return r;});r.json.mockImplementation((b:unknown)=>{r.body=b;return r;});return r; };
const request = (body:unknown, method='POST') => ({method,headers:{'content-type':'application/json','x-vercel-forwarded-for':'192.0.2.1'},body,socket:{}} as unknown as VercelRequest);
beforeEach(()=>{vi.stubEnv('UPSTASH_REDIS_REST_URL','https://test.invalid');vi.stubEnv('UPSTASH_REDIS_REST_TOKEN','test-token');vi.stubEnv('LEAD_HASH_SECRET','test-secret-32-characters-or-longer');vi.stubEnv('VITE_DATA_CONTROLLER','QA');vi.stubEnv('VITE_CONTACT_EMAIL','qa@example.com');});
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
describe('research quality',()=>{
 it('keeps a negative willingness response eligible',()=>expect(parseLead(input())).toMatchObject({email:'adult@example.com',eligible:true,willingness:'no'}));
 it.each([{city:'other'}])('retains ineligible contacts without counting them',change=>expect(parseLead({...input(),...change}).eligible).toBe(false));
 it.each([{consent:false},{adult:'true'},{email:'bad'},{city:'unknown'},{willingness:'unknown'},{attribution:{}}])('rejects invalid or missing authorizations: %j',change=>expect(()=>parseLead({...input(),...change})).toThrow());
 it('drops extra personal and arbitrary campaign fields',()=>{const value={...input(),childName:'Not stored'};value.attribution.campaign={utm_source:'meta',email:'do not store'};expect(parseLead(value)).not.toHaveProperty('childName');expect(parseLead(value).attribution.campaign).toEqual({utm_source:'meta'});});
 it('requires a valid visitor identifier',()=>expect(()=>parseAttribution({...attr(),visitorId:'x'})).toThrow());
 it('retains first exposure when viewing both variants',()=>{const a=attr();const b=getAttribution('?variant=b',a);expect(b).toMatchObject({variant:'b',firstVariant:'a',crossExposure:true,visitorId:a.visitorId});});
 it('does not reassign direct traffic to a prior campaign',()=>expect(getAttribution('',attr())).toMatchObject({variant:'a',source:'direct',campaign:{}}));
 it('starts a new identifier after expiration',()=>{const a=attr();expect(getAttribution('?variant=b',a,a.expiresAt+1)).toMatchObject({firstVariant:'b',crossExposure:false});expect(getAttribution('',a,a.expiresAt+1).visitorId).not.toBe(a.visitorId);});
 it('isolates test visits and limits UTM size',()=>expect(getAttribution('?variant=bogus&test=1&utm_source='+ 'x'.repeat(300))).toMatchObject({source:'direct',isTest:true,campaign:{utm_source:'x'.repeat(160)}}));
});
describe('API behavior',()=>{
 it('saves only after validation, with server date, retention and deduplication key',async()=>{
  const fetcher=vi.fn().mockResolvedValueOnce({ok:true,json:async()=>({result:1})}).mockResolvedValueOnce({ok:true,json:async()=>({result:1})});vi.stubGlobal('fetch',fetcher);
  const res=response();await leadHandler(request(input()),res as unknown as VercelResponse);
  expect(res.code).toBe(200);const command=JSON.parse(fetcher.mock.calls[1][1].body);expect(command[0]).toBe('EVAL');expect(command[3]).toMatch(/^moni:live:v2:lead:[a-f0-9]{64}$/);expect(command[5]).toBe(RETENTION_SECONDS);
  const saved=JSON.parse(command[4]);expect(saved).toMatchObject({email:'adult@example.com',noticeVersion:'moni-interest-v2',eligible:true});expect(saved.attribution).not.toHaveProperty('visitorId');expect(saved.createdAt).toMatch(/^20/);
 });
 it('returns the same response for duplicates',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValueOnce({ok:true,json:async()=>({result:1})}).mockResolvedValueOnce({ok:true,json:async()=>({result:0})}));const res=response();await leadHandler(request(input()),res as unknown as VercelResponse);expect(res.body).toEqual({ok:true});});
 it('never shows success when persistence fails',async()=>{vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));const res=response();await leadHandler(request(input()),res as unknown as VercelResponse);expect(res.code).toBe(503);});
 it('fails closed without backend configuration',async()=>{vi.stubEnv('LEAD_HASH_SECRET','');const res=response();await leadHandler(request(input()),res as unknown as VercelResponse);expect(res.code).toBe(503);});
 it('rejects cross-site submissions',async()=>{const req=request(input());req.headers['sec-fetch-site']='cross-site';const res=response();await leadHandler(req,res as unknown as VercelResponse);expect(res.code).toBe(403);});
 it('applies shared rate limits before writes',async()=>{const f=vi.fn().mockResolvedValue({ok:true,json:async()=>({result:11})});vi.stubGlobal('fetch',f);const res=response();await leadHandler(request(input()),res as unknown as VercelResponse);expect(res.code).toBe(429);expect(f).toHaveBeenCalledTimes(1);});
 it('rejects honeypot and invalid consent before network calls',async()=>{const f=vi.fn();vi.stubGlobal('fetch',f);for(const change of [{website:'spam'},{consent:false}]){const res=response();await leadHandler(request({...input(),...change}),res as unknown as VercelResponse);expect(res.code).toBe(400);}expect(f).not.toHaveBeenCalled();});
 it('deduplicates test visits with SET NX and TTL',async()=>{const f=vi.fn().mockResolvedValue({ok:true,json:async()=>({result:1})});vi.stubGlobal('fetch',f);const res=response();await visitHandler(request({attribution:getAttribution('?variant=b&test=1')}),res as unknown as VercelResponse);expect(res.code).toBe(200);const command=JSON.parse(f.mock.calls[1][1].body);expect(command[1]).toMatch(/^moni:test:v2:visit:/);expect(command.slice(-3)).toEqual(['EX',RETENTION_SECONDS,'NX']);});
 it('rejects unsupported methods',async()=>{const res=response();await leadHandler(request({},'GET'),res as unknown as VercelResponse);expect(res.code).toBe(405);});
});

describe('mentor revision',()=>{
 it('does not request, retain or use a supplied age',()=>{expect(parseLead(input())).toMatchObject({eligible:true});const lead=parseLead({...input(),age:'outside'});expect(lead.eligible).toBe(true);expect(lead).not.toHaveProperty('age');});
 it('isolates test browser identity from live attribution',()=>{const a=attr();const test=getAttribution('?variant=b&test=1',a);expect(test.visitorId).not.toBe(a.visitorId);expect(test.crossExposure).toBe(false);});
 it('saves only allowed event fields with TTL and deduplication',async()=>{
  const f=vi.fn().mockResolvedValue({ok:true,json:async()=>({result:1})});vi.stubGlobal('fetch',f);const res=response();
  await eventHandler(request({name:'cta_click',placement:'hero',email:'never-store@example.com',attribution:getAttribution('?variant=b&test=1')}),res as unknown as VercelResponse);
  expect(res.code).toBe(200);const command=JSON.parse(f.mock.calls[1][1].body);expect(command[1]).toMatch(/^moni:test:v2:event:/);expect(command.slice(-3)).toEqual(['EX',RETENTION_SECONDS,'NX']);const saved=JSON.parse(command[2]);expect(saved).not.toHaveProperty('email');expect(saved).not.toHaveProperty('visitorId');expect(saved).toMatchObject({name:'cta_click',placement:'hero',variant:'b',noticeVersion:'moni-interest-v2'});
 });
 it.each([{name:'__proto__',placement:'hero'},{name:'email',placement:'form'},{name:'cta_click',placement:'form'},{name:'form_start',placement:'page'}])('rejects unknown events before writing: %j',async(event)=>{const f=vi.fn();vi.stubGlobal('fetch',f);const res=response();await eventHandler(request({...event,attribution:attr()}),res as unknown as VercelResponse);expect(res.code).toBe(400);expect(f).not.toHaveBeenCalled();});
 it('reports event storage failures without reporting success',async()=>{vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));const res=response();await eventHandler(request({name:'form_start',placement:'form',attribution:attr()}),res as unknown as VercelResponse);expect(res.code).toBe(503);});
});
