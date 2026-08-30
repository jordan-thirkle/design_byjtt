# ADR 0010 — Public Design Standard and Production Consumer

**Status:** Proposed  
**Date:** 2026-08-30

## Decision

`design.byjtt.com` is the public ByJTT design standard, research and Design Studio/intelligence platform. `STANDARD.md` is its canonical public design standard for digital product work from August 2026 onward.

`byjtt.com` is the flagship production consumer of that standard. It should apply the standard to its own navigation, information architecture, visual language, accessibility, content resilience, AI/agent interaction and validation without copying the standard into the production repo.

The wider By JTT ecosystem may consume the standard without using the same frontend framework or implementation stack.

## Why

The same principles should govern both the thing teaching design and the thing demonstrating it. Separating the canonical standard from production implementations prevents the public standard from becoming a style guide tied to one site, while production use supplies evidence for future standard revisions.

## Source-of-truth boundaries

- `STANDARD.md`: canonical public design principles and requirements.
- `DESIGN.md`: ByJTT Design product visual/interaction contract and implementation-specific intent.
- `PRODUCT.md`: product mission, boundaries, strategy and operating loop.
- `docs/research/`: evidence and research records.
- `contracts/`: versioned portable design intent for specific products/specimens.
- production repositories: implementation details and production-specific exceptions.

Production code must not silently redefine the standard. Material exceptions should be deliberate and documented.

## Versioning and evidence loop

Changes to the standard are versioned. Production findings, benchmarks, accessibility results, user validation and community feedback may motivate revisions, but they do not automatically change the current standard.

Claims made by public pages must match their evidence status. Distinguish observed evidence, inference and hypothesis.

## Accessibility

Accessibility and inclusion are architectural requirements. Applicable browser, keyboard, assistive-technology, zoom/reflow, reduced-motion, localization/RTL and cognitive-accessibility considerations are evaluated as part of design and production validation.

## AI and agents

The standard is intentionally provider-independent. Public machine-readable surfaces expose the same canonical semantics for agents that human-readable pages expose for people. The interaction model distinguishes suggested, generated, inspected, verified, executed and human-approved states where applicable.

## Interoperability

The standard uses semantic tokens and should interoperate with stable design-token exchange formats where practical. It does not claim that external token specifications are ByJTT standards.

## Consequences

ByJTT can improve `byjtt.com`, Design Studio and future properties using one evolving set of principles while still allowing each product to have its own brand, frontend stack and component implementation.
