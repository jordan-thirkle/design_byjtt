# Benchmark run record

Each executed run lives at `runs/<run-id>/`.

`run.json` is the canonical machine-readable source of truth and must validate against [`../run.schema.json`](../run.schema.json). This README is optional human commentary; do not duplicate structured facts here unless they need explanation.

Register the run **before generation starts**:

```text
npm run benchmark:run:init -- \
  --run-id <unique-run-id> \
  --candidate-id candidate-a \
  --role baseline \
  --source-commit <40-char-git-sha> \
  --max-attempts <n> \
  --active-minutes <minutes>
```

Use `--role byjtt-guided` for the treatment run. Run IDs are immutable and single-use. If a run is invalidated, interrupted or retried, create a new run ID rather than rewriting its identity.

## What must be recorded contemporaneously

Update `run.json` during execution rather than reconstructing these facts after judging output:

- provider, tool, model and observed version/date;
- confirmation that the generator started in a fresh isolated context;
- context bundle digest when available;
- start/end timestamps and active minutes;
- every material attempt and intervention;
- provider-visible cost/credits, or explicit `null` with the correct provenance source;
- candidate source commit/ref, runtime command/reference and implementation digest when available;
- operational failures, discarded work and confounds;
- evaluator run ID, evidence location/digest, objective gate result and `score.json` binding.

Unknown facts stay `null`; never estimate them merely to complete a record.

## Human commentary

Use this README only for narrative that is awkward to represent structurally, such as:

- why a provider mismatch occurred;
- why a run was invalidated;
- unusual operational circumstances;
- interpretation caveats;
- lessons that materially affect the ByJTT product thesis.

The validator rejects evaluated runs with unresolved lifecycle metadata, missing score binding or broken benchmark identity.