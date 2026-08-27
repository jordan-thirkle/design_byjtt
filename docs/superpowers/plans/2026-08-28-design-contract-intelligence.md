# Design Contract Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Studio a canonical Design Contract authoring, evidence, publication, and Context Package pipeline without introducing a hosted AI dependency.

**Architecture:** Keep the existing v0.1 JSON Schema as the contract boundary. Split deterministic compilation, decision tracing, evidence collection, publication, and context-package adaptation into focused modules; the browser specimen remains the executable rendering target. Studio state is authoritative, while provider/AI output is treated as a proposed instruction.

**Tech Stack:** Node.js >=22, ESM, Node test runner, Playwright 1.62.1, axe-core Playwright integration, AJV 8.20.0, existing HTML/CSS/JS Studio.

**Spec:** `docs/superpowers/specs/2026-08-28-design-contract-intelligence.md`

## Global Constraints

- Preserve `schemas/v0.1/design-contract.schema.json` as the wire contract.
- Do not introduce a hosted AI/provider dependency in this slice.
- Do not fabricate evidence; unsupported checks are `not_run`.
- Publication requires explicit opt-in and all required evidence checks to pass.
- Canonical intent is stored once; Context Packages are compiled adapters.
- Every accepted non-empty conversational instruction creates an immutable BDR decision.
- Do not claim production deployment until the real `design.byjtt.com` URL is verified.

---

### Task 1: Contract model and deterministic compiler

**Status: complete and CI-verified.**

- [x] Write tests for required contract fields, rule shape, stable schema version, and validation failure.
- [x] Implement deterministic compilation into intent, audiences, mode, constraints, creative territory, tokens, components, states, accessibility, responsive, content, decisions, and unresolved questions.
- [x] Isolate Node-only AJV validation from the browser-safe compiler.
- [x] Run focused tests and foundation validation.

### Task 2: Immutable conversational decision tracing

**Status: complete and CI-verified.**

- [x] Add BDR numbering, affected paths, before/after values, rationale and provenance.
- [x] Preserve immutable previous decisions and no-op empty instructions.
- [x] Compile the canonical contract from decision identifiers.

### Task 3: Context Package adapter

**Status: complete and CI-verified.**

- [x] Compile a provider-neutral v0.1 Context Package from the canonical contract.
- [x] Carry decisions, evidence references, provenance and integrity metadata.
- [x] Validate generated packages against the existing v0.1 schema.
- [x] Keep the compiler browser-safe; use Web Crypto for source digest generation.

### Task 4: Real evidence engine

**Status: complete and CI-verified.**

- [x] Replace unconditional pass semantics with explicit `pass` / `fail` / `not_run` records.
- [x] Reject any pass result that lacks a successful executable assertion.
- [x] Implement deterministic product, engineering and provenance checks.
- [x] Add browser-backed product/UX/accessibility/responsive/content/engineering/provenance checks.
- [x] Add Playwright mobile overflow and WCAG coverage.
- [x] Surface real evidence in the Studio panel and use it as the publication gate.

### Task 5: Full publication artefact

**Status: complete and CI-verified.**

- [x] Require explicit publication consent.
- [x] Block publication unless all seven required checks are verified.
- [x] Publish the complete Design Contract, Context Package, decisions, evidence, provenance and specimen.
- [x] Preserve the complete artefact through the Library resource model.
- [x] Cover publish → Library with browser regression tests.

### Task 6: Regression and benchmark integration

**Status: complete and CI-verified.**

- [x] Add contract/evidence regression coverage.
- [x] Extend the npm unit-test gate to include all new modules.
- [x] Extend the Studio CI job to run the full unit suite and browser suite.
- [x] Verify `npm test`: 20/20 tests pass.
- [x] Verify Studio browser suite: 4/4 tests pass.
- [x] Verify Benchmark Harness workflow: success.

### Task 7: Deployment configuration and production verification

**Status: blocked on external Vercel project/domain linkage, deliberately not claimed complete.**

- [x] Inspect existing repository/deployment configuration without inventing credentials.
- [ ] Create/link the Vercel project for this repository and attach `design.byjtt.com`.
- [x] Full application/benchmark verification is green before release consideration.
- [ ] Verify the actual production URL.
- [ ] Verify the production critical flow end-to-end.

## Completion gate

The implementation gate is satisfied: unit, browser and benchmark verification are green; publication carries the complete artefact; unsupported evidence cannot be marked pass. The release gate remains intentionally open until a real Vercel project/domain exists and `design.byjtt.com` is verified end-to-end. A deployment configuration without successful production verification is explicitly `release-ready`, not `deployed`.
