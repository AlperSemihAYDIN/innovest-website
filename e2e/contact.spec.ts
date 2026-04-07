import { test, expect } from '@playwright/test';

test.describe('Contact page — EN', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('contact page loads', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
  });

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByText('Contact').first()).toBeVisible();
  });

  test('Name field is present', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Full Name');
    await expect(nameInput).toBeVisible();
  });

  test('Email field is present', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Email Address');
    await expect(emailInput).toBeVisible();
  });

  test('user can fill the form', async ({ page }) => {
    await page.getByPlaceholder('Full Name').fill('John Smith');
    await page.getByPlaceholder('Email Address').fill('john@example.com');
    await page.getByPlaceholder('Phone Number').fill('+44 7700 900000');

    const budgetSelect = page.locator('select').first();
    await budgetSelect.selectOption({ index: 1 });

    await expect(page.getByPlaceholder('Full Name')).toHaveValue('John Smith');
    await expect(page.getByPlaceholder('Email Address')).toHaveValue('john@example.com');
  });

  test('submit button is visible', async ({ page }) => {
    await expect(page.getByText('Request Consultation')).toBeVisible();
  });

  test('contact info is visible on desktop', async ({ page }) => {
    await expect(page.getByText(/info@innovest\.uk/i).first()).toBeVisible();
  });
});

test.describe('Contact page — TR', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tr/contact');
  });

  test('Turkish contact page loads', async ({ page }) => {
    await expect(page).toHaveURL(/\/tr\/contact/);
  });

  test('Turkish submit button visible', async ({ page }) => {
    await expect(page.getByText('Danışmanlık Talep Et')).toBeVisible();
  });
});
