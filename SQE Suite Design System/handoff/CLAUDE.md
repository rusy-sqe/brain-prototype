# SQE Suite Design System — project rules

Building a feature for the SQE Suite (Polaris, Cosmos, Horizon, Brain, CognifAI, Atlas). Use the system; don't invent patterns.

## First moves

1. `<link rel="stylesheet" href="tokens.css">` — the **only** stylesheet. It carries tokens, component classes and Font Awesome. Never hardcode a color, font, space, radius or shadow: use `--hz-*`.
2. Read `design-system/ui-kit.html` before building any component — the pattern almost always exists; copy its markup.
3. `design-system/foundations.html` has every non-color, non-type token on one page.

## Ask before you build

- **Surface** — marketing page, app screen, email? (type scale & density)
- **Density** — comfortable / default / compact. Default unless told.
- **Tenant** — co-branded? Use the lockup from `design-system/preview/brand.html`.
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
| `design-system/tokens.css` | Single source of truth — tokens + `hz-` component classes + FA |
| `design-system/ui-kit.html` | Every component on one page, live theme picker |
| `design-system/foundations.html` | Spacing, sizes, radius, elevation, borders, z-index, breakpoints, layout |
| `design-system/preview/colors.html` · `type.html` · `brand.html` | Color, type, brand cards |
| `design-system/components/` | React components (`Icon`, 18 charts, `MineMap`) on `window.SQESuiteDesignSystem_2c1e79` |
| `.oxlintrc.json` | Adherence lint — run `npx oxlint` before every commit |

## Redesign passes — do them in this order, one screen at a time

1. **Audit, don't edit.** List every hardcoded color, font size, radius, shadow and px value on the screen, with the nearest `--hz-*` token for each. Show that map and stop for review.
2. **Foundations pass.** Swap colors, type and spacing to tokens. No markup changes.
3. **Component pass.** Replace bespoke buttons / inputs / cards / tables with `.hz-*` markup copied from `design-system/ui-kit.html`. One component type per commit. If the kit has no equivalent, build it from tokens and flag it in the PR.
4. **Layout pass.** 12 columns / 24px gutter, sidebar 268px (68 collapsed), topbar 56px, content capped at `--hz-container-xl`.

Never change behaviour, state or routing while restyling. Never add a hex value, a font family or a new accent color. Delete the app's old color/spacing constant files as you go — `design-system/tokens.css` must be the only source of values. Stop and ask when a screen needs a pattern the kit doesn't have.
