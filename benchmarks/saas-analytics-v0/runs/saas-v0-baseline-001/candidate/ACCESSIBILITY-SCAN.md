# Accessibility Scan

Automated scan status: not run with a browser-based accessibility engine because the bundle has no installed dependencies and network/package installation was not used.

Implemented checks and mitigations:

- Core controls are native links and buttons.
- Required state navigation is keyboard-operable and exposes `aria-current`.
- Focus is visibly styled with `:focus-visible`.
- Trend SVG has `role="img"`, `title`, `desc` and a textual `figcaption`.
- Trend and status information is repeated in text, not conveyed by color alone.
- Loading status uses `role="status"` and `aria-live="polite"`.
- Reduced-motion preference disables ongoing animations.
- Layout uses responsive grids and avoids required horizontal scrolling at the supplied viewport widths.

Known unmet requirement:

- A full automated WCAG scan output from axe, Lighthouse or equivalent is not recorded because no such tool was available locally without adding packages.
