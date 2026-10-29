import places from './data/colombia-places.json' with { type: 'json' };

// DANE DIVIPOLA snapshot: source and CC BY-SA 4.0 attribution in docs/colombia-places.md.
export const cityGroups = [...new Set(places.map(place => place.department))].map(department => ({
  department, places: places.filter(place => place.department === department),
}));
const byCode = new Map(places.map(place => [place.code, place]));

export function parseCity(value: unknown) {
  if (typeof value !== 'string') throw new Error('invalid');
  // Keep old open tabs and historic values compatible; never rewrite existing records.
  if (value === 'other') return { city: 'other', eligible: false };
  const place = byCode.get(value === 'cali' ? '76001' : value);
  if (!place) throw new Error('invalid');
  return { city: place.code === '76001' ? 'cali' : place.code,
    cityName: place.name, cityDepartment: place.department, eligible: place.code === '76001' };
}
