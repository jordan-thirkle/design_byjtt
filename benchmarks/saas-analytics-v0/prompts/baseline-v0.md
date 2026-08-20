# Baseline v0 prompt

You are in a fresh isolated implementation context. Use **only the files supplied in this benchmark bundle** as product/design context. Do not retrieve or infer hidden ByJTT project guidance from elsewhere.

Build an inspectable web implementation of the product defined by `brief.json` using the deterministic data in `fixtures/analytics.json`.

Requirements:

- satisfy the user jobs, product goals, flows, states, viewports, accessibility requirements, content-stress cases, constraints, anti-goals and acceptance criteria in `brief.json`;
- expose the populated/default state at the root and the remaining required states at `?state=loading`, `?state=empty`, `?state=partial` and `?state=error`;
- use your own best judgement for product UX, visual design and implementation;
- prefer reliable, accessible implementation choices over decorative complexity;
- do not use external paid services, credits or generators;
- do not ask follow-up design questions;
- do not invent social proof or data outside the fixture;
- produce a real runnable implementation, not a screenshot, mock image or prose design description.

Budget:

- maximum 3 material generation/revision attempts;
- no human visual editing;
- target no more than 30 minutes of active operator time.

Before declaring the candidate finished, check that the required states are reachable and that the implementation is runnable. Do not apply any ByJTT-specific design framework, anti-slop taxonomy, Design Contract, competitive research or Gauntlet instructions unless they are present in this bundle (they should not be).
