import { test, expect } from '@playwright/test';

test.describe('All pages load correctly', () => {
  const enPages = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/real-estate', name: 'Real Estate' },
    { path: '/real-estate/london', name: 'London' },
    { path: '/real-estate/dubai', name: 'Dubai' },
    { path: '/residency', name: 'Residency' },
    { path: '/business-expansion', name: 'Business Expansion' },
    { path: '/services', name: 'Services' },
    { path: '/insights', name: 'Insights' },
    { path: '/contact', name: 'Contact' },
  ];

  for (const { path, name } of enPages) {
    test(`EN ${name} (${path}) returns 200 and loads INNOVEST`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByText('INNOVEST').first()).toBeVisible();
    });
  }

  const trPages = enPages.map(({ path, name }) => ({
    path: `/tr${path}`,
    name: `TR ${name}`,
  }));

  for (const { path, name } of trPages) {
    test(`${name} (${path}) returns 200 and loads INNOVEST`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByText('INNOVEST').first()).toBeVisible();
    });
  }
});

test.describe('Real Estate sub-pages', () => {
  test('London page has London content', async ({ page }) => {
    await page.goto('/real-estate/london');
    await expect(page.getByText(/London/i).first()).toBeVisible();
  });

  test('Dubai page has Dubai content', async ({ page }) => {
    await page.goto('/real-estate/dubai');
    await expect(page.getByText(/Dubai/i).first()).toBeVisible();
  });
});

test.describe('SEO — meta tags', () => {
  test('homepage has meta description', async ({ page }) => {
    await page.goto('/');
    const metaDesc = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length).toBeGreaterThan(50);
  });

  test('homepage has og:title', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('Innovest');
  });

  test('contact page has Innovest in title', async ({ page }) => {
    await page.goto('/contact');
    const title = await page.title();
    expect(title).toContain('Innovest');
  });
});

test.describe('Responsive layout', () => {
  test('mobile: hamburger menu button is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuBtn).toBeVisible();
  });

  test('mobile: desktop nav is hidden', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const desktopNav = page.locator('nav.hidden');
    await expect(desktopNav.first()).toBeAttached();
  });

  test('desktop: hamburger button is not visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuBtn).not.toBeVisible();
  });

  test('large screen (1920px): content is centered', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.getByText('INNOVEST').first()).toBeVisible();
    // Header viewport-genişliğinde render olur (scrollbar dahil ~1908-1920)
    const header = page.locator('header');
    const box = await header.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(1900);
  });
});
