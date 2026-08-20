# ByJTT Design — Benchmark Methodology

## Purpose

ByJTT benchmarks should answer practical questions such as:

> Which AI product-design workflow produces the strongest production-ready result for a given brief, under controlled conditions?

The goal is not to reward pretty screenshots. Benchmarks measure the path from structured requirements to validated implementation.

## Benchmark principles

1. **Same brief, same constraints.** Every workflow receives equivalent requirements and source context.
2. **Record the tool/version/date.** AI products change quickly.
3. **Separate generation from judging.** A system should not be the sole evaluator of its own output.
4. **Score production evidence.** Prototype polish alone cannot win.
5. **Expose failures and costs.** Retries, regressions, credits, time, and manual fixes matter.
6. **Preserve artifacts.** Inputs, outputs, screenshots, scores, and evaluator notes should be reproducible where licensing permits.
7. **Refresh benchmarks.** Historical results remain dated evidence, not timeless rankings.

## Benchmark classes

Initial classes should cover distinct digital-product demands:

- marketing/landing experience;
- SaaS analytics/data-heavy product;
- consumer mobile-first product;
- e-commerce/product-selection flow;
- complex settings/configuration;
- onboarding/multi-step workflow;
- accessibility-constrained redesign;
- localization/content-stress challenge;
- existing-design-system implementation;
- redesign with strict mutation locks.

## Standard benchmark package

Each test should include:

- problem statement;
- target users and jobs;
- business/product goals;
- required user flows;
- technical/platform constraints;
- accessibility baseline;
- content/data fixtures;
- design-system context when applicable;
- explicit non-goals;
- acceptance criteria;
- allowed tool/provider configuration;
- run budget and stopping rules.

## Core scorecard

Suggested 100-point starting model. Weights should be calibrated using real benchmark evidence rather than treated as permanent.

| Dimension | Weight | What it measures |
| --- | ---: | --- |
| Requirement coverage | 15 | Does the result solve the specified product problem? |
| UX / task quality | 12 | Clarity, efficiency, discoverability, error prevention/recovery. |
| Visual design | 10 | Hierarchy, typography, composition, rhythm, craft. |
| Distinctiveness / anti-slop | 8 | Product-specific intent vs model-default patterns. |
| Accessibility | 12 | Semantic, keyboard, contrast, zoom, motion, assistive-tech requirements. |
| Responsive quality | 8 | Intentional adaptation across required viewports. |
| State/content resilience | 8 | Empty/loading/error/long/localized/partial-data behavior. |
| Design-system conformance | 7 | Approved tokens/components/patterns and consistency. |
| Engineering quality | 8 | Maintainability, reuse, dependencies, component architecture, tests. |
| Performance | 4 | Runtime/bundle/rendering impact appropriate to the product. |
| Mutation fidelity | 3 | Requested changes vs unintended edits. |
| Provenance / ship safety | 2 | Source/license/dependency clarity where applicable. |
| Production readiness | 3 | Final integrated result passes required gates. |

## Efficiency metrics — reported separately

Do not hide efficiency inside the quality score. Report:

- elapsed active work time;
- model/tool calls;
- retries;
- user interventions;
- accepted vs rejected iterations;
- monetary/credit cost where knowable;
- cost per accepted material change;
- amount of generated code later replaced;
- number of unexpected regressions.

## Slop analysis

The anti-slop dimension should expose its reasons. Possible signals:

- unjustified cardization;
- repeated default layout grammar;
- generic hero/CTA structures;
- unexplained decorative gradients/glows/glass;
- excessive identical radii;
- generic placeholder marketing language;
- fake metrics/social proof;
- poor information-density fit;
- low design-decision traceability.

These signals are diagnostic, not automatic failures. Intent and product fit matter.

## Production test matrix

Where relevant, run:

- multiple mobile/tablet/desktop viewport widths;
- keyboard-only navigation;
- visible focus checks;
- automated accessibility checks plus targeted manual review;
- 200% zoom;
- reduced-motion preference;
- loading/empty/error/success states;
- long and short strings;
- missing/broken media;
- large/partial datasets;
- representative localization and RTL where required;
- performance/build/runtime validation;
- visual regression snapshots.

## Candidate competitors

The set should be refreshed before each public benchmark. Likely categories include:

- Figma Make;
- Google Stitch;
- v0;
- Lovable;
- Superdesign;
- Pencil/agent-accessible canvases;
- raw coding agents with design skills/context;
- ByJTT orchestration using the same available generators.

The benchmark must not be designed to guarantee ByJTT wins. A loss is valuable research and should change the product.

## Result format

Every published run should include:

1. benchmark version and date;
2. tested product/tool versions;
3. exact brief or a public equivalent;
4. run configuration/budget;
5. artifacts/screenshots;
6. score by dimension;
7. evidence for important deductions;
8. efficiency metrics;
9. known evaluator uncertainty;
10. lessons for ByJTT product development.

## Benchmark integrity

A benchmark is invalid if:

- one system gets materially richer hidden context;
- evaluators know the desired winner and scoring is not independently checked;
- only the strongest screenshot is judged while broken states are ignored;
- failed attempts/costs are silently discarded;
- current products are compared using stale capability assumptions;
- scoring rules are changed after seeing results without clearly versioning the benchmark.
