# ByJTT Design Simplification Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make design.byjtt.com understandable and usable within seconds for a new human designer or AI agent by reducing human-facing complexity, making the homepage a one-viewport orientation surface, and preserving deeper capabilities through progressive disclosure.

**Architecture:** Keep the current static/browser-first runtime and canonical public shell. Simplify the human information architecture to Studio, Standard and Library as the primary destinations; move Research, Contracts, Benchmarks and Documentation into secondary/supporting discovery; keep Agents as a machine-oriented resource. Rework the homepage so the first viewport answers what this is, who it is for, how it works, why it is different, and what to do next without requiring a scroll.

**Tech Stack:** Existing static HTML/CSS/JS, Node 24, Playwright 1.62.1, axe-core/playwright 4.13.0, existing repository validation harness, Vercel Git deployment.

**Spec:** `docs/superpowers/specs/2026-08-27-design-studio-library-system-design.md` plus the current public Design Standard contract.

## Global Constraints

- Preserve canonical public shell accessibility semantics and mobile parity.
- Do not migrate frameworks unless the audit demonstrates a concrete limitation.
- Keep machine-readable Standard, agent guidance, contracts, research, benchmarks and documentation available.
- Public copy must be plain, direct, user-facing and free of internal implementation language.
- Prefer subtraction and progressive disclosure over adding new concepts.
- Validate rendered output, not source text alone.
- Reuse established standards and mature open-source primitives before inventing replacements.
- No claim of completion without fresh Vercel and browser evidence.

---

### Task 1: Simplify the public information architecture

**Files:**
- Modify: `index.html`
- Modify: `standard.html`
- Modify: `research/index.html`
- Modify: `contracts/index.html`
- Modify: `agents/index.html`
- Modify: `library/index.html`
- Modify: `benchmarks/index.html`
- Modify: `docs/index.html`
- Modify: `site.css`
- Modify: `standard.json`
- Modify: `llms.txt`

**Interfaces:**
- Consumes: existing routes and canonical shell contract.
- Produces: primary human IA of Studio / Standard / Library, with secondary discovery links for Research / Contracts / Benchmarks / Documentation and an agent-oriented Agents surface.

- [ ] Step 1: Write/update route-level tests asserting primary navigation contains only the intended human-facing destinations.
- [ ] Step 2: Run the navigation tests and verify they fail against the current six-link public navigation.
- [ ] Step 3: Update the canonical shell/navigation data and footer groupings without deleting any route.
- [ ] Step 4: Add explicit secondary discovery links from the appropriate pages so no supporting resource becomes orphaned.
- [ ] Step 5: Run shell contract and rendered shell tests and verify they pass.
- [ ] Step 6: Commit the IA simplification.

```text
Primary: Studio | Standard | Library
Secondary: Research | Contracts | Benchmarks | Documentation
Machine: Agents | standard.json | llms.txt
```

### Task 2: Rebuild the homepage first viewport

**Files:**
- Modify: `index.html`
- Modify: `site.css`
- Modify: `public-shell.spec.mjs`

**Interfaces:**
- Consumes: simplified IA and existing shell semantics.
- Produces: a first viewport that exposes product identity, audience, workflow, differentiator and primary action without page scroll.

- [ ] Step 1: Add a failing browser assertion that at desktop and mobile the homepage first viewport contains the primary product statement, Open Studio action, four-step workflow and differentiator without requiring a scroll to discover them.
- [ ] Step 2: Run the browser test and verify it fails against the current long-form homepage.
- [ ] Step 3: Replace the homepage section stack with a compact orientation layout: statement, primary actions, Describe → Direct → Check → Publish, and one concise differentiator.
- [ ] Step 4: Add a secondary “Go deeper” area below the first viewport linking to Standard, Research, Contracts, Library, Agents, Benchmarks and Documentation without competing with the first-screen decision.
- [ ] Step 5: Run the browser test at 320, 390, 768 and 1440 widths.
- [ ] Step 6: Check keyboard focus, reduced motion, horizontal overflow and axe violations.
- [ ] Step 7: Commit the homepage redesign.

### Task 3: Make Studio-first onboarding obvious

**Files:**
- Modify: `app/index.html`
- Modify: `app/studio.css`
- Modify: `app/app.js`
- Modify: `app/studio.test.mjs`
- Modify: `public-shell.spec.mjs`

**Interfaces:**
- Consumes: the simplified human IA and existing Studio state model.
- Produces: a Studio that explains its immediate task without requiring knowledge of Contracts, Evidence or Library first.

- [ ] Step 1: Add a failing test for a first-time Studio user: the primary instruction, live preview and next action are visible without understanding internal terminology.
- [ ] Step 2: Run the test and verify it fails against the current Foundation / Evidence / Resource Library-heavy language.
- [ ] Step 3: Replace internal labels with user outcomes where safe, while keeping technical terms available in secondary explanation.
- [ ] Step 4: Add a concise first-run orientation and progressive disclosure for evidence/provenance details.
- [ ] Step 5: Run unit/browser/axe tests and verify no interaction regression.
- [ ] Step 6: Commit the Studio onboarding improvement.

### Task 4: Agent entry point and machine-readable orientation

**Files:**
- Modify: `standard.json`
- Modify: `llms.txt`
- Create: `agent.json`
- Modify: `agents/index.html`
- Modify: `harness/validate-production-contract.mjs`

**Interfaces:**
- Consumes: canonical Standard and existing machine-readable resources.
- Produces: a single machine-oriented entry point describing audience, canonical resources, recommended workflow and source-of-truth relationships.

- [ ] Step 1: Add a failing production-contract assertion for `agent.json` and its canonical links.
- [ ] Step 2: Add the machine-readable entry point with explicit recommended order: understand → standard → relevant contract → studio/library/evidence as needed.
- [ ] Step 3: Link the agent entry point from the Agents page and `llms.txt`.
- [ ] Step 4: Run production-contract validation and public copy audit.
- [ ] Step 5: Commit the machine-readable entry point.

### Task 5: Continuous gauntlet and competitor-quality regression gate

**Files:**
- Create: `harness/design-gauntlet.mjs`
- Create: `harness/tests/design-gauntlet.spec.mjs`
- Modify: `package.json`
- Modify: `docs/DESIGN_GAUNTLET.md`

**Interfaces:**
- Consumes: public routes, Studio route and agent entry point.
- Produces: repeatable human/agent-oriented scoring evidence for clarity, IA, visual hierarchy, accessibility, responsive behaviour, copy quality, agent discoverability, interaction confidence and competitive parity.

- [ ] Step 1: Write failing structural gauntlet assertions for first-viewport clarity, primary IA, route reachability, keyboard focus, reduced motion and axe cleanliness.
- [ ] Step 2: Implement the runner and report output.
- [ ] Step 3: Add explicit score thresholds of at least 9/10 for each tracked category before a simplification release is considered complete.
- [ ] Step 4: Run the gauntlet against the Vercel preview.
- [ ] Step 5: Fix any failures and repeat until the threshold is met or a documented evidence-based exception exists.
- [ ] Step 6: Run Vercel + CodeRabbit/CI and merge only from a verified head.

### Task 6: Production verification

**Files:**
- No committed source changes unless verification reveals a required fix.

- [ ] Step 1: Verify the production deployment is READY.
- [ ] Step 2: Verify homepage, Standard, Studio, Library and Agents load successfully.
- [ ] Step 3: Verify no runtime errors in the production deployment.
- [ ] Step 4: Run final desktop/mobile screenshot and interaction checks.
- [ ] Step 5: Record the final gauntlet scores and any deliberately deferred work.
