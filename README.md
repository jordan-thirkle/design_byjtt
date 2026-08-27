# ByJTT Design

**Research, design, build, and validate excellent digital products with AI.**

ByJTT Design is an AI-native product-design intelligence and quality system for web, mobile, SaaS, websites, and software interfaces. It exists to help humans and AI agents move from a real product problem to a production-validated digital product without collapsing into generic AI-generated design.

The core loop is:

> **Understand → Research → Specify → Architect → Design → Compare → Validate → Build → Test → Ship → Monitor → Learn**

## What this repository is

This repository is the source of truth for the ByJTT Design product, research program, benchmark suite, agent workflows, and the future `design.byjtt.com` implementation.

It is **not** a generic UI kit, a Figma replacement, or another prompt-to-frontend wrapper. ByJTT should orchestrate the best available design and development systems, add evidence-backed product/design intelligence, and independently judge what deserves to ship.

## Core capabilities

- **Product & design research** — user needs, competitor intelligence, patterns, evidence, and current tooling.
- **Design Contracts** — machine-readable product/design intent, rationale, constraints, semantics, and provenance.
- **Federated UI Registry** — discover and rank the best existing components/systems before generating new ones.
- **Agent / Skill / MCP layer** — expose ByJTT design intelligence to coding and design agents.
- **Design Gauntlet** — independent product, UX, visual, brand, accessibility, responsive, anti-slop, provenance, and engineering review.
- **Benchmarks** — reproducible comparisons of AI product-design workflows using the same briefs and scoring.
- **Production validation** — real browser states, accessibility, responsiveness, content stress, visual regression, and design-system conformance.
- **Design health** — track drift, debt, system saturation, regressions, and quality over time.

## Project boundaries

ByJTT Design covers **digital products**: web, mobile, SaaS, websites, software interfaces, and their design-to-production workflows.

Game-specific product/design research belongs to **games.byjtt.com** and should not be mixed into this product unless a shared infrastructure capability is truly domain-independent.

## Start here

Humans: read [`PRODUCT.md`](./PRODUCT.md).

AI agents: read [`AGENTS.md`](./AGENTS.md) first, then follow its context pointers.

## Repository map

- [`PRODUCT.md`](./PRODUCT.md) — canonical product thesis, scope, architecture, and principles.
- [`AGENTS.md`](./AGENTS.md) — operating rules and context routing for AI agents.
- [`DESIGN.md`](./DESIGN.md) — design contract for ByJTT Design itself.
- [`docs/REQUIREMENTS.md`](./docs/REQUIREMENTS.md) — capability and acceptance requirements.
- [`docs/COMPETITIVE-MAP.md`](./docs/COMPETITIVE-MAP.md) — competitor coverage and strategic response.
- [`docs/research/AI-SLOP-AND-USER-PAIN.md`](./docs/research/AI-SLOP-AND-USER-PAIN.md) — researched user problems and anti-slop taxonomy.
- [`docs/BENCHMARKS.md`](./docs/BENCHMARKS.md) — benchmark methodology and scorecard.
- [`docs/ROADMAP.md`](./docs/ROADMAP.md) — sequenced delivery plan.
- [`docs/decisions/`](./docs/decisions/) — durable architecture/product decisions.
- [`docs/architecture/V0.1-FOUNDATION.md`](./docs/architecture/V0.1-FOUNDATION.md) — evidence, decisions, contracts, context packages, adapters and conformance.
- [`docs/concepts/PLAUSIBILITY-DEBT.md`](./docs/concepts/PLAUSIBILITY-DEBT.md) — public definitions of plausibility debt, the Demo Trap and design slop.
- [`schemas/v0.1/`](./schemas/v0.1/) — validated interoperable record contracts and examples.

## Status

**Foundation / research-to-build transition.** The product architecture and research thesis are being formalized before implementation so the codebase starts from explicit requirements rather than becoming another unstructured AI-generated app.
