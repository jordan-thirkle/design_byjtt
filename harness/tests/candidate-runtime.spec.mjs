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

function hasNumericSignal(text, value, { allowRounded = false } = {}) {
  const normalized = normalizeNumbers(text);
  const acceptedValues = [value];
  if (allowRounded) acceptedValues.push(Math.round(value));
  return acceptedValues.some((candidate) => exactNumberPattern(candidate).test(normalized));
}

async function hasVisibleLocator(locator) {
  const count = await locator.count();
  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible()) return true;
  }
  return false;
}

async function expectVisibleTextCue(main, pattern, label) {
  await expect.poll(
    async () => hasVisibleLocator(main.getByText(pattern)),
    { timeout: 5000, message: `Expected a visible ${label} cue inside main` }
  ).toBe(true);
}

async function expectFixtureSignals(page) {
  const main = page.getByRole('main');
  expect(anomalyChannel).toBeTruthy();

  await expect.poll(async () => {
    const text = await main.innerText();
    return (
      hasNumericSignal(text, fixture.headline.revenue.value, { allowRounded: true }) &&
      hasNumericSignal(text, fixture.headline.orders.value) &&
      hasNumericSignal(text, fixture.headline.conversionRate.value) &&
      hasNumericSignal(text, fixture.headline.averageOrderValue.value, { allowRounded: true }) &&
      normalizeText(text).includes(anomalyChannel)
    );
  }, { timeout: 5000, message: 'Expected canonical populated fixture signals inside main' }).toBe(true);
}

async function expectStateCue(page, state) {
  const main = page.getByRole('main');

  if (state === 'populated') {
    await expectFixtureSignals(page);
    return;
  }

  if (state === 'loading') {
    await expect.poll(
      async () => hasVisibleLocator(main.locator('[role="status"], [aria-busy="true"]')),
      { timeout: 5000, message: 'Expected visible loading semantics inside main' }
    ).toBe(true);
    return;
  }

  if (state === 'empty') {
    await expectVisibleTextCue(main, /no (?:performance )?data|no results|nothing to show|nothing here|empty|no activity/i, 'empty-state');
    return;
  }

  if (state === 'partial') {
    await expectVisibleTextCue(main, /partial|delayed|incomplete|limited|unavailable|missing|pending|still (?:loading|arriving)|some .*data/i, 'partial-data');
    await expect.poll(async () => {
      const text = await main.innerText();
      return hasNumericSignal(text, fixture.headline.revenue.value, { allowRounded: true });
    }, { timeout: 5000, message: 'Expected core revenue summary to remain available in partial state' }).toBe(true);
    return;
  }

  await expect.poll(async () => {
    if (await hasVisibleLocator(main.locator('[role="alert"], [aria-live="assertive"]'))) return true;
    return hasVisibleLocator(main.getByText(/error|could not|failed|try again|unavailable/i));
  }, { timeout: 5000, message: 'Expected a visible error cue inside main' }).toBe(true);
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

      const main = page.getByRole('main');
      await expect(main).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      await expectStateCue(page, state.id);

      const viewportOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(viewportOverflow, `${state.id} causes page-level horizontal overflow`).toBe(false);

      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);

      const stateText = normalizeText(await main.innerText());
      await page.screenshot({ path: testInfo.outputPath(`candidate-${state.id}.png`), fullPage: true });

      if (state.id !== 'populated') {
        const defaultResponse = await page.goto('/', { waitUntil: 'domcontentloaded' });
        expect(defaultResponse?.ok()).toBe(true);
        await expectFixtureSignals(page);
        const defaultText = normalizeText(await page.getByRole('main').innerText());
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

  test('reduced-motion preference render smoke remains clean', async ({ page }) => {
    const runtimeErrors = captureRuntimeErrors(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    await expect(page.getByRole('main')).toBeVisible();
    await expectFixtureSignals(page);
    expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  });
});
