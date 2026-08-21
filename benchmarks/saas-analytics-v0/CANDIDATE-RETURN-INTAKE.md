# SaaS Analytics v0 — Candidate Return Intake

This procedure begins only after a fresh candidate-generation context has finished its allowed work. It preserves chain of custody between generation and evaluation. It does **not** authorize repair, redesign, treatment changes, extra attempts, or scoring.

## Purpose

The returned implementation is experimental evidence. From the moment generation stops, the candidate must be treated as immutable except for non-design runtime operations that are strictly necessary to start the implementation exactly as produced.

The evaluator/orchestrator may inspect, copy, hash, start, and test the candidate. It may not improve it.

## 1. Accept the return package

For each candidate, collect the smallest complete package required to reproduce what the fresh context produced:

- experimental run ID;
- neutral candidate ID (`candidate-a` or `candidate-b`);
- source repository/ref, archive, directory, or equivalent immutable source reference;
- implementation digest where available;
- exact start/build commands reported by the generator;
- dependency/runtime requirements;
- generated run notes, known unmet requirements, failures, discarded work and confounds;
- completed generation provenance in the matching `run.json`.

Do not accept screenshots alone as a candidate implementation.

## 2. Freeze candidate identity

Before opening or running the implementation:

1. confirm the returned candidate ID matches the registered experimental run;
2. preserve the source/ref exactly as returned;
3. compute or record an implementation digest when possible;
4. bind that source/ref/digest to the matching `run.json`;
5. do not rename candidate identities based on apparent quality.

If candidate identity cannot be resolved without guessing, stop and record a confound rather than reconstructing identity from memory.

## 3. No-repair boundary

Allowed evaluator-side operations:

- install declared dependencies;
- run declared build/start commands;
- set non-secret runtime values strictly required by the produced implementation when those values are operational rather than design/product inputs;
- choose an unused local port;
- capture logs and diagnostics;
- retry an unchanged command after an operational transient failure;
- copy the implementation to an isolated evaluation location without changing file contents.

Not allowed:

- editing HTML/CSS/JS/TS/components/content;
- fixing build errors in candidate source;
- changing dependencies to make the candidate work;
- adding missing state routes or interactions;
- replacing fixtures or inventing data;
- restyling, responsive fixes, accessibility fixes or performance fixes;
- adding test hooks that alter runtime behavior;
- generating a new candidate from the failed candidate;
- giving either arm a rescue instruction that the other arm did not receive.

If the candidate cannot run without a prohibited change, preserve the failure as evidence. Do not repair it for evaluation.

## 4. Operational exception log

Every evaluator-side action beyond the candidate's reported normal start path must be logged in the experimental record as an intervention or operational note.

For each exception record:

- timestamp;
- exact action/command;
- why it was required;
- whether candidate files changed (must be `false` for valid evaluator operations);
- result;
- whether an equivalent situation would be handled identically for the other arm.

A hidden rescue path invalidates comparison integrity even when the resulting UI looks unchanged.

## 5. Start candidate independently

Run each candidate in a separate environment/process and give it a unique runtime URL.

Do not run both candidates from the same mutable working directory.

Before objective evaluation, confirm only:

- the process starts or its failure is captured;
- the root URL is reachable or its failure is captured;
- the runtime URL belongs to the intended candidate;
- no candidate source was modified after the generation endpoint.

Do not visually compare the two candidates at this stage.

## 6. Allocate evaluator identity

Each candidate receives a distinct, single-use evaluator run ID. Experimental generation run IDs and evaluator run IDs are different namespaces.

Example:

```text
candidate-a generation: saas-v0-baseline-001
candidate-a evaluator:  saas-v0-eval-a-001

candidate-b generation: saas-v0-guided-001
candidate-b evaluator:  saas-v0-eval-b-001
```

Never reuse an evaluator ID after a partial or failed evaluation. Preserve the failed evaluator evidence and allocate a new ID only when the retry is operationally justified and candidate bytes are unchanged.

## 7. Run objective evaluator before subjective review

Execute the generic evaluator against each isolated runtime:

```text
npm run benchmark:candidate:evaluate -- --url <candidate-url> --run-id <single-use-evaluator-run-id>
```

Keep candidate-a and candidate-b evidence in separate roots.

Bind the evaluator run ID, evidence root, evidence digest and objective result into the corresponding experimental `run.json` before subjective judging begins.

The objective evaluator is not a repair loop. A failure is evidence.

## 8. Lock objective evidence

Before any side-by-side visual comparison:

- preserve evaluator output;
- preserve screenshots and runtime logs;
- preserve accessibility/runtime results;
- preserve evidence digest;
- validate the experimental run binding;
- record any evaluator limitations or incomplete capture.

Do not rerun selectively because one candidate produced unattractive or unfavorable evidence. A rerun needs an explicit operational reason that would apply symmetrically.

## 9. Hand off to blind Gauntlet review

Only after objective evidence is locked may the candidate enter `gauntlet.md` subjective/task review.

Where practical, the reviewer receives neutral candidate identity and evidence without workflow-role labels. Do not reveal baseline/guided role until both score records are complete and validated.

## 10. Invalid return conditions

Invalidate or flag the affected run when any of the following occurs:

- candidate bytes were changed after the generation endpoint without a preregistered allowed operation;
- evaluator repaired a build/runtime/design defect;
- candidate identity or source cannot be bound confidently to the registered run;
- evidence from the two candidates was mixed or overwritten;
- objective evidence was selectively regenerated based on observed quality;
- one arm received an evaluator-side rescue unavailable to the other;
- required provenance was reconstructed from memory;
- evaluator/run IDs were reused contrary to the protocol.

Retain invalidated evidence. Do not delete it to make the experiment cleaner.

## Completion condition

Candidate return intake is complete when the implementation is frozen, its provenance is bound to the registered run, evaluator evidence is captured under a unique single-use evaluator identity, no prohibited repair occurred, and the candidate is ready for neutral-role Gauntlet judging.
