import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const fixture = JSON.parse(await readFile(new URL('../../benchmarks/saas-analytics-v0/fixtures/analytics.json', import.meta.url), 'utf8'));
const evaluatingCandidate = Boolean(process.env.BENCHMARK_TARGET_URL || process.env.BENCHMARK_CANDIDATE_SMOKE);

const states = [
  { id: 'populated', path: '/' },
  { id: 'loading', path: '/?state=loading' },
  { id: 'empty', path: '/?state=empty' },
  { id: 'partial', path: '/?state=partial' },
  { id: 'error', path: '/?state=error' }
];

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
const normalizeNumbers = (value) => normalizeText(value).replace(/,/g, '');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const exactNumberPattern = (value) => new RegExp(`(?:^|[^\\d.])${escapeRegExp(String(value))}(?:$|[^\\d.])`);
const anomalyChannel = fixture.segments.channel.find((segment) => segment.name === 'Paid Social')?.name;

function expectNumericSignal(text, value, { allowRounded = false } = {}) {
  const normalized = normalizeNumbers(text);
  const acceptedValues = [value];
  if (allowRounded) acceptedValues.push(Math.round(value));

  expect(
    acceptedValues.some((candidate) => exactNumberPattern(candidate).test(normalized)),
    `Expected one of these fixture representations: ${acceptedValues.join(', ')}`
  ).toBe(true);
}

async function expectFixtureSignals(page) {
  const text = await page.locator('body').innerText();
  expectNumericSignal(text, fixture.headline.revenue.value);
  expectNumericSignal(text, fixture.headline.orders.value);
  expectNumericSignal(text, fixture.headline.conversionRate.value);
  expectNumericSignal(text, fixture.headline.averageOrderValue.value, { allowRounded: true });
  expect(anomalyChannel).toBeTruthy();
  expect(normalizeText(text)).toContain(anomalyChannel);
}

async function expectStateCue(page, state) {
  const text = normalizeText(await page.locator('body').innerText());

  if (state === 'populated') {
    await expectFixtureSignals(page);
    return;
  }

  if (state === 'loading') {
    expect(await page.locator('[role="status"], [aria-busy="true"]').count()).toBeGreaterThan(0);
    return;
  }

  if (state === 'empty') {
    expect(text).toMatch(/no (?:performance )?data|no results|nothing to show|nothing here|empty|no activity/i);
    return;
  }

  if (state === 'partial') {
    expect(text).toMatch(/partial|delayed|incomplete|limited|unavailable|missing|pending|still (?:loading|arriving)|some .*data/i);
    expectNumericSignal(text, fixture.headline.revenue.value);
    return;
  }

  const semanticAlertCount = await page.locator('[role="alert"], [aria-live="assertive"]').count();
  expect(semanticAlertCount > 0 || /error|could not|failed|try again|unavailable/i.test(text)).toBe(true);
}

function captureRuntimeErrors(page) {
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`);
  });
  return runtimeErrors;
}

test.describe('generic SaaS analytics candidate evaluator', () => {
  test.skip(!evaluatingCandidate, 'Candidate evaluator runs only for an external target or explicit smoke mode.');

  for (const state of states) {
    test(`${state.id} state satisfies objective runtime gates`, async ({ page }, testInfo) => {
      const runtimeErrors = captureRuntimeErrors(page);
      const response = await page.goto(state.path, { waitUntil: 'domcontentloaded' });
      expect(response, `No navigation response for ${state.path}`).not.toBeNull();
      expect(response.ok(), `${state.path} returned HTTP ${response.status()}`).toBe(true);

      await expect(page.getByRole('main')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      await expectStateCue(page, state.id);

      const viewportOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(viewportOverflow, `${state.id} causes page-level horizontal overflow`).toBe(false);

      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);

      const stateText = normalizeText(await page.locator('body').innerText());
      await page.screenshot({ path: testInfo.outputPath(`candidate-${state.id}.png`), fullPage: true });

      if (state.id !== 'populated') {
        const defaultResponse = await page.goto('/', { waitUntil: 'domcontentloaded' });
        expect(defaultResponse?.ok()).toBe(true);
        const defaultText = normalizeText(await page.locator('body').innerText());
        expect(stateText, `${state.id} appears identical to the populated state`).not.toBe(defaultText);
      }

      expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
    });
  }

  test('populated state exposes basic keyboard entry', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Tab');

    const focused = page.locator(':focus');
    await expect(focused).toHaveCount(1);
    const focusInfo = await focused.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName,
        visible: rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 && rect.top <= innerHeight && rect.left <= innerWidth
      };
    });

    expect(['BODY', 'HTML']).not.toContain(focusInfo.tag);
    expect(focusInfo.visible, 'First keyboard focus target is not visibly reachable').toBe(true);
    expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  });

  test('reduced-motion environment renders the populated product cleanly', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    await expect(page.getByRole('main')).toBeVisible();
    await expectFixtureSignals(page);
    expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  });
});
