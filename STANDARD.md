# ByJTT Design Standard v0.1

**Status:** Public working standard  
**Scope:** Digital product design, build and validation  
**Effective:** August 2026 onward  
**Audience:** People, designers, developers and AI agents

This is the canonical public entry point for the ByJTT Design Standard. It turns the existing ByJTT product thesis, Design Contract, pain research, evidence model and production-quality work into one durable standard. Supporting implementation schemas, benchmarks and research remain authoritative in their own repositories/paths and are linked from this document rather than copied here.

## 1. Purpose

ByJTT Design exists to prevent the common failure mode in AI-assisted product work where an interface looks convincing but has weak product understanding, inconsistent intent, missing real-world states, poor accessibility, fragile implementation, unclear provenance or no evidence that it deserves to ship.

The standard therefore treats design as a continuous system:

**Understand → Research → Specify → Architect → Design → Compare → Validate → Build → Test → Ship → Monitor → Learn**

Generation is one tool inside that system, not the definition of quality.

## 2. Core principles

### Human purpose before interface polish
Start with users, jobs, goals, constraints, risks and measurable outcomes. Do not allow a visual direction to become the product definition by default.

### Evidence before aesthetics
Material decisions should be traceable to user evidence, product requirements, platform conventions, accessibility requirements, brand rules, validated system reuse, or an explicitly recorded aesthetic intent.

### Intent over imitation
References may inform structure, semantics, interaction and visual principles. Do not clone a reference product or treat visual similarity as evidence of quality.

### Real conditions are the design
Design for realistic content, long labels, missing media, empty/loading/error states, partial data, localization, zoom, keyboard use, touch, reduced motion, network degradation and other applicable states before declaring a design solved.

### Accessible by construction
Accessibility is part of information architecture, component behavior, content and interaction design. A late audit cannot repair missing semantics or poor task design on its own.

### Best solved system first
Before creating a custom component, workflow or implementation, inspect existing project capability, approved systems, mature libraries/registries and relevant standards. Custom work needs a reason.

### Production is the source of truth
A screenshot, prototype or agent critique is not final proof. Validate the implementation in real browsers with real content, states, accessibility checks and relevant performance evidence.

### Human agency with bounded autonomy
AI and agents may assist or act, but important autonomous actions must expose scope, rationale, evidence, uncertainty and the ability to inspect or override where appropriate.

### Provider independence
The standard must remain usable across models, agents, design tools, code generators, runtimes and vendors. Vendor-specific adapters belong at the edge.

### Provenance by default
Record useful source, version, license, attribution, AI involvement, transformation lineage, dependency lineage and similarity/copying risk for reusable or externally influenced work.

## 3. Inclusive and accessible design baseline

Design for the broadest realistic range of people and input conditions without treating accessibility as a separate audience.

Every applicable feature should consider:

- semantic HTML and programmatic relationships;
- keyboard-only operation and visible focus;
- screen readers and other assistive technologies;
- sufficient text/UI contrast and non-colour-dependent meaning;
- text zoom and reflow, including high zoom scenarios;
- touch and pointer input, including target size and cancellation behavior where relevant;
- reduced motion and non-motion alternatives;
- readable language, predictable navigation and cognitive load;
- personalization and adaptation where useful;
- localization, writing expansion and RTL where applicable;
- error prevention, recovery and understandable status communication.

The default implementation target is the applicable WCAG 2.2 level agreed by the product, with additional inclusive-design requirements where the product context needs more than conformance alone.

## 4. Human + AI + agent interaction model

ByJTT uses explicit states for machine assistance so users can understand what happened and who/what caused it.

### Decision states

A system should distinguish, where applicable:

1. **Suggested** — an option proposed for human consideration.
2. **Generated** — machine-created content or implementation.
3. **Inspected** — reviewed against a defined inspection or evidence method.
4. **Verified** — passed the required evidence gate for the stated claim.
5. **Executed** — an action was actually performed.
6. **Human-approved** — a person explicitly accepted a material decision/action.

Never collapse these into a generic “AI complete” state.

### Agent action boundaries

Agents should communicate:

- intended action;
- affected scope;
- relevant permissions;
- whether the action is reversible;
- meaningful uncertainty;
- evidence or rationale available before execution;
- resulting changes and validation afterward.

High-impact, irreversible or externally consequential actions should require a stronger confirmation boundary appropriate to the risk. When a workflow can safely remain reversible, prefer reversibility.

### Mutation control

