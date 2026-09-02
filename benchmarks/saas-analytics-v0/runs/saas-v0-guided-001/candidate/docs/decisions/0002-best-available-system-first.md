# ADR 0002 — Best Available Solved System First

- **Status:** Accepted
- **Date:** 2026-08-20

## Context

AI agents can generate large amounts of bespoke frontend/design-system code quickly, which makes unnecessary reinvention deceptively cheap at creation time while increasing long-term maintenance, accessibility, quality, and compatibility risk.

The current ecosystem already contains strong design canvases, component systems, registries, design-to-code tools, accessibility primitives, and AI generators. ByJTT's value should come from selecting, orchestrating, validating, and improving the best available systems rather than reproducing commodity capabilities.

## Decision

Before material custom implementation, ByJTT agents must investigate in this order:

1. existing repository capability;
2. existing approved design/product system;
3. mature open-source or commercial solution;
4. established interoperability standard/protocol;
5. custom implementation only when the previous options do not satisfy the requirements.

Decisions should compare at least quality, accessibility, maintenance, licensing, ecosystem, portability, performance, cost, and product/design fit where relevant.

## Consequences

- shadcn-style/open registry protocols should be adopted when suitable instead of inventing incompatible distribution formats.
- Best-in-class generators such as current frontend/design tools can remain execution backends rather than being duplicated.
- The UI Registry is primarily a discovery, evidence, ranking, and interoperability layer—not a vanity catalogue of ByJTT-owned components.
- Custom code needs a positive justification, not merely the fact that an AI can write it quickly.
- Competitive and open-source discovery remain continuous engineering activities, not one-time research.
