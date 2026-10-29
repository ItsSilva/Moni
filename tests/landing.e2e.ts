import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const tags=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
const cta='Únete a la lista de espera';
test.beforeEach(async({page})=>{
 await page.route('**/api/visit',r=>r.fulfill({json:{ok:true}}));
 await page.route('**/api/event',r=>r.fulfill({json:{ok:true}}));
});
for(const variant of ['a','b']) {
 test(`${variant}: accessibility, layout, assets and interactions`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`/?variant=${variant}&test=1`);await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('heading',{level:1})).toHaveText(variant==='a'?'Su primera tarjeta débito. Tú acuerdas sus límites.':'Su primera tarjeta débito. Aprende a ahorrar contigo.');
  expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  // Las pantallas de la app cargan en diferido: se recorre la página antes de comprobar que todas cargaron.
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}scrollTo(0,0);});
  await expect.poll(()=>page.locator('img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).complete&&(i as HTMLImageElement).naturalWidth>0))).toBe(true);
  await expect(page.locator('#age')).toHaveCount(0);
  await page.screenshot({path:info.outputPath(`landing-${variant}.png`),fullPage:true});
  const answer=page.getByText(/Las tarifas de la tarjeta/);await expect(answer).toBeVisible();
  await page.locator('summary').first().click();await expect(answer).not.toBeVisible();
  await page.locator('summary').first().press('Enter');await expect(answer).toBeVisible();
  for(const location of ['.nav','.hero-copy','.demo-copy']){
   await page.locator(location).getByRole('link',{name:cta}).click();
   await expect(page).toHaveURL(/#registro$/);
   await expect(page.getByRole('heading',{name:'Únete a la lista de espera.'})).toBeInViewport();
  }
  await page.getByRole('button',{name:'Ver privacidad'}).click();await expect(page.getByRole('dialog')).toBeVisible();expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.getByRole('button',{name:'Ver privacidad'})).toBeFocused();
  await page.getByRole('button',{name:cta,exact:true}).click();await expect(page.locator('.error-summary')).toBeFocused();expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
 });
}
test('successful submit preserves variant, campaign, consent and negative willingness',async({page})=>{
 let payload:Record<string,unknown>={};await page.route('**/api/lead',r=>{payload=r.request().postDataJSON();return r.fulfill({json:{ok:true}});});
 await page.goto('/?variant=b&utm_source=meta&utm_campaign=learning&test=1');
 await page.getByLabel('Correo electrónico').fill('qa@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');await page.getByLabel('¿Considerarías').selectOption('no');await page.locator('#adult').check();await page.locator('#consent').check();
 await page.getByRole('button',{name:cta,exact:true}).click();await expect(page.getByText('¡Gracias por dar el primer paso!')).toBeVisible();expect(payload).toMatchObject({consent:true,adult:true,willingness:'no',attribution:{variant:'b',source:'campaign',isTest:true,campaign:{utm_source:'meta'}}});expect(payload).not.toHaveProperty('age');expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
});
test('failure preserves input and announces an error',async({page})=>{
 await page.route('**/api/lead',r=>r.fulfill({status:503,json:{error:'unavailable'}}));await page.goto('/?test=1');
 await page.getByLabel('Correo electrónico').fill('qa@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');await page.getByLabel('¿Considerarías').selectOption('yes');await page.locator('#adult').check();await page.locator('#consent').check();await page.getByRole('button',{name:cta,exact:true}).click();await expect(page.getByRole('alert')).toContainText('No pudimos guardar');await expect(page.getByLabel('Correo electrónico')).toHaveValue('qa@example.com');
});
test('320px reflow, reduced motion and keyboard skip link',async({page})=>{
 await page.setViewportSize({width:320,height:800});await page.goto('/?variant=b&test=1');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await page.keyboard.press('Enter');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.locator('.button').first().evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');
 expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
});
test('funnel measurement excludes form values and counts form start once',async({page})=>{
 const events:Record<string,unknown>[]=[];await page.route('**/api/event',r=>{events.push(r.request().postDataJSON());return r.fulfill({json:{ok:true}});});
 await page.goto('/?variant=b&utm_source=meta&test=1');
 await page.locator('.hero-copy').getByRole('link',{name:cta}).click();
 await page.getByLabel('Correo electrónico').fill('private@example.com');
 await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');
 await expect.poll(()=>events.filter(e=>e.name==='form_start').length).toBe(1);
 expect(events).toEqual(expect.arrayContaining([expect.objectContaining({name:'cta_click',placement:'hero',attribution:expect.objectContaining({variant:'b',isTest:true})})]));
 expect(JSON.stringify(events)).not.toContain('private@example.com');
 await expect.poll(()=>events.some(e=>e.name==='engaged_visit'),{timeout:15000}).toBe(true);
});
test('defaults to A and separates team test identity from the live browser identity',async({page})=>{
 await page.goto('/?test=1');await expect(page.getByRole('heading',{level:1})).toContainText('Tú acuerdas sus límites.');
 const testId=await page.evaluate(()=>JSON.parse(localStorage.getItem('moni-research-v2-test')!).visitorId);
 await page.goto('/');const live=await page.evaluate(()=>JSON.parse(localStorage.getItem('moni-research-v2-live')!));
 expect(live).toMatchObject({variant:'a',isTest:false,source:'direct',crossExposure:false});expect(live.visitorId).not.toBe(testId);
});

