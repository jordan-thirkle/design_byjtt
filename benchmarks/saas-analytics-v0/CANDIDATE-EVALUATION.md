# SaaS Analytics v0 — Candidate Evaluation Seam

This document defines how a runnable candidate enters the merged ByJTT benchmark harness without changing the benchmark treatment or requiring a third-party deployment.

## Principle

Candidate generation and candidate evaluation are separate concerns.

A fresh isolated generation context produces a runnable implementation. The ByJTT evaluator receives only a URL to that already-running implementation and evaluates public runtime behavior. The evaluator does **not** install, repair, deploy, publish, provision or visually edit a candidate.

This keeps candidate-specific build tooling out of the benchmark judge and avoids giving one workflow extra implementation help.

## Target contract

The candidate must already be reachable over HTTP(S). Localhost is preferred when possible; no public deployment is required.

The target must expose:

- `/` — populated/default state;
- `/?state=loading`;
- `/?state=empty`;
- `/?state=partial`;
- `/?state=error`.

All five states are evaluated at:

- 320×800;
- 390×844;
- 768×1024;
- 1440×1000.

## Running the evaluator

With the candidate server already running:

```text
npm run benchmark:candidate:evaluate -- --url http://127.0.0.1:<port>
```

The runner accepts HTTP or HTTPS only. When no URL is supplied, it intentionally evaluates the repository's neutral reference app as a smoke test of the evaluator itself.

## Objective automated gates

The generic evaluator currently checks:

- successful HTTP navigation for every required state;
- a semantic `main` landmark and level-one heading;
- populated-state presence of the canonical headline fixture signals and Paid Social anomaly context;
- explicit loading semantics through `role=status` or `aria-busy`;
- communicated empty state;
- communicated partial/delayed-data state while core summary remains available;
- communicated error state with semantic alerting or clear error copy;
- non-default states are materially distinct from the populated state;
- no page-level horizontal overflow at required viewports;
- axe WCAG A/AA baseline using the same tags as the reference harness;
- no browser page errors or console errors during tested paths;
- basic visible keyboard entry into an interactive target;
- clean rendering when `prefers-reduced-motion: reduce` is active;
- full-page screenshots for every state × viewport.

Fixture assertions are derived from the canonical deterministic fixture rather than from reference-app implementation IDs.

## What this evaluator deliberately does not claim

Passing these automated gates does **not** mean the candidate has passed the full ByJTT Gauntlet.

Still requiring evidence-backed evaluation include:

- task quality and required-flow usability;
- visual hierarchy, typography, composition and craft;
- distinctiveness / anti-slop judgement;
- whether the period/anomaly/segment interactions are genuinely useful rather than merely present;
- 200% zoom review;
- targeted assistive-technology review;
- performance interpretation;
- engineering architecture and maintainability;
- design-system rationale/conformance;
- provenance and dependency safety;
- mutation fidelity across revisions;
- subjective scoring calibration.

Those remain separate scorecard evidence, not hidden automated assumptions.

## Evidence output

Candidate evaluation uses separate generated directories so it cannot overwrite reference-harness evidence:

- `test-results-candidate/` for a real target;
- `playwright-report-candidate/` for a real target;
- `test-results-candidate-smoke/` for the neutral evaluator smoke target;
- `playwright-report-candidate-smoke/` for that smoke target.

Generated evidence is ignored by Git. A benchmark run may copy required evidence into its immutable `runs/<run-id>/` record before scoring.

## Failure interpretation

A failed candidate gate is evidence about the candidate only when the harness itself is known-good.

The CI smoke run evaluates the generic candidate tests against the neutral reference app on every relevant PR. If that smoke run fails, treat it as an evaluator defect/regression before attributing the same failure to a benchmark candidate.
