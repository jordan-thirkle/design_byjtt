# ByJTT Design Production Conformance Audit

Date: 2026-08-30
Standard: ByJTT Design Standard v0.1
Production: https://design.byjtt.com/

## Scope

This audit covers the public information surfaces and the Studio where applicable against `STANDARD.md`, `DESIGN.md`, the Design Contract/evidence model, current web accessibility guidance, and production behaviour.

## Executive result

**Conformance status: NOT YET FULLY CONFORMANT.**

The platform is structurally sound enough to keep its current static/browser-first architecture. No evidence from this audit justifies a framework migration. The main remaining work is to convert stated requirements into stronger executable evidence and close the high-severity production findings below.

## Findings

| ID | Severity | Area | Surface | Finding | Required action |
|---|---|---|---|---|---|
| AUD-001 | Critical | Accessibility / visual hierarchy | `/` | Lifecycle state line (`Suggested → Generated → Inspected → Verified → Executed → Human-approved`) was presented with insufficient legibility on the dark band. This is a direct visual/accessibility failure and contradicts the Standard's accessible-by-construction requirement. | Fixed on production `main` by introducing a dedicated high-contrast band text token and explicit lifecycle heading styling. Add contrast regression. |
| AUD-002 | High | Machine-readable/source integrity | `/standard/`, `/standard.md` | `/standard/` links to `/standard.md`, but the production URL returned 404. `llms.txt` simultaneously identifies `STANDARD.md` as canonical. This creates a broken source-of-truth path for humans/agents. | Publish a stable public source representation and make every human/machine link resolve to it; add URL integrity regression. |
| AUD-003 | High | Automated evidence | Studio | Deterministic evidence checks only prove basic structure for product/engineering/provenance; UX, accessibility, responsive and content checks are explicitly `not_run` until browser execution. The Studio UI can therefore display an evidence state without the full required evidence actually running. | Make browser evidence execution a first-class Studio path and prevent “verified” claims without the required checks. |
| AUD-004 | Medium | Accessibility evidence | Studio | Browser accessibility check currently verifies tab-focus eligibility but does not establish semantic naming, focus visibility, contrast, zoom/reflow, screen-reader behaviour or target-size requirements. | Expand automated checks and pair them with explicit manual/AT evidence where automation cannot establish conformance. |
| AUD-005 | Medium | Visual/token system | Public site | Public CSS uses semantic-ish variables but still contains direct colour values and does not expose a complete DTCG-compatible token set for the full visual system. | Consolidate public tokens into a versioned DTCG-compatible token source with rationale and generated CSS. |
| AUD-006 | Medium | State coverage | Public routes + Studio | Standard requires default, hover/focus/active, disabled, loading, empty, partial, success, recoverable/fatal error, degraded/offline where applicable, long/short content, localization/RTL where applicable, 200% zoom, reduced motion and keyboard-only review. Current public pages are mostly static happy-path surfaces; the Studio has some state coverage but not evidence for the full required matrix. | Add a route/state coverage matrix and targeted browser checks; mark non-applicable states explicitly rather than silently omitting them. |
| AUD-007 | Medium | SEO/metadata | Public routes | Core canonical/title/description metadata exists on primary pages, but the audit should validate uniqueness, robots/indexability, OG/Twitter consistency, structured data validity and internal-link reachability across every public route. | Add metadata and link integrity checks to the conformance suite. |
| AUD-008 | Medium | Native platform | Public site + Studio | The implementation uses standard HTML/CSS well, but the audit has not yet recorded a systematic check for native popover/dialog/command/view-transition/anchor-positioning opportunities where those improve semantics or reduce custom code. | Add a native-platform opportunity register and use it when new interaction features are introduced. |
| AUD-009 | Low | Duplication/drift | Public content | Page-local content and shell markers remain possible even though the shell is canonical. The content layer still needs stronger source-to-render checks so public pages do not drift from machine-readable contracts. | Add source/reference integrity checks for contract-linked pages. |

## Conforming areas observed

- Canonical public navigation/footer is now centralized and machine-checked across eight public routes.
- Global shell provides skip link, named navigation landmark, main landmark and programmatic current-page state.
- Studio keeps its workspace shell as an explicit product-level exception.
- Standard distinguishes suggested/generated/inspected/verified/executed/human-approved states.
- Publication requires explicit opt-in, a complete Design Contract, all executable checks passing and provenance.
- `standard.json` is available and carries core principles, shell semantics, validation dimensions and machine-facing links.
- `llms.txt` is publicly available and provides agent discovery guidance.
- Reduced-motion handling exists in the public CSS.
- Vercel production deployment is healthy after the shell merge.

## Architecture decision

**Keep the current static/browser-first architecture for now.**

Reason: the current production surface is content-heavy, standards/documentation-oriented and statically deliverable; the Studio's state model and evidence harness are already separated behind small modules. This audit found quality/evidence gaps, not a framework capability gap. A migration should only be reconsidered if the Studio's required interaction model, shared component architecture, or validation system becomes materially constrained by the current implementation.

## Reusable regression plan

1. Render every public route at 320, 390, 768 and 1440 widths.
2. Verify identical canonical public shell and explicit Studio exception.
3. Verify skip link, landmarks, accessible names, current-page state and visible focus.
4. Run contrast checks against all semantic text/background pairs used in production.
5. Validate metadata uniqueness, canonical URLs, robots directives, structured data and public internal links.
6. Validate `standard.json` against `standard.schema.json` and confirm all linked public resources resolve.
7. Run copy lint and record warnings separately from hard failures.
8. Run Studio evidence checks in-browser, including responsive overflow, keyboard/focus, semantics and content stress.
9. Verify evidence status cannot claim `verified` when required checks remain `not_run`.
10. Run provenance/link/contract integrity checks for published resources.
11. Record manual assistive-technology checks for requirements automation cannot establish.
12. Treat production Vercel deployment as the final rendered verification target.

## Evidence classification

Observed production behaviour is labelled as **observed**. Design conclusions not directly measured are **inferred**. Proposed future controls are **hypotheses** until executed and evidenced.
