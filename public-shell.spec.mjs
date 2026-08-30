import { test, expect } from '@playwright/test';

const routes = ['/', '/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/', '/docs/'];
const primaryLabels = ['Studio', 'Standard', 'Library', 'More', 'Open Studio'];

for (const route of routes) {
  test(`canonical public shell: ${route}`, async ({ page }) => {
    await page.goto(route);
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    await expect(nav).toHaveCount(1);
    await expect(nav.locator('a')).toHaveCount(primaryLabels.length + 1);
    for (const label of primaryLabels) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(1);
    }
    await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
    await expect(page.locator('main#main')).toHaveCount(1);
    await expect(page.locator('footer.footer')).toHaveCount(1);
    await expect(page.locator('footer.footer .footer-group')).toHaveCount(3);
    const active = nav.locator('a[aria-current="page"]');
    if (['/standard/', '/library/'].includes(route)) await expect(active).toHaveCount(1);
    else await expect(active).toHaveCount(0);
  });
}

test('canonical public shell retains the focused IA at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/research/');
  const nav = page.locator('nav[aria-label="Primary navigation"]');
  await expect(nav).toHaveCount(1);
  await expect(nav.getByRole('link', { name: 'Studio', exact: true })).toHaveCount(1);
  await expect(nav.getByRole('link', { name: 'Standard', exact: true })).toHaveCount(1);
  await expect(nav.getByRole('link', { name: 'Library', exact: true })).toHaveCount(1);
  await expect(nav.getByRole('link', { name: 'More', exact: true })).toHaveCount(1);
  await expect(page.locator('main#main')).toHaveCount(1);
  await expect(page.locator('footer.footer')).toHaveCount(1);
  await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
});
