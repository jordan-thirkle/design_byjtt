# ByJTT Design — Roadmap

This roadmap sequences learning before platform sprawl. Each phase should produce evidence that justifies the next.

## Phase 0 — Foundation

**Goal:** establish durable sources of truth before code generation begins.

Deliverables:
- product thesis and boundaries;
- AI-agent operating instructions;
- initial Design Contract;
- user-pain / AI-slop taxonomy;
- competitive capability map;
- requirements registry;
- benchmark methodology;
- decision records.

**Exit:** a new agent can explain what ByJTT is, what it is not, how it decides build-vs-integrate, and how quality will be measured without reading chat history.

**v0.1 repository evidence:** record schemas, DTCG baseline, compiler contract, usage modes, Observatory seed, benchmark catalog and initial Gauntlet profile are implemented and validated. They remain candidate contracts until exercised against real projects.

## Phase 1 — Evidence-backed benchmark prototype

**Goal:** prove or disprove the core thesis with a small controlled experiment.

Build the smallest benchmark harness capable of:
- loading one structured product brief;
- running at least two meaningfully different design/build workflows;
- capturing candidate artifacts/screenshots;
- scoring a subset of the Gauntlet with evidence;
- recording retries/cost/time/interventions;
- publishing a reproducible result.

Prioritize one benchmark class rather than broad coverage.

**Exit:** one benchmark run exposes actionable differences between workflows and identifies which ByJTT evaluation capabilities are genuinely useful.

## Phase 2 — Design Contract v0

**Goal:** make design intent portable and useful to agents.

Deliver:
- structured contract schema;
- DESIGN.md-compatible representation where practical;
- rationale/semantics beyond raw tokens;
- versioning;
- validation/linting;
- example contract generated from a real product.

**Studio milestone — canonical authoring slice:** the Studio now compiles its project state into the existing v0.1 Design Contract, records every accepted conversational change as a BDR decision with before/after paths, and compiles the same canonical contract into a provider-neutral Design Context Package. Publication carries the compiled contract, decision history, evidence, provenance, specimen and context package together.

**Exit:** two different agents/providers can use the same contract and produce measurably more consistent output than a prompt-only baseline.

## Phase 3 — Gauntlet v0

**Goal:** automate the highest-signal quality checks.

Start with checks that are objective or strongly evidence-backed:
- requirement coverage;
- responsive screenshots;
- accessibility baseline;
- state/content stress;
- design-system conformance;
- visual regression;
- mutation-scope checks.

Add subjective visual/brand/slop critics only with transparent rubrics and calibration examples.

**Studio milestone — executable evidence:** Studio no longer treats the seven evidence dimensions as unconditional passes. Deterministic checks and browser-backed checks produce explicit pass/fail/not-run records; Playwright covers the live specimen, mobile overflow and accessibility baseline, and publication is blocked unless all required checks pass.

**Exit:** Gauntlet catches real defects that baseline generators/reviewers miss and has known false-positive/false-negative behavior.

## Phase 4 — Solved-system discovery + federated registry

**Goal:** stop agents reinventing existing high-quality UI infrastructure.

Deliver:
- source adapters for a small number of high-value ecosystems;
- metadata model for license, maintenance, accessibility, dependency, performance, fit;
- recommendation/ranking logic;
- traceable build-vs-adopt decisions.

**Exit:** benchmark shows the discovery gate reduces custom code/rework while maintaining or improving quality.

## Phase 5 — Design ↔ Code continuity

**Goal:** preserve semantic component identity from design intent to production implementation.

Deliver:
- mapping model between contract concepts and code components;
- reuse detection;
- bounded edits;
- implementation-fidelity checks;
- no-dead-end artifact policy.

**Exit:** existing design-system implementation benchmark demonstrates materially less duplication/drift.

## Phase 6 — design.byjtt.com public research product

**Goal:** turn internal R&D into useful public infrastructure and organic authority.

Initial surfaces:
- research;
- benchmark results;
- AI-slop observatory;
- patterns/anti-patterns;
- Design Contract documentation;
- practical case studies;
- methodology and changelog.

Avoid launching empty directories for future features.

**Exit:** site has genuinely useful, source-grounded content and at least one interactive/reproducible tool or benchmark.

## Phase 7 — Agent / Skill / MCP layer

**Goal:** make validated ByJTT capabilities available to external coding/design agents.

Expose only stable capabilities proven in earlier phases, such as:
- research retrieval;
- contract retrieval/validation;
- solved-system discovery;
- audit/gauntlet;
- benchmark execution metadata.

**Exit:** an external agent can invoke ByJTT capabilities without embedding project-specific implementation knowledge.

## Phase 8 — Design CI / Design Health

**Goal:** protect quality after shipping.

Deliver:
- contract regression;
- visual regression;
- accessibility regression;
- token/component drift;
- design debt;
- design-system saturation;
- quality trend reporting.

**Exit:** a real PR workflow catches and explains design regressions before merge.

## Phase 9 — Continuous learning and public benchmark program

**Goal:** turn repeated evaluations into durable advantage.

Deliver:
- benchmark history;
- calibrated scoring updates;
- model/tool capability history;
- accepted/rejected pattern evidence;
- annual/periodic State of AI Product Design report.

**Exit:** ByJTT recommendations can cite accumulated benchmark evidence rather than relying primarily on model intuition or vendor claims.

## Sequencing rule

Do not advance because a feature sounds impressive. Advance when the current phase produces enough evidence to justify the next investment.
