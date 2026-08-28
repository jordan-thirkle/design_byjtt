# Design Contract Intelligence — v0.2 Product Slice

## Purpose

Turn the Studio from a deterministic visual-direction demo into the first real consumer of the canonical ByJTT design-intelligence contract. Every Studio project must have a structured Design Contract, every conversational change must produce a traceable decision, evidence must be produced by real browser checks where possible, and publication must contain the complete project artefact.

## Canonical contract

The existing `schemas/v0.1/design-contract.schema.json` remains the wire contract. Studio owns authoring state and adapters; the schema remains the validation boundary. A Studio project is compiled into a Design Contract with these required concerns:

- `intent`: problem, primary outcome, non-goals
- `audiences`: one or more audiences
- `mode`: guided, professional, or both
- `constraints`: structured rules with rationale and optional evidence references
- `creativeTerritory`: structured rules with rationale and optional evidence references
- `tokens`: DTCG source declaration
- `components`: component rules and versions
- `states`: populated/loading/empty/partial/error plus relevant interaction states
- `accessibility`: explicit behavioural requirements
- `responsive`: explicit viewport/layout rules
- `content`: content resilience requirements
- `decisions`: stable BDR identifiers
- `unresolvedQuestions`: blocking/non-blocking questions

The contract is compiled deterministically from Studio state. AI/provider output may propose changes but may not become the source of truth directly.

## Conversation and decision trace

Each accepted Studio instruction creates an immutable decision record with:

- stable `id` (`BDR-0001`, etc.)
- instruction text
- normalized change summary
- affected contract paths
- before/after values for affected paths
- rationale
- timestamp
- provenance (`source: studio`, `method: conversational-iteration`)

The project keeps the full decision history. The compiled contract references decision IDs only; detailed records remain in the project artefact. Rejected/empty instructions create no decision.

## Evidence

The existing seven evidence dimensions remain the product-level surface:

1. Product fit
2. UX hierarchy
3. Accessibility
4. Responsive
5. Content resilience
6. Engineering
7. Provenance

The current hard-coded pass results are removed. Evidence becomes a record containing status (`pass`, `fail`, or `not_run`), a machine-readable check id, timestamp, summary, and concrete observations. Browser-backed checks use the existing Playwright harness where a corresponding specimen can be rendered. Checks that cannot yet be automated must return `not_run`, never a fabricated pass.

At minimum the Studio verification path should run real checks for:

- required product/action content present
- semantic landmark and heading structure
- keyboard focusability of actionable controls
- horizontal overflow at supported viewports
- responsive specimen rendering at mobile/tablet/desktop viewports
- realistic content resilience
- deterministic contract/provenance integrity

The evidence result is persisted into the project artefact and publication is blocked unless every required check is `pass`.

## Publication artefact

Publication must contain the actual compiled project, not a metadata-only projection. The published record includes:

- `schemaVersion`
- compiled `designContract`
- decision records
- latest evidence record
- provenance
- specimen/resource references
- publication status and timestamp

The Library consumes the same artefact shape. This keeps Studio and Library on one canonical interchange boundary.

## Context Package integration

Studio becomes the first authoring consumer of the existing Foundation/Context Package architecture. Compilation produces a canonical Design Context Package from the Design Contract plus decision/evidence provenance. Provider-specific prompt/output formats remain adapters around this package and cannot mutate canonical intent.

The integration is intentionally local and deterministic for this slice: no mandatory hosted AI provider is introduced. This proves the architecture before adding provider credentials, latency, cost, or model-specific semantics.

## Deployment

`design.byjtt.com` is a release target, not a development assumption. Deployment configuration is added only after the application passes local/unit/browser verification and the repository's deployment configuration can be established without inventing credentials. The final release check must verify the actual production URL and its critical Studio flow.

## Non-goals

- hosted AI inference
- user accounts/authentication
- payments
- collaborative editing
- arbitrary third-party provider mutation of canonical contracts
- replacing the existing v0.1 schema with a new incompatible schema

## Acceptance criteria

1. A newly created Studio project can be exported as a schema-valid Design Contract containing all required structured fields.
2. Every non-empty accepted conversational iteration produces a stable BDR decision with affected paths and before/after state.
3. Evidence never reports `pass` without an executable assertion behind it.
4. Publication contains the complete compiled project artefact and is blocked on failed/not-run required evidence.
5. The same canonical contract can produce a Design Context Package without duplicating product intent in another model.
6. Existing Studio and Library browser flows remain green, with new regression coverage for contract compilation, decision tracing, evidence failure, and full publication artefact.
7. Deployment is treated as verified only when `design.byjtt.com` is actually reachable and the critical flow succeeds.
