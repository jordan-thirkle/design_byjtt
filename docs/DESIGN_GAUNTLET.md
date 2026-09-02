# ByJTT Design Gauntlet

The gauntlet is the release check for the public Design platform. It is deliberately layered: machine checks prove structural contracts; browser checks prove rendered behaviour; human review judges taste, clarity and usefulness.

## Personas

- **New human designer:** has basic design knowledge but no ByJTT context.
- **Directed AI agent:** arrives with a task and only the public ByJTT resources to understand the system.

## Release categories

Every tracked category must reach at least **9/10** before a simplification release is considered complete:

- clarity
- information architecture
- accessibility
- shell consistency
- agent discoverability
- copy quality
- responsive behaviour
- visual/design quality

## Human loop

1. Land on the homepage without prior context.
2. Explain what ByJTT is in one sentence.
3. Identify the next action without reading the whole site.
4. Open Studio and make a plain-language change.
5. Find the Standard when guidance is needed.
6. Find reusable work in Library.
7. Discover deeper resources only when relevant.
8. Repeat at desktop and mobile widths.

## Agent loop

1. Discover `/agent.json` or `/llms.txt`.
2. Resolve `/standard.json` as the machine-readable Standard.
3. Follow the recommended workflow.
4. Use Contracts when important decisions must persist.
5. Use Studio/Library/Evidence only when the task needs them.
6. Never claim verification without evidence.

## Regression rules

- A screenshot is not proof of accessibility.
- A passing automated score is not proof of overall usability.
- Do not add navigation items to solve a discoverability problem before testing progressive disclosure.
- Do not expose internal implementation terminology to normal public users unless it is the subject of the page.
- Prefer established standards and mature open-source solutions before inventing new primitives.
- No framework migration is justified by fashion; require evidence of a concrete product limitation.
