# Design System Lab — Design Spec

**Date:** 2026-03-26
**Status:** Approved
**Project directory:** `/Users/stephenascendum/Documents/design-system-lab`
**Figma file:** Design-System-Lab (`ITyTagLQEj5b75iqsmPyl6`)

---

## Overview

Build a production-grade design system with 1:1 parity between Figma and code, connected via Figma Code Connect, and documented in a custom Next.js web app. The outcome is a system ready for developer handover: designers work in Figma, developers get real component snippets in Dev Mode and a live documentation site.

Code is the single source of truth. Figma mirrors the code — not the other way around.

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Web app framework | Next.js 14 (App Router) | Mature Code Connect ecosystem, static export for docs |
| Token architecture | Tailwind v4 CSS-first (`@theme`) | Code as source of truth, no extra tooling, Tailwind utilities auto-generated |
| Component scope | Professional set (~40 components) | Comprehensive enough to be real, scoped enough to complete |
| Visual aesthetic | Clean & Professional (B) + pill radius on tags/badges | Sharp but light — Stripe/GitHub register |
| Colour mode | Light + Dark | Semantic tokens map to both via Tailwind `dark:` variants |
| Typography | Inter (UI) + JetBrains Mono (code) | Battle-tested, used by Linear/Figma, excellent legibility |
| Repo structure | Turborepo monorepo | Production-grade, Code Connect points to real importable source |
| Icons | Lucide React | Zero config, tree-shakeable, consistent geometry |

---

## Architecture

### Monorepo Structure

```
design-system-lab/
├── packages/
│   ├── tokens/
│   │   ├── tailwind.css        # @theme primitives + semantics — single source of truth
│   │   └── package.json        # @ds/tokens
│   └── ui/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Button.tsx
│       │   │   ├── Button.figma.tsx    # Code Connect mapping
│       │   │   ├── Button.types.ts
│       │   │   └── index.ts           # barrel export
│       │   └── index.ts               # @ds/ui entry point
│       └── package.json               # @ds/ui
├── apps/
│   └── docs/
│       ├── app/
│       │   ├── foundations/[slug]/page.tsx
│       │   ├── components/[slug]/page.tsx
│       │   └── layout.tsx             # sidebar nav + dark mode toggle
│       └── package.json
├── turbo.json
└── package.json
```

### Source of Truth Flow

```
Tailwind @theme → CSS custom properties → Figma Variables (manual/script sync)
→ Figma components use Variables → Code Connect links back to packages/ui
```

One closed loop. Token changes in `tailwind.css` cascade to Figma, code, and docs simultaneously.

---

## Token System

### Three-Tier Architecture

**Tier 1 — Primitive** (raw values, never used directly in components)
```css
@theme {
  --color-blue-600: #2563eb;
  --color-slate-900: #0f172a;
  --size-4: 1rem;
  --radius-md: 4px;
  --radius-full: 9999px;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**Tier 2 — Semantic** (intent-based aliases, light/dark variants defined here)
```css
@theme {
  --color-bg: var(--color-white);
  --color-surface: var(--color-slate-50);
  --color-brand: var(--color-blue-600);
  --color-text-primary: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-600);
  --color-border: var(--color-slate-200);
  --color-danger: var(--color-red-600);
  --color-success: var(--color-green-600);
  --color-warning: var(--color-amber-600);
  --color-info: var(--color-sky-600);
}

