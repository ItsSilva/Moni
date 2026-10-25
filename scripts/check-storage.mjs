// Deployment verification uses only disposable test keys, never live research records.
import { randomUUID } from 'node:crypto';
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_URL ? process.env.UPSTASH_REDIS_REST_TOKEN : process.env.KV_REST_API_TOKEN;
const enabled = process.env.VITE_REGISTRATION_ENABLED === 'true';
if (!url || !token) {
 if (enabled) throw new Error('Registration requires a configured Redis REST connection.');
 console.log('Storage check skipped: registration is paused and no database is configured.');
 process.exit(0);
}
if (enabled && ((process.env.LEAD_HASH_SECRET?.length ?? 0) < 32 || !process.env.VITE_DATA_CONTROLLER || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.VITE_CONTACT_EMAIL || ''))) {
 throw new Error('Registration requires contact, controller and a stable identifier secret.');
}
async function command(args) {
 const response = await fetch(url, {method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(args),signal:AbortSignal.timeout(8000)});
 if (!response.ok) throw new Error('Storage verification request failed.');
 const data = await response.json();
 if (data.error) throw new Error('Storage verification command failed.');
 return data.result;
}
const key = `moni:test:v2:probe:${randomUUID()}`;
const value = JSON.stringify({kind:'deployment-check',nonce:randomUUID()});
try {
 if (await command(['PING']) !== 'PONG') throw new Error('Storage ping failed.');
 if (await command(['EVAL',"return redis.call('SET', KEYS[1], ARGV[1], 'EX', 60, 'NX')",1,key,value]) !== 'OK') throw new Error('Storage write failed.');
 if (await command(['GET',key]) !== value) throw new Error('Storage read-back failed.');
 const ttl = await command(['TTL',key]);
 if (ttl <= 0 || ttl > 60) throw new Error('Storage expiration failed.');
 console.log('Storage verification passed: PING, Lua write, exact read-back and expiration.');
} finally {
 // This key belongs only to this run; EX 60 remains a fallback if cleanup fails.
 await command(['DEL',key]);
}
