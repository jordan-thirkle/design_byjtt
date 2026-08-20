# ADR 0001 — Product Boundary: Digital Products, Not Game Design

- **Status:** Accepted
- **Date:** 2026-08-20

## Context

The broader ByJTT ecosystem includes substantial game-development work. During early product research, game UI and game-asset generation began leaking into the ByJTT Design thesis, which weakened positioning and confused the competitive set.

## Decision

ByJTT Design will focus on **researching, designing, building, and validating excellent digital products with AI**: web, mobile, SaaS, websites, and software interfaces.

Game-specific design, HUDs, game art direction, asset generation, engine workflows, controller-specific UX, and related research belong to **games.byjtt.com**.

Domain-independent infrastructure may be shared where it is genuinely general-purpose (for example evaluation methodology, provenance concepts, research infrastructure, or agent orchestration), but public positioning and product-specific requirements remain separated.

## Consequences

- Competitive research centers on digital-product design/build systems.
- `design.byjtt.com` remains legible to product teams, designers, engineers, and AI builders.
- Game-specific research can become deeper rather than being treated as a side feature of this product.
- Shared infrastructure must prove domain independence rather than using “could also work for games” as a reason to expand scope.
