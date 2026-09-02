# Phase 1 findings and proposed contract changes

Status: **post-run evidence; input to the next version**

The first controlled SaaS analytics pair completed on 2026-08-27. The prompt/brief baseline scored 78/100 and passed 28/28 objective runtime gates. The ByJTT-guided candidate scored 68/100 and passed 20/28.

The benchmark's frozen source manifest includes `docs/ROADMAP.md` and `docs/REQUIREMENTS.md`. Those files must remain byte-stable so the received treatment stays reproducible. This document records the evidence-driven changes that would otherwise have been applied directly to them.

## Roadmap update for the next version

Phase 1 has met its exit condition with a directional negative result. Accessibility, responsive render-matrix and required-flow trace checks were high signal. The current guided package expanded interaction coverage but failed to prevent semantic and narrow-layout defects.

Gauntlet v0 should prioritize:

- semantic HTML and automated accessibility checks;
- keyboard-accessible overflow regions;
- complete state × viewport evidence capture even when a gate fails;
- explicit traceability for every required flow.

Performance and mutation-fidelity scoring remain provisional until a benchmark task creates meaningful variation in those dimensions.

## Proposed R14 acceptance additions

An evaluated run must preserve candidate source, generation metadata, objective evidence, the complete state × viewport screenshot matrix, blind-review output, score bindings and disclosed confounds.

Guided packages must not rely on prose guidance alone for claims that can be checked deterministically. Semantic HTML, keyboard-accessible overflow and required-flow coverage should become mandatory pre-handoff checks in the next benchmark version.

These changes require a versioned context-manifest update before they can become treatment input. The frozen v0 inputs remain unchanged.

See [`../benchmarks/saas-analytics-v0/RESULTS.md`](../benchmarks/saas-analytics-v0/RESULTS.md) for the complete result and limitations.
