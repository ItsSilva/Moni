import { describe, expect, it } from 'vitest';
import { analyticsLocation, CONSENT_TTL, measurementConfig, readConsent } from '../src/measurement-policy';
const env = { VITE_MEASUREMENT_ENABLED: 'true', VITE_MEASUREMENT_HOST: 'moni-sigma-eight.vercel.app', VITE_GA4_MEASUREMENT_ID: 'G-PTJVQQ1KM2', VITE_META_PIXEL_ID: '1002049382950703' };
const home = 'https://moni-sigma-eight.vercel.app/';
describe('external measurement boundaries', () => {
  it('requires explicit configuration and exact production hostname', () => {
    expect(measurementConfig(env, home).enabled).toBe(true);
    for (const vars of [{ ...env, VITE_MEASUREMENT_ENABLED: 'false' }, {}, { ...env, VITE_GA4_MEASUREMENT_ID: '', VITE_META_PIXEL_ID: '' }]) expect(measurementConfig(vars, home).enabled).toBe(false);
    for (const url of ['https://preview.vercel.app/', 'http://moni-sigma-eight.vercel.app/', home + '?test=1', home + '?test=0', home + '?email=qa%40example.com', home + '?utm_source=qa%40example.com', home + 'unknown']) expect(measurementConfig(env, url).enabled).toBe(false);
  });
  it('permits controlled A/B campaign URLs and removes click IDs/hash from GA location', () => {
    expect(measurementConfig(env, home + '?variant=b&utm_source=instagram&utm_campaign=ahorro').enabled).toBe(true);
    expect(analyticsLocation(home + '?variant=b&fbclid=abc&email=qa@example.com#registro')).toBe(home + '?variant=b');
  });
  it('rejects expired, malformed, future and previous version consent', () => {
    const now = 1000;
    const valid = { version: 1, analytics: true, ads: false, expiresAt: now + CONSENT_TTL };
    expect(readConsent(JSON.stringify(valid), now)).toEqual({ analytics: true, ads: false });
    for (const saved of [null, 'broken', {}, { ...valid, version: 0 }, { ...valid, expiresAt: now }, { ...valid, expiresAt: now + CONSENT_TTL + 1 }, { ...valid, ads: 'yes' }]) expect(readConsent(JSON.stringify(saved), now)).toBeNull();
  });
});
