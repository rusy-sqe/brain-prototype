# SQE Suite Design System

The internal design system behind Sinarmas digital products (formerly "Horizon" — renamed, since Horizon is now a product inside the suite). Framework-free: one CSS file, one class prefix, plus React components for data-viz. File and class names keep the historical `horizon` / `hz-` prefix.

## Structure

| Path | Purpose |
|---|---|
| `tokens.css` | **The whole system.** Color ramps, primary aliases, type, spacing, radius, shadow, sizes, z-index, breakpoints + every `.hz-*` component class. `@import`s Font Awesome, `@font-face`s the self-hosted fonts. Link this and nothing else. |
| `vendor/fonts/` | Inter + IBM Plex Sans variable fonts |
| `vendor/fontawesome/` | Font Awesome Pro 5.15.4, loaded via `tokens.css` |
| `assets/` | Suite logos & marks (`assets/suite/`), product icons, illustrations |
| `components/` | React components — `Icon`, 18 charts, `MineMap` |
| `ui-kit.html` | Every component, live theme picker |
| `dashboard.html` | Treasury dashboard — the system end to end |
| `foundations.html` | All non-color, non-type tokens on one page |
| `preview/colors.html` · `type.html` · `brand.html` | Color, type, brand foundations |

## Usage

```html
<link rel="stylesheet" href="tokens.css">

<body class="theme-hz-azure">
  <button class="hz-btn hz-btn--primary">Continue</button>
  <span class="hz-chip hz-chip--success">Approved</span>
  <i class="far fa-wallet" style="font-size:20px"></i>
</body>
```

## Foundations

**Color** — 10 ramps (blue, azure, teal, green, yellow, orange, red, magenta, purple, neutral), 11 stops each 50→950; neutral is 14 stops (0→1000). One primary at a time: `theme-hz-{name}` binds `--hz-horizon-primary-{pale|soft|light|·|medium|dark}`. Default blue; SQE Suite product UI is azure. Surface/text/border roles (`--hz-surface-*`, `--hz-text-*`, `--hz-border-*`) auto-invert under `prefers-color-scheme: dark`.

**Type** — Inter (400/600/700) for everything, IBM Plex Sans (`--hz-font-display`) for display. Body `body-s` 12/16 · `body-r` 14/20 · `body-l` 16/24 · `body-xl` 18/26. Headings `h1` 36/44 → `h6` 18/22, all 700, negative tracking. Classes: `.hz-h1`–`.hz-h6`, `.hz-body-s`–`.hz-body-xl`.

**Sizing** — control heights 32 / 40 / 48. Radius 4 · 6 · **8 (default)** · 12 · full. Spacing on a 4px grid, numerically 1:1 with Tailwind.

## CSS components

`btn` (primary/secondary/text/danger · sm/md/lg/full) · `chip` (active/clickable/disabled/status/avatar/close) · `card` (header/body/footer) · `field` (rest/filled/error/disabled) · `check` · `radio` · `switch` · `tabs` · `table` · `alert` (info/success/warn/danger) · `avatar` (sm/md/lg) · `badge` (dot/outline/soft/status) · `progress` · `sidebar` (+collapsed) · `topbar` · `divider` · `kbd` · `toast` (default/success/error) · `tooltip` (top/bottom/left/right, dismissible) · `pagination` (numbers/ellipsis/prev-next/disabled) · `stepper` (horizontal/vertical/card · number/icon/complete states) · `datepicker` + `timepicker` (desktop) · `datepicker-mobile` (wheel) · utilities (`hz-stack`, `hz-row`, `hz-gap-N`, `hz-muted`).

## React components

On `window.SQESuiteDesignSystem_2c1e79` (load `_ds_bundle.js`):

`Icon` (FA Pro 5 wrapper — `name`, `variant: solid|regular|light|brands|duotone`, `size`, `fw`, `spin`, `color`) · `AreaChart` · `LineChart` · `BarChart` · `ComboChart` · `DonutChart` · `ScatterChart` · `RangeBarChart` · `SankeyChart` · `FunnelChart` · `Heatmap` · `RadarChart` · `GaugeChart` · `TreemapChart` · `WaterfallChart` · `SparkChart` · `BarList` · `CategoryBar` · `Tracker` · `MineMap` (Leaflet + ESRI basemaps).

**These 19 are intentional additions, not kit components.** The Figma kit covers atoms and form controls only — it has no data-viz or mapping family — so every chart plus `MineMap` is designed here from `--hz-*` tokens and has no kit counterpart to be named after. `Icon` is the one exception: it wraps the kit's `src/assets/icons/*` set onto Font Awesome Pro 5. Do not rename these to kit vocabulary; there is none.

All charts share one contract: `data` rows + `index` + `categories`, a `valueFormatter`, and ramp names (`blue`, `azure`, `purple`, `teal`, `green`, `orange`, `magenta`, `yellow`, `red`, `neutral`) for `colors`. No external chart library; axis, grid and tooltip styling read `--hz-*` directly. Each component folder holds its `.jsx`, a `.d.ts`, and a card page showing every variant.

## Handoff to Claude Code — redesigning an existing web app

### 1. What to copy into the repo

Claude Code cannot reach this project — it only sees the repo it runs in. So the handoff is a physical copy; nothing here is fetched at runtime.

