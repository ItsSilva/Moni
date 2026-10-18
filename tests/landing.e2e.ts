import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const tags=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
test.beforeEach(async({page})=>{await page.route('**/api/visit',r=>r.fulfill({json:{ok:true}}));});
for(const variant of ['a','b']) {
 test(`${variant}: accessibility, layout, assets and interactions`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`/?variant=${variant}&test=1`);await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('heading',{level:1})).toHaveText(variant==='a'?'Acompaña sus compras con límites claros.':'Ayúdale a aprender a manejar su dinero.');
  expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).naturalWidth>0))).toBe(true);
  await page.getByRole('button',{name:'Ahorro',exact:true}).click();await expect(page.getByText('Mi meta de ahorro')).toBeVisible();
  await page.getByRole('button',{name:'Gastos',exact:true}).click();const slider=page.getByRole('slider');await slider.focus();await page.keyboard.press('ArrowRight');await expect(slider).toHaveValue('55000');
  await page.locator('summary').first().click();await expect(page.getByText(/Aún está en desarrollo/)).toBeVisible();
  await page.getByRole('button',{name:'Ver privacidad'}).click();await expect(page.getByRole('dialog')).toBeVisible();expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.getByRole('button',{name:'Ver privacidad'})).toBeFocused();
  await page.getByRole('button',{name:'Quiero conocer Moni',exact:true}).click();await expect(page.locator('.error-summary')).toBeFocused();expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);await page.screenshot({path:info.outputPath(`landing-${variant}.png`),fullPage:true});
 });
}
test('successful submit preserves variant, campaign, consent and negative willingness',async({page})=>{
 let payload:Record<string,unknown>={};await page.route('**/api/lead',r=>{payload=r.request().postDataJSON();return r.fulfill({json:{ok:true}});});
 await page.goto('/?variant=b&utm_source=meta&utm_campaign=learning&test=1');
 await page.getByLabel('Correo electrónico').fill('qa@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');await page.getByLabel('Edad de los niños').selectOption('both');await page.getByLabel('¿Considerarías').selectOption('no');await page.locator('#adult').check();await page.locator('#consent').check();
 await page.getByRole('button',{name:'Quiero conocer Moni',exact:true}).click();await expect(page.getByText('¡Gracias por dar el primer paso!')).toBeVisible();expect(payload).toMatchObject({consent:true,adult:true,willingness:'no',attribution:{variant:'b',source:'campaign',isTest:true,campaign:{utm_source:'meta'}}});expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
});
test('failure preserves input and announces an error',async({page})=>{
 await page.route('**/api/lead',r=>r.fulfill({status:503,json:{error:'unavailable'}}));await page.goto('/?test=1');
 await page.getByLabel('Correo electrónico').fill('qa@example.com');await page.getByLabel('Ciudad',{exact:true}).selectOption('cali');await page.getByLabel('Edad de los niños').selectOption('8-11');await page.getByLabel('¿Considerarías').selectOption('yes');await page.locator('#adult').check();await page.locator('#consent').check();await page.getByRole('button',{name:'Quiero conocer Moni',exact:true}).click();await expect(page.getByRole('alert')).toContainText('No pudimos guardar');await expect(page.getByLabel('Correo electrónico')).toHaveValue('qa@example.com');
});
test('320px reflow, reduced motion and keyboard skip link',async({page})=>{
 await page.setViewportSize({width:320,height:800});await page.goto('/?variant=b&test=1');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await page.keyboard.press('Enter');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.locator('.hero-art img').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect((await new AxeBuilder({page}).withTags(tags).analyze()).violations).toEqual([]);
});
