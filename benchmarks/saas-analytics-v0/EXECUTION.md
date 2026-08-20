# SaaS Analytics v0 — Execution Protocol

Status: **pre-registered protocol for the first controlled run**

This document exists to prevent the benchmark from being unconsciously tuned after seeing candidate output.

## Research question

Does the ByJTT-guided product-design/build workflow produce materially stronger production-ready output than a strong prompt/brief baseline when both receive the same product problem, deterministic data and comparable generation budget?

## Experimental unit

A run is one **fresh generation context** that produces an inspectable implementation from the canonical benchmark package.

The first comparison requires two fresh contexts:

- `baseline-v0`: strong general-purpose design/build generation using only the canonical benchmark package and neutral operational instructions;
- `byjtt-guided-v0`: the same generator/provider where practical, using the same canonical benchmark package plus the predeclared ByJTT treatment below.

Do not create both candidates inside one AI conversation or agent context. Shared hidden conversation history would contaminate the baseline.

## Canonical inputs supplied to both workflows

Both workflows receive, without material semantic differences:

1. `brief.json`;
2. `fixtures/analytics.json`;
3. the requirement that the result be an inspectable web implementation rather than an image;
4. the required state contract: `default`, `loading`, `empty`, `partial`, `error`;
5. the required viewport targets: 320×800, 390×844, 768×1024, 1440×1000;
6. the same time/attempt budget;
7. the same permission or prohibition on human visual edits;
8. the same requirement to expose the generated implementation for evaluation.

The baseline does **not** receive ByJTT's private research conclusions, `DESIGN.md`, anti-slop taxonomy, competitive map, solved-system gate, or Gauntlet repair instructions.

## ByJTT treatment

The guided context receives the canonical inputs plus these fixed interventions, in this order:

1. **Requirements discipline** — convert the brief into explicit user jobs, information hierarchy, states, constraints and acceptance criteria before visual implementation.
2. **Solved-system gate** — inspect the environment and prefer mature accessible primitives/components before bespoke UI infrastructure.
3. **Design Contract** — apply the current `DESIGN.md` principles and rationale, including product-specific hierarchy, restrained visual devices, semantic states and anti-slop rules.
4. **Implementation continuity** — preserve semantic component intent through the implemented product rather than treating the screenshot as the deliverable.
5. **Pre-submission Gauntlet** — inspect the candidate against requirement coverage, state completeness, accessibility, responsive behaviour, content resilience, design-system coherence and obvious model-default design patterns; make only evidence-backed revisions within the shared attempt budget.

No post-hoc ByJTT instruction may be added to rescue a weak guided run unless the entire benchmark is invalidated and restarted with the new treatment pre-registered here.

## Budget

For the first run, unless a provider imposes a stricter observable cap:

- fresh context per workflow: required;
- maximum material generation/revision attempts: **3**;
- human visual editing: **not allowed**;
- human clarifications after start: **not allowed unless the generator cannot proceed for a non-design operational reason**;
- active operator time target: **30 minutes per workflow**;
- external paid credits/services: **not allowed without explicit user approval**;
- provider credits/cost: record exactly when exposed; otherwise `unknown`, never estimated as fact.

Operational retries caused solely by provider/network/runtime failure do not count as design attempts, but must be recorded.

## Generator equality

Preference order:

1. same provider + same model/version + separate fresh contexts;
2. same provider + closest available model/configuration;
3. different providers only if the first two are impossible.

Prefer GitHub-native, local, or already-included tooling before any external paid generator. See `docs/decisions/0004-benchmark-spend-and-isolation.md`.

If providers differ, the result is still useful exploratory evidence but **must not be interpreted as a clean causal estimate of the ByJTT treatment**. Record the provider mismatch as a major confound.

## Candidate interface contract

Each candidate should expose the same evaluation seam where the provider permits it:

- root/default view;
- `?state=loading`;
- `?state=empty`;
- `?state=partial`;
- `?state=error`.

If the generator cannot provide this seam after the allowed attempts, record that as state-resilience/production-readiness evidence rather than manually engineering it outside the workflow.

## Evidence captured during generation

Capture contemporaneously:

- provider/tool/model/version/date;
- exact material prompt/context supplied;
- start/end active time;
- every material generation/revision attempt;
- every human intervention;
- provider-visible credit/cost information;
- candidate URL/build reference;
- operational failures and retries;
- any generated work discarded or replaced.

Do not reconstruct these from memory after judging the result.

## Blindness and judging

Where practical, evaluator artifacts should use neutral candidate IDs (`candidate-a`, `candidate-b`) until objective harness checks are recorded.

Automated checks run before subjective scoring. Subjective visual/brand/anti-slop judgements must cite visible evidence and confidence.

The evaluator must not change benchmark weights after seeing which candidate is ahead. Any scoring-method change requires a benchmark version change and rerun.

## Required evaluation sequence

1. Validate benchmark contracts.
2. Capture candidate identity and generation metadata.
3. Run required viewport/state rendering checks.
4. Run axe accessibility baseline.
5. Check keyboard/focus and reduced-motion behaviour.
6. Record targeted manual evidence still not faithfully automated, including 200% zoom and assistive-tech concerns where applicable.
7. Score objective dimensions.
8. Score subjective dimensions with evidence and confidence.
9. Record efficiency metrics separately from quality.
10. Compare candidates.
11. Classify each Gauntlet check as high-signal, promising, low-signal or premature.
12. Update ByJTT requirements/roadmap only from observed evidence.

## Invalidation conditions

Invalidate or clearly downgrade a run if:

- one workflow receives material hidden context not declared here;
- the baseline is generated in a context already containing ByJTT strategy/research;
- budgets are changed after seeing output;
- external paid credits/services are used without explicit approval;
- human visual edits are applied to one candidate only;
- a provider failure materially reduces one candidate's opportunity and is treated as design quality;
- required evidence is lost;
- result scoring is filled from memory without evidence;
- a candidate is manually repaired outside its declared workflow before evaluation.

## Interpretation

A ByJTT win is not assumed. A baseline win is valuable evidence and must change the product thesis, treatment, or prioritisation where justified.

The first run is exploratory evidence from one benchmark class. It is not sufficient for broad public claims such as “ByJTT makes AI design better” until replicated across additional products, tools and benchmark classes.
