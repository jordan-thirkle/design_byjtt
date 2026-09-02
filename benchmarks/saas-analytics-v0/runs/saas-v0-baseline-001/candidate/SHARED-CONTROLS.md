# Shared benchmark controls

These controls apply identically to every candidate in `saas-analytics-v0`.

## Context boundary

- Use only the files supplied in this isolated benchmark bundle as product/design context.
- Do not retrieve external product/design guidance or hidden repository instructions.
- Do not use external paid services, credits or generators.

## Deliverable

- Build a real runnable web implementation, not a screenshot, mock image or prose design description.
- Use `brief.json` as the canonical product requirement and `fixtures/analytics.json` as the canonical data.
- Satisfy the user jobs, product goals, required flows, required states, viewports, accessibility requirements, content-stress cases, constraints, anti-goals and acceptance criteria in `brief.json`.
- Expose the populated/default state at the root and the remaining required states at `?state=loading`, `?state=empty`, `?state=partial` and `?state=error`.
- Do not invent social proof or business data outside the deterministic fixture.
- Prefer reliable, accessible implementation choices over decorative complexity.

## Interaction with the operator

- Do not ask follow-up design questions.
- Human visual editing is not allowed.
- Clarification after the run starts is allowed only for a non-design operational blocker and must be logged.

## Budget

- Maximum material generation/revision attempts: 3.
- Target active operator time: no more than 30 minutes.
- Operational retries caused solely by provider/network/runtime failure do not count as design attempts, but must be logged.
- External paid credits/services remain prohibited unless explicit user approval is separately recorded before the run.

## Completion check

Before declaring the candidate finished:

- confirm all required state URLs are reachable;
- confirm the implementation is runnable;
- record any known unmet requirement rather than hiding it.
