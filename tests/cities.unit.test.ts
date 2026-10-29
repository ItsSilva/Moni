import { describe, expect, it } from 'vitest';
import places from '../src/data/colombia-places.json';
import { parseCity } from '../src/cities';
import { parseLead } from '../server/research';
describe('national city catalogue', () => {
  it('covers the official snapshot with distinct codes and all departments', () => {
    expect(places).toHaveLength(1122);
    expect(new Set(places.map(p => p.code)).size).toBe(1122);
    expect(new Set(places.map(p => p.department)).size).toBe(33);
    for (const place of places) expect(parseCity(place.code).cityName).toBe(place.name);
    expect(parseCity('27493').cityName).toBe('Nuevo Belén de Bajirá');
  });
  it('retains Cali eligibility and accepts legacy values without reclassifying records', () => {
    expect(parseCity('76001')).toEqual(parseCity('cali'));
    expect(parseCity('cali').eligible).toBe(true);
    expect(parseCity('other')).toEqual({ city: 'other', eligible: false });
    expect(parseCity('11001').eligible).toBe(false);
  });
  it.each(['', '00000', 'bogota', 'other-city', null, 11001, ['11001'], {toString: () => '11001'}])('rejects values outside the catalogue: %j', value => {
    expect(() => parseCity(value)).toThrow();
  });
  it('validates national selections on the server and derives names rather than trusting clients', () => {
    const record = parseLead({email:'qa@example.com', city:'05001', cityName:'injected', adult:true, consent:true, willingness:'yes', attribution:{variant:'b',firstVariant:'b',crossExposure:false,isTest:true,visitorId:'11111111-1111-4111-8111-111111111111',source:'campaign',campaign:{}}});
    expect(record).toMatchObject({city:'05001',cityName:'Medellín',cityDepartment:'Antioquia',eligible:false});
  });
});
