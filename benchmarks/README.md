# ByJTT Design Benchmarks

This directory contains reproducible benchmark packages for comparing AI-assisted digital-product design/build workflows.

The benchmark methodology is defined in [`../docs/BENCHMARKS.md`](../docs/BENCHMARKS.md). Every benchmark package should preserve its brief, fixtures, run metadata, evidence, scorecard and conclusions.

## Phase 1 benchmark

The first benchmark is [`saas-analytics-v0`](./saas-analytics-v0/README.md).

It was chosen because it forces a workflow to solve more than visual polish: information hierarchy, real data density, states, responsiveness, accessibility, design-system consistency and production implementation quality.

## Package convention

Each benchmark should contain:

- `README.md` — benchmark purpose, protocol and stopping rules;
- `brief.json` — machine-readable product requirements;
- `fixtures/` — deterministic content/data/state fixtures;
- `runs/` — one directory per tested workflow/run;
- `score.schema.json` — score/evidence contract;
- `gauntlet.md` — benchmark-specific evaluation procedure where needed.

Do not publish invented results. A run directory is valid only when its tool/version/date, artifacts, evidence and scoring inputs are recorded.