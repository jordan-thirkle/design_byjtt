# AGENTS.md

This repository is designed to be worked on by AI agents and humans together. Keep this file short: it routes agents to the right source of truth rather than duplicating project documentation.

## Always load

1. Read [`PRODUCT.md`](./PRODUCT.md) before making product, architecture, feature, positioning, or scope decisions.
2. Read [`DESIGN.md`](./DESIGN.md) before changing user-facing UI or visual behavior.
3. Preserve the boundary: ByJTT Design is for digital products; game-specific design belongs to games.byjtt.com.

## Route by task

- **Requirements / feature planning / acceptance criteria:** read [`docs/REQUIREMENTS.md`](./docs/REQUIREMENTS.md).
- **Competitor feature, build-vs-integrate, or market-positioning decision:** read [`docs/COMPETITIVE-MAP.md`](./docs/COMPETITIVE-MAP.md) and current primary documentation for affected tools.
- **AI-slop, user pain, UX failure, or design-quality claim:** read [`docs/research/AI-SLOP-AND-USER-PAIN.md`](./docs/research/AI-SLOP-AND-USER-PAIN.md) and refresh external evidence when the claim may have changed.
- **Benchmark, evaluation, scoring, or comparison work:** read [`docs/BENCHMARKS.md`](./docs/BENCHMARKS.md).
- **Sequencing / what to build next:** read [`docs/ROADMAP.md`](./docs/ROADMAP.md).
- **Durable change to product boundaries, architecture, or operating philosophy:** inspect [`docs/decisions/`](./docs/decisions/) and add/update an ADR when the decision would otherwise be rediscovered later.

## Execution rules

### Research first when the world can change
For current frameworks, AI products, APIs, standards, pricing, competitor capabilities, market claims, or library behavior, retrieve current documentation/evidence before deciding. Prefer primary documentation; use community sources such as Reddit for user experience and pain signals, not API truth.

### Best available solved system first
Before custom implementation, inspect in order:

1. existing repository capability;
2. existing approved project/design system;
3. mature open-source or commercial system;
4. interoperability standard;
5. custom implementation only when the above do not satisfy requirements.

Record material build-vs-adopt decisions in the relevant research/decision document.

### Requirements before code
Do not turn an idea directly into implementation when product behavior is ambiguous. Resolve it against `PRODUCT.md` and `docs/REQUIREMENTS.md`; add testable acceptance criteria before substantial implementation.

### Evidence before completion
A polished screenshot is not a completion criterion. Validate the actual implementation against relevant requirements: behavior, responsive states, content stress, accessibility, performance, design contract, tests, and build/runtime health.

### Bounded edits
For targeted design changes, preserve unrelated approved behavior. Treat unexpected visual or behavioral mutation outside the requested scope as a regression to investigate, not creative freedom.

### Keep sources of truth singular
Do not copy the same rules into multiple docs. Update the canonical document and link to it. Repository config/code is the source of truth for discoverable implementation details; docs should capture intent, rationale, workflow, evidence, and constraints that are not obvious from inspection.

### Document evidence, not lore
When research affects a product decision, capture the finding, date, source class, implication, and uncertainty. Distinguish:

- **Observed:** directly evidenced.
- **Inferred:** reasoned from evidence.
- **Hypothesis:** requires validation.

### Keep the project tool-independent
Do not couple core architecture to whichever AI generator is currently fashionable. Tool adapters may change; product requirements, contracts, evaluation, provenance, and benchmark methodology should remain portable.

## Definition of done

A change is done when:

- the relevant requirement/decision is satisfied;
- implementation and documentation agree;
- applicable tests/validation pass with fresh evidence;
- no unrelated scope was silently changed;
- durable new knowledge is captured in its canonical location;
- remaining uncertainty or follow-up work is explicit.
