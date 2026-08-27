import { test, expect } from '@playwright/test';

const appUrl = 'http://127.0.0.1:4173/';

test('Studio renders the live website and evidence surface', async ({ page }) => {
  await page.goto(appUrl);
  await expect(page.getByRole('heading', { name: 'Direct the design' })).toBeVisible();
  await expect(page.getByLabel('Live website preview')).toContainText('Northshore Landscapes');
  await page.getByRole('button', { name: 'Evidence' }).first().click();
  await expect(page.getByRole('heading', { name: 'Show your work' })).toBeVisible();
  await expect(page.getByText('Product fit')).toBeVisible();
  await expect(page.getByText('7 of 7 checks passed')).toBeVisible();
  await expect(page.getByText('Verified')).toBeVisible();
});

test('plain-language iteration updates the live preview and records a decision', async ({ page }) => {
  await page.goto(appUrl);
  await page.getByPlaceholder(/Make it feel more premium/).fill('Make it more premium');
  await page.getByRole('button', { name: 'Send instruction' }).click();
  await expect(page.getByText(/raised the visual tone toward premium/i)).toBeVisible();
  await expect(page.getByLabel('Live website preview')).toContainText('Gardens made to feel considered.');
  const state = await page.evaluate(() => window.__BYJTT_STATE__);
  expect(state.project.decisions[0].id).toBe('BDR-0001');
  expect(state.project.decisions[0].affectedPaths).toContain('/design/direction');
});

test('publication requires explicit consent and then records the complete artefact', async ({ page }) => {
  await page.goto(appUrl);
  await page.getByRole('button', { name: 'Evidence' }).first().click();
  const publish = page.getByRole('button', { name: 'Publish to Library' });
  await expect(publish).toBeDisabled();
  await page.getByLabel(/I want to publish this design/).check();
  await expect(publish).toBeEnabled();
  await publish.click();
  await expect(page.getByRole('button', { name: /Published to Library/ })).toBeVisible();
  await page.getByRole('button', { name: 'Library' }).first().click();
  await expect(page.locator('#resource-card')).toContainText('Northshore Landscapes');
  await expect(page.locator('#resource-card')).toContainText('Verified');
  const state = await page.evaluate(() => window.__BYJTT_STATE__);
  expect(state.published.designContract.schemaVersion).toBe('0.1.0');
  expect(state.published.contextPackage.schemaVersion).toBe('0.1.0');
  expect(state.published.specimen.brand).toBe('Northshore Landscapes');
});
