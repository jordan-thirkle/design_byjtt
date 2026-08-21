# SaaS Analytics v0 — First Controlled Run

This is the operator runbook for the first real baseline-vs-ByJTT comparison. It orchestrates already pre-registered benchmark components; it does not change the treatment, controls, scoring weights, or candidate requirements.

## Preconditions

Before starting either candidate:

1. `main` contains the frozen context exporter, immutable run intake, generic candidate evaluator, and this runbook.
2. `npm run benchmark:check` is green on the exact `main` commit selected for the run.
3. No benchmark source or treatment file is changed after either run begins.
4. No paid external service, credit, or generator will be used.
5. The baseline and guided candidates will be created in separate genuinely fresh AI/agent contexts.

If any precondition fails, do not begin generation.

## Freeze the source commit

Record the exact `main` commit SHA used for this experiment. Both run registrations and both context exports must derive from the same SHA.

Run:

```text
npm run benchmark:validate
npm run benchmark:export-contexts
```

Do not modify the exported bundles manually.

## Register the two runs

Use unique experiment run IDs. Suggested human-readable IDs are allowed, but they must never be reused.

Baseline:

```text
npm run benchmark:run:init -- \
  --run-id saas-v0-baseline-001 \
  --candidate-id candidate-a \
  --role baseline \
  --source-commit <exact-main-sha> \
  --max-attempts 3 \
  --active-minutes 30
```

ByJTT-guided:

```text
npm run benchmark:run:init -- \
  --run-id saas-v0-guided-001 \
  --candidate-id candidate-b \
  --role byjtt-guided \
  --source-commit <exact-main-sha> \
  --max-attempts 3 \
  --active-minutes 30
```

If either ID already exists, choose a new ID. Never delete an earlier run record simply to reuse its name.

## Shared generator instruction

Both candidate arms receive the exact same generator-facing text from [`launch/GENERATOR-INSTRUCTION.md`](./launch/GENERATOR-INSTRUCTION.md). Do not prepend, append, paraphrase, explain, or customize it for either arm.

The only intended difference in generation context is the pre-registered exported bundle supplied to that fresh context.

## Launch the baseline

Open a completely new generation conversation/context that has not seen ByJTT Design, this repository's treatment documents, the guided launch packet, the guided candidate, or any benchmark result.

Operator instructions: [`launch/BASELINE-LAUNCH.md`](./launch/BASELINE-LAUNCH.md).

Supply only the exported `benchmark-contexts/baseline-v0/` directory plus the exact shared generator instruction.

The current informed development conversation is not eligible to serve as the baseline context.

## Launch the guided candidate

Open a different completely new generation conversation/context that has not seen the baseline output, baseline screenshots, baseline score, or comparative results.

Operator instructions: [`launch/BYJTT-GUIDED-LAUNCH.md`](./launch/BYJTT-GUIDED-LAUNCH.md).

Supply only the exported `benchmark-contexts/byjtt-guided-v0/` directory plus the exact same shared generator instruction.

Do not add treatment advice after the run begins.

## Generation controls

For both candidates identically:

- maximum 3 material generation/revision attempts;
- target active operator time at most 30 minutes;
- no follow-up design questions;
- no human visual editing;
- no external paid services/credits/generators;
- operational retries caused solely by provider/network/runtime failure are logged separately and do not count as design attempts;
- unmet requirements are recorded rather than quietly repaired outside the declared workflow.

Record provider/tool/model/version, timing, attempts, interventions, cost provenance, failures, discarded work, and candidate identity contemporaneously in each `run.json`.

## Objective evaluation

Do not compare candidates visually before objective evidence has been captured.

Start each candidate independently and evaluate it with its own single-use evaluator run ID:

```text
npm run benchmark:candidate:evaluate -- --url <candidate-a-url> --run-id saas-v0-eval-a-001
npm run benchmark:candidate:evaluate -- --url <candidate-b-url> --run-id saas-v0-eval-b-001
```

Evaluator IDs must not be reused. Evidence from the two candidates must remain physically separated.

Bind each evaluator run, evidence root, evidence digest, and objective result to the matching experimental `run.json`.

## Blind subjective judging

Where practical, judge only `candidate-a` and `candidate-b` identities until the score records are complete.

Subjective dimensions must cite evidence and confidence. Do not change weights or rubric wording after seeing which candidate is ahead.

The evaluator may inspect but must not repair, restyle, redeploy, or add missing functionality to either candidate.

## Finalize records

For each candidate:

1. complete `run.json` generation/evaluation lifecycle fields;
2. create evidence-backed `score.json`;
3. run `npm run benchmark:validate`;
4. preserve all material evidence under that run;
5. record confounds and uncertainty explicitly.

Only after both records validate should the workflow roles be revealed for comparison.

## Interpretation

The first pair is exploratory evidence, not proof of a broad claim. A baseline win, guided win, tie, invalidation, or provider failure is all useful evidence if recorded faithfully.

Do not rewrite the treatment or benchmark around the observed result. Any benchmark/treatment change becomes a new pre-registered version and requires fresh runs.

## Stop / invalidate conditions

Stop and invalidate the affected run if:

- its supposedly fresh context is contaminated by hidden treatment/comparison information;
- a frozen context bundle is changed after generation starts;
- paid external services/credits are used;
- human visual editing is applied;
- required provenance/evidence is lost;
- the candidate is manually repaired outside its declared workflow;
- a run ID or evaluator ID is reused;
- scoring is reconstructed from memory rather than evidence.
