# ADR 0005 — Public shell and platform architecture

**Status:** Accepted
**Date:** 2026-08-30

## Context

The live `design.byjtt.com` public documentation routes had drifted into different navigation and footer variants. The Design Standard exists specifically to prevent cross-screen inconsistency and to make design intent reusable by people and AI agents.

The product is also expanding beyond documentation into Studio, Library, evidence/validation, benchmarks and agent-facing interfaces.

## Decision

1. `design.byjtt.com` has one canonical **public shell** for documentation and public information surfaces.
2. Public navigation labels, destinations, current-page semantics, footer groups, skip-link behavior and landmark requirements are contract data rather than page-local markup.
3. Studio may use a distinct **workspace shell**, but this is an explicit product composition. It does not silently fork the public brand/navigation contract.
4. The Design Standard is the semantic authority. Its machine-readable index exposes the same contract for agents.
5. Follow the platform first: semantic HTML landmarks and native controls/links are preferred; ARIA supplements semantics where required by the interaction pattern.
6. Use established accessibility patterns and mature open-source primitives where they remove real implementation risk. Do not rebuild solved behavior merely for stylistic ownership.
7. Continue with the current lightweight/browser-first architecture while it satisfies the public standard, Studio vertical slice, Library and validation requirements. Do not migrate frameworks solely for fashion or framework recency.
8. Reconsider the runtime/framework only when an evidence-backed requirement cannot be satisfied cleanly, or when the cost of preserving the current architecture becomes materially higher than migration.
9. Design tokens remain DTCG-compatible and portable; visual identity remains ByJTT-owned.

## Evidence

- Live production audit on 2026-08-30 showed distinct shells on `/`, `/standard/`, `/research/`, `/contracts/`, `/agents/`, `/library/` and `/docs/`.
- ByJTT research already identifies cross-screen inconsistency as a recurring AI-design failure mode.
- DTCG v2025.10 is stable for production use, while remaining outside the W3C Standards Track.
- W3C APG provides the accessibility semantics and interaction patterns; native HTML should be used where it already provides the required semantics.
- Mature open-source primitives such as Radix/Base UI already cover difficult focus, keyboard and ARIA behavior.

## Consequences

- Shell changes become centralized and testable.
- Agents can discover the same navigation/footer contract without scraping page markup.
- The visual layer can remain distinct without reimplementing solved accessibility behavior.
- The current runtime can evolve incrementally rather than forcing a risky rewrite.
- A future migration remains possible, but requires evidence from product capability, maintenance, performance, accessibility or integration needs.

## Re-evaluation triggers

Reconsider the architecture when one or more of these become demonstrated blockers:

- Studio needs server/runtime capabilities that the current architecture cannot provide cleanly;
- shared component/state architecture becomes a significant source of drift or complexity;
- build/deployment performance becomes materially worse than credible alternatives;
- accessibility testing cannot be integrated reliably;
- agent-facing/application behavior requires a substantially richer runtime boundary;
- maintaining two fundamentally different rendering models creates more complexity than it removes.
