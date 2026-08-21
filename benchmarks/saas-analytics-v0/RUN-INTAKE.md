# SaaS Analytics v0 — Run Intake

Run intake binds generation facts to evidence before subjective judging begins. It does not generate a candidate and it does not modify the pre-registered treatment.

## Why this exists

A benchmark is not auditable if provider identity, context provenance, attempts, cost or evidence are reconstructed after the result is known. `run.json` therefore acts as the lifecycle record between the frozen context bundle, the independently generated candidate, the generic evaluator and the final score.

## Lifecycle

### 1. Registered

Create the run before opening the fresh generation context:

```text
npm run benchmark:run:init -- \
  --run-id <unique-run-id> \
  --candidate-id candidate-a \
  --role baseline \
  --source-commit <context-source-commit> \
  --max-attempts <shared-control-limit> \
  --active-minutes <shared-control-limit>
```

Registration:

- atomically creates `runs/<run-id>/`;
- refuses an existing run ID;
- copies benchmark ID/version from `brief.json`;
- derives `baseline-v0` or `byjtt-guided-v0` from the role;
- records the SHA-256 digest of the frozen `context-sources.json` manifest;
- sets human visual editing and paid external service approval to `false`;
- leaves not-yet-observed generator, timing, cost, candidate and evaluation facts as `null`.

A registered run is a reservation, not evidence that generation happened.

### 2. Generating

Before the first material generation action, record the actual provider/tool/model/version or date, set `freshContextConfirmed` only after verifying a fresh context, record `startedAt`, and change status to `generating`.

Do not reuse this already-informed ByJTT conversation as the baseline context.

### 3. Generated

When the allowed generation work ends, record:

- attempts in chronological order;
- material interventions;
- end time and active work time;
- provider-visible cost/credits or explicit non-exposure;
- candidate source/ref and implementation digest where available;
- operational failures, discarded work and confounds.

Then set status to `generated`.

### 4. Evaluated

Run the generic candidate evaluator with a separate single-use evaluator run ID. Bind its evidence root/digest and objective result into `run.json`. Create the evidence-backed `score.json` only after automated evidence exists.

An evaluated run must have completed timing, finalized cost provenance, complete evaluation binding and a score belonging to the same run directory.

### 5. Invalidated

If an invalidation condition in `EXECUTION.md` occurs, retain the record, change status to `invalidated`, and record the reason. Never delete or rewrite the run to make the experiment cleaner.

## Identity rules

- `runId` identifies the experimental run and must match its directory.
- `candidateId` is a neutral judging identity such as `candidate-a`.
- `workflowRole` is hidden from subjective judging where practical but remains in the provenance record.
- evaluator run IDs are separate from generation run IDs and are also single-use.

## Cost discipline

Do not estimate costs. `amount`, `currency` and `credits` remain `null` until observed. At completion, classify the source as:

- `provider-visible` — exact provider-visible amount/credits recorded;
- `not-exposed` — the provider did not expose usable cost information;
- `not-applicable` — no metered provider cost applied.

`pending` is valid only while a run is still in progress. Paid external services remain prohibited unless explicit approval exists before the run; the current first benchmark protocol assumes no such approval.

## Validation

`npm run benchmark:validate` verifies both schema and lifecycle semantics, including:

- benchmark ID/version;
- run-directory identity;
- workflow-role to context-bundle mapping;
- frozen context-manifest digest;
- attempt budget and contiguous attempt numbering;
- fresh-context/generator/start metadata for active runs;
- completed timing and cost provenance for evaluated runs;
- evaluator/evidence/score binding;
- score identity and evidence coverage.

CI also creates an ephemeral registered run and validates it before removing it. This proves the registration tool and validator agree without committing a fabricated benchmark result.

## Non-goals

Run intake does not choose a generator, deploy a candidate, repair candidate code, score visual quality, or authorize spend. Those remain separate controlled parts of the benchmark.