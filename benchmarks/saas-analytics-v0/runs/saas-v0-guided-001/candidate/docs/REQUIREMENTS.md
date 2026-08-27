# ByJTT Design — Product Requirements

Status: foundation requirements. These define capability outcomes, not a fixed implementation stack.

## R1 — Product understanding

The system must capture and preserve:
- target users/personas;
- jobs-to-be-done;
- product/business goals;
- platform and technical constraints;
- measurable success criteria;
- known risks and assumptions;
- explicit non-goals.

**Acceptance:** material design/build decisions can be traced to a requirement, evidence source, or explicit aesthetic intent.

## R2 — Research intelligence

The system must support current, source-grounded research across:
- competitor capabilities;
- user complaints and unmet needs;
- design/UX patterns;
- accessibility/platform guidance;
- mature tools, libraries, and design systems;
- relevant open-source implementations;
- AI-design failure modes and emerging trends.

Research records must distinguish observed evidence, inference, and hypothesis.

## R3 — Design Contracts

The system must support portable, versioned design contracts containing:
- product intent and rationale;
- brand/personality;
- semantic tokens;
- typography/layout/motion rules;
- component semantics and usage rules;
- interaction and content behavior;
- responsive behavior;
- accessibility requirements;
- prohibited/undesired patterns;
- provenance and references.

Interoperate with open DESIGN.md conventions where practical rather than creating needless incompatibility.

## R4 — Best-available-system discovery

Before generating custom implementation, the workflow must check:
1. existing product/repository implementation;
2. existing approved design system;
3. mature component/library/registry solutions;
4. appropriate standards/protocols;
5. custom generation only where justified.

The comparison should consider quality, accessibility, maintenance, ecosystem, licensing, portability, performance, cost, and design fit.

## R5 — Federated UI Registry

The registry must be able to index first-party and third-party resources rather than requiring ByJTT ownership of every component.

Useful metadata includes:
- source and version;
- framework/platform;
- component/pattern type;
- license and attribution;
- dependencies;
- maintenance health;
- accessibility;
- performance/bundle implications;
- design-system fit;
- implementation examples;
- provenance;
- known issues.

## R6 — Multi-generator exploration

The architecture must allow multiple design/build providers and models to produce candidate solutions from the same structured brief/contract.

**Acceptance:** benchmark/generation logic is not fundamentally coupled to one vendor.

## R7 — Intent and mutation control

Targeted changes must support explicit edit scope and preserve locked dimensions.

The system should be able to compare requested versus actual mutation and flag unrelated changes.

Potential dimensions:
- content;
- layout;
- components;
- tokens;
- typography;
- behavior;
- interaction;
- responsive behavior.

## R8 — Independent Design Gauntlet

Candidate output must support independent evaluation across relevant dimensions:
- product requirement fit;
- UX/task efficiency;
- visual hierarchy and composition;
- brand distinctiveness;
- anti-slop / default-pattern risk;
- accessibility;
- responsive behavior;
- content and localization resilience;
- design-system conformance;
- engineering quality;
- performance;
- originality/similarity risk;
- provenance/licensing.

Scores must expose evidence and reasons, not merely a single opaque number.

## R9 — Real-state coverage

Production candidates must be testable under relevant states including:
- default;
- hover/focus/active;
- disabled;
- loading;
- empty;
- success/error;
- partial/large data;
- long/short strings;
- missing media;
- localization/RTL where applicable;
- keyboard-only;
- zoom;
- reduced motion;
- realistic viewport ranges.

## R10 — Design-to-code continuity

The system should map design concepts/components to real implementation components where possible, preserving semantic identity across design and code.

Avoid dead-end artifacts. Important output should have a durable representation such as DESIGN.md, structured contract data, registry metadata, code, tokens, or supported design-tool export.

## R11 — Production validation

Final approval requires the actual implementation, not just a generated screenshot/prototype.

Validation should cover applicable:
- build/runtime health;
- behavior;
- responsive layouts;
- accessibility;
- content stress;
- performance;
- design-contract conformance;
- visual regression;
- browser/device compatibility.

## R12 — Design regression and health

The system should be capable of tracking over time:
- visual regressions;
- off-system tokens;
- duplicated/obsolete components;
- inconsistent interaction patterns;
- accessibility exceptions;
- design debt;
- design-system saturation/conformance;
- anti-slop score changes.

## R13 — Provenance

Where external assets/components/references influence production output, preserve available:
- source;
- author;
- version;
- license;
- attribution requirement;
- AI involvement;
- transformation lineage;
- dependency information;
- similarity/copying risk notes.

## R14 — Benchmarking

The project must support controlled, repeatable benchmark briefs and scoring so competing workflows can be compared over time.

Benchmark dimensions should include quality, requirement coverage, accessibility, responsiveness, consistency, state coverage, iteration reliability, cost, time/attempts, code quality, and production readiness.

## R15 — Public research product

`design.byjtt.com` should expose useful, evidence-backed public surfaces such as:
- research;
- AI-slop observatory;
- benchmarks;
- patterns;
- design contracts;
- registry/tooling documentation;
- experiments;
- reports;
- practical before/after case studies.

Content should create real utility first and SEO value as a consequence, not vice versa.

## R16 — Human control and transparent autonomy

Support workflows ranging from human-directed copilot to higher autonomy.

Autonomous decisions should expose:
- what changed;
- why;
- evidence;
- confidence/uncertainty;
- validation performed;
- unresolved risks.

## R17 — Actual user validation

Agent critique is pre-validation, not a replacement for users. Material product decisions should support progression into real usability/user testing, with findings fed back into requirements and design contracts.

## R18 — Scope boundary

Core scope is digital product design/build for web, mobile, SaaS, websites, and software interfaces. Domain-independent infrastructure may be shared elsewhere, but game-specific UI/art/asset/engine work belongs to games.byjtt.com.
