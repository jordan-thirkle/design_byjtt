import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const states = ['default', 'loading', 'empty', 'error', 'partial'];

async function expectStateSpecificOutput(page, state) {
  if (state === 'loading') {
    await expect(page.getByRole('status')).toHaveText('Loading performance data…');
    return;
  }
  if (state === 'empty') {
    await expect(page.getByText('No performance data is available for this period.')).toBeVisible();
    return;
  }
  if (state === 'error') {
    await expect(page.getByRole('alert')).toHaveText('Performance data could not be loaded. Try again.');
    return;
  }
  if (state === 'partial') {
    await expect(page.locator('#channels tr')).toHaveCount(2);
    await expect(page.getByText('Partial data is labelled through reduced channel coverage while core summary remains available.')).toBeVisible();
    return;
  }
  await expect(page.getByText('£48,216')).toBeVisible();
  await expect(page.locator('#channels tr')).toHaveCount(4);
}

test.describe('benchmark harness reference app', () => {
  for (const state of states) {
    test(`${state} state is renderable, responsive and axe-clean`, async ({ page }, testInfo) => {
      await page.goto(`/?state=${state}`);
      await expect(page.getByRole('heading', { name: 'Commerce performance', level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'State coverage', level: 2 })).toBeVisible();
      await expectStateSpecificOutput(page, state);

      const viewportOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(viewportOverflow).toBe(false);

      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

      await page.screenshot({ path: testInfo.outputPath(`${state}.png`), fullPage: true });
    });
  }

  test('keyboard entry exposes the skip link and usable primary action', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Refresh data' })).toBeFocused();
  });

  test('reduced-motion preference renders without relying on motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByText('Paid Social conversion dropped sharply on mobile.')).toBeVisible();
  });
});
