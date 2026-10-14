# Install

1. Copy `design-system/` into the repo root (or `src/design-system/`).
2. Copy `CLAUDE.md` and `.oxlintrc.json` to the repo root. If a CLAUDE.md exists, append this one's contents. If the repo uses ESLint, port the `no-restricted-syntax` selectors from `.oxlintrc.json` into the existing config instead of adding oxlint.
3. Import the stylesheet once, at the app entry:
   ```css
   @import './design-system/tokens.css';
   ```
   It carries the tokens, every `.hz-*` component class, the self-hosted Inter / IBM Plex Sans, and Font Awesome Pro. It is the only stylesheet the design system needs.
4. Put `class="theme-hz-azure"` on the app shell (`theme-hz-blue` for non-suite products). That one class sets the interactive palette.
5. Wire the lint into pre-commit and CI: `npx oxlint`.

Tailwind: keep tokens.css as-is and point the theme at the same variables so utilities can't drift.
```js
theme: { extend: {
  colors: { primary: 'var(--hz-horizon-primary)', 'primary-dark': 'var(--hz-horizon-primary-dark)',
            'primary-pale': 'var(--hz-horizon-primary-pale)',
            surface: 'var(--hz-surface-card)', page: 'var(--hz-surface-page)' },
  fontFamily: { sans: ['Inter','sans-serif'], display: ['IBM Plex Sans','sans-serif'] },
  borderRadius: { DEFAULT: 'var(--hz-radius-lg)' },
}}
```
Spacing, breakpoints and z-index need no mapping — the scales are Tailwind's defaults 1:1, so existing `p-4`, `gap-6`, `lg:` and `z-50` are already on-system.

Open `design-system/ui-kit.html` and `foundations.html` in a browser — they are the visual reference, and the agent reads them before building anything.

React charts and `MineMap` are not included: they are `.jsx` and need a bundler. Ask if the app needs them.