test('pending save, rate limit and retry never claim success before persistence',async({page})=>{
 let release:()=>void=()=>{};let attempts=0;
 const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/api/lead',async route=>{attempts++;if(attempts===1){await gate;await route.fulfill({status:429,json:{error:'rate'}});}else await route.fulfill({json:{ok:true}});});
 await page.goto('/?variant=a&test=1');
 await page.getByLabel('Correo electrónico').fill('retry@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('11001');await page.getByLabel('¿Considerarías').selectOption('maybe');await page.locator('#adult').check();await page.locator('#consent').check();
 await page.getByRole('button',{name:cta,exact:true}).click();
 await expect(page.getByRole('button',{name:'Guardando tu interés…'})).toBeDisabled();
 await expect(page.locator('form')).toHaveAttribute('aria-busy','true');
 await expect(page.getByText('¡Gracias por dar el primer paso!')).toHaveCount(0);
 release();await expect(page.getByRole('alert')).toContainText('Espera unos minutos');
 await expect(page.getByLabel('Correo electrónico')).toHaveValue('retry@example.com');await expect(page.locator('#consent')).toBeChecked();
 await page.getByRole('button',{name:cta,exact:true}).click();await expect(page.locator('.success')).toBeFocused();await expect(page.getByText('¡Gracias por dar el primer paso!')).toBeVisible();expect(attempts).toBe(2);
});

test('invalid email and missing consent make no lead request',async({page})=>{
 let requests=0;await page.route('**/api/lead',r=>{requests++;return r.fulfill({json:{ok:true}});});await page.goto('/?variant=b&test=1');
 await page.getByLabel('Correo electrónico').fill('no-es-un-correo');await page.getByRole('button',{name:cta,exact:true}).click();
 await expect(page.locator('.error-summary')).toBeFocused();await expect(page.locator('#email-error')).toContainText('válido');
 await page.getByLabel('Correo electrónico').fill('consent@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');await page.getByLabel('¿Considerarías').selectOption('yes');await page.locator('#adult').check();
 await page.getByRole('button',{name:cta,exact:true}).click();await expect(page.locator('#consent-error')).toBeVisible();expect(requests).toBe(0);
});

test('responsive A and B preserve full app artboards and visible controls',async({page})=>{
 for(const variant of ['a','b'])for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});await page.goto(`/?variant=${variant}&test=1`);await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${variant} at ${width}`).toBe(true);
  await expect(page.getByRole('button',{name:cta,exact:true})).toBeEnabled();
  // El producto del hero y las palabras de la hipótesis quedan completos dentro del viewport.
  for(const selector of ['.hero-phone','.hero h1 .word']){
   for(const el of await page.locator(selector).all()){
    const box=await el.boundingBox();expect(box,`${selector} ${variant} ${width}`).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(-1);expect(box!.x+box!.width).toBeLessThanOrEqual(width+1);
   }
  }
  expect(await page.locator('.app-screen').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).alt.includes('datos de demostración')))).toBe(true);
 }
});

test('keyboard reaches confirmation, both dialogs and restores focus',async({page})=>{
 await page.goto('/?test=1');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await page.keyboard.press('Enter');
 for(const label of ['Privacidad','Accesibilidad']){
  const trigger=page.getByRole('button',{name:label,exact:true});await trigger.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button',{name:'Cerrar',exact:true})).toBeFocused();await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 }
});


test('national catalogue submits an unambiguous city code with unchanged consent and attribution', async ({ page }) => {
 let payload: Record<string, unknown> = {};
 await page.route('**/api/lead', r => { payload = r.request().postDataJSON(); return r.fulfill({json:{ok:true}}); });
 await page.goto('/?variant=b&test=1');
 await expect(page.locator('#city option')).toHaveCount(1123);
 await expect(page.locator('#city optgroup')).toHaveCount(33);
 await expect(page.locator('#city option[value="other"]')).toHaveCount(0);
 await expect(page.locator('#city option[value="27493"]')).toContainText('Nuevo Belén de Bajirá');
 await page.getByLabel('Ciudad', {exact:true}).selectOption('05001');
 await expect(page.locator('#city option:checked')).toHaveText('Medellín · Antioquia');
 await page.getByLabel('Correo electrónico').fill('national-qa@example.com');
 await page.getByLabel('¿Considerarías').selectOption('yes');
 await page.locator('#adult').check(); await page.locator('#consent').check();
 await page.getByRole('button',{name:cta,exact:true}).click();
 await expect(page.locator('.success')).toBeFocused();
 expect(payload).toMatchObject({city:'05001',adult:true,consent:true,attribution:{variant:'b',isTest:true}});
});
