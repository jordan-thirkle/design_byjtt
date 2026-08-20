# ByJTT Design — Competitive Capability Map

Status: living map. Competitor capabilities change quickly; verify against current primary documentation before making implementation decisions.

## Strategic rule

Do **not** copy every competitor feature. Classify each capability:

- **ADOPT** — a mature system already solves it well; use it.
- **INTEGRATE** — make the system available through ByJTT rather than rebuilding it.
- **MATCH** — table-stakes capability users reasonably expect.
- **BEAT** — strategically important area where ByJTT should be materially better.
- **IGNORE** — capability does not advance the product thesis.

## Competitive layers

| Product / ecosystem | Strongest layer | ByJTT response |
| --- | --- | --- |
| Figma / Figma Make | Professional design source of truth, canvas, design systems, AI generation | **INTEGRATE**; do not rebuild the canvas. **BEAT** on cross-tool evidence, evaluation, production validation. |
| Google Stitch | AI-native design canvas/agent, DESIGN.md direction, generation/prototyping | **ADOPT interoperability**, **MATCH** portable context, **BEAT** independent gauntlet and production evidence. |
| v0 | High-quality frontend/product generation and deployment | **INTEGRATE** as execution backend; avoid competing on generic React generation. |
| Lovable | End-to-end app generation, design guidance, design-system linking | **MATCH** structured guidance/versioning; **BEAT** evidence, mutation control, evaluation, tool independence. |
| Superdesign | IDE-native design exploration and parallel variants | **INTEGRATE/learn** from exploration model; **BEAT** on research + quality + production loop. |
| 21st.dev | Agent-readable component supply/community | **INTEGRATE/index**; **BEAT** selection, metadata, quality ranking, provenance, system fit. |
| shadcn/ui Registry | Open component/code distribution protocol | **ADOPT** where appropriate; do not invent an incompatible registry without need. |
| Relume | Structured website brief → sitemap → wireframe → design workflow | **ADOPT principle** of progressive fidelity; generalize beyond marketing sites. |
| Uizard | Accessible prompt/screenshot/sketch design workflow, visual prediction tooling | **MATCH** approachable workflows; explore attention analysis in Gauntlet. |
| Framer | Visual site design + publishing + AI editing | **INTEGRATE/IGNORE** depending use case; no need for a competing website editor. |
| Builder.io / Visual Copilot | Design-to-code component mapping | **ADOPT principle**; **BEAT** with broader semantic Design ↔ Code graph and validation. |
| Pencil / pen.dev style tools | Codebase-adjacent design canvas and MCP | **INTEGRATE** if strongest canvas; keep ByJTT contract/evaluation portable. |
| Design-system extraction tools | URL/code → tokens / DESIGN.md / prompts | **ADOPT/INTEGRATE** mature extraction; focus ByJTT on rationale, confidence, evaluation, and provenance. |

## Capability coverage target

### Research & discovery — BEAT
- current competitor intelligence;
- user pain mining;
- design/UX research retrieval;
- open-source/mature-solution discovery;
- evidence and confidence tracking;
- pattern knowledge graph.

### Product discovery & requirements — BEAT
- guided discovery rather than prompt craftsmanship;
- structured user jobs/goals/constraints;
- measurable success criteria;
- explicit assumptions and non-goals;
- information architecture before high fidelity.

### Design-system context — MATCH + BEAT
Match:
- tokens;
- components;
- typography/layout/motion;
- design-tool compatibility;
- portable AI context.

Beat:
- rationale;
- semantics;
- usage/anti-usage rules;
- content behavior;
- accessibility requirements;
- provenance;
- versioned decision history.

### Component ecosystem — INTEGRATE + BEAT
Integrate major registries/libraries.
Beat on:
- quality ranking;
- accessibility evidence;
- license/provenance;
- maintenance health;
- dependency cost;
- design-contract fit;
- “best available solved system” routing.

### Design generation — INTEGRATE
Do not make proprietary generation the moat. Support best-in-class providers and multi-generator candidate exploration.

### Visual editing / canvas — INTEGRATE or MATCH minimally
Use existing canvases where they win. ByJTT's durable assets should remain portable outside any one canvas.

### Mutation control — BEAT
- locked dimensions;
- explicit allowed scope;
- requested-vs-actual design diff;
- unexpected mutation detection;
- rollback/checkpoints.

### Design evaluation — BEAT
- requirement fit;
- UX;
- visual hierarchy;
- brand;
- anti-slop;
- accessibility;
- responsive;
- content/localization;
- design-system conformance;
- engineering/performance;
- originality;
- provenance;
- evidence-backed score breakdown.

### Design-to-code — MATCH + BEAT
Match component mapping and code export.
Beat with semantic Design ↔ Code graph, best-system discovery, bounded implementation, and production fidelity tests.

### Production QA — BEAT
- browser-rendered evidence;
- viewport matrix;
- real-content stress;
- state matrix;
- accessibility;
- performance;
- visual regression;
- design-contract regression;
- design debt and saturation tracking.

### Benchmarking — BEAT
Controlled, recurring, public comparisons using identical briefs and production-quality evaluation instead of vendor demos.

## Moat hypothesis

ByJTT should not try to own every execution layer. The moat is the connected system of:

> **Research → requirements → contracts → solved-system discovery → orchestration → independent evaluation → production validation → learning.**

Individual generators, canvases, and component ecosystems should be replaceable as the market changes.

## Competitive review cadence

Refresh this map when:
- a major competitor ships a materially new capability;
- a benchmark reveals a new leader or failure mode;
- ByJTT proposes custom work already solved elsewhere;
- a key interoperability standard emerges;
- a roadmap milestone begins that depends on current external capability.
