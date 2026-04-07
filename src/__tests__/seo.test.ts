/**
 * SEO metadata alanlarının varlığını ve kalitesini test eder.
 */

type MetaConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  locale?: string;
};

const siteMetadata: MetaConfig = {
  title: 'Innovest | Cross-Border Investment Advisory',
  description:
    'Strategic investment solutions across the UK, UAE, EU, USA and key global markets. Real estate, residency by investment and business expansion advisory.',
  keywords: [
    'investment advisory',
    'real estate investment',
    'London property',
    'Dubai property',
    'residency by investment',
    'golden visa',
    'business expansion',
    'cross-border investment',
  ],
  ogTitle: 'Innovest | Cross-Border Investment Advisory',
  ogDescription:
    'Strategic investment solutions across the UK, UAE, EU, USA and key global markets.',
  locale: 'en_GB',
};

describe('SEO metadata', () => {
  it('title is set and not empty', () => {
    expect(siteMetadata.title).toBeTruthy();
  });

  it('title contains brand name', () => {
    expect(siteMetadata.title).toContain('Innovest');
  });

  it('description length is between 50 and 160 characters (SEO best practice)', () => {
    expect(siteMetadata.description.length).toBeGreaterThanOrEqual(50);
    expect(siteMetadata.description.length).toBeLessThanOrEqual(160);
  });

  it('has at least 5 keywords', () => {
    expect(siteMetadata.keywords.length).toBeGreaterThanOrEqual(5);
  });

  it('keywords cover core service areas', () => {
    const keywordsStr = siteMetadata.keywords.join(' ').toLowerCase();
    expect(keywordsStr).toContain('investment');
    expect(keywordsStr).toContain('real estate');
    expect(keywordsStr).toContain('residency');
  });

  it('Open Graph title is set', () => {
    expect(siteMetadata.ogTitle).toBeTruthy();
  });

  it('Open Graph description is set', () => {
    expect(siteMetadata.ogDescription).toBeTruthy();
  });

  it('locale is set to en_GB', () => {
    expect(siteMetadata.locale).toBe('en_GB');
  });

  it('OG description is shorter than main description', () => {
    expect(siteMetadata.ogDescription!.length).toBeLessThanOrEqual(
      siteMetadata.description.length
    );
  });
});
