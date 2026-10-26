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
  // Normalize only a clone's external placement: the product CSS and inner geometry stay untouched.
  for(const [name,selector] of [['hero','.hero-product'],['apps','.app-preview']]){
   await page.locator(selector).evaluate(el=>{const c=el.cloneNode(true);c.id='qa-product';c.style.cssText='position:fixed;left:0;top:0;width:600px;max-width:none;margin:0;z-index:99999;background:#f2f5ff;color:#101828';document.body.append(c);c.querySelector('.preview-canvas').style.width='600px';c.querySelector('.canvas-content').style.transform='scale(1)';});
   await page.locator('#qa-product').screenshot({path:`${out}/${variant}-product-${name}.png`});
   await page.locator('#qa-product').evaluate(el=>el.remove());
  }
 }
 await page.close();
}
await writeFile(`${out}/metrics.json`,JSON.stringify(metrics,null,2));await browser.close();console.log(metrics);
