# Design system — Aref Zebian

Local foundations for the Deframer/Next portfolio. Identity stays Favorit + black/white; BLOND is a consistency reference only.

## Typography

| Role | Class | Size (mobile → desktop) | Weight | Notes |
|------|-------|-------------------------|--------|-------|
| Display | `.ds-display` / `text-display` | 32 → 48px | Favorit Light 300 | Hero / page titles |
| Heading | `.ds-heading` / `text-heading` | 24 → 28px | Favorit Light 300 | Section titles |
| Body | `.ds-body` / `text-body` | 16px | Favorit Light 300 | Long copy; measure ~55–65ch via `.ds-measure` |
| Label | `.ds-label` / `text-label` | 14px | Favorit Light 300 | Nav / UI; **uppercase** |

High-traffic Deframer scopes (`text-body-40`, `text-body-30`, `text-body-17`/`20`, uppercase 11–15) are remapped toward these roles in `src/styles/design-system.css`.

## Color

| Token | Value |
|-------|-------|
| `--color-bg` / `--color-surface` | `#ffffff` |
| `--color-bg-inverse` | `#000000` |
| `--color-text` | `#000000` |
| `--color-text-muted` | `rgba(0,0,0,0.55)` |
| `--color-border` | `rgba(0,0,0,0.12)` |
| `--color-accent` | `#000000` |

Inverse variants exist for dark chrome (footer, playground).

## Spacing

Scale: **4, 8, 12, 16, 24, 32, 48, 64, 96** (`--space-1` … `--space-9`).

| Named | Phone | Tablet | Desktop |
|-------|-------|--------|---------|
| `--gutter` | 16 | 24 | 32 |
| `--section-gap` | 48 | 48 | 96 |
| `--grid-gap` | 16 | 20 | 20 |
| `--text-gap` | 12 | 12 | 12 |

Utilities: `.ds-page`, `.ds-gutter`, `.ds-section`, `.ds-measure`.

## Motion

- **Reveal:** opacity + 8px rise, 350ms, `--ease-out` (`cubic-bezier(0.16,1,0.3,1)`), once per visit. Use `<Reveal>` / `.ds-reveal` or `revealRest` / `revealHidden` presets. Group stagger ≤ 250ms.
- **Interact:** ~180ms for links/buttons/hover (`.ds-interactive`).
- **Reduced motion:** `reducedMotion = "user"` in `src/site/routes.ts`; CSS skips transform when `prefers-reduced-motion: reduce`.

## Responsive (Work grid)

| Width | Columns |
|-------|---------|
| &lt; 640px | 1 |
| 640–1023px | 2 |
| ≥ 1024px | 3 |

Project titles remain visible without hover. Touch targets ≥ 44px (`.ds-touch`).

## Components

- Navigation / footer: shared gutters via layout templates + tokens.
- Project cards: portrait aspect, overlay titles always on.
- Page shell: prefer `.ds-gutter` / `--gutter` over one-off padding.

## Sources

- Tokens: `src/styles/tokens.ts`
- Utilities: `src/styles/design-system.css`
- Reveal: `src/lib/motion/reveal.tsx`, `src/lib/motion/presets.ts`
- Type roles: `src/styles/text/{display,heading,body,label}.{ts,css}`

## Local verification (2026-11-08)

- Preview: `http://127.0.0.1:3000`
- Checked widths: 375, 390, 768, 1024, 1440 on `/`, `/works/grid-view`, `/revimo`, `/about`, `/playground`, `/contact`
- Work grid columns: 1 / 2 / 3 as specified; gutters 16 / 24 / 32
- ReviMo card → `/revimo`; LinkedIn → `linkedin.com/in/aref-zebian-b0375a26b`
- `npm run build` succeeded
- No lint script in package.json
- Changes left local (not pushed)