@variant dark {
  --color-bg: var(--color-slate-950);
  --color-surface: var(--color-slate-800);
  --color-brand: var(--color-blue-500);
  --color-text-primary: var(--color-slate-100);
  --color-text-secondary: var(--color-slate-400);
  --color-border: var(--color-slate-700);
}
```

**Tier 3 — Component** (scoped tokens per component, enables per-component theming)
```css
@theme {
  --button-bg: var(--color-brand);
  --button-radius: var(--radius-md);       /* 4px — sharp */
  --badge-radius: var(--radius-full);      /* pill */
  --input-border: var(--color-border);
  --input-radius: var(--radius-md);
}
```

### Colour Palette

- **Brand:** Blue (`blue-50` → `blue-900`, primary = `blue-600` light / `blue-500` dark)
- **Neutral:** Slate (`slate-50` → `slate-950`)
- **Status:** Green (success), Red (danger), Amber (warning), Sky (info)

### Radius Convention

| Usage | Token | Value |
|---|---|---|
| Buttons, inputs, selects | `--radius-md` | 4px |
| Cards, modals, panels | `--radius-lg` | 8px |
| Large panels | `--radius-xl` | 12px |
| Badges, chips, tags | `--radius-full` | 9999px (pill) |

Enforced via component-tier tokens — not per-file overrides.

### Spacing Scale

Base-4 rem scale: `--size-1` (4px) through `--size-16` (64px) and beyond.

### Type Scale

`--text-xs` (12px) → `--text-2xl` (24px), extended to `--text-4xl` (36px) for display headings.

---

## Component Set (40 components)

### Actions (5)
Button, Icon Button, Link, FAB, Split Button

**Button variants:** `primary | secondary | ghost | danger` × `sm | md | lg` × `default | disabled | loading`

### Forms (8)
Input, Textarea, Select, Checkbox, Radio, Toggle, Slider, Date Picker

**Input variants:** `default | error | disabled` + optional leading/trailing icon

### Navigation (5)
Nav Bar, Tabs, Breadcrumb, Sidebar, Pagination

### Feedback (7)
Badge, Toast, Alert, Tooltip, Progress, Skeleton, Spinner

**Badge/Toast/Alert:** all four status variants (info, success, danger, warning) — pill radius on Badge.

### Containers (6)
Card, Modal, Drawer, Popover, Accordion, Divider

### Data (4)
Table, List, Avatar, Chip / Tag

**Chip/Tag:** pill radius, removable variant.

### Typography (5)
Heading (h1–h4 + display), Body (sm/base/lg), Label, Caption, Code (inline + block)

### Foundations (docs only, not components)
Color, Typography, Spacing, Elevation, Icons (Lucide React)

---

## Figma Structure

### Pages in Design-System-Lab

1. **Cover** — file overview, version number, last updated
2. **Foundations** — colour swatches, type scale, spacing scale, radius, elevation — reference only
3. **Components** — all 35 components, one section per category, component sets with properties panel
4. **Documentation** — per-component usage notes, do/don't examples, prop reference
5. **Playground** — scratch space for composition testing

### Per-Component Convention in Figma

- **Component set** — all variants in a single Figma component set with a properties panel
- **States** — default, hover, focus, disabled, error shown side-by-side
- **Dark mode** — variable modes applied, shown next to light variant
- **Canvas annotation** — prop table + usage note directly below the component on canvas
- **Variables** — all colour/radius/spacing values bound to Figma Variables (not hardcoded)
- **Code Connect** — `.figma.tsx` file co-located in `packages/ui` links the Figma node to the React source

### Figma Variables

Mirror the Tailwind semantic token tier exactly:
- **Collection: Primitives** — full colour/size scales (reference only, not used on components)
- **Collection: Semantic** — intent tokens with Light and Dark modes
- Figma component properties are named to match TypeScript prop values (e.g. `Variant: Primary` → `variant="primary"`)

---

## Code Connect

### File Convention

Each component has a co-located `.figma.tsx` file:

```tsx
// packages/ui/src/components/Button.figma.tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, '<figma-node-url>', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Danger: 'danger',
    }),
    size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    label: figma.string('Label'),
    disabled: figma.boolean('Disabled'),
  },
  example: ({ variant, size, label, disabled }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {label}
    </Button>
  ),
})
```

### Publish Workflow

1. Figma component property names match TypeScript prop values exactly
2. One `.figma.tsx` per component, co-located in `packages/ui/src/components/`
3. Run `figma connect publish` (manually or in CI)
4. Designers see real component snippets in Dev Mode immediately — no generated code

---

## Docs Web App (apps/docs)

### Navigation Structure

```
Getting Started
  Introduction
  Installation

Foundations
  Colors
  Typography
  Spacing
  Elevation
  Icons

Components
  [40 component pages, alphabetical within category]
```

### Per-Component Page Structure

Every component page follows the same 6-section layout:

1. **Overview** — one-line description, when to use, when not to use
2. **Live Preview** — interactive component rendered in-browser, light/dark toggle
3. **Variants** — all variant combinations shown with labels
4. **Code** — copy-ready import + usage snippet in JetBrains Mono code block
5. **Props** — TypeScript prop table: name, type, default, description
6. **Tokens** — which component-tier tokens this component consumes

### Technical Details

- Next.js 14 App Router, static export (`output: 'export'`)
- Imports components directly from `@ds/ui`
- Dark mode via `next-themes` + Tailwind `dark:` class strategy
- Code blocks: `shiki` for syntax highlighting (JetBrains Mono)
- No Storybook — docs site is the single documentation surface

---

## What Is Out of Scope

- npm publishing of `@ds/ui` (directory imports only for this lab)
- CI/CD pipeline (Code Connect publish is manual for this lab)
- Charts, marketing sections, complex patterns (Phase C — future)
- Automated Figma Variables sync (manual sync for this lab, script can be added later)
- Mobile/native outputs (web-only)

---

## Success Criteria

1. All 40 components exist in Figma with Variables, states, and dark mode
2. All 40 components exist in `packages/ui` with TypeScript props and Tailwind v4 tokens
3. All 40 components have a `.figma.tsx` Code Connect file published to Figma
4. Docs site runs locally, shows live previews, props, and code snippets for every component
5. Selecting any component in Figma Dev Mode shows a real, copy-pasteable React snippet
6. Light/dark mode works in both Figma (via Variable modes) and the docs site (via Tailwind)
