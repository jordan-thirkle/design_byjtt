import { test, expect } from '@playwright/test';

const routes = ['/', '/standard/', '/research/', '/contracts/', '/agents/', '/library/', '/benchmarks/', '/docs/'];
const primaryLabels = ['Studio', 'Standard', 'Library'];
const secondaryLabels = ['Research', 'Contracts', 'Agents', 'Benchmarks', 'Documentation'];
const primaryRoutes = new Set(['/standard/', '/library/']);
const secondaryRoutes = new Set(['/research/', '/contracts/', '/agents/', '/benchmarks/', '/docs/']);

// At viewports <= 850px the nav collapses to the first primary link + the More
// disclosure. Collapsed links are display:none, so they leave the accessibility
// tree — getByRole counts must reflect that.
function primaryExpectations(width) {
  return primaryLabels.map((label) => ({ label, count: width <= 850 ? (label === 'Studio' ? 1 : 0) : 1 }));
}

for (const route of routes) {
  test(`canonical public shell: ${route}`, async ({ page }) => {
    const width = page.viewportSize()?.width ?? 1440;
    await page.goto(route);
    const nav = page.locator('nav[aria-label="Primary navigation"]');
    await expect(nav).toHaveCount(1);
    for (const { label, count } of primaryExpectations(width)) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(count);
    }
    const more = nav.locator('.nav-more');
    await expect(more.locator('summary')).toBeVisible();
    await more.locator('summary').click();
    for (const label of secondaryLabels) await expect(more.locator('.nav-more-links').getByRole('link', { name: label, exact: true })).toHaveCount(1);
    const cta = nav.getByRole('link', { name: 'Open Studio', exact: true });
    await expect(cta).toHaveCount(0);
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
  for (const { label, count } of primaryExpectations(390)) {
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveCount(count);
  }
  await expect(nav.getByRole('link', { name: 'Open Studio', exact: true })).toHaveCount(0);
  await expect(nav.locator('.nav-more summary')).toBeVisible();
  await nav.locator('.nav-more summary').click();
  for (const label of secondaryLabels) await expect(nav.locator('.nav-more-links').getByRole('link', { name: label, exact: true })).toBeVisible();
  await expect(page.locator('main#main')).toHaveCount(1);
  await expect(page.locator('footer.footer')).toHaveCount(1);
  await expect(page.locator('a.skip[href="#main"]')).toHaveCount(1);
});
