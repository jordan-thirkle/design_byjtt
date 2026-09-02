# SaaS Analytics v0 — first controlled result

Run date: **2026-08-27**  
Frozen source: `5a840d0ba7bf0b64f61f2cbd7b653544b3d30508`  
Signal: **directional, not causal proof**

## Result

| Treatment | Candidate | Score | Objective runtime gates | Active generation time |
|---|---|---:|---:|---:|
| Prompt/brief baseline | A | 78/100 | 28/28 | 3.03 min |
| ByJTT-guided context | B | 68/100 | 20/28 | 3.88 min |

The baseline won this pair. The guided candidate implemented a broader comparison-period flow, but failed eight populated/partial viewport checks. Automated evaluation found serious invalid definition-list semantics across those states and a non-keyboard-focusable horizontal region at narrow widths. The blind reviewer scored the candidates before treatment identities were revealed.

This is useful negative evidence for the current guided package. It does not show that guidance generally harms results, nor that the baseline model is generally better. One pair is too small for either claim.

## What screenshot-only judging would have missed

- Candidate B's populated and partial screens rendered and appeared reviewable, but failed serious semantic accessibility checks.
- Candidate B's segment table clipped at narrow widths and its scrollable container lacked keyboard access.
- Candidate A looked complete but omitted the required comparison-period control.
- Both candidates reported that they had not produced an automated accessibility scan; the independent evaluator, not candidate self-report, established the objective result.

## Gauntlet signal log

- **High signal:** accessibility baseline. It exposed serious defects invisible in a hero screenshot.
- **High signal:** render matrix. It localized failures to populated/partial states and narrow widths.
- **High signal:** requirement/UX trace. It caught Candidate A's absent comparison-period flow despite its 28/28 runtime pass.
- **Promising:** state/content resilience. Deliberate states were observable, but the current automated gate mostly checks rendering, overflow and accessibility rather than semantic quality of each state.
- **Promising:** visual and anti-slop review. The blind judge found both candidates conventional; calibration examples are needed before treating this as a stable metric.
- **Premature:** mutation fidelity and performance differentiation. This static one-shot task did not create enough variation to validate those dimensions.

## Protocol notes and confounds

- Both candidates used fresh isolated contexts, the same GPT-5.5 model, Codex CLI 0.135.0, deterministic fixtures, one material attempt and no human visual editing.
- GPT-5.6 Sol was attempted first for Candidate A but was unavailable to the installed CLI. It failed before creating candidate files; both material runs were then performed with GPT-5.5.
- Provider cost was not exposed. No paid external service or subscription was required.
- Candidate B's populated/partial screenshots were captured after the objective runner stopped on accessibility failures. They are evaluation evidence, not repaired output.

## Durable evidence

- [`runs/saas-v0-baseline-001/`](./runs/saas-v0-baseline-001/) — frozen baseline source, generation record, evaluation evidence and score.
- [`runs/saas-v0-guided-001/`](./runs/saas-v0-guided-001/) — frozen guided source, generation record, evaluation evidence and score.
- [`results/blind-review.json`](./results/blind-review.json) — anonymous reviewer output before treatment reveal.

## Next experiment

Do not tune the current result after seeing it. Version a new guided package that adds deterministic pre-handoff validation for semantic HTML, keyboard-accessible overflow and required-flow traceability. Repeat multiple paired seeds under the same model/tool version, then add a credible free/open/local model cohort.
