import { test, expect } from '@playwright/test';

// Canlı site: https://innovest-website.vercel.app
// baseURL playwright.config.ts'de tanımlı

test.describe('Navigation — EN', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Innovest/i);
  });

  test('INNOVEST brand visible in header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('INNOVEST').first()).toBeVisible();
  });

  test('hero section renders with CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Schedule a Consultation').first()).toBeVisible();
  });

  test('nav link — About Us navigates to /about', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About Us' }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('nav link — Services navigates to /services', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^Services$/i }).first().click();
    await expect(page).toHaveURL(/\/services/);
  });

  test('nav link — Insights navigates to /insights', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Insights' }).first().click();
    await expect(page).toHaveURL(/\/insights/);
  });

  test('nav link — Contact navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('Get Consultation CTA navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Consultation' }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('footer Quick Links section visible', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/Quick Links/i).first()).toBeVisible();
  });
});

test.describe('Navigation — TR (Turkish)', () => {
  test('Turkish homepage loads', async ({ page }) => {
    await page.goto('/tr/');
    await expect(page).toHaveTitle(/Innovest/i);
  });

  test('Turkish nav has Ana Sayfa', async ({ page }) => {
    await page.goto('/tr/');
    await expect(page.getByRole('link', { name: 'Ana Sayfa' }).first()).toBeVisible();
  });

  test('Danışmanlık Al CTA navigates to /tr/contact', async ({ page }) => {
    await page.goto('/tr/');
    await page.getByRole('link', { name: 'Danışmanlık Al' }).first().click();
    await expect(page).toHaveURL(/\/tr\/contact/);
  });

  test('TR About page loads', async ({ page }) => {
    await page.goto('/tr/about');
    await expect(page).toHaveURL(/\/tr\/about/);
    await expect(page.getByText('INNOVEST').first()).toBeVisible();
  });
});

test.describe('Language switcher', () => {
  test('EN → TR switcher navigates to Turkish', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Türkçe' }).click();
    await expect(page).toHaveURL(/\/tr/);
  });

  test('TR → EN switcher navigates to English', async ({ page }) => {
    await page.goto('/tr/');
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/^https:\/\/innovest-website\.vercel\.app\/$/);
  });
});
