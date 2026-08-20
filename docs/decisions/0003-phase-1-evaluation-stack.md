# ADR 0003 — Phase 1 evaluation stack

Status: Accepted for Phase 1

Date: 2026-08-20

## Context

Phase 1 needs reproducible rendered evidence without committing the project to a large custom test platform before the benchmark proves value.

Current official documentation confirms:

- Playwright supports full-page and element screenshots and screenshot assertions suitable for deterministic visual evidence.
- Playwright can integrate `@axe-core/playwright` for automated accessibility scans.
- Playwright explicitly notes that automated accessibility testing catches only some issues and should be combined with manual/inclusive review.
- Storybook has mature render, interaction, accessibility and visual-testing capabilities and is valuable once ByJTT has a component library/design-system surface to exercise.

Sources checked 2026-08-20:
- https://playwright.dev/docs/screenshots
- https://playwright.dev/docs/accessibility-testing
- https://storybook.js.org/docs/writing-tests
- https://storybook.js.org/docs/writing-tests/accessibility-testing
- https://storybook.js.org/docs/writing-tests/visual-testing

## Decision

For the first benchmark implementation:

1. Prefer **Playwright** for browser automation, viewport capture, interaction evidence and visual assertions.
2. Prefer **`@axe-core/playwright`** for the automated accessibility baseline.
3. Keep targeted manual/evaluator checks for keyboard flow, focus quality, chart meaning, zoom, reduced motion and UX judgement.
4. Do **not** require Storybook for Phase 1 merely to gain testing infrastructure.
5. Reconsider Storybook when a reusable ByJTT component/design-system implementation exists and isolated state/interaction coverage becomes a primary need.
6. Avoid a paid visual-regression dependency in the benchmark core until local/open tooling is shown inadequate. Cloud services may later be integrated rather than made foundational.

## Rationale

This minimizes custom infrastructure and cost while preserving the evidence Phase 1 actually needs. It also keeps benchmark execution portable and avoids making a component-workbench choice before the product has a component system.

## Consequences

- The first executable harness should be a small Playwright-based runner around implementations produced by benchmark workflows.
- Accessibility results must never be presented as complete WCAG certification.
- Visual-quality/anti-slop scoring remains rubric-based and evidence-backed; screenshot diffing alone cannot evaluate taste or product intent.
- Storybook remains an **INTEGRATE LATER WHEN JUSTIFIED** option, not a rejected technology.