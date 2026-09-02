# By JTT Design

**A practical standard for modern digital products — research, design, build, validate.**

Live site: [design.byjtt.com](https://design.byjtt.com) — the Design door of the [By JTT](https://www.byjtt.com) ecosystem.

| Door | Live site | Repo |
|---|---|---|
| Studio | [www.byjtt.com](https://www.byjtt.com) | `byjtt.com` |
| Games | [games.byjtt.com](https://games.byjtt.com) | `byjtt-games` |
| Experiments | [experiments.byjtt.com](https://experiments.byjtt.com) | `byjtt-experiments` |
| Design (you are here) | [design.byjtt.com](https://design.byjtt.com) | `design_byjtt` |

## What lives here

- **The Standard** — a public, machine-readable design standard (`/standard/`, `standard.json`)
- **Design Contracts** — how to record the decisions a product must keep (`/contracts/`)
- **Research** — evidence and methodology (`/research/`)
- **Resource Library** — reusable design work with provenance (`/library/`)
- **Benchmarks** — controlled comparisons of design workflows (`/benchmarks/`)
- **Design Studio** — the browser product: describe → design → direct → validate → publish → remix (`/studio`, source in [`app/`](./app/))

The first Studio slice uses deterministic transformations so the product contract
can be tested before connecting a production model provider. The model adapter is
deliberately replaceable.

## Tech stack

- Static HTML + CSS shell (no build step required to serve the public site)
- Node 24 tooling: shell contract validators, foundation/production checks, contrast validation, copy lint
- [Playwright](https://playwright.dev/) — benchmark + browser tests
- [Vercel](https://vercel.com/) — hosting with Git auto-deploy from `main`

## Quickstart

Prerequisites: **Node 24** (see package engines) and npm.

```bash
git clone https://github.com/jordan-thirkle/design_byjtt.git
cd design_byjtt
npm ci
npm run site:serve      # serves the public site at http://localhost:4175
```

### Validation and tests

```bash
npm run build           # shell contract + foundation + shell output + production + contrast + copy checks
npm test                # full suite (adds benchmark validation + node tests)
npm run test:browser    # Playwright public-shell checks
npm run benchmark:test  # benchmark harness
```

`npm run apply:shell` regenerates the shared header/footer shell across public
pages from `site-shell.mjs` — edit the shell there, never hand-edit nav/footer in
the generated pages.

## Project structure

```
index.html        homepage (root serves the public site)
standard.html     the Standard
contracts/ agents/ library/ research/ benchmarks/ docs/   public sections
app/              Design Studio application
site-shell.mjs    canonical shell (header/footer) source of truth
harness/          validators: shell, foundation, contrast, copy, benchmarks
schemas/          JSON schemas (design context package, decision record)
examples/         starter resources
llms.txt          machine-readable summary for AI agents
```

## Editing content

- **Shell (nav/footer)**: `site-shell.mjs`, then `npm run apply:shell`
- **Page copy**: the page HTML files (canonical sections are validated by `copy:lint` / `copy:public`)
- **The Standard**: `STANDARD.md` (the lowercase `standard.md` is the public URL stub)
- **Tokens & colors**: `site.css`

## Agent & AI notes

- Machine-readable summary: [`/llms.txt`](https://design.byjtt.com/llms.txt)
- Repo conventions: [`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md)
- The full standard is readable at [`/standard.md`](https://design.byjtt.com/standard.md)

## Security

See [`SECURITY.md`](./SECURITY.md) — report privately to **security@byjtt.com**.

## License

[MIT](./LICENSE) © Jordan Thirkle
