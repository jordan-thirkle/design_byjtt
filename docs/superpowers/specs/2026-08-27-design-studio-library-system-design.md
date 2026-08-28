# ByJTT Design Studio + Resource Library — Product Specification

**Status:** Approved for first implementation

## Goal

Make `design.byjtt.com` a usable AI-assisted web design studio for people with little or no design skill, while making every intentionally published result a reusable, inspectable Resource Library item and evidence of the ByJTT pipeline working.

## Product boundary

- `byjtt.com` remains the canonical independent By JTT studio site.
- `design.byjtt.com` is the product: Design Studio + Resource Library.
- `games.byjtt.com` owns game-specific work and asset pipelines.
- `experiments.byjtt.com` owns general experiments.

## Core loop

**Describe → Understand → Design → Build → Direct → Validate → Publish → Remix**

The AI is the design expert; the user communicates goals and preferences in ordinary language. The product should not require knowledge of typography, grids, components, breakpoints or design software.

## Studio

The Studio contains three persistent surfaces:

1. **Conversation** — explains the design direction, accepts plain-language changes, records iterations and rationale.
2. **Live preview** — renders the actual website, with desktop/tablet/mobile modes and real interaction/content states.
3. **Evidence** — exposes product fit, UX hierarchy, accessibility, responsive behaviour, content resilience, engineering and provenance checks.

Iteration is reversible in the eventual production system. The first slice records an append-only iteration history and re-renders deterministically.

## Resource Library

Resources are complete design specimens rather than screenshots. A resource may contain a website, page section, component or design system in future versions.

Every published resource should expose:

- title and use case;
- status;
- live preview;
- design intent;
- responsive behaviour;
- component/state information;
- evidence results;
- provenance;
- licence;
- AI involvement;
- remix capability.

Publication is always opt-in. Private project content must never become public automatically.

## Evidence model

Initial verification dimensions:

- Product fit
- UX hierarchy
- Accessibility
- Responsive behaviour
- Content resilience
- Engineering
- Provenance

The first slice uses deterministic checks to establish the product contract. Future checks will use real browser rendering, Axe, content mutation, performance measurement, visual regression and independent specialist evaluators.

## First vertical slice

The first specimen is a local landscaping business, **Northshore Landscapes**, with a primary conversion goal of requesting a quote.

Success means a user can:

1. open the Studio;
2. see a complete website rather than a wireframe;
3. understand why ByJTT chose the direction;
4. request a change in ordinary language;
5. see the live website change;
6. inspect seven evidence dimensions;
7. explicitly publish the result;
8. browse it as a Resource Library item;
9. remix it back into Studio.

## Visual direction

Use the existing By JTT foundation: warm paper, carbon ink and signal accent. The product should be rigorous, contemporary, calm, confident and inspectable. Avoid generic AI SaaS gradients, glassmorphism, decorative card grids and oversized marketing typography that hides product information.

The generated specimen is allowed to have its own visual language; it should demonstrate that ByJTT can produce a distinctive, purposeful website rather than another dashboard.

## Implementation boundary

The first application is deliberately dependency-light and browser-native. The deterministic model is an adapter boundary, not the final AI architecture. A production model can later consume Design Contracts, registry context and evidence requirements without requiring a new Studio UX.

## Monetisation boundary

Free fundamentals include basic creation, free resources and fundamental accessibility/safety knowledge. Paid value will later include private projects, higher-volume model usage, premium resources, specialist systems, team libraries, governance and support. The first slice does not implement payments.