A targeted AI request should preserve dimensions explicitly locked by the user or product. The system should be able to compare requested/allowed mutation against actual mutation and surface unrelated changes.

### Transparency

Do not use an opaque “AI says so” pattern for material product decisions. Explain what changed, why it changed, what evidence exists, and what remains uncertain.

## 5. Multimodal and adaptive interaction

Interfaces should not assume one input modality or one device shape. Where applicable, support consistent semantics across keyboard, pointer, touch, voice, assistive input and agent-mediated interaction.

Design should adapt to viewport, orientation, content density, user preferences and capability without silently removing essential meaning or control.

Do not make interaction depend on hover, animation, colour perception, precise pointer gestures, or a single device class when an equivalent accessible path can exist.

## 6. Visual foundations

Visual values should be semantic and reusable. Prefer a token model compatible with established design-token interoperability standards rather than inventing incompatible primitives.

Define and version:

- semantic colour tokens;
- typography roles and scale;
- spacing and layout primitives;
- radius and elevation rules;
- iconography;
- motion tokens and reduced-motion alternatives;
- responsive container and breakpoint behavior;
- focus and interaction states;
- data-visualisation conventions where applicable.

Use the native web platform where it provides a more robust semantic foundation. Prefer standards-based HTML/CSS behavior and established accessible primitives before custom interaction infrastructure.

## 7. Content and editorial integrity

Public copy is part of the design system. It must be specific, evidence-aligned, readable without decorative context, and written for actual users rather than to signal generic sophistication.

### Avoid synthetic polish
Do not generate generic startup/AI language, empty superlatives, repeated rhetorical structures, unnecessary jargon, fake certainty, interchangeable positioning, or decorative punctuation whose purpose is merely to make copy look polished.

### Preserve human variation
Do not force every section to have identical sentence lengths, three-card structures, parallel headings or symmetrical prose. Variety is acceptable when it reflects the content. Structure should serve comprehension, not the appearance of systemisation.

### Never invent evidence
Do not create testimonials, metrics, customer claims, adoption figures, implementation status, validation results, source authority or quality claims that the evidence cannot support. AI generation is not verification.

### Keep AI and agent provenance legible
Where machine-generated or agent-produced public copy materially matters, record that involvement in the appropriate provenance/evidence system. Do not imply that a human researched, tested or approved something when that did not happen.

### Lintable vs editorial rules
Deterministic lint may block known prohibited phrases and other high-confidence regressions. Style heuristics such as repeated em dashes or generic phrasing should normally warn rather than fail automatically. Human/editorial review remains responsible for judging tone, clarity, specificity, evidence and whether copy sounds synthetic in context.

### Copy review questions
Before publishing, ask:

1. Does the reader know what this is and why it matters?
2. Does the wording name the actual thing instead of gesturing at a category?
3. Is every claim supported by the evidence available?
4. Is AI mentioned because it materially matters, not because it is fashionable?
5. Does the prose remain clear without the surrounding visual layout?
6. Is any punctuation or structure doing real work?
7. Could the sentence be pasted onto many unrelated AI/startup sites unchanged? If yes, rewrite it.
8. Does the copy accurately represent who acted, what happened, what was checked and what remains uncertain?

## 8. Canonical public site shell

The public ByJTT Design site uses one canonical global shell across documentation, research, library, contracts, agent guidance and other public information surfaces.

### Global navigation

Navigation destinations, labels and ordering are canonical data. Public routes must not invent page-local variants of the global navigation.

The canonical public shell provides, as applicable:

- ByJTT Design home;
- Standard;
- Research;
- Contracts;
- Agents;
- Library;
- Open Studio as the primary product action.

Product or workspace surfaces may add a local navigation layer when the task requires it, but they must preserve the global brand, escape path and accessible semantics.

### Current location

The active destination must be programmatically represented using appropriate semantic state such as `aria-current="page"`, remain understandable without colour alone, and continue to work at keyboard focus, zoom and narrow viewports.

### Mobile navigation

Mobile and desktop navigation express the same intended information architecture. A responsive implementation may change presentation, but not silently remove core destinations without an explicit product reason.

### Accessibility and landmarks

The global shell includes an accessible skip path to main content, a named navigation landmark, a single primary page main landmark, visible keyboard focus and predictable focus behavior for responsive/navigation interactions.

### Footer

The footer is functional information architecture, not decorative repetition. Its primary groups, legal/brand links and key cross-product links are canonical data and should remain consistent across public routes.

### Exceptions

