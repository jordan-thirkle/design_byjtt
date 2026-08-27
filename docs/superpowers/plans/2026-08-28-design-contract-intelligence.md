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

**Files:**
- Create: `app/design-contract.js`
- Test: `app/design-contract.test.mjs`
- Modify: `app/model.js`

**Interfaces:**
- Produces `createDesignContract(project)` returning a schema-shaped contract.
- Produces `validateDesignContract(contract)` returning `{ valid, errors }` using AJV.
- Produces `createInitialProject()` or adapts the existing project factory without duplicating canonical intent.

- [ ] **Step 1: Write failing tests** for required contract fields, rule shape, stable schema version, and validation failure when a required field is removed.
- [ ] **Step 2: Run `node --test app/design-contract.test.mjs` and confirm the missing compiler/validator failure.
- [ ] **Step 3: Implement deterministic compilation from current Studio project state into intent, audiences, mode, constraints, creative territory, tokens, components, states, accessibility, responsive, content, decisions, and unresolved questions.
- [ ] **Step 4: Add AJV schema loading and validation without changing the existing schema.
- [ ] **Step 5: Run the focused test and then `npm run foundation:validate`.
- [ ] **Step 6: Commit `feat: compile studio projects into design contracts`.

### Task 2: Immutable conversational decision tracing

**Files:**
- Create: `app/decision-trace.js`
- Test: `app/decision-trace.test.mjs`
- Modify: `app/model.js`

**Interfaces:**
- Produces `applyInstruction(project, instruction)` returning `{ project, iteration, decision }`.
- Produces `nextDecisionId(decisions)` returning the next `BDR-####` identifier.
- Produces decision records with `instruction`, `summary`, `affectedPaths`, `before`, `after`, `rationale`, `timestamp`, and provenance.

- [ ] **Step 1: Write failing tests** for first/second BDR numbering, affected paths, before/after values, empty instruction no-op, and preservation of previous decisions.
- [ ] **Step 2: Run the focused test and confirm it fails because decision tracing is absent.
- [ ] **Step 3: Implement immutable decision generation around the existing deterministic iteration rules.
- [ ] **Step 4: Make the compiled contract reference BDR identifiers rather than free-form iteration strings.
- [ ] **Step 5: Run focused model and decision tests.
- [ ] **Step 6: Commit `feat: trace studio conversational decisions`.

### Task 3: Context Package adapter

**Files:**
- Create: `app/context-package.js`
- Test: `app/context-package.test.mjs`
- Modify: `app/model.js`
- Modify: `examples/v0.1/design-context-package.json` only if required by the existing schema shape

**Interfaces:**
- Produces `compileContextPackage(project)` from the canonical Design Contract plus provenance/evidence.
- The returned package must retain canonical intent and expose provider-neutral context; no second source of truth is created.

- [ ] **Step 1: Write failing tests** proving context package output contains the same canonical intent, contract version, decisions, and provenance.
- [ ] **Step 2: Run the focused test and verify failure.
- [ ] **Step 3: Implement the adapter using `createDesignContract(project)`.
- [ ] **Step 4: Validate package compatibility against the existing context-package schema/validator.
- [ ] **Step 5: Run foundation and focused tests.
- [ ] **Step 6: Commit `feat: connect studio to context package compiler`.

### Task 4: Real evidence engine

**Files:**
- Create: `app/evidence.js`
- Test: `app/evidence.test.mjs`
- Modify: `app/model.js`
- Modify: `app/server.mjs` if an evidence endpoint is needed by browser tests
- Modify: `app/index.html` only where testable hooks/semantics are genuinely missing

**Interfaces:**
- Produces `createEvidenceRecord(...)` with check id, status, timestamp, summary, observations, and execution metadata.
- Produces `runDeterministicEvidence(project)` for checks that can be evaluated from the contract.
- Browser-backed evidence is collected by Playwright rather than hard-coded in model state.

