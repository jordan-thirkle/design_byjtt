# ByJTT Design — Competitive UX Review

**Reviewed:** 2026-08-28

## Product question

When someone arrives with a website idea, can they understand what ByJTT is, get to a useful first result quickly, direct it without design vocabulary, understand why changes happened, validate the result, and reuse the work afterwards?

## Competitive landscape

Current category leaders split the job differently:

- **Framer** is strongest on visual website creation, editable canvas control, CMS/SEO and publishing.
- **Lovable** is strongest on conversational full-stack generation, rapid iteration and integrated application infrastructure.
- **v0** is strong at polished UI generation and developer handoff.
- **Bolt** is strong at fast browser-based code generation and experimentation.
- **Replit** is strong when the user wants an integrated development environment and runtime.

The category's recurring weakness is lifecycle fragmentation: generation is fast, but users still need to decide whether the output is actually good, whether requirements survived iteration, whether responsive/accessibility states work, and what can safely be reused. Recent comparisons also repeatedly identify generic defaults, fake proof, iteration drift, credit anxiety, and production/deployment friction as pain points. citeturn0search0turn0search5turn0search10

## ByJTT product advantage to build around

Do not try to beat competitors by copying their feature lists. Beat them on the **quality loop**:

`Intent → Design → Direct → Explain → Test → Evidence → Publish → Remix → Learn`

A ByJTT resource should be more useful after generation than a screenshot because it retains its intent, decisions, contract, evidence and provenance.

## User journey standard

### First visit

A first-time visitor should understand in one screen:

1. what ByJTT Design is;
2. why generation alone is insufficient;
3. who it is for;
4. what happens after clicking Studio;
5. that plain English is enough.

### First Studio session

The user should never need to learn design-system vocabulary before producing a result. The assistant should establish:

- what is being made;
- who it is for;
- the primary action;
- important constraints;
- useful content/assets;
- what is still unknown.

The UI should expose these as friendly prompts rather than forms full of jargon.

### Iteration

Every accepted instruction should create a decision record. The user should be able to ask:

- What changed?
- Why did you change it?
- What requirement does this satisfy?
- What did this change affect?
- Did it make anything worse?

### Validation

Never present deterministic placeholder checks as proof. A check is verified only when the relevant assertion actually ran against the current artefact.

### Publication

Publishing is an explicit transition. The resource should carry the actual artefact and its evidence, not merely a marketing card.

### Return visit

A daily-use product needs persistence, recent projects, remix/fork, version history, saved references, and a predictable workspace. The current local persistence is the first foundation; authenticated cloud workspaces should build on the same contract rather than replace it.

## Current gaps

- Production AI provider adapter is not yet wired into Studio.
- Authentication/cloud workspaces are not yet implemented; current persistence is local-device only.
- Library starter resources are reference material and must not be labelled verified until the executable evidence pipeline has actually run.
- Live custom-domain verification remains an infrastructure gate while DNS/Vercel association propagates.
- Studio needs continued visual regression coverage at desktop, tablet and mobile sizes.
- Library needs filters, search, resource detail pages, versioning and remix provenance as its catalogue grows.

## 10/10 acceptance criteria

A user should be able to arrive with zero design skill and, without reading documentation:

1. understand the product;
2. start a project;
3. describe their goal in plain English;
4. receive a coherent first design direction;
5. see the live result immediately;
6. ask for changes naturally;
7. understand the decisions behind changes;
8. inspect evidence before publication;
9. publish or keep the work private;
10. return later and continue from the same project;
11. remix an existing resource without losing provenance;
12. export or hand off a portable, machine-readable design contract.

## Principle

**Do not optimise for the fastest first screenshot. Optimise for the shortest path from intent to a result the user can trust.**
