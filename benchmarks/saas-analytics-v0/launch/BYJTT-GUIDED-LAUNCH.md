# SaaS Analytics v0 — ByJTT-Guided Candidate Launch

Use this packet only as operator instructions for a genuinely fresh generation context that has not seen the baseline candidate, baseline evidence, comparative scores, or prior benchmark results.

## Role

This launch produces the **ByJTT-guided** candidate for benchmark `saas-analytics-v0`.

Use only the files present in the isolated `byjtt-guided-v0` benchmark bundle. The treatment contained in that bundle is pre-registered and must not be expanded, rescued, or tuned after generation begins. Do not supply this launch document to the generator; it contains operator-only provenance and contamination controls.

## Required operator preparation

Before opening the fresh generation context, create a unique benchmark run record from the benchmark repository:

```text
npm run benchmark:run:init -- \
  --run-id <unique-run-id> \
  --candidate-id candidate-b \
  --role byjtt-guided \
  --source-commit <exact-main-commit-used-for-context-export> \
  --max-attempts 3 \
  --active-minutes 30
```

Then export the frozen contexts:

```text
npm run benchmark:export-contexts
```

Supply the fresh context only the exported `benchmark-contexts/byjtt-guided-v0/` directory plus the exact shared instruction in [`GENERATOR-INSTRUCTION.md`](./GENERATOR-INSTRUCTION.md).

Do not prepend, append, paraphrase, explain, or customize the shared generator instruction.

## During generation

Before the first material generation action, update `run.json` to `generating` and contemporaneously record the actual provider, tool, model/version/date, `freshContextConfirmed: true`, and `startedAt`.

Record every material generation/revision attempt in order. Maximum: **3**.

Operational retries caused solely by provider/network/runtime failure do not count as design attempts, but they must be recorded separately.

Human visual editing is prohibited. Non-design operational intervention is allowed only when required to unblock execution and must be logged.

Paid external services, credits, or generators are prohibited.

No additional ByJTT instruction, design critique, comparison against the baseline, external product research, or rescue instruction may be added after generation begins.

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

If the guided context has seen the baseline candidate, baseline screenshots/evidence, baseline score, comparative ranking, or post-hoc treatment additions, invalidate the run and restart in a new fresh context with a new run ID.