- [ ] **Step 1: Write failing tests** asserting that unsupported checks are `not_run` and that no check may return `pass` without an assertion result.
- [ ] **Step 2: Run focused tests and confirm failure against current always-pass behaviour.
- [ ] **Step 3: Implement deterministic evidence records for product fit, engineering, and provenance integrity.
- [ ] **Step 4: Add/extend browser tests for semantic structure, actionable keyboard focus, responsive viewport rendering, horizontal overflow, and realistic content resilience.
- [ ] **Step 5: Wire the evidence surface to the real evidence result rather than static pass values.
- [ ] **Step 6: Run `npm run test:browser` and the focused unit tests.
- [ ] **Step 7: Commit `feat: replace static studio evidence with executable checks`.

### Task 5: Full publication artefact

**Files:**
- Modify: `app/model.js`
- Modify: `app/library.js`
- Modify: `app/library.test.mjs`
- Modify: `app/studio.test.mjs`
- Modify: `app/index.html` only if publication UI needs to expose the artefact state

**Interfaces:**
- `publishProject(project, optedIn, evidence)` returns the complete published artefact.
- Published artefact contains `designContract`, `decisions`, `evidence`, `provenance`, `specimen`, and publication metadata.

- [ ] **Step 1: Write failing tests** proving published output includes the complete contract and decision history, and that failed/not-run evidence blocks publication.
- [ ] **Step 2: Run focused tests and verify failure because publication currently emits metadata only.
- [ ] **Step 3: Implement full artefact publication with explicit opt-in and evidence gate.
- [ ] **Step 4: Update Library ingestion/storage to preserve the full artefact instead of projecting it down.
- [ ] **Step 5: Run unit and browser tests for publish → library.
- [ ] **Step 6: Commit `feat: publish complete studio artefacts`.

### Task 6: Regression and benchmark integration

**Files:**
- Modify: `harness/tests/candidate-runtime.spec.mjs` where existing harness assertions can cover the new contract/evidence behaviour
- Modify: `harness/validate-foundation.mjs` only if a deterministic validator hook is needed
- Modify: `harness/validate-benchmark.mjs` only if contract artefact validation belongs in the existing gate
- Modify: `app/browser.spec.mjs` if shared browser coverage is appropriate

- [ ] **Step 1: Write failing regression coverage for contract export and evidence truthfulness.
- [ ] **Step 2: Run the relevant harness test and confirm the new assertions fail.
- [ ] **Step 3: Integrate the minimal validation hooks.
- [ ] **Step 4: Run `npm test`.
- [ ] **Step 5: Run `npm run test:browser`.
- [ ] **Step 6: Run `npm run benchmark:check` and record exact results.
- [ ] **Step 7: Commit `test: integrate design contract into verification gates`.

### Task 7: Deployment configuration and production verification

**Files:**
- Inspect/modify: `.github/workflows/*` only where the repository already has a deployment workflow
- Create/modify: `vercel.json` only if required by the existing app/deployment shape
- Modify: `README.md` or deployment documentation with the verified production URL

- [ ] **Step 1: Inspect the repository's existing Vercel/deployment configuration; do not invent credentials or secrets.
- [ ] **Step 2: Add only deterministic routing/build configuration required to serve the existing Studio at `design.byjtt.com`.
- [ ] **Step 3: Run the full local verification suite before release.
- [ ] **Step 4: Verify the actual production URL with browser tooling when deployment exists.
- [ ] **Step 5: Verify the critical flow: load Studio → iterate → see traceable decision → run evidence → publish → inspect Library artefact.
- [ ] **Step 6: Commit deployment configuration only after production verification is available.

## Completion gate

The feature is not considered complete until `npm test`, `npm run test:browser`, and `npm run benchmark:check` pass, publication contains the full artefact, no unsupported evidence is marked pass, and `design.byjtt.com` is verified if deployment configuration has been activated. A deployment configuration without successful production verification is explicitly `release-ready`, not `deployed`.
