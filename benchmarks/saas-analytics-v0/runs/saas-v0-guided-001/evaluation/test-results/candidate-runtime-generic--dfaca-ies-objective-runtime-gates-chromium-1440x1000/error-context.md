# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: candidate-runtime.spec.mjs >> generic SaaS analytics candidate evaluator >> populated state satisfies objective runtime gates
- Location: harness/tests/candidate-runtime.spec.mjs:109:5

# Error details

```
Error: [
  {
    "id": "definition-list",
    "impact": "serious",
    "tags": [
      "cat.structure",
      "wcag2a",
      "wcag131",
      "EN-301-549",
      "EN-9.1.3.1",
      "RGAAv4",
      "RGAA-9.3.3"
    ],
    "description": "Ensure <dl> elements are structured correctly",
    "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
    "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/definition-list?application=playwright",
    "nodes": [
      {
        "any": [],
        "all": [],
        "none": [
          {
            "id": "only-dlitems",
            "data": {
              "values": "div > p"
            },
            "relatedNodes": [
              {
                "html": "<p><span>down 8.4%</span> vs comparison</p>",
                "target": [
                  ".metric.declining:nth-child(1) > p"
                ]
              },
              {
                "html": "<p><span>down 2.1%</span> vs comparison</p>",
                "target": [
                  ".metric.declining:nth-child(2) > p"
                ]
              },
              {
                "html": "<p><span>down 11.7%</span> vs comparison</p>",
                "target": [
                  ".metric.declining:nth-child(3) > p"
                ]
              },
              {
                "html": "<p><span>up 6.8%</span> vs comparison</p>",
                "target": [
                  ".improving.metric > p"
                ]
              }
            ],
            "impact": "serious",
            "message": "dl element has direct children that are not allowed: div > p"
          }
        ],
        "impact": "serious",
        "html": "<dl class=\"metrics\">",
        "target": [
          "dl"
        ],
        "failureSummary": "Fix all of the following:\n  dl element has direct children that are not allowed: div > p"
      }
    ]
  }
]

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 67

- Array []
+ Array [
+   Object {
+     "description": "Ensure <dl> elements are structured correctly",
+     "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/definition-list?application=playwright",
+     "id": "definition-list",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [],
+         "failureSummary": "Fix all of the following:
+   dl element has direct children that are not allowed: div > p",
+         "html": "<dl class=\"metrics\">",
+         "impact": "serious",
+         "none": Array [
+           Object {
+             "data": Object {
+               "values": "div > p",
+             },
+             "id": "only-dlitems",
+             "impact": "serious",
+             "message": "dl element has direct children that are not allowed: div > p",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<p><span>down 8.4%</span> vs comparison</p>",
+                 "target": Array [
+                   ".metric.declining:nth-child(1) > p",
+                 ],
+               },
+               Object {
+                 "html": "<p><span>down 2.1%</span> vs comparison</p>",
+                 "target": Array [
+                   ".metric.declining:nth-child(2) > p",
+                 ],
+               },
+               Object {
+                 "html": "<p><span>down 11.7%</span> vs comparison</p>",
+                 "target": Array [
+                   ".metric.declining:nth-child(3) > p",
+                 ],
+               },
+               Object {
+                 "html": "<p><span>up 6.8%</span> vs comparison</p>",
+                 "target": Array [
+                   ".improving.metric > p",
+                 ],
+               },
+             ],
+           },
+         ],
+         "target": Array [
+           "dl",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.structure",
+       "wcag2a",
+       "wcag131",
+       "EN-301-549",
+       "EN-9.1.3.1",
+       "RGAAv4",
+       "RGAA-9.3.3",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to analytics" [ref=e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - generic [ref=e5]:
      - paragraph [ref=e6]: Operational analytics
      - heading "Business health workspace" [level=1] [ref=e7]
    - navigation "Required state URLs" [ref=e8]:
      - link "Populated" [ref=e9] [cursor=pointer]:
        - /url: /
      - link "Loading" [ref=e10] [cursor=pointer]:
        - /url: /?state=loading
      - link "Empty" [ref=e11] [cursor=pointer]:
        - /url: /?state=empty
      - link "Partial" [ref=e12] [cursor=pointer]:
        - /url: /?state=partial
      - link "Error" [ref=e13] [cursor=pointer]:
        - /url: /?state=error
  - main [ref=e14]:
    - region [ref=e15]:
      - generic [ref=e16]:
        - paragraph [ref=e17]: Last 30 days compared with Previous 30 days
        - heading "Performance is declining. Revenue and conversion are both below the comparison period." [level=2] [ref=e18]
        - paragraph [ref=e19]: The largest visible risk is the Paid Social and mobile conversion drop after the checkout release.
      - form "Comparison period" [ref=e20]:
        - generic [ref=e21]: Compare
        - combobox "Compare" [ref=e22]:
          - option "Last 30 days" [selected]
          - option "Last 14 days"
          - option "Last 7 days"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - term [ref=e25]: Revenue
        - definition [ref=e26]: £48,216
        - paragraph [ref=e27]:
          - generic [ref=e28]: down 8.4%
          - text: vs comparison
      - generic [ref=e29]:
        - term [ref=e30]: Orders
        - definition [ref=e31]: 1,284
        - paragraph [ref=e32]:
          - generic [ref=e33]: down 2.1%
          - text: vs comparison
      - generic [ref=e34]:
        - term [ref=e35]: Conversion rate
        - definition [ref=e36]: 2.84%
        - paragraph [ref=e37]:
          - generic [ref=e38]: down 11.7%
          - text: vs comparison
      - generic [ref=e39]:
        - term [ref=e40]: Average order value
        - definition [ref=e41]: £37.55
        - paragraph [ref=e42]:
          - generic [ref=e43]: up 6.8%
          - text: vs comparison
    - generic [ref=e44]:
      - region [ref=e45]:
        - generic [ref=e46]:
          - generic [ref=e47]:
            - heading "Revenue trend" [level=2] [ref=e48]
            - paragraph [ref=e49]: "Revenue trend for Last 30 days: highest £1,906, lowest £0, including zero revenue on 2026-08-19."
          - strong [ref=e50]: £43,500
        - 'img "Revenue trend for Last 30 days: highest £1,906, lowest £0, including zero revenue on 2026-08-19." [ref=e51]':
          - 'generic "2026-07-22: £1,712.22" [ref=e53]'
          - 'generic "2026-07-23: £1,644.90" [ref=e54]'
          - 'generic "2026-07-24: £1,803.31" [ref=e55]'
          - 'generic "2026-07-25: £1,905.67" [ref=e56]'
          - 'generic "2026-07-26: £1,742.18" [ref=e57]'
          - 'generic "2026-07-27: £1,698.73" [ref=e58]'
          - 'generic "2026-07-28: £1,779.41" [ref=e59]'
          - 'generic "2026-07-29: £1,814.36" [ref=e60]'
          - 'generic "2026-07-30: £1,751.44" [ref=e61]'
          - 'generic "2026-07-31: £1,688.12" [ref=e62]'
          - 'generic "2026-08-01: £1,729.03" [ref=e63]'
          - 'generic "2026-08-02: £1,660.42" [ref=e64]'
          - 'generic "2026-08-03: £1,542.98" [ref=e65]'
          - 'generic "2026-08-04: £1,477.65" [ref=e66]'
          - 'generic "2026-08-05: £1,402.37" [ref=e67]'
          - 'generic "2026-08-06: £1,321.09" [ref=e68]'
          - 'generic "2026-08-07: £1,299.14" [ref=e69]'
          - 'generic "2026-08-08: £1,355.88" [ref=e70]'
          - 'generic "2026-08-09: £1,394.22" [ref=e71]'
          - 'generic "2026-08-10: £1,410.73" [ref=e72]'
          - 'generic "2026-08-11: £1,366.19" [ref=e73]'
          - 'generic "2026-08-12: £1,294.66" [ref=e74]'
          - 'generic "2026-08-13: £1,240.12" [ref=e75]'
          - 'generic "2026-08-14: £1,198.90" [ref=e76]'
          - 'generic "2026-08-15: £1,225.44" [ref=e77]'
          - 'generic "2026-08-16: £1,268.17" [ref=e78]'
          - 'generic "2026-08-17: £1,301.83" [ref=e79]'
          - 'generic "2026-08-18: £1,282.51" [ref=e80]'
          - 'generic "2026-08-19: £0.00" [ref=e81]'
          - 'generic "2026-08-20: £1,188.04" [ref=e82]'
      - region [ref=e83]:
        - heading "Recent context" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - time [ref=e87]: 2 Aug
            - generic [ref=e88]: release
            - text: Mobile checkout update deployed
          - listitem [ref=e89]:
            - time [ref=e90]: 15 Aug
            - generic [ref=e91]: campaign
            - text: Paid Social creative refresh
    - region [ref=e92]:
      - generic [ref=e93]:
        - heading "Anomaly queue" [level=2] [ref=e94]
        - button "high priority Paid Social conversion fell sharply after the mobile checkout release while traffic stayed broadly stable" [pressed] [ref=e96] [cursor=pointer]:
          - generic [ref=e97]: high priority
          - text: Paid Social conversion fell sharply after the mobile checkout release while traffic stayed broadly stable
      - article [ref=e98]:
        - paragraph [ref=e99]: high priority anomaly
        - heading "Paid Social conversion fell sharply after the mobile checkout release while traffic stayed broadly stable" [level=3] [ref=e100]
        - paragraph [ref=e101]: Conversion from Paid Social is down 29% versus the previous period; the decline is concentrated on mobile.
        - heading "Supporting evidence" [level=4] [ref=e102]
        - list [ref=e103]:
          - listitem [ref=e104]: Paid Social revenue -31.6%
          - listitem [ref=e105]: Mobile conversion -13.9%
          - listitem [ref=e106]: Desktop conversion +4.1%
        - heading "Likely cause" [level=4] [ref=e107]
        - paragraph [ref=e108]: Possible mobile checkout regression; requires investigation rather than certainty.
    - region [ref=e109]:
      - generic [ref=e110]:
        - generic [ref=e111]:
          - heading "Segment inspection" [level=2] [ref=e112]
          - paragraph [ref=e113]: Revenue and conversion movement by business segment.
        - tablist "Segment type" [ref=e114]:
          - tab "Channel" [selected] [ref=e115] [cursor=pointer]
          - tab "Device" [ref=e116] [cursor=pointer]
      - table [ref=e118]:
        - rowgroup [ref=e119]:
          - row [ref=e120]:
            - columnheader "Segment" [ref=e121]
            - columnheader "Revenue" [ref=e122]
            - columnheader "Conversion" [ref=e123]
            - columnheader "Change" [ref=e124]
        - rowgroup [ref=e125]:
          - row [ref=e126]:
            - rowheader "Organic Search" [ref=e127]
            - cell "£18,124" [ref=e128]
            - cell "Not tracked" [ref=e129]
            - cell "up 3.2%" [ref=e130]
          - row [ref=e132]:
            - rowheader "Paid Social" [ref=e133]
            - cell "£10,448" [ref=e134]
            - cell "Not tracked" [ref=e135]
            - cell "down 31.6%" [ref=e136]
          - row [ref=e138]:
            - rowheader "Email" [ref=e139]
            - cell "£9,177" [ref=e140]
            - cell "Not tracked" [ref=e141]
            - cell "up 8.1%" [ref=e142]
          - row [ref=e144]:
            - rowheader "Direct" [ref=e145]
            - cell "£10,467" [ref=e146]
            - cell "Not tracked" [ref=e147]
            - cell "down 4.7%" [ref=e148]
```