A route may use a distinct shell only when it represents a substantively different product context, such as the Studio workspace. Such exceptions must be explicit in implementation and documentation rather than arising from copied page templates.

## 9. AI/agent safety and trust

AI-generated content and actions need provenance and boundaries appropriate to the risk.

Where an interface enables agents to operate on behalf of a person or system, provide meaningful signals for:

- identity/role of the acting agent where relevant;
- current permission scope;
- human approval requirements;
- action status;
- failure/retry behavior;
- auditability;
- undo/reversal where possible;
- external side effects;
- uncertainty or incomplete evidence.

Do not imply that verification occurred when a result was merely generated or reviewed heuristically.

## 10. Performance and progressive enhancement

Prefer resilient foundations that work before optional enhancement. Do not make critical user tasks depend on non-essential client code, decorative effects or network calls when a robust fallback is possible.

Measure actual performance and interaction quality in the target environment. Avoid optimizing solely for synthetic appearance or a framework's default score.

## 11. Research and evaluation

ByJTT distinguishes evidence classes:

- **Observed:** directly measured, tested or sourced.
- **Inferred:** a reasoned conclusion from observations.
- **Hypothesis:** a proposed explanation or design response that still needs validation.

Quality evaluation should separate product fit, UX, visual quality, accessibility, responsive behavior, content resilience, engineering, performance, provenance and other relevant dimensions rather than hiding them in an unexplained aggregate score.

Agent critique is pre-validation, not user research. Material product decisions should progress to real usability or user validation where appropriate.

## 12. Anti-patterns

The standard flags, rather than universally bans:

- default card walls without semantic need;
- generic gradients/glows used as identity substitutes;
- excessive pills/badges;
- arbitrary glass effects;
- oversized low-information hero sections;
- equal-weight section repetition that hides hierarchy;
- decorative icons when text is clearer;
- dashboard structures without a user/task reason;
- excessive modal/onboarding steps;
- hidden actions for visual cleanliness;
- inaccessible custom primitives;
- one-off values outside the system;
- dependency sprawl caused by generated code;
- fabricated evidence, metrics or testimonials;
- AI-generated changes that exceed requested scope;
- prototype states presented as production readiness.

A warning becomes a defect when it harms product intent, user needs, accessibility, trust, maintainability, performance or deliberate brand intent.

## 13. Design-to-code continuity

A design concept should map to a durable implementation concept where practical. Preserve semantic identity across design, contracts, tokens, components and production code.

Avoid dead-end outputs that exist only as screenshots. Important decisions should have a durable representation in a Design Contract, structured data, documented component, token, code or compatible export.

## 14. Machine-readable representation

The public standard must be consumable by agents without requiring visual interpretation of the website.

Machine-readable surfaces should expose:

- standard version;
- principles;
- design requirements;
- component/pattern contracts;
- accessibility expectations;
- AI/agent interaction rules;
- evidence definitions;
- prohibited/undesired patterns;
- provenance expectations;
- links to current research and supporting specifications.

The machine-readable representation is an interface to the human-readable standard, not a second competing source of truth.

## 15. By JTT production relationship

`design.byjtt.com` is the public design standard, intelligence and Studio product. `byjtt.com` is its flagship production implementation.

Material changes to the By JTT production design should consume the standard and record meaningful exceptions. Production experience may create evidence for improving the standard, but the standard is changed deliberately through its own versioned workflow.

The broader By JTT ecosystem may reuse the standard without requiring identical frontend stacks.

## 16. Governance

The standard is versioned. Breaking semantic changes require a new major version. Additive and clarifying changes may use minor/patch increments according to impact.

Every material standard change should record:

- what changed;
- why;
- evidence class;
- affected users/products;
- migration implications;
- unresolved uncertainty;
- implementation examples where useful.

The standard should evolve through research, benchmarks, real-world production evidence and community feedback rather than aesthetic churn.

## 17. Validation gate

A design should not be described as production-ready until applicable evidence exists across:

- product requirements;
- UX/task flow;
- visual hierarchy;
- accessibility/inclusion;
- responsive/adaptive behavior;
- content resilience;
- real interaction states;
- engineering/build/runtime health;
- performance;
- provenance/licensing;
- design-system conformance;
- relevant user validation.

The exact checks depend on the product, but claims must always match the evidence actually collected.

## 18. What this standard does not claim

ByJTT Design v0.1 is a working public standard, not a claim that every product built with it will automatically be excellent. It provides a stronger decision, design, implementation and validation framework. Outcomes still depend on product understanding, evidence quality, implementation quality, testing and real users.
