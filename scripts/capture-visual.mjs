import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
// Usage: node scripts/capture-visual.mjs <phase> [base-url]
// Always appends test=1. Local runs mock APIs; remote runs use the test namespace.
const phase=process.argv[2]||'before';
const base=process.argv[3]||'http://127.0.0.1:4173';
const out=`.qa/${phase}`;await mkdir(out,{recursive:true});
const browser=await chromium.launch();const metrics=[];
for(const variant of ['a','b'])for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',deviceScaleFactor:1});
 if(base.includes('127.0.0.1'))await page.route('**/api/**',r=>r.fulfill({json:{ok:true}}));
 await page.goto(`${base}/?variant=${variant}&test=1`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${out}/${variant}-${width}-full.png`,fullPage:true});
 await page.screenshot({path:`${out}/${variant}-${width}-hero.png`});
 metrics.push({variant,width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,height:document.body.scrollHeight,title:document.querySelector('h1').textContent}))});
 if(width===1440){
  // Producto v2: escenario del hero y pantallas de la demo, tal como se ven en la página.
  for(const [name,selector] of [['hero','.hero-stage'],['apps','.demo-screens']]){
   await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForLoadState('networkidle');
   await page.locator(selector).screenshot({path:`${out}/${variant}-product-${name}.png`});
  }
 }
 await page.close();
}
await writeFile(`${out}/metrics.json`,JSON.stringify(metrics,null,2));await browser.close();console.log(metrics);
