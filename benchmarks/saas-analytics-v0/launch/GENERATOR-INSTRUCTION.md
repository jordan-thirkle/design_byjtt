# SaaS Analytics v0 — Neutral Generator Instruction

Supply the following instruction verbatim to each fresh candidate-generation context after attaching only that candidate's exported benchmark bundle:

> Build the runnable web product defined by the supplied benchmark bundle. Treat `brief.json` as the canonical requirements source, `fixtures/analytics.json` as the canonical deterministic data, `SHARED-CONTROLS.md` as binding execution controls, and every other file supplied in this bundle as binding context. Do not ask follow-up design questions. Produce a real runnable implementation, expose every required state URL, stay within the material-attempt and active-time limits, do not use paid external services or generators, and record any unmet requirement rather than hiding it.

Do not prepend, append, paraphrase, explain, or customize this instruction for either candidate arm.