```
<repo>/
  design-system/
    tokens.css          # the entire system
    vendor/             # Inter, IBM Plex Sans, Font Awesome Pro (self-hosted)
    ui-kit.html         # every component, opened in a browser as the visual reference
    foundations.html    # spacing / size / radius / z-index / breakpoint reference
    assets/suite/       # only if the app shows suite logos
  .oxlintrc.json        # this DS's _adherence.oxlintrc.json, renamed — the enforcement
  CLAUDE.md             # this DS's SKILL.md, renamed — the instructions
```

`SKILL.md` is written to be the agent's standing instruction file — rename it to `CLAUDE.md` (or `AGENTS.md`) at the repo root and fix its file paths to `design-system/…`. This README is the human reference and does not need to ship. Skip `components/` unless the app needs the React charts or `MineMap`; those are `.jsx` and expect a bundler.

### 2. What actually enforces adherence

`CLAUDE.md` is instructions — it steers the agent but guarantees nothing on its own. Three things in the repo do the enforcing:

1. **`tokens.css` is the only place values exist.** If the agent needs a colour or a radius, `var(--hz-*)` is the only thing available; a hex literal is visibly off-system in review. Delete the app's old colour/spacing constants files in the same pass so there is no second source to fall back to.
2. **`_adherence.oxlintrc.json` → `.oxlintrc.json` at the repo root.** This is generated from this DS and is machine-checkable: it warns on any raw hex colour, any raw `px` literal, any `font-family` outside Inter / IBM Plex Sans / Font Awesome, deep imports into component internals, and any prop a DS chart component doesn't declare. Run it in the pre-commit hook and in CI (`npx oxlint`), and tell Claude Code in `CLAUDE.md` to run it before every commit — a failing lint is a hard signal in a way prose never is. If the repo is on ESLint, port these `no-restricted-syntax` selectors into the existing config instead of adding a second linter.
3. **`ui-kit.html` is in the repo, so "read it first" is a real instruction.** The agent opens the file and copies markup, instead of inventing a button from memory. Same for `foundations.html`.

Anything the linter can't catch — the wrong component for the job, a tag used as a status badge, a shadow on something that doesn't float — is caught by keeping each pass small enough to actually read the diff (below).

### 3. Wiring it in

- **Plain CSS / CSS modules** — `@import './design-system/tokens.css'` once at the app entry. Done; `.hz-*` classes and `--hz-*` vars are global.
- **Tailwind** — keep `tokens.css` for fonts, FA and the `.hz-*` classes, and point the theme at the same variables so utilities and DS classes can't drift:
  ```js
  // tailwind.config.js
  theme: { extend: {
    colors: { primary: 'var(--hz-horizon-primary)', 'primary-dark': 'var(--hz-horizon-primary-dark)',
              'primary-pale': 'var(--hz-horizon-primary-pale)',
              surface: 'var(--hz-surface-card)', page: 'var(--hz-surface-page)' },
    fontFamily: { sans: ['Inter','sans-serif'], display: ['IBM Plex Sans','sans-serif'] },
    borderRadius: { DEFAULT: 'var(--hz-radius-lg)' },
  }}
  ```
  Spacing, breakpoints and z-index need no mapping — the scales are already Tailwind's defaults 1:1, so existing `p-4`, `gap-6`, `lg:` and `z-50` are already on-system.
- **styled-components / emotion / MUI** — read `--hz-*` straight from CSS vars; don't re-declare hex values in a JS theme object.
- Put `class="theme-hz-azure"` on the app shell (or `theme-hz-blue` for non-suite products) — that one class sets the whole interactive palette.

### 4. How to run the redesign

Tell Claude Code to work screen by screen, not repo-wide, and in this order:

1. **Audit first, don't edit.** Have it list every hardcoded color, font size, radius, shadow and pixel spacing per screen, and the nearest `--hz-*` token for each. Review that map before any code changes.
2. **Foundations pass** — swap colors, type and spacing to tokens. Purely mechanical, no markup changes, so it's safely reviewable in one diff.
3. **Component pass** — replace bespoke buttons/inputs/cards/tables with the `.hz-*` markup from `ui-kit.html`, one component type per commit. Anything the kit doesn't cover: build it from tokens and say so in the PR, so it can come back into the DS.
4. **Layout pass** — 12 columns / 24px gutter, 268px sidebar (68 collapsed), 56px topbar, content capped at `--hz-container-xl`.

Standing rules for the agent: never add a hex value, never add a font family, never invent an accent colour, keep behaviour and routing untouched while restyling, and stop and ask when a screen needs a pattern the kit doesn't have. It should re-read `ui-kit.html` before building any component rather than deriving one.

## Source mapping

| `sqeui-framework/packages/horizon` | Ported as |
|---|---|
| `src/foundation/colors/token.json` | `:root` ramps in `tokens.css` |
| `src/theme.css` | `.theme-hz-*` in `tokens.css` |
| `src/foundation/typography.ts` | `--hz-text-*` + `.hz-h{1..6}` / `.hz-body-*` |
| `src/atoms/*/[name].classnames.ts` | `.hz-{component}` rules in `tokens.css` |
| `src/assets/icons/*` | Font Awesome 5 Pro — `<i class="far fa-*">` |
