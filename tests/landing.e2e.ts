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
  await expect(page.getByRole('heading',{level:1})).toHaveText(variant==='a'?'Su primera tarjeta débito. Con tu acompañamiento.':'Su primera tarjeta débito. Para aprender contigo.');
  expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).naturalWidth>0))).toBe(true);
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
 await page.goto('/?test=1');await expect(page.getByRole('heading',{level:1})).toContainText('Con tu acompañamiento.');
 const testId=await page.evaluate(()=>JSON.parse(localStorage.getItem('moni-research-v2-test')!).visitorId);
 await page.goto('/');const live=await page.evaluate(()=>JSON.parse(localStorage.getItem('moni-research-v2-live')!));
 expect(live).toMatchObject({variant:'a',isTest:false,source:'direct',crossExposure:false});expect(live.visitorId).not.toBe(testId);
});
