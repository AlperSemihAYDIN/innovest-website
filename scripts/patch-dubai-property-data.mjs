import { readFileSync, writeFileSync, readdirSync } from 'fs';

const HERO_OVERRIDE = {
  'the-alba': 'main.jpg',
  'solaya': 'picture-1.jpg',
  'mercedes-benz-places': '25006-aerialnight-shot-final-full.jpg',
};
const HERO_PREFER = ['hero', 'aerial', 'exterior', 'ext-1', 'view-01', 'street-view', 'facade', 'main'];
const SLUGS = ['binghatti-flare','the-alba','binghatti-aquarise','mercedes-benz-places','belgrove-residences','solaya','one-river-point','cala-del-mar'];

function getList(slug) {
  const files = readdirSync(`public/images/properties/dubai/${slug}`).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
  const ov = HERO_OVERRIDE[slug];
  let hero = ov && files.includes(ov) ? ov : null;
  if (!hero) for (const kw of HERO_PREFER) { const m = files.find(f=>f.toLowerCase().includes(kw)); if (m){hero=m;break;} }
  if (!hero) hero = files[0];
  return [hero, ...files.filter(f=>f!==hero)].map(f=>`/images/properties/dubai/${slug}/${f}`);
}

let src = readFileSync('src/lib/propertyData.ts', 'utf-8');

for (const slug of SLUGS) {
  const imgs = getList(slug);
  const hero = imgs[0];
  // Build new block
  const newBlock = `    heroImage: '${hero}',\n    images: [\n${imgs.map(p=>`      '${p}',`).join('\n')}\n    ],`;

  // Find slug location and replace heroImage+images block
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx < 0) { console.error(`slug not found: ${slug}`); continue; }
  const heroIdx = src.indexOf('heroImage:', slugIdx);
  if (heroIdx < 0) { console.error(`heroImage not found: ${slug}`); continue; }
  // Find end of images array: look for '\n    ],\n' after heroIdx
  const endMarker = '\n    ],';
  const imagesIdx = src.indexOf('images: [', heroIdx);
  const endIdx = src.indexOf(endMarker, imagesIdx);
  if (endIdx < 0) { console.error(`end not found: ${slug}`); continue; }
  // Find start of heroImage line (preceding 4 spaces)
  const lineStart = src.lastIndexOf('\n', heroIdx) + 1;
  const blockEnd = endIdx + endMarker.length;
  src = src.slice(0, lineStart) + newBlock + src.slice(blockEnd);
  console.log(`  ✓ ${slug} → ${imgs.length}`);
}

writeFileSync('src/lib/propertyData.ts', src);
console.log('done');
