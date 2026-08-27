# Design Studio Vertical Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable `design.byjtt.com` experience as a browser-native Design Studio that creates a complete local-service website specimen, supports conversational iteration, exposes evidence, and publishes the resulting specimen into the resource library.

**Architecture:** Keep the foundation repository lightweight and dependency-minimal. Add a self-contained browser application under `app/`, with deterministic specimen data and a small state model in JavaScript. The first slice is intentionally local-first: generation and iteration are simulated by deterministic design transformations, while the interfaces and contracts are shaped so a real model/API can replace the adapter without changing the UX. The generated website is rendered as an actual live preview, not a screenshot.

**Tech Stack:** Semantic HTML, CSS, vanilla ES modules, Node test runner, existing Playwright/Axe benchmark harness.

**Spec:** `docs/superpowers/specs/2026-08-27-design-studio-library-system-design.md`

## Global Constraints

- Preserve the existing ByJTT Design foundation and Design Contract.
- Avoid generic AI SaaS visual language, gratuitous gradients, glassmorphism, and card grids.
- Use evidence before aesthetics and keep generated work inspectable.
- The public product must make sense to a user with zero design knowledge.
- The library specimen must carry status, rationale, responsive intent, accessibility evidence, and provenance.
- Publishing is explicit and opt-in; generated content must not silently become public.
- Production validation is required before a specimen can be marked Verified.
- Keep the implementation dependency-light and generator-independent.
- Use TDD for application behavior: failing test first, then minimal implementation.

---

### Task 1: Establish the application contract and state model

**Files:**
- Create: `app/model.js`
- Test: `app/model.test.mjs`

**Interfaces:**
- `createProject()` returns the canonical first-slice project state.
- `applyIteration(project, instruction)` returns a new project state and an iteration record.
- `runEvidenceChecks(project)` returns deterministic check results.
- `publishProject(project)` returns a library resource record only when checks pass and publication is explicitly requested.

- [ ] **Step 1: Write failing tests** for initial state, iteration, evidence status, and opt-in publication.
- [ ] **Step 2: Run `node --test app/model.test.mjs` and verify the tests fail because the model does not exist.
- [ ] **Step 3: Implement the smallest pure state model satisfying the tests.
- [ ] **Step 4: Run the focused test file and verify all tests pass.
- [ ] **Step 5: Commit `feat: add Design Studio project state model`.

### Task 2: Build the live local-service website specimen

**Files:**
- Create: `app/specimen.js`
- Create: `app/specimen.css`
- Test: `app/specimen.test.mjs`

**Interfaces:**
- `renderSpecimen(project, target)` renders the current project into a real DOM target.
- `getSpecimenContent(project)` returns the semantic content contract used by the renderer.

- [ ] **Step 1: Write failing tests** covering required semantic regions, primary CTA, mobile navigation behavior, and iteration-sensitive copy.
- [ ] **Step 2: Run `node --test app/specimen.test.mjs` and verify failure.
- [ ] **Step 3: Implement the specimen renderer and responsive styles.
- [ ] **Step 4: Run focused tests and verify pass.
- [ ] **Step 5: Commit `feat: add live local-service specimen`.

### Task 3: Build the Studio shell and conversational iteration

**Files:**
- Create: `app/index.html`
- Create: `app/app.js`
- Create: `app/studio.css`
- Test: `app/studio.test.mjs`

**Interfaces:**
- `app.js` owns project state, Studio navigation, preview viewport, chat submission, evidence panel, and publication action.
- Chat instructions call `applyIteration()` and immediately re-render the preview plus change log.

- [ ] **Step 1: Write failing tests** for Studio navigation, prompt submission, preview mode switching, and evidence visibility.
- [ ] **Step 2: Run focused tests and verify failure.
- [ ] **Step 3: Implement the Studio shell with accessible controls and real preview.
- [ ] **Step 4: Run focused tests and verify pass.
- [ ] **Step 5: Commit `feat: build Design Studio shell`.

### Task 4: Add the evidence and publication workflow

**Files:**
- Modify: `app/index.html`
- Modify: `app/app.js`
- Create: `app/library.js`
- Test: `app/library.test.mjs`

**Interfaces:**
- Evidence panel displays Product, UX, Accessibility, Responsive, Content, Engineering, and Provenance checks.
- Publish action is disabled until deterministic checks pass.
- Publishing creates a library record and changes the UI from Studio-only state to Studio + published resource state.

- [ ] **Step 1: Write failing tests** for failed publication, successful publication, provenance presence, and library record shape.
- [ ] **Step 2: Run focused tests and verify failure.
- [ ] **Step 3: Implement library publication state and UI.
- [ ] **Step 4: Run focused tests and verify pass.
- [ ] **Step 5: Commit `feat: add evidence and publication workflow`.

### Task 5: Add the public Resource Library view

**Files:**
- Modify: `app/index.html`
- Modify: `app/app.js`
- Modify: `app/studio.css`
- Create: `app/library.css`
- Test: `app/library-view.test.mjs`

**Interfaces:**
- Library view lists the published specimen with status, use case, evidence summary, and actions to open/remix.
- Opening a resource returns the user to the Studio with that specimen as the starting point.

- [ ] **Step 1: Write failing tests** for library listing, status badge, remix action, and resource metadata.
- [ ] **Step 2: Run focused tests and verify failure.
- [ ] **Step 3: Implement the resource view.
- [ ] **Step 4: Run focused tests and verify pass.
- [ ] **Step 5: Commit `feat: add Design Resource Library view`.

### Task 6: Integrate benchmark/quality verification

**Files:**
- Modify: `package.json`
- Create: `app/quality.test.mjs`
- Modify: `harness/tests/` only if existing benchmark routing requires it.

- [ ] **Step 1: Add deterministic application tests to the repository test command without removing foundation or benchmark validation.
- [ ] **Step 2: Run the complete test command and verify the new tests execute.
- [ ] **Step 3: Add the Studio route to the Playwright benchmark server if required by the existing harness.
- [ ] **Step 4: Run Axe/browser checks against the Studio and specimen.
- [ ] **Step 5: Commit `test: verify Design Studio vertical slice`.

### Task 7: Prepare deployment contract

**Files:**
- Create or modify: `vercel.json`
- Create: `app/README.md`
- Modify: `README.md` only where product entry-point documentation is required.

- [ ] **Step 1: Write failing deployment-contract checks for the application entry point, canonical URL, and static asset paths.
- [ ] **Step 2: Run them and verify failure.
- [ ] **Step 3: Add the minimal Vercel/static hosting configuration.
- [ ] **Step 4: Run full verification, including deterministic output and browser checks.
- [ ] **Step 5: Commit `chore: prepare Design Studio deployment`.

### Task 8: Review and PR

**Files:**
- No new implementation files.

- [ ] **Step 1: Inspect the final diff for unrelated changes and generated artifacts.
- [ ] **Step 2: Run the complete repository verification command.
- [ ] **Step 3: Run the browser/visual verification against the built Studio.
- [ ] **Step 4: Update the implementation PR with verification evidence and known boundaries.
- [ ] **Step 5: Request code review before merge.
