# Benchmark run template

Duplicate this file into `runs/<run-id>/README.md` when executing a workflow. Do not fill fields from memory after the run if they can be captured during execution.

## Identity

- Run ID:
- Benchmark version:
- Date:
- Workflow name:
- Tool/provider/model:
- Tool/version/build/date observed:
- Operator:

## Allowed context

List every material input supplied beyond the canonical benchmark package.

## Budget

- Active work time budget:
- Maximum material generation/revision attempts:
- Human visual editing allowed: yes/no
- Monetary/credit budget:

## Attempt log

| Attempt | Action | Outcome | Accepted? | Regression introduced? |
| --- | --- | --- | --- | --- |

## Evidence

Record paths/URLs for:
- implementation;
- viewport screenshots;
- state screenshots;
- accessibility output;
- keyboard/interaction evidence;
- build/test output;
- performance evidence where measured;
- final score JSON.

## Interventions

Record every material human correction, clarification or workaround.

## Efficiency

- Active minutes:
- Tool calls/messages:
- Retries:
- Human interventions:
- Known cost:
- Unexpected regressions:
- Generated work later replaced:

## Evaluator uncertainty

List evidence gaps, subjective calls and anything that prevents strong conclusions.

## Lessons

What did this run reveal about the workflow and about ByJTT's proposed evaluation system?