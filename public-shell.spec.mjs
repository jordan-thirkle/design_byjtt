import { test, expect } from '@playwright/test';

const routes = ['/', '/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/', '/docs/'];
const primaryLabels = ['Studio', 'Standard', 'Library'];
const secondaryLabels = ['Research', 'Contracts', 'Benchmarks', 'Documentation'];
const primaryRoutes = new Set(['/standard/', '/library/']);
const secondaryRoutes = new Set(['/research/', '/contracts/', '/benchmarks/', '/docs/']);

for (const route of routes) {
  test(`canonical public shell: ${route}`, async ({ page }) => {
    await page.goto(route);
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    await expect(nav).toHaveCount(1);
    for (const label of primaryLabels) await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(1);
    await expect(nav.locator('.nav-more summary')).toHaveText('More');
    for (const label of secondaryLabels) await expect(nav.locator('.nav-more-links').getByRole('link', { name: label, exact: true })).toHaveCount(1);
    await expect(nav.getByRole('link', { name: 'Open Studio', exact: true })).toHaveCount(1);
    await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
    await expect(page.locator('main#main')).toHaveCount(1);
    await expect(page.locator('footer.footer')).toHaveCount(1);
    await expect(page.locator('footer.footer .footer-group')).toHaveCount(3);
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(primaryRoutes.has(route) || secondaryRoutes.has(route) ? 1 : 0);
  });
}

test('homepage explains the product in the first desktop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  for (const selector of ['.hero h1', '.hero .lede', '.hero .actions', '.workflow', '.hero-note']) {
    const box = await page.locator(selector).boundingBox();
    expect(box, `${selector} should be rendered`).not.toBeNull();
    expect(box.y + box.height, `${selector} should be visible without scrolling`).toBeLessThanOrEqual(1000);
  }
  await expect(page.locator('#main').getByRole('link', { name: 'Open Studio', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Make better digital products with AI.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
});

test('mobile public shell stays focused and usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/research/');
  const nav = page.locator('nav[aria-label="Primary navigation"]');
  await expect(nav).toHaveCount(1);
  for (const label of primaryLabels) await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(1);
  await expect(nav.getByRole('link', { name: 'Open Studio', exact: true })).toHaveCount(1);
  await expect(nav.locator('.nav-more summary')).toHaveCount(0);
  await expect(page.locator('main#main')).toHaveCount(1);
  await expect(page.locator('footer.footer')).toHaveCount(1);
  await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
});
