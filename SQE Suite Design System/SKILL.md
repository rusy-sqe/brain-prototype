# SQE Suite Design System — Skill

Building a feature for the SQE Suite (Polaris, Cosmos, Horizon, Brain, CognifAI, Atlas). Use the system; don't invent patterns.

## First moves

1. `<link rel="stylesheet" href="tokens.css">` — the **only** stylesheet. It carries tokens, component classes and Font Awesome. Never hardcode a color, font, space, radius or shadow: use `--hz-*`.
2. Read `ui-kit.html` before building any component — the pattern almost always exists; copy its markup.
3. Read `dashboard.html` for a full product screen (shell, topbar, KPIs, chart, table).
4. Read `README.md` only when you need voice/content rules or the React component list.

## Ask before you build

- **Surface** — marketing page, app screen, email? (type scale & density)
- **Density** — comfortable / default / compact. Default unless told.
- **Tenant** — co-branded? Use the lockup from `preview/brand.html`.
- **Variations** — how many, varying on what?

## Non-negotiables

- Inter for body/UI/headings, IBM Plex Sans (`--hz-font-display`) for display. No other families.
- One primary at a time: `class="theme-hz-{blue|azure|teal|green|yellow|orange|red|magenta|purple|neutral}"` on a container rebinds `--hz-horizon-primary-*`. Default blue; SQE Suite product UI uses `theme-hz-azure`. Never invent an accent.
- Tags / chips / badges are different things (filter / metadata / status).
- Borders before shadows. Shadows only on things that float.
- Body copy 14px (`--hz-text-body-r-size`); buttons 14/16px; never below 12px.
- 4px spacing grid — `--hz-space-N` is numerically Tailwind's `p-N`.
- Numbers: group thousands, include units, `--hz-font-mono` in tables. Dates `DD MMM YYYY`. No exclamation marks.
- Run `npx oxlint` before every commit. It fails on raw hex colors, raw `px` literals, non-system fonts and undeclared component props — fix the warning, don't suppress it.

## Files

| File | Purpose |
|---|---|
| `tokens.css` | Single source of truth — tokens + `hz-` component classes + FA |
| `ui-kit.html` | Every component on one page, live theme picker |
| `dashboard.html` | Full product screen reference |
| `foundations.html` | Spacing, sizes, radius, elevation, borders, z-index, breakpoints, layout |
| `preview/colors.html` · `type.html` · `brand.html` | Color, type, brand cards |
| `components/` | React components (`Icon`, 18 charts, `MineMap`) on `window.SQESuiteDesignSystem_2c1e79` — the charts and `MineMap` are intentional additions with no Figma-kit counterpart |
| `README.md` | Foundations detail, component API, Claude Code handoff |
