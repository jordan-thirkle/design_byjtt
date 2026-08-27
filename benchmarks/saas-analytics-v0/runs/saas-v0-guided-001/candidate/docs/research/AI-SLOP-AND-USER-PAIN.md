# AI Slop & User Pain — Research Foundation

Status: living research note. Refresh external evidence before publishing time-sensitive claims.

## Working definition

**AI slop in digital product design is superficially competent output produced without enough product understanding, design intent, differentiation, validation, or engineering discipline.**

It is not a single visual style. Purple gradients, cards, pills, glass, large type, or dark dashboards can all be valid. They become warning signals when used by statistical default rather than because they solve a product/design need.

## Repeated pain themes

### 1. Statistical-average design
AI frequently converges on familiar SaaS patterns: card walls, rounded rectangles, oversized hero copy, generic gradients/glows, repetitive section rhythm, default typography, predictable iconography, and low-risk visual hierarchy.

**Need:** deliberate product-specific identity and references grounded in context rather than “make it premium” prompting.

### 2. Polished output can solve the wrong problem
High-fidelity generation encourages teams to skip discovery, requirements, information architecture, and user-flow reasoning.

**Need:** product understanding and structured requirements must precede final visual generation.

### 3. Weak intent preservation
Users report AI changing unrelated layout, icons, spacing, content, or components while addressing a targeted request.

**Need:** intent locks, mutation scope, design diff, and bounded edits.

### 4. Cross-screen inconsistency
AI-generated products drift in typography, colors, spacing, components, interaction patterns, and content behavior.

**Need:** versioned design contracts with semantic rules and rationale, not just raw token values.

### 5. Prompt-engineering burden
Users often ask how to phrase prompts to obtain professional design. Quality should not depend on knowing magic adjectives.

**Need:** guided product/design discovery that translates human goals into structured constraints automatically.

### 6. Missing real-world states
Generated interfaces often under-handle empty/loading/error states, long content, missing media, localization, RTL, keyboard interaction, zoom, reduced motion, or large/partial datasets.

**Need:** a mandatory state/edge-case matrix and real-content stress tests.

### 7. Visual polish mistaken for UX quality
A screen can look premium while task structure, discoverability, hierarchy, navigation, or wording are poor.

**Need:** separate product, UX, visual, accessibility, content, and engineering evaluators.

### 8. Self-correction wastes time and credits
Repeated agent retries can consume significant tokens/credits merely correcting earlier AI mistakes.

**Need:** measure iteration efficiency and cost per accepted change, not generation count alone; use deterministic/smaller tools where sufficient.

### 9. Prototype-production confusion
AI makes demos look close to finished, which can create unrealistic expectations about engineering, states, security, accessibility, data, and production readiness.

**Need:** explicit maturity states: concept → exploration → validated design → implementation candidate → production candidate → verified production.

### 10. Design-to-code drift
Exports and generated implementation can lose component identity, auto-layout behavior, semantics, responsive logic, or visual fidelity.

**Need:** design-to-code component mapping and production screenshots as the source of truth.

### 11. Weak provenance and licensing awareness
AI workflows may introduce third-party components, packages, images, fonts, or strong reference similarity without making rights or lineage clear.

**Need:** provenance graph with source, license, attribution, dependency, AI involvement, and transformation history where available.

### 12. Existing design systems are under-specified for agents
Traditional design systems often encode tokens/components but omit why, when, exceptions, anti-patterns, content rules, and interaction semantics.

**Need:** agent-readable Design Contracts with rationale.

### 13. One-generator monoculture
One model's defaults become the product's style and failure modes.

**Need:** provider-independent architecture and, when valuable, multi-generator candidate tournaments.

### 14. AI critique is not user research
A group of agents can reinforce one another's assumptions without proving users can complete tasks.

**Need:** real usability/user validation for material decisions, with evidence fed back into requirements.

## Anti-slop taxonomy

Use these as investigation categories, not hard bans.

### Visual-default signals
- unnecessary cardization;
- uniform large radii;
- decorative gradient/glow dependency;
- excessive pills/badges;
- arbitrary glass effects;
- weak typography differentiation;
- generic icon + label patterns;
- equal-weight sections;
- low information density presented as premium minimalism.

### Content-default signals
- generic benefit claims;
- invented/fake metrics;
- labels that describe UI rather than user intent;
- filler testimonials/social proof;
- repetitive AI-marketing phrasing.

### UX-default signals
- dashboard-first structure without task evidence;
- excessive modal/dialog usage;
- hidden actions for aesthetic cleanliness;
- overuse of tabs/accordions where comparison matters;
- unnecessary onboarding steps;
- interaction patterns copied from unrelated products.

### Engineering-default signals
- duplicate components;
- one-off design values;
- inaccessible primitives;
- fragile responsive CSS;
- missing states;
- generated dependency sprawl;
- rewriting working systems instead of reusing them.

## Proposed ByJTT metrics

These are hypotheses to validate through benchmarks.

### Intent Density
Percentage of material design decisions traceable to an explicit user need, product requirement, platform convention, accessibility requirement, brand rule, or deliberate aesthetic choice.

### Slop Probability
Composite likelihood that an interface relies heavily on common model-default patterns without sufficient rationale. Must expose contributing signals rather than producing an unexplained score.

### Mutation Fidelity
Ratio of requested/allowed changes to actual changes. Unexpected mutations reduce the score.

### State Completeness
Coverage of applicable real-world interaction/content/system states.

### Design-System Saturation
Percentage of production UI conforming to approved tokens, primitives, components, and interaction patterns.

### Cost per Accepted Change
Total generation/iteration cost divided by accepted material design changes.

### Design Debt
Quantified drift from the approved system: one-off tokens, duplicate components, inconsistent interactions, unresolved accessibility exceptions, obsolete patterns, and off-system screens.

## Research discipline

When this note is extended:

1. Record the date observed.
2. Link to primary/vendor sources for product capability claims.
3. Use Reddit/community sources for user experiences and pain signals.
4. Do not generalize one complaint into a market fact without corroboration.
5. Separate observed evidence from ByJTT inference and proposed response.
6. Prefer reproducible benchmark evidence over marketing claims when available.