# Test source

```ts
  26  |   return acceptedValues.some((candidate) => exactNumberPattern(candidate).test(normalized));
  27  | }
  28  | 
  29  | async function hasVisibleLocator(locator) {
  30  |   const count = await locator.count();
  31  |   for (let index = 0; index < count; index += 1) {
  32  |     if (await locator.nth(index).isVisible()) return true;
  33  |   }
  34  |   return false;
  35  | }
  36  | 
  37  | async function expectVisibleTextCue(main, pattern, label) {
  38  |   await expect.poll(
  39  |     async () => hasVisibleLocator(main.getByText(pattern)),
  40  |     { timeout: 5000, message: `Expected a visible ${label} cue inside main` }
  41  |   ).toBe(true);
  42  | }
  43  | 
  44  | async function expectFixtureSignals(page) {
  45  |   const main = page.getByRole('main');
  46  |   expect(anomalyChannel).toBeTruthy();
  47  | 
  48  |   await expect.poll(async () => {
  49  |     const text = await main.innerText();
  50  |     return (
  51  |       hasNumericSignal(text, fixture.headline.revenue.value, { allowRounded: true }) &&
  52  |       hasNumericSignal(text, fixture.headline.orders.value) &&
  53  |       hasNumericSignal(text, fixture.headline.conversionRate.value) &&
  54  |       hasNumericSignal(text, fixture.headline.averageOrderValue.value, { allowRounded: true }) &&
  55  |       normalizeText(text).includes(anomalyChannel)
  56  |     );
  57  |   }, { timeout: 5000, message: 'Expected canonical populated fixture signals inside main' }).toBe(true);
  58  | }
  59  | 
  60  | async function expectStateCue(page, state) {
  61  |   const main = page.getByRole('main');
  62  | 
  63  |   if (state === 'populated') {
  64  |     await expectFixtureSignals(page);
  65  |     return;
  66  |   }
  67  | 
  68  |   if (state === 'loading') {
  69  |     await expect.poll(
  70  |       async () => hasVisibleLocator(main.locator('[role="status"], [aria-busy="true"]')),
  71  |       { timeout: 5000, message: 'Expected visible loading semantics inside main' }
  72  |     ).toBe(true);
  73  |     return;
  74  |   }
  75  | 
  76  |   if (state === 'empty') {
  77  |     await expectVisibleTextCue(main, /no (?:performance )?data|no results|nothing to show|nothing here|empty|no activity/i, 'empty-state');
  78  |     return;
  79  |   }
  80  | 
  81  |   if (state === 'partial') {
  82  |     await expectVisibleTextCue(main, /partial|delayed|incomplete|limited|unavailable|missing|pending|still (?:loading|arriving)|some .*data/i, 'partial-data');
  83  |     await expect.poll(async () => {
  84  |       const text = await main.innerText();
  85  |       return hasNumericSignal(text, fixture.headline.revenue.value, { allowRounded: true });
  86  |     }, { timeout: 5000, message: 'Expected core revenue summary to remain available in partial state' }).toBe(true);
  87  |     return;
  88  |   }
  89  | 
  90  |   await expect.poll(async () => {
  91  |     if (await hasVisibleLocator(main.locator('[role="alert"], [aria-live="assertive"]'))) return true;
  92  |     return hasVisibleLocator(main.getByText(/error|could not|failed|try again|unavailable/i));
  93  |   }, { timeout: 5000, message: 'Expected a visible error cue inside main' }).toBe(true);
  94  | }
  95  | 
  96  | function captureRuntimeErrors(page) {
  97  |   const runtimeErrors = [];
  98  |   page.on('pageerror', (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  99  |   page.on('console', (message) => {
  100 |     if (message.type() === 'error') runtimeErrors.push(`console: ${message.text()}`);
  101 |   });
  102 |   return runtimeErrors;
  103 | }
  104 | 
  105 | test.describe('generic SaaS analytics candidate evaluator', () => {
  106 |   test.skip(!evaluatingCandidate, 'Candidate evaluator runs only for an external target or explicit smoke mode.');
  107 | 
  108 |   for (const state of states) {
  109 |     test(`${state.id} state satisfies objective runtime gates`, async ({ page }, testInfo) => {
  110 |       const runtimeErrors = captureRuntimeErrors(page);
  111 |       const response = await page.goto(state.path, { waitUntil: 'domcontentloaded' });
  112 |       expect(response, `No navigation response for ${state.path}`).not.toBeNull();
  113 |       expect(response.ok(), `${state.path} returned HTTP ${response.status()}`).toBe(true);
  114 | 
  115 |       const main = page.getByRole('main');
  116 |       await expect(main).toBeVisible();
  117 |       await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  118 |       await expectStateCue(page, state.id);
  119 | 
  120 |       const viewportOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  121 |       expect(viewportOverflow, `${state.id} causes page-level horizontal overflow`).toBe(false);
  122 | 
  123 |       const accessibility = await new AxeBuilder({ page })
  124 |         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  125 |         .analyze();
> 126 |       expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);
      |                                                                                           ^ Error: [
  127 | 
  128 |       const stateText = normalizeText(await main.innerText());
  129 |       await page.screenshot({ path: testInfo.outputPath(`candidate-${state.id}.png`), fullPage: true });
  130 | 
  131 |       if (state.id !== 'populated') {
  132 |         const defaultResponse = await page.goto('/', { waitUntil: 'domcontentloaded' });
  133 |         expect(defaultResponse?.ok()).toBe(true);
  134 |         await expectFixtureSignals(page);
  135 |         const defaultText = normalizeText(await page.getByRole('main').innerText());
  136 |         expect(stateText, `${state.id} appears identical to the populated state`).not.toBe(defaultText);
  137 |       }
  138 | 
  139 |       expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  140 |     });
  141 |   }
  142 | 
  143 |   test('populated state exposes basic keyboard entry', async ({ page }) => {
  144 |     const runtimeErrors = captureRuntimeErrors(page);
  145 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  146 |     await page.keyboard.press('Tab');
  147 | 
  148 |     const focused = page.locator(':focus');
  149 |     await expect(focused).toHaveCount(1);
  150 |     const focusInfo = await focused.evaluate((element) => {
  151 |       const rect = element.getBoundingClientRect();
  152 |       return {
  153 |         tag: element.tagName,
  154 |         visible: rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 && rect.top <= innerHeight && rect.left <= innerWidth
  155 |       };
  156 |     });
  157 | 
  158 |     expect(['BODY', 'HTML']).not.toContain(focusInfo.tag);
  159 |     expect(focusInfo.visible, 'First keyboard focus target is not visibly reachable').toBe(true);
  160 |     expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  161 |   });
  162 | 
  163 |   test('reduced-motion preference render smoke remains clean', async ({ page }) => {
  164 |     const runtimeErrors = captureRuntimeErrors(page);
  165 |     await page.emulateMedia({ reducedMotion: 'reduce' });
  166 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  167 |     expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  168 |     await expect(page.getByRole('main')).toBeVisible();
  169 |     await expectFixtureSignals(page);
  170 |     expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
  171 |   });
  172 | });
  173 | 
```