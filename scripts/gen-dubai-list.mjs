import { readdirSync, writeFileSync } from 'fs';
const HERO_OVERRIDE = {
  'the-alba': 'main.jpg',
  'solaya': 'picture-1.jpg',
  'mercedes-benz-places': '25006-aerialnight-shot-final-full.jpg',
};
const HERO_PREFER = ['hero', 'aerial', 'exterior', 'ext-1', 'view-01', 'street-view', 'facade', 'main'];
const SLUGS = ['binghatti-flare','the-alba','binghatti-aquarise','mercedes-benz-places','belgrove-residences','solaya','one-river-point','cala-del-mar'];
const out = [];
for (const slug of SLUGS) {
  const files = readdirSync(`public/images/properties/dubai/${slug}`).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
  const ov = HERO_OVERRIDE[slug];
  let hero = ov && files.includes(ov) ? ov : null;
  if (!hero) for (const kw of HERO_PREFER) { const m = files.find(f=>f.toLowerCase().includes(kw)); if (m){hero=m;break;} }
  if (!hero) hero = files[0];
  const ordered = [hero, ...files.filter(f=>f!==hero)];
  out.push(`---${slug}---`);
  out.push(`HERO=/images/properties/dubai/${slug}/${hero}`);
  for (const f of ordered) out.push(`/images/properties/dubai/${slug}/${f}`);
}
writeFileSync('dubai-images.txt', out.join('\n'));
console.log('written', out.length, 'lines');
