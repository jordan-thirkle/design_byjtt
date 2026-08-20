# SaaS Analytics v0 — Gauntlet

This is the first executable evaluation procedure for Phase 1. It intentionally prioritizes high-signal, evidence-backed checks before subjective taste scoring.

## Gate A — Run integrity

Fail the run as invalid if:
- the candidate did not receive the canonical brief;
- hidden extra requirements materially advantaged one workflow;
- required run metadata is missing;
- artifacts are not inspectable;
- retries/interventions were discarded.

## Gate B — Requirement coverage

Trace every acceptance criterion and required flow to evidence in the implementation. Record pass, partial or fail; never infer completion from appearance alone.

## Gate C — Render matrix

Capture the populated state at 320×800, 390×844, 768×1024 and 1440×1000. Capture loading, empty and error states at mobile and desktop minimum.

Flag:
- horizontal overflow affecting core content;
- clipped controls/content;
- unreadable dense data;
- desktop layouts merely scaled down rather than adapted;
- loss of required functionality on smaller viewports.

Preferred v0 automation: Playwright screenshots. Use stable deterministic fixtures and disable unrelated animation during evidence capture where necessary.

## Gate D — Accessibility baseline

Automate high-signal checks with Playwright + `@axe-core/playwright` when an implementation is available.

Also manually inspect at minimum:
- keyboard reachability of the core flow;
- visible focus;
- logical focus order;
- chart/status meaning without color alone;
- meaningful labels/names;
- 200% zoom usability;
- reduced-motion behavior.

Automated accessibility output is evidence, not proof of conformance.

## Gate E — State/content resilience

Render and inspect:
- loading;
- populated;
- empty;
- partial/delayed data;
- error;
- long anomaly title;
- missing comparison value;
- zero-revenue day;
- large currency value;
- no anomalies.

Deduct when layouts assume pristine demo content or communicate failure as blank space.

## Gate F — UX task review

A fresh evaluator should attempt:
1. determine whether performance is improving or declining;
2. identify the most important anomaly;
3. inspect supporting context;
4. change comparison period;
5. inspect a meaningful segment.

Record success, confusion, unnecessary steps and ambiguous controls.

## Gate G — Visual and anti-slop review

Only after objective gates, review:
- hierarchy;
- typography;
- composition;
- density appropriateness;
- visual coherence;
- product-specific distinctiveness.

Diagnostic anti-slop questions:
- Are cards used because items are independent units or because dashboards usually have cards?
- Does every visualization support a decision?
- Are decoration, gradients, glow, glass, pills or badges semantically justified?
- Does the interface have a product-specific information architecture or generic generator grammar?
- Is content real/fixture-backed rather than invented social proof or vanity metrics?

Do not ban a style by pattern alone. Deduct when design decisions lack defensible intent.

## Gate H — Engineering and ship safety

Inspect where evidence permits:
- component reuse;
- dependency choices;
- bespoke primitives that mature libraries could replace;
- tests;
- obvious maintainability problems;
- provenance/license clarity;
- runtime/build failures.

## Scoring

Use `score.schema.json`. The 100-point weights come from `docs/BENCHMARKS.md` and are provisional until calibrated with real runs.

Every material deduction requires an evidence reference and rationale. Subjective dimensions should include confidence.

## Phase 1 signal log

After each completed run, classify each check:
- **high signal** — repeatedly exposes consequential defects/differences;
- **promising** — useful but requires calibration;
- **low signal** — costly/noisy relative to insight;
- **premature** — cannot be evaluated reliably yet.

Update the roadmap/requirements based on observed evidence rather than preserving this Gauntlet unchanged.