# SaaS Analytics v0 — Baseline Candidate Launch

Use this packet only inside a genuinely fresh generation context with no prior ByJTT Design discussion, treatment details, Gauntlet details, anti-slop research, or benchmark results.

## Role

You are generating the **baseline** candidate for benchmark `saas-analytics-v0`.

Do not infer or seek any ByJTT-specific product/design method. Use only the files present in the isolated `baseline-v0` benchmark bundle.

## Required operator preparation

Before opening the fresh generation context, the operator must create a unique benchmark run record from the benchmark repository using:

```text
npm run benchmark:run:init -- \
  --run-id <unique-run-id> \
  --candidate-id candidate-a \
  --role baseline \
  --source-commit <exact-main-commit-used-for-context-export> \
  --max-attempts 3 \
  --active-minutes 30
```

Then export the frozen contexts with:

```text
npm run benchmark:export-contexts
```

Supply the fresh context only the exported `benchmark-contexts/baseline-v0/` directory. Do not supply this launch document itself to the generator if it contains information not present in that exported bundle; its purpose is operator orchestration.

## Generator instruction

Inside the fresh context, the generator receives the exported baseline bundle and this neutral task instruction only:

> Build the runnable web product defined by the supplied benchmark bundle. Treat `brief.json` as the canonical requirements source, `fixtures/analytics.json` as the canonical deterministic data, `SHARED-CONTROLS.md` as binding execution controls, and every other file supplied in this bundle as binding context. Do not ask follow-up design questions. Produce a real runnable implementation, expose every required state URL, stay within the material-attempt and active-time limits, do not use paid external services or generators, and record any unmet requirement rather than hiding it.

No additional design methodology, critique framework, UI references, external product research, or rescue instructions may be added after generation begins.

## During generation

Before the first material generation action, update `run.json` to `generating` and contemporaneously record the actual provider, tool, model/version/date, `freshContextConfirmed: true`, and `startedAt`.

Record every material generation/revision attempt in order. Maximum: **3**.

Operational retries caused solely by provider/network/runtime failure do not count as design attempts, but they must be recorded separately.

Human visual editing is prohibited. Non-design operational intervention is allowed only when required to unblock execution and must be logged.

Paid external services, credits, or generators are prohibited.

## Completion

At the end of generation, capture the candidate source/ref or implementation digest, start command, runtime URL when available, `endedAt`, active minutes, finalized cost provenance, operational failures, discarded work, interventions, and confounds. Then set the run status to `generated`.

Do not score or manually improve the candidate at this stage.

## Evaluation handoff

Start the candidate independently and run the generic evaluator with a separate single-use evaluator ID:

```text
npm run benchmark:candidate:evaluate -- \
  --url http://127.0.0.1:<port> \
  --run-id <unique-evaluator-run-id>
```

Copy/bind the resulting evidence into the benchmark run record before subjective judging. The evaluator must not repair, restyle, or redeploy the candidate.

## Contamination rule

If the baseline context has seen ByJTT treatment instructions, Design Contract rationale, Gauntlet details, anti-slop guidance, guided-candidate output, or comparative results, invalidate the run and restart in a new fresh context with a new run ID.
