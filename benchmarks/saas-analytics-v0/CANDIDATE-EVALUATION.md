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

With the candidate server already running, every real evaluation requires a unique run ID:

```text
npm run benchmark:candidate:evaluate -- --url http://127.0.0.1:<port> --run-id <run-id>
```

The runner accepts HTTP or HTTPS only. Run IDs are restricted to 1–80 characters using letters, numbers, dots, underscores and hyphens. When no URL is supplied, the command intentionally evaluates the repository's neutral reference app as a smoke test of the evaluator itself and does not require a run ID.

## Objective automated gates

The generic evaluator currently checks:

- successful HTTP navigation for every required state;
- a semantic `main` landmark and level-one heading;
- populated-state presence of the canonical headline fixture signals and Paid Social anomaly context;
- visible loading semantics inside `main` through `role=status` or `aria-busy`;
- a visible empty-state cue inside `main`;
- a visible partial/delayed-data cue inside `main` while core summary remains available;
- a visible error cue inside `main`, including semantic alerting when supplied;
- asynchronous state rendering is given a bounded wait before a state is failed;
- non-default states are materially distinct from the populated `main` content;
- no page-level horizontal overflow at required viewports;
- axe WCAG A/AA baseline using the same tags as the reference harness;
- no browser page errors or console errors during tested paths;
- basic visible keyboard entry into an interactive target;
- clean rendering when `prefers-reduced-motion: reduce` is requested;
- full-page screenshots for every state × viewport.

Fixture assertions are derived from the canonical deterministic fixture rather than from reference-app implementation IDs.

The reduced-motion automated check is intentionally a **render smoke only**. It proves the candidate can render its populated product under the user's reduced-motion media preference without runtime failure; it does not prove that every animation or transition is necessary, suppressed or appropriately reduced.

## What this evaluator deliberately does not claim

Passing these automated gates does **not** mean the candidate has passed the full ByJTT Gauntlet.

Still requiring evidence-backed evaluation include:

- task quality and required-flow usability;
- visual hierarchy, typography, composition and craft;
- distinctiveness / anti-slop judgement;
- whether the period/anomaly/segment interactions are genuinely useful rather than merely present;
- 200% zoom review;
- targeted assistive-technology review;
- full reduced-motion behavior review, including non-essential and continuous animation;
- performance interpretation;
- engineering architecture and maintainability;
- design-system rationale/conformance;
- provenance and dependency safety;
- mutation fidelity across revisions;
- subjective scoring calibration.

Those remain separate scorecard evidence, not hidden automated assumptions.

## Evidence output

A real candidate's evidence is run-specific and cannot share the default output directory with another candidate evaluation:

- `benchmark-run-evidence/<run-id>/test-results/`;
- `benchmark-run-evidence/<run-id>/playwright-report/`.

The neutral evaluator smoke target remains separate:

- `test-results-candidate-smoke/`;
- `playwright-report-candidate-smoke/`.

`BENCHMARK_CANDIDATE_ARTIFACT_ROOT` may relocate the root directory, but the run ID is always retained below it for a real target. Generated evidence is ignored by Git. Required evidence can then be copied into the immutable `runs/<run-id>/` benchmark record before scoring.

## Failure interpretation

A failed candidate gate is evidence about the candidate only when the harness itself is known-good.

The CI smoke run evaluates the generic candidate tests against the neutral reference app on every relevant PR. If that smoke run fails, treat it as an evaluator defect/regression before attributing the same failure to a benchmark candidate.
