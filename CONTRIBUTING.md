# Contributing to ByJTT Design

ByJTT Design is research-led and AI-native. Contributions should improve product quality without creating documentation or implementation sprawl.

## Before changing code or product behavior

1. Read `AGENTS.md` and the canonical documents it routes to.
2. Confirm the requirement or user problem being solved.
3. Check whether the repository or a mature external system already solves the problem.
4. Retrieve current documentation for material external APIs/tools/frameworks.
5. Define how the change will be validated before implementing it.

## Change principles

- Prefer the smallest change that satisfies the requirement completely.
- Reuse approved components/systems rather than silently creating alternatives.
- Preserve unrelated approved design and behavior during targeted edits.
- Treat accessibility, responsive behavior, real content, and edge states as requirements.
- Keep vendor/model-specific code behind replaceable adapters when the capability is not inherently vendor-specific.
- Capture durable rationale in a decision/research document; do not copy the same rules across multiple files.

## Research contributions

A useful research addition should make clear:

- **Observed:** what the source directly supports.
- **Inferred:** what ByJTT reasonably concludes from the evidence.
- **Hypothesis:** what still requires testing.
- observation/retrieval date;
- source class (primary docs, benchmark, community report, etc.);
- product implication.

Use primary sources for product/API capability claims. Use community evidence for user pain and experience. Avoid turning isolated anecdotes into market-wide claims.

## Pull requests

PRs should explain:

- problem/requirement;
- why this approach was chosen;
- solved systems considered;
- scope intentionally changed;
- validation performed with fresh evidence;
- screenshots/evidence for user-facing changes where useful;
- accessibility/responsive/state coverage where applicable;
- remaining risks or follow-up work.

A PR is not complete because the generated code compiles or a screenshot looks good.

## Documentation

Prefer updating an existing source of truth. Add a new document only when it serves a distinct invocation/task and can be reached from a clear pointer.

Product thesis belongs in `PRODUCT.md`; agent workflow in `AGENTS.md`; site/product design rules in `DESIGN.md`; requirements in `docs/REQUIREMENTS.md`; market positioning in `docs/COMPETITIVE-MAP.md`; benchmark methodology in `docs/BENCHMARKS.md`; durable architectural/product decisions in `docs/decisions/`.

## Licensing

Do not add a repository-wide license or import assets/code with unclear usage rights merely for convenience. Record external licenses/provenance where material and escalate unclear licensing before distribution.
