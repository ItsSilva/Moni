// Run locally with private environment variables. Never expose a public export endpoint.
import {writeFile} from 'node:fs/promises';
const destination=process.argv[2];
if(!destination) throw new Error('Uso: node --env-file=.env.local scripts/export-results.mjs ./exports/resultados.json [--include-contacts]');
const includeContacts=process.argv.includes('--include-contacts');
async function redis(command){
 const r=await fetch(process.env.UPSTASH_REDIS_REST_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(command)});
 if(!r.ok)throw new Error('No se pudo consultar el almacenamiento');
 const payload=await r.json();if(payload.error)throw new Error('Error de consulta');return payload.result;
}
const keys=new Set();let cursor='0';
do{const [next,batch]=await redis(['SCAN',cursor,'MATCH','moni:live:*','COUNT',100]);cursor=String(next);batch.forEach(k=>keys.add(k));}while(cursor!=='0');
const records=[];
for(const key of keys){const raw=await redis(['GET',key]);if(raw)records.push({key,data:JSON.parse(raw)});}
const leads=records.filter(r=>r.key.includes(':lead:')).map(r=>r.data);
const visits=records.filter(r=>r.key.includes(':visit:')).map(r=>r.data);
const summary={};
for(const variant of ['a','b']){
 const visitorIds=new Set(visits.filter(v=>v.source==='campaign'&&v.variant===variant).map(v=>v.visitorHash));
 const contacts=leads.filter(l=>l.attribution.source==='campaign'&&l.attribution.variant===variant);
 const eligible=contacts.filter(l=>l.eligible);
 summary[variant]={uniqueBrowsers:visitorIds.size,uniqueRegistrations:contacts.length,eligibleRegistrations:eligible.length,duplicates:contacts.reduce((sum,l)=>sum+(l.submissions-1),0),ineligible:contacts.length-eligible.length,crossExposure:contacts.filter(l=>l.attribution.crossExposure).length,eligibleWithoutRecordedVisit:eligible.filter(l=>!visitorIds.has(l.visitorHash)).length,conversionPercent:visitorIds.size?eligible.length/visitorIds.size*100:null};
}
const {createHash}=await import('node:crypto');
// Use stable anonymous IDs only in this export; addresses require an explicit flag.
const report={exportedAt:new Date().toISOString(),summary,directRegistrations:leads.filter(l=>l.attribution.source==='direct').length,notes:['Visitantes únicos significa navegadores con identificador de 30 días, no personas verificadas.','Bloqueo/borrado del almacenamiento, dispositivos múltiples y fallos de medición afectan el denominador.','Pruebas quedan separadas en moni:test:*; spam bloqueado no se guarda como contacto.','Revisar y documentar exclusiones del equipo antes de calcular resultados finales.'],leads:leads.map(({email,visitorHash,...rest})=>({...rest,anonymousId:createHash('sha256').update(visitorHash).digest('hex'),...(includeContacts?{email}:{})})),visits:visits.map(({visitorHash,...rest})=>({...rest,anonymousId:createHash('sha256').update(visitorHash).digest('hex')}))};
await writeFile(destination,JSON.stringify(report,null,2)+'\n',{mode:0o600});
console.log('Exportación guardada. No la subas al repositorio público.');
