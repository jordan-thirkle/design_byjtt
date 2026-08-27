# ByJTT public v0 — fidelity ledger

Reference concept: [`byjtt-public-v0-concept.png`](./byjtt-public-v0-concept.png)  
Implementation: [`../../site/index.html`](../../site/index.html)

## Design system extracted from the concept

- **Canvas:** true white page with a quiet blue-gray continuation band; no decorative gradient or image overlay.
- **Accent:** restrained cobalt for the primary action, focus ring, rules and process icons.
- **Type:** system sans-serif with a heavy, tightly tracked display heading and calm readable body copy.
- **Containers:** one purposeful outlined brief panel; open editorial sections rather than a card wall.
- **Interaction:** native textareas, one clear Continue action, a copyable result and a plain-language check flow.
- **Responsive behavior:** two-column hero on wide screens; stacked, full-width form and vertical process on small screens.

## Comparison points

| Point | Concept evidence | Render evidence | Result |
| --- | --- | --- | --- |
| First-viewport hierarchy | Large left headline, short supporting copy, right-side brief panel | Desktop and mobile screenshots captured from the running site | Matched; the first action remains the visual anchor. |
| Copy and navigation | “Build something worth using.”, three plain questions, simple nav | `site/index.html` and desktop screenshot | Matched; no benchmark language is exposed. |
| Palette and treatment | White canvas, near-black ink, cobalt action, no gradients | `site/styles.css` and screenshots | Matched; no glow, glass or tinted image treatment added. |
| Process motif | Three icon circles connected by arrows | `.process-intro` and mobile screenshot | Matched; arrows collapse into a readable vertical sequence on mobile. |
| Form geometry | Thin cobalt border, generous spacing, dark full-width Continue | `.brief-panel` and desktop screenshot | Matched; the form remains usable at 390px. |
| Lower-page rhythm | Open three-step explanation followed by a quiet explanatory band | `#how-it-works`, `#research`, `#check`, `#for-teams` | Extended intentionally: the added sections make the public product useful beyond the concept’s first viewport. |

## Verification record

- Browser/IAB controls were not available as callable tools in this workspace, so Playwright Chromium was used as the fallback against `http://127.0.0.1:4176/`.
- Desktop (1440×1000) and mobile (390×844) screenshots were captured and inspected with `view_image`.
- The brief flow was exercised with three answers, result reveal, copy action, navigation to the check section and quick-check submission.
- Axe checks passed with zero violations on initial, brief-result and check-result states at 390px; initial state also passed at 1440px.
- The above-the-fold copy diff contains only the concept/user-provided copy and the necessary form helper text; no technical benchmark terms are shown.
- No material visual mismatches remain for this v0 slice. The lower-page explanatory sections are an intentional functional extension, not a benchmark surface.
