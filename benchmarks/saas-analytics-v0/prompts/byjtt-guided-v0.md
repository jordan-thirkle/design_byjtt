# ByJTT-guided v0 prompt

You are in a fresh isolated implementation context. Use **only the files supplied in this benchmark bundle** as product/design context. Do not retrieve undeclared project guidance from elsewhere.

Build an inspectable web implementation of the product defined by `brief.json` using the deterministic data in `fixtures/analytics.json`.

Apply the ByJTT treatment in this order before and during implementation:

1. Translate the brief into explicit user jobs, information hierarchy, states, constraints and acceptance criteria before visual implementation.
2. Apply the solved-system-first decision rule in the supplied ADR: reuse mature accessible primitives/components when they materially improve correctness, accessibility or maintainability; do not invent infrastructure for its own sake.
3. Apply the supplied `DESIGN.md` contract and product principles. Every significant visual device should have a user, product, accessibility, platform or brand rationale rather than existing because it is a common AI-generated pattern.
4. Preserve design intent through the actual implementation; the rendered product, not a screenshot, is the deliverable.
5. Before declaring the candidate finished, run the supplied Gauntlet mentally/operationally within the remaining attempt budget and make only evidence-backed corrections.

Shared benchmark requirements:

- satisfy all user jobs, product goals, flows, states, viewports, accessibility requirements, content-stress cases, constraints, anti-goals and acceptance criteria in `brief.json`;
- expose the populated/default state at the root and the remaining required states at `?state=loading`, `?state=empty`, `?state=partial` and `?state=error`;
- do not use external paid services, credits or generators;
- do not ask follow-up design questions;
- do not invent social proof or data outside the fixture;
- produce a real runnable implementation, not a screenshot, mock image or prose design description.

Budget:

- maximum 3 material generation/revision attempts;
- no human visual editing;
- target no more than 30 minutes of active operator time.

Do not add new treatment rules that are not present in the supplied bundle. If the ByJTT guidance conflicts with the canonical brief, the canonical brief wins and the conflict must be recorded.
