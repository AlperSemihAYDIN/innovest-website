import type { MetadataRoute } from 'next';

const BASE_URL = 'https://innovest-website.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/real-estate',
    '/real-estate/london',
    '/real-estate/dubai',
    '/residency',
    '/business-expansion',
    '/services',
    '/insights',
    '/knowledge-hub',
    '/contact',
    '/disclaimer',
  ];

  const locales = ['', '/tr'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
