import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/OpenHaven/);
});

test('homepage hero section renders with correct heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigate the Open Protocol');
});

test('Find Your Stack CTA is visible and links to #navigator', async ({ page }) => {
  await page.goto('/');
  const cta = page.getByRole('link', { name: 'Find Your Stack' });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', '#navigator');
});

test('MVP badge is visible on homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('MVP — Real data, growing')).toBeVisible();
});

test('#navigator section exists on homepage', async ({ page }) => {
  await page.goto('/');
  const navigatorSection = page.locator('#navigator');
  await expect(navigatorSection).toBeAttached();
});

test('homepage title contains OpenHaven and Navigate', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/OpenHaven/);
  await expect(page).toHaveTitle(/Navigate/);
});

test('/navigator loads with NavigatorSection island', async ({ page }) => {
  await page.goto('/navigator');
  await expect(page).toHaveTitle(/Open Protocol Navigator/);

  // NavigatorSection island should be hydrated with domain grid
  const grid = page.locator('[data-testid="domain-grid"]');
  await expect(grid).toBeVisible();
});

test('/calendar loads', async ({ page }) => {
  await page.goto('/calendar');
  await expect(page).toHaveTitle(/NAO Calendar/);
});

test('nav links are visible on homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Home', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Matrix', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Convergence', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contribute', exact: true }).first()).toBeVisible();
});

test('nav renders on /navigator', async ({ page }) => {
  await page.goto('/navigator');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home', exact: true }).first()).toBeVisible();
});

test('nav renders on /calendar', async ({ page }) => {
  await page.goto('/calendar');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home', exact: true }).first()).toBeVisible();
});

test('footer renders with copyright text on homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('contentinfo')).toContainText('2026 OpenHaven');
});

test('no horizontal scroll at 375px viewport on homepage', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(375);
});

test('JetBrains Mono font is loaded (no 404 on font files)', async ({ page }) => {
  const fontErrors: string[] = [];

  page.on('response', (response) => {
    if (response.url().includes('jetbrains') || response.url().includes('JetBrains')) {
      if (response.status() >= 400) {
        fontErrors.push(response.url());
      }
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(fontErrors).toHaveLength(0);

  // Verify JetBrains Mono CSS custom property is present
  const fontFamily = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim()
  );
  expect(fontFamily).toContain('JetBrains Mono');
});
