import { test, expect } from '@playwright/test';

const routes = ['/', '/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/', '/docs/'];
const expectedLabels = ['Standard', 'Research', 'Contracts', 'Agents', 'Library', 'Benchmarks', 'Open Studio'];

for (const route of routes) {
  test(`canonical public shell: ${route}`, async ({ page }) => {
    await page.goto(route);
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    await expect(nav).toHaveCount(1);
    await expect(nav.locator('a')).toHaveCount(expectedLabels.length + 1);
    for (const label of expectedLabels) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(1);
    }
    await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
    await expect(page.locator('main#main')).toHaveCount(1);
    await expect(page.locator('footer.footer')).toHaveCount(1);
    await expect(page.locator('footer.footer .footer-group')).toHaveCount(3);
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(route === '/' ? 0 : 1);
  });
}

test('canonical public shell retains the same IA at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/research/');
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1);
  await expect(page.locator('main#main')).toHaveCount(1);
  await expect(page.locator('footer.footer')).toHaveCount(1);
  await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
});
