// Contact arrives through stdin so it is not placed in shell history.
import {createHmac} from 'node:crypto';
let email='';for await(const chunk of process.stdin)email+=chunk;
email=email.trim().toLowerCase();if(!email.includes('@')||!process.env.LEAD_HASH_SECRET)throw new Error('Correo o configuración inválidos');
const hash=createHmac('sha256',process.env.LEAD_HASH_SECRET).update(email).digest('hex');
const r=await fetch(process.env.UPSTASH_REDIS_REST_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(['DEL',`moni:live:lead:${hash}`,`moni:test:lead:${hash}`,`moni:live:v2:lead:${hash}`,`moni:test:v2:lead:${hash}`])});
const result=await r.json();if(!r.ok||result.error)throw new Error('No se pudo completar la eliminación');console.log('Solicitud de eliminación procesada.');
