# SaaS Analytics v0

Status: **benchmark specification — not yet executed**

## Research question

Which AI-assisted product-design/build workflow produces the strongest production-ready analytics experience from the same structured brief, and which ByJTT Gauntlet checks reveal meaningful differences that screenshot-only judging misses?

## Why this benchmark

Analytics products expose common AI-design failure modes:

- unjustified card walls;
- weak information hierarchy;
- decorative charts without decisions attached;
- fake or pristine demo data;
- poor dense-data responsiveness;
- inaccessible chart/status semantics;
- missing empty/loading/error states;
- generic dashboard styling that does not express product intent.

## Inputs

All tested workflows receive the same `brief.json` and fixtures. Do not secretly enrich one workflow with additional product context.

## Required workflows for first valid run

At minimum compare two meaningfully different approaches:

1. **Prompt/brief baseline** — a strong general design/build workflow receives the benchmark package without ByJTT orchestration beyond necessary tool operation.
2. **ByJTT-guided workflow** — the same underlying generation capability where practical, augmented by ByJTT research/requirements discipline, solved-system discovery, Design Contract guidance and Gauntlet iteration.

Additional competitors may be added when their current interfaces permit a fair reproducible run.

## Budget and stopping rule

Before a run starts, record:

- tool/provider/model/version;
- allowed context;
- active-work time budget;
- maximum material generation/revision attempts;
- whether human design edits are allowed;
- monetary/credit budget where observable.

Do not extend the budget after seeing a weak result unless the run is marked invalid/restarted for every competitor.

## Required output

A candidate must be an inspectable implementation, not only an image. It must support the required core interaction and benchmark states.

Minimum evidence:

- production-like URL or locally runnable build reference;
- screenshots at all required viewports;
- loading, populated, empty, partial and error states;
- keyboard/focus evidence;
- automated accessibility output;
- benchmark score document;
- run metadata, retries, interventions and known costs;
- evaluator notes with uncertainty.

## First-run acceptance

Phase 1 succeeds when the first completed comparison:

- reveals at least one material workflow difference not obvious from a hero screenshot;
- demonstrates at least three Gauntlet checks that produce actionable evidence;
- records reproducible inputs/artifacts and efficiency metrics;
- identifies which proposed ByJTT checks are high-signal, low-signal or too subjective;
- produces concrete changes to the roadmap or requirements.

A ByJTT loss is a valid result.