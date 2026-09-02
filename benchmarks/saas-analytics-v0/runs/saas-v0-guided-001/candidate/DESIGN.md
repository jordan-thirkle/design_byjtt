# ByJTT Design — Design Contract

Status: **foundation / provisional**. This governs design intent for ByJTT Design itself until validated through real product and brand work. It should evolve through evidence, not arbitrary visual churn.

## Product character

ByJTT Design should feel:

- rigorous rather than decorative;
- contemporary rather than trend-chasing;
- calm rather than sterile;
- confident rather than loud;
- technical without looking like a generic developer dashboard;
- editorial and research-led where evidence is being communicated;
- precise and inspectable where tooling or evaluation is being shown.

## Experience principles

### Show the reasoning
The interface should make evidence, rationale, score composition, provenance, uncertainty, and comparison legible. Avoid black-box “AI says this is better” experiences.

### Protect information hierarchy
Use containers only when they create a real semantic or interaction boundary. Do not default to card grids as the primary layout grammar.

### Dense where useful, spacious where meaningful
Research, benchmark, registry, and audit surfaces may be information-dense. Marketing/editorial surfaces should use space to improve comprehension, not to imitate a fashionable landing-page template.

### Real content first
Design with long labels, messy evidence, multiple score dimensions, citations, tables, filters, warnings, and incomplete states. Demo-perfect content is not representative.

### Accessible by construction
Keyboard interaction, focus visibility, semantic structure, contrast, zoom, reduced motion, and assistive-technology compatibility are design requirements, not polish tasks.

### Motion communicates state
Animation should clarify cause, hierarchy, continuity, or feedback. Decorative motion without a product role should be rare.

## Anti-slop guardrails

These are not blanket bans; they are prompts for explicit justification.

Question or reject:

- repeated cardization where simple grouping would work;
- oversized hero typography with low information value;
- generic gradient/glow decoration used as a substitute for identity;
- excessive pills/badges without semantic meaning;
- arbitrary glassmorphism;
- repeated equal-weight sections that flatten hierarchy;
- meaningless statistics or placeholder dashboard metrics;
- decorative icons where labels are clearer;
- default “AI SaaS” dark dashboards without product rationale;
- uniform rounded rectangles applied to every surface;
- one-off visual values outside the design system;
- generated copy that sounds generic or self-congratulatory.

The key test is **intent**: important visual decisions should be explainable by product need, user need, brand intent, platform convention, accessibility, or a deliberate aesthetic decision.

## Design-system requirements

When implementation begins, define and version:

- semantic color tokens rather than raw color names;
- typography roles and scale;
- spacing scale and layout primitives;
- radius/elevation rules;
- iconography rules;
- motion tokens;
- responsive breakpoints and container behavior;
- focus/interaction states;
- data-visualization conventions;
- content and localization behavior.

Avoid hard-coded values in application code when a semantic token should exist.

## Component behavior

Every reusable component should document:

- purpose;
- when to use it;
- when not to use it;
- variants;
- interactive states;
- accessibility behavior;
- responsive behavior;
- content constraints;
- implementation mapping;
- relevant provenance/dependency information.

## Required product states

Relevant interfaces should be considered across:

- default;
- hover/focus/active;
- disabled;
- loading;
- empty;
- partial data;
- success;
- recoverable error;
- fatal error;
- offline/degraded states where applicable;
- long/short content;
- localized and RTL layouts where applicable;
- 200% zoom;
- reduced motion;
- keyboard-only interaction.

## Initial visual direction

Do not lock a detailed palette or typography system before comparative visual exploration. The first implementation phase should create multiple evidence-backed directions and evaluate them against this contract.

Any future token values added here should include rationale and be validated in the actual site/application rather than copied from a reference product.
