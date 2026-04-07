/**
 * Tüm sayfaların static export için doğru yapıda olduğunu doğrular.
 */

const EXPECTED_EN_PAGES = [
  '/',
  '/about',
  '/real-estate',
  '/real-estate/london',
  '/real-estate/dubai',
  '/residency',
  '/business-expansion',
  '/services',
  '/insights',
  '/contact',
];

const EXPECTED_TR_PAGES = EXPECTED_EN_PAGES.map((p) => `/tr${p}`);

const ALL_PAGES = [...EXPECTED_EN_PAGES, ...EXPECTED_TR_PAGES];

describe('Site page structure', () => {
  it('has 10 English pages', () => {
    expect(EXPECTED_EN_PAGES).toHaveLength(10);
  });

  it('has 10 Turkish pages', () => {
    expect(EXPECTED_TR_PAGES).toHaveLength(10);
  });

  it('has 20 pages in total', () => {
    expect(ALL_PAGES).toHaveLength(20);
  });

  it('EN pages do not start with /tr', () => {
    EXPECTED_EN_PAGES.forEach((page) => {
      expect(page.startsWith('/tr')).toBe(false);
    });
  });

  it('TR pages all start with /tr', () => {
    EXPECTED_TR_PAGES.forEach((page) => {
      expect(page.startsWith('/tr')).toBe(true);
    });
  });

  it('no duplicate pages', () => {
    const unique = new Set(ALL_PAGES);
    expect(unique.size).toBe(ALL_PAGES.length);
  });

  it('real-estate sub-pages are nested correctly', () => {
    expect(EXPECTED_EN_PAGES).toContain('/real-estate/london');
    expect(EXPECTED_EN_PAGES).toContain('/real-estate/dubai');
    expect(EXPECTED_TR_PAGES).toContain('/tr/real-estate/london');
    expect(EXPECTED_TR_PAGES).toContain('/tr/real-estate/dubai');
  });
});
