# ByJTT Design — Product Source of Truth

## Mission

ByJTT Design researches, designs, builds, and validates excellent digital products with AI.

Its purpose is to prevent the common failure mode where AI produces superficially polished but generic, poorly reasoned, inconsistent, inaccessible, brittle, or production-unready interfaces.

## Product thesis

AI has commoditized first-pass interface generation. The harder problem is deciding **what should be built, why it should look and behave that way, whether existing systems already solve it, which candidate is actually best, and whether the implemented product survives production reality**.

ByJTT therefore operates above individual generators. Models and tools are replaceable execution backends; research, requirements, design intent, evaluation, provenance, and learning are the durable system.

## Canonical loop

1. **Understand** — product problem, users, jobs, business goals, constraints.
2. **Research** — user evidence, competitors, patterns, platform conventions, mature solved systems.
3. **Specify** — structured requirements and measurable success criteria.
4. **Architect** — information architecture, flows, states, content hierarchy, permissions, data relationships.
5. **Design** — create a Design Contract and multiple evidence-backed directions.
6. **Compare** — evaluate candidates independently rather than trusting a generator's self-assessment.
7. **Validate** — product, UX, visual, brand, accessibility, responsive, content, provenance, originality, and engineering review.
8. **Build** — reuse approved existing systems first; generate custom implementation only where justified.
9. **Test** — real browsers, real content, edge states, accessibility, performance, visual and behavioral regression.
10. **Ship** — only after production gates are met.
11. **Monitor** — detect design drift, debt, regressions, and degraded system conformance.
12. **Learn** — feed accepted/rejected outcomes and benchmark evidence back into the knowledge layer.

## Product surfaces

### ByJTT Product & Design Research
Evidence on user needs, competitor capabilities, design patterns, anti-patterns, accessibility, platform conventions, AI-design failure modes, and emerging tools.

### ByJTT Design Contracts
Portable, versioned, machine-readable intent: product goals, brand, visual language, semantic token meaning, component rules, interaction logic, responsive behavior, content behavior, accessibility, anti-patterns, rationale, and provenance. Interoperate with open standards such as DESIGN.md where practical.

### ByJTT UI Registry
A federated discovery and quality layer over existing component/design ecosystems. The registry should prefer mature solved systems and attach quality, maintenance, accessibility, license, provenance, dependency, and design-fit metadata.

### ByJTT Agent / Skill / MCP
Agent-facing interfaces for research, briefing, contract retrieval, pattern/component discovery, generation orchestration, critique, comparison, audit, testing, and provenance.

### ByJTT Design Gauntlet
Independent specialist review across product fit, UX, visual design, brand distinctiveness, anti-slop, accessibility, responsive behavior, content, localization, system conformance, engineering, performance, originality, and provenance.

### ByJTT Benchmarks
Controlled, reproducible comparisons of AI product-design workflows using identical briefs, constraints, production conditions, and scoring.

### ByJTT Production Quality
Browser-rendered validation, real-content stress testing, state coverage, accessibility, performance, visual regression, mutation-scope verification, design debt, and design-system saturation.

### design.byjtt.com
Public research, tools, benchmarks, patterns, reports, examples, documentation, registry views, and product surfaces.

## Strategic principles

### Best available solved system first
Before creating custom components, workflows, libraries, or tooling, actively discover whether a mature solution already removes more work with higher quality. Prefer integration or reuse when it wins on quality, maintenance, accessibility, licensing, ecosystem, portability, and total cost.

### Evidence before aesthetics
A visually appealing output is not evidence of a solved product problem. Important decisions should trace to a user need, product requirement, platform convention, accessibility need, business objective, brand rule, or explicit aesthetic intent.

### Intent over imitation
References are evidence and ingredients, not cloning targets. Extract useful structure, semantics, interaction, and visual principles from multiple sources and synthesize deliberately.

### Production is the source of truth
A screenshot or prototype cannot receive final approval. The implemented product must pass real viewport, content, interaction, state, accessibility, and performance tests.

### Human agency with bounded autonomy
Support both copilot and autopilot workflows. Autonomous decisions must expose rationale, evidence, uncertainty, and changed scope so humans can trust or override them.

### Generator independence
Do not build the moat around one model or vendor. Route work to the best available tool and benchmark it continuously.

### Independent evaluation
A generator should not be the sole judge of its own output. Separate creation from review wherever material quality decisions are involved.

### Provenance by default
Track source, license, attribution, AI involvement, transformations, and dependency lineage for reusable design/code assets where practical.

## Explicit non-goals

- Rebuilding Figma as a pixel editor.
- Becoming another generic prompt-to-app builder.
- Owning a huge component catalogue when high-quality ecosystems already exist.
- Generating bespoke code before checking existing project/system/registry solutions.
- Treating visual polish as equivalent to product quality.
- Mixing game-specific design and asset pipelines into this product. Game-specific work belongs to games.byjtt.com.

## Positioning

Competitors tend to own a layer: design canvas, UI generation, app generation, component supply, design-to-code, or website architecture.

ByJTT Design should own the **intelligence, orchestration, independent evaluation, production validation, and continuous-learning layer across them**.

Short form:

> Others generate design. ByJTT should know what deserves to ship — and help build it correctly.
