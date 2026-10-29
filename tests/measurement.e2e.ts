import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const vendorPattern = /https:\/\/[^/]*(googletagmanager\.com|google-analytics\.com|facebook\.com|facebook\.net)\//;
const accepted = { version: 1, analytics: true, ads: true, expiresAt: Date.now() + 86400000 };
const googleMock = `window.__google=[];const drain=()=>{while(window.dataLayer.length)window.__google.push(Array.from(window.dataLayer.shift()));};drain();window.dataLayer.push=function(v){window.__google.push(Array.from(v));};`;
const metaMock = `window.__meta=[];window.fbq.callMethod=(...a)=>window.__meta.push(a);`;
async function mockVendors(page: Page, blocked = false) {
  const requests: string[] = [];
  await page.route(vendorPattern, route => {
    const url = route.request().url(); requests.push(url);
    return blocked ? route.abort() : route.fulfill({ contentType: 'application/javascript', body: url.includes('gtag/js') ? googleMock : metaMock });
  });
  return requests;
}
async function commands(page: Page, key: '__google' | '__meta') { return page.evaluate(key => (window as unknown as Record<string, unknown[][]>)[key] || [], key); }
async function fillRegistration(page: Page) {
  await page.getByLabel('Correo electrónico').fill('measurement@example.com');
  await page.getByLabel('Ciudad', { exact: true }).selectOption('cali');
  await page.getByLabel('¿Considerarías').selectOption('maybe');
  await page.locator('#adult').check(); await page.locator('#consent').check();
}
test.beforeEach(async ({ page }) => {
  await page.route('**/api/visit', r => r.fulfill({ json: { ok: true } }));
  await page.route('**/api/event', r => r.fulfill({ json: { ok: true } }));
});
test('no vendors before consent, on rejection or in QA even with saved consent', async ({ page }) => {
  const requests = await mockVendors(page);
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Aceptar opcionales' })).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Rechazar opcionales', exact: true }).click();
  await page.reload(); expect(requests).toEqual([]);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.evaluate(value => localStorage.setItem('moni-measurement-v1', JSON.stringify(value)), accepted);
  await page.goto('/?variant=b&test=1'); expect(requests).toEqual([]);
  await expect(page.getByRole('button', { name: 'Preferencias de medición', exact: true })).toHaveCount(0);
});
test('independent categories, one page view, no form fields or fake conversions, revoke without reset', async ({ page }) => {
  const requests = await mockVendors(page);
  await page.route('**/api/lead', r => r.fulfill({ json: { ok: true } }));
  await page.goto('/?variant=b&utm_source=instagram');
  await page.getByRole('button', { name: 'Elegir medición' }).click();
  await page.getByLabel('Analítica de visitas').check();
  await page.getByRole('button', { name: 'Guardar preferencias' }).click();
  await fillRegistration(page);
  await expect.poll(() => commands(page, '__google')).toEqual(expect.arrayContaining([expect.arrayContaining(['event', 'page_view'])]));
  expect(requests.filter(u => u.includes('facebook'))).toHaveLength(0);
  await page.getByRole('button', { name: 'Preferencias de medición', exact: true }).click();
  await page.getByLabel('Medición publicitaria').check();
  await page.getByRole('button', { name: 'Guardar preferencias' }).click();
  await expect.poll(() => commands(page, '__meta')).toContainEqual(['trackSingle', '1234567890', 'PageView']);
  expect((await commands(page, '__google')).filter(c => c[0] === 'event')).toHaveLength(1);
  expect((await commands(page, '__meta')).filter(c => c[0] === 'init')).toHaveLength(1);
  await page.getByRole('button', { name: 'Preferencias de medición', exact: true }).click();
  await page.getByRole('button', { name: 'Rechazar opcionales', exact: true }).click();
  expect(await page.evaluate(() => (window as unknown as Record<string, unknown>)['ga-disable-G-MOCK123456'])).toBe(true);
  expect(await commands(page, '__meta')).toContainEqual(['consent', 'revoke']);
  await expect(page.getByLabel('Correo electrónico')).toHaveValue('measurement@example.com');
  await page.getByRole('button', { name: 'Únete a la lista de espera', exact: true }).click();
  await expect(page.locator('.success')).toBeFocused();
  const sent = JSON.stringify([await commands(page, '__google'), await commands(page, '__meta')]);
  expect(sent).not.toMatch(/measurement@example|cali|maybe|Lead|CompleteRegistration|generate_lead|form_start|form_submit/);
});
test('blocked vendors do not prevent validation, error recovery or successful save', async ({ page }) => {
  await mockVendors(page, true);
  let count = 0;
  await page.route('**/api/lead', r => r.fulfill(++count === 1 ? { status: 503, json: { error: 'unavailable' } } : { json: { ok: true } }));
  await page.goto('/'); await page.getByRole('button', { name: 'Aceptar opcionales' }).click();
  await page.getByRole('button', { name: 'Únete a la lista de espera', exact: true }).click();
  expect(count).toBe(0); await expect(page.locator('.error-summary')).toBeFocused();
  await fillRegistration(page);
  await page.getByRole('button', { name: 'Únete a la lista de espera', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('No pudimos guardar');
  await expect(page.getByLabel('Correo electrónico')).toHaveValue('measurement@example.com');
  await page.getByRole('button', { name: 'Únete a la lista de espera', exact: true }).click();
  await expect(page.locator('.success')).toBeFocused(); expect(count).toBe(2);
});
test('consent UI reflows at 320px, is keyboard accessible and restores focus', async ({ page }, info) => {
  await mockVendors(page); await page.setViewportSize({ width: 320, height: 800 }); await page.goto('/');
  await expect(page.getByRole('button', { name: 'Aceptar opcionales' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#measurement-title')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Aceptar opcionales' })).toBeInViewport();
  const acceptBox = await page.getByRole('button', { name: 'Aceptar opcionales' }).boundingBox();
  expect(acceptBox!.height).toBeLessThan(80);
  await page.screenshot({ path: info.outputPath('consent-320.png') });
  const trigger = page.getByRole('button', { name: 'Elegir medición' });
  await trigger.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#measurement-title')).toBeFocused();
  expect((await new AxeBuilder({ page }).include('.measurement').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: info.outputPath('preferences-320.png') });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('header a').first()).toBeFocused();
  const preferences = page.getByRole('button', { name: 'Preferencias de medición', exact: true });
  await preferences.click(); await page.keyboard.press('Escape'); await expect(preferences).toBeFocused();
});

test('initial modal traps focus, accepts explicitly once, and remembers the choice on return', async ({ page }) => {
  const requests = await mockVendors(page);
  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Aceptar opcionales' }).click();
  await expect.poll(() => commands(page, '__google')).toEqual(expect.arrayContaining([expect.arrayContaining(['event', 'page_view'])]));
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.reload();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect.poll(async () => (await commands(page, '__google')).filter(c => c[0] === 'event').length).toBe(1);
});
test('revoking consent while scripts are loading prevents late page views', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(r => { release = r; });
  await page.route(vendorPattern, async r => { await gate; await r.fulfill({ contentType: 'application/javascript', body: r.request().url().includes('gtag/js') ? googleMock : metaMock }); });
  await page.goto('/'); await page.getByRole('button', { name: 'Aceptar opcionales' }).click();
  await page.getByRole('button', { name: 'Preferencias de medición', exact: true }).click();
  await page.getByRole('button', { name: 'Rechazar opcionales', exact: true }).click(); release();
  await page.waitForLoadState('networkidle');
  expect((await commands(page, '__google')).filter(c => c[0] === 'event')).toHaveLength(0);
  expect((await commands(page, '__meta')).filter(c => c[0] === 'init' || c[0] === 'trackSingle')).toHaveLength(0);
});
