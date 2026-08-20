# ADR 0004 — Benchmark spend and context isolation

Status: Accepted

## Context

ByJTT Design benchmarks are intended to measure whether the ByJTT intelligence/process layer improves digital-product design and implementation quality. The benchmark can become invalid or misleading if one workflow receives hidden context, extra paid credits, a stronger paid provider, or materially different generation opportunity.

A benchmark runner previously considered using a fresh Replit app purely to isolate the baseline context. That would introduce an unnecessary external platform and potential credit spend when GitHub-native, local, or already-included execution paths can provide isolation without changing the product architecture.

## Decision

Benchmark execution follows these rules:

1. **No external paid credits or services may be consumed for a benchmark without explicit user approval for that spend.**
2. Prefer, in order: local execution, GitHub-native branches/worktrees/CI, already-included tools, and free isolated contexts that do not require payment details or credit consumption.
3. External generators are benchmark subjects or deliberate execution providers, not default infrastructure dependencies.
4. If a paid provider is intentionally benchmarked, the provider/model/version, visible cost, credit policy, budget, retries and any asymmetry between candidates must be recorded.
5. Baseline and ByJTT-guided candidates must run in fresh isolated contexts. They must not share hidden conversation history.
6. The canonical benchmark inputs, attempt/time limits, human-edit permissions and output requirements must be equivalent unless the treatment difference is pre-registered.
7. The ByJTT-guided workflow may receive only the ByJTT interventions pre-registered before candidate generation. Post-hoc rescue instructions invalidate or downgrade the run.
8. Provider/tool differences are confounds. They must be recorded and prevent strong causal claims about the ByJTT treatment.
9. Unknown cost is recorded as unknown/null; it must never be guessed.
10. Benchmark infrastructure must not silently create, publish, deploy or provision third-party applications solely to obtain a comparison candidate.

## Rationale

This keeps the benchmark focused on the variable we care about: the quality contribution of ByJTT's requirements, research, design-contract, solved-system and Gauntlet process. It also prevents unnecessary user spend, vendor lock-in and accidental architectural drift.

## Consequences

- The first benchmark may take longer to execute because valid isolation matters more than speed.
- Some commercial-generator comparisons will require separate explicit approval later.
- A free/local baseline is preferable to a paid baseline if both can test the research question fairly.
- Public benchmark claims must disclose provider and budget differences.
- `benchmarks/*/EXECUTION.md` is the benchmark-specific pre-registration layer; this ADR is the repository-wide policy.
