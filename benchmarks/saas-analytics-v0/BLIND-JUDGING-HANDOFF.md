# SaaS Analytics v0 — Blind Judging Handoff

This handoff begins only after both candidates have completed immutable return intake and objective evidence capture. It standardizes what a subjective/task reviewer receives so workflow identity does not bias scoring.

## Reviewer packet

For each neutral candidate identity, provide only:

- candidate ID (`candidate-a` or `candidate-b`);
- isolated runtime URL or immutable evidence package;
- objective evaluator evidence already captured for that candidate;
- the canonical benchmark brief and deterministic fixture;
- the canonical Gauntlet and score schema;
- documented evaluator limitations/confounds that are necessary to interpret evidence.

Do not provide:

- `workflowRole`;
- baseline/guided labels;
- ByJTT treatment files or rationale;
- generator/provider commentary about expected quality;
- comparative scores or comments from another reviewer;
- issue titles that reveal the candidate role;
- candidate generation conversation unless a specific provenance dispute requires it after scoring is locked.

## Review order

Use the same review procedure for both candidates:

1. Gate A — run integrity evidence available to reviewer without role labels;
2. Gate B — requirement coverage;
3. Gate C — render matrix;
4. Gate D — accessibility baseline;
5. Gate E — state/content resilience;
6. Gate F — UX task review;
7. Gate G — visual and anti-slop review;
8. Gate H — engineering and ship safety where evidence permits;
9. complete score record with evidence references and confidence;
10. validate the score record before role reveal.

Do not change rubric wording, weights, task wording, deduction thresholds or evidence standards between candidates.

## Order bias control

Record which neutral candidate was reviewed first.

For the first exploratory pair, use the same reviewer for both candidates only if that reviewer can avoid role information. Record review order as a possible confound.

For later replicated runs, alternate or randomize candidate review order and preserve that assignment before subjective review begins.

## Evidence discipline

Every material deduction must point to evidence. Subjective impressions without an observable basis may be noted but must not silently change objective results.

When evidence is ambiguous:

- state the ambiguity;
- assign confidence;
- avoid filling gaps with assumptions;
- apply the same uncertainty standard to both candidates.

Do not request candidate repairs during judging.

## Score lock

A candidate score is locked when:

- all required score fields are complete;
- material deductions cite evidence;
- subjective dimensions include confidence where required;
- the score validates against the canonical schema;
- no workflow role has been revealed to the reviewer.

After both neutral scores are locked and validated, record the reveal event and map `candidate-a`/`candidate-b` back to their registered workflow roles.

## Post-reveal comparison

After role reveal, compare:

- total score;
- dimension-level differences;
- objective gate failures;
- subjective differences and confidence;
- attempt count and active operator time;
- generator/provider/model differences if any;
- runtime/build failures;
- cost provenance;
- confounds;
- which Gauntlet checks were high signal, promising, low signal or premature.

Do not reinterpret a pre-reveal observation merely because the workflow identity is now known.

## First-pair interpretation

The first baseline/guided pair is exploratory evidence. Report effect direction and observed mechanisms, but do not claim the treatment is broadly superior from one pair.

Useful outcomes include:

- guided win;
- baseline win;
- tie;
- mixed dimension result;
- invalidated arm;
- provider/runtime failure;
- evidence that a benchmark check is noisy or biased.

Any treatment, rubric or benchmark change prompted by the result becomes a future preregistered version. Do not modify v0 retroactively.
