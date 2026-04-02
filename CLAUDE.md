# Design System Lab — Claude Reference

This file is read automatically at the start of every session. Follow these decisions and conventions before making any changes to tokens, Figma components, or web components.

---

## Token Architecture

### Three-layer model

| Collection | Contents | Rule |
|---|---|---|
| **Primitives** | Raw values: color, spacing, radius | No aliases, no semantic meaning, values only |
| **Semantic** | COLOR tokens only, with Light/Dark modes | Spacing and radius never need a semantic wrapper — only colour changes between modes |
| *(components)* | Bind directly to Primitives (spacing, radius) and Semantic (color) | No component-specific token wrappers unless a value genuinely diverges from the primitive scale |

### What belongs in Semantic

Only tokens that **change between Light and Dark mode** belong in the Semantic collection. That means: exclusively COLOR variables.

- ✓ `color/brand`, `color/text-primary`, `color/surface-raised`, etc.
- ✗ `button/padding-x-sm` — this is just `Spacing/2`. Delete it.
- ✗ `button/radius` — this is just `Radius/md`. Delete it.
- ✗ `control/height-sm` — if a component hugs its content, a height token has no binding target. Delete it.

### When a component-level semantic token IS justified

Only create a component-level semantic token if:
1. The value genuinely differs from any existing primitive, **and**
2. The value may need to change independently of the primitive scale in future

If neither condition is met, bind directly to the primitive.

### Spacing primitives

Values in the **Primitives** collection:

| Token | Value |
|---|---|
| `Spacing/1` | 4px |
| `Spacing/2` | 8px |
| `Spacing/3` | 12px |
| `Spacing/4` | 16px |
| `Spacing/5` | 20px |
| `Spacing/6` | 24px |
| `Spacing/6px` | 6px (half-step, used for sm button/icon padding) |
| `Spacing/8` | 32px |
| `Spacing/10` | 40px |
| `Spacing/10px` | 10px (half-step, used for lg button/icon padding) |
| `Spacing/12` | 48px |
| `Spacing/16` | 64px |

Half-step values (`6px`, `10px`) exist because button padding math requires them. Add further half-steps to Primitives only when a real sizing need demands them — not speculatively.

---

## Figma Component Conventions

### Sizing: always hug

Components must use **hug (AUTO) sizing**, not fixed dimensions. Height and width emerge from padding + content. Never set a fixed `width` or `height` on a component variant unless there is no other way.

- `primaryAxisSizingMode = 'AUTO'`
- `counterAxisSizingMode = 'AUTO'`

### Padding controls size

Bind `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` to Spacing primitives. This is how component size is controlled, not with a fixed-height token.

**Button padding by size:**

| Size | Target height | padding-x | padding-y | Spacing tokens |
|---|---|---|---|---|
| sm | 28px | 8px | 6px | `Spacing/2`, `Spacing/6px` |
| md | 36px | 12px | 8px | `Spacing/3`, `Spacing/2` |
| lg | 44px | 16px | 10px | `Spacing/4`, `Spacing/10px` |

**IconButton padding by size (equal all sides):**

| Size | Target size | Padding | Spacing token |
|---|---|---|---|
| sm | 28×28px | 6px | `Spacing/6px` |
| md | 36×36px | 8px | `Spacing/2` |
| lg | 44×44px | 10px | `Spacing/10px` |

### Icon sizes — consistent across Button and IconButton

Icon size must be identical for the same size tier across all components. A `sm` Button and `sm` IconButton placed side by side must have the same icon size.

| Size | Icon size | Spacing token |
|---|---|---|
| sm | 16px | `Spacing/4` |
| md | 20px | `Spacing/5` |
| lg | 24px | `Spacing/6` |

Bind icon text node `fontSize` to the appropriate `Spacing/*` primitive.

### Icon text nodes must be forced square

Material Symbols text nodes do not auto-size to a square. After binding `fontSize`, always force the node to exact square dimensions:

```js
iconNode.textAutoResize = 'NONE'
iconNode.resize(iconSizePx, iconSizePx)
iconNode.textAlignHorizontal = 'CENTER'
iconNode.textAlignVertical = 'CENTER'
iconNode.lineHeight = { unit: 'PIXELS', value: iconSizePx }
```

For non-icon text nodes (labels), set explicit line-height to match Tailwind's scale:
- `text-xs` (12px) → line-height 16px
- `text-sm` (14px) → line-height 20px
- `text-base` (16px) → line-height 24px

### Border radius

Bind all four corner radius properties (`topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius`) directly to `Radius/md` (from Primitives). Do not create a component-level wrapper token for this.

### Color bindings

Bind fills to **Semantic** color tokens, not raw hex or Primitive colors directly.

**Icon/text colour by variant:**
- `primary`, `danger` → `color/text-inverse` (white — icon visible on coloured background)
- `secondary`, `ghost` → `color/text-primary` (dark — icon visible on surface background)

**Interaction states:**
- hover → `color/interaction-hover` (alpha overlay, surface-agnostic)
- pressed/active → `color/interaction-pressed`

Use `figma.variables.setBoundVariableForPaint()` to bind a color variable to a fill:

```js
node.fills = [figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color',
  colorVariable
)]
```

### Variable scopes

Valid FLOAT variable scopes: `ALL_SCOPES`, `GAP`, `WIDTH_HEIGHT`, `CORNER_RADIUS`, `FONT_SIZE`, `LINE_HEIGHT`, `LETTER_SPACING`, `PARAGRAPH_SPACING`, `PARAGRAPH_INDENT`.

**`HORIZONTAL_PADDING` and `VERTICAL_PADDING` are NOT valid scopes** — they do not exist in the Figma Plugin API. Use `GAP` to cover padding.

### Component set frame layout

Component sets use **manual positioning** (`layoutMode = 'NONE'`), not auto-layout wrap. This mirrors how the Button component set was already structured.

**Standard grid for a 3-size × 4-variant × 5-state component set (60 variants):**

- 12 rows of 5, grouped by size (sm rows 0–3, md rows 4–7, lg rows 8–11)
- Within each size group: rows ordered primary → secondary → ghost → danger
- 5 states per row: default, hover, pressed, disabled, loading
- 8px gap between variants within a row
- 24px gap between size groups
- 16px frame padding on all sides

**Column x positions (8px gap):**
- sm (16px icon): `[16, 52, 88, 124, 160]`  (step = iconSize + padding×2 + gap = 28+8)
- md (20px icon): `[16, 60, 104, 148, 192]`  (step = 36+8)
- lg (24px icon): `[16, 68, 120, 172, 224]`  (step = 44+8)

For Button (wider due to label), measure the widest variant and lay out accordingly.

**Row y positions:** `[16, 52, 88, 124, 176, 220, 264, 308, 368, 420, 472, 524]`

Frame size: width = max column end + 16px padding; height = last row bottom + 16px padding.

### Prototype interactions

Every component with interactive states (hover, pressed) must have prototype reactions wired up after the component set is built.

**Pattern:**
- `state=default` → `ON_HOVER` → `state=hover` (150ms ease-out, Smart Animate)
- `state=hover` → `ON_PRESS` → `state=pressed` (80ms ease-out, Smart Animate)

`ON_HOVER` and `ON_PRESS` are "while" triggers — Figma auto-reverts when the interaction ends. No separate mouse-leave or mouse-up reactions needed.

Disabled and loading states get no reactions — they don't respond to interaction.

**Reaction shape** (use `actions`, not `action`):
```js
{
  actions: [{
    type: 'NODE',
    destinationId: targetVariant.id,
    navigation: 'CHANGE_TO',
    transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.15 },
    preserveScrollPosition: false,
  }],
  trigger: { type: 'ON_HOVER' }, // or 'ON_PRESS'
}
```

Apply reactions **after** all variants exist. Parse variant properties from `comp.name` (e.g. `Size=md, Variant=primary, State=default`), strip the `state` key to find sibling variants.

### Figma Plugin API — common gotchas

- **Page switching:** use `await figma.setCurrentPageAsync(page)`, not `figma.currentPage = page`
- **Variant properties:** keys are capitalised — `Size=sm`, `Variant=primary`, `State=default`. Parse with regex: `v.name.match(/Size=(\w+)/i)?.[1]`
- **Variable aliases:** `figma.variables.createVariableAlias(variable)` — create a fresh alias for every `setBoundVariable` call; do not reuse the same alias object
- **Finding component sets across pages:** iterate `figma.root.children` (pages), not just `figma.currentPage`

---

## Web Component Conventions

### Tailwind v4 CSS variable syntax

```tsx
// Correct
'bg-(--color-brand)'
'hover:bg-(--color-brand-hover)'
'text-(--color-text-primary)'

// Wrong — old Tailwind v3 syntax
'bg-[var(--color-brand)]'
```

### Interaction states

Secondary and ghost variants use alpha overlay tokens so hover/pressed works on any background surface:

```tsx
'hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)'
```

Never use `hover:bg-(--color-surface)` for interaction — it assumes a specific background.

### Icon sizing in components

```tsx
const iconSizePx = { sm: 16, md: 20, lg: 24 }
```

This must be consistent across every component that contains icons. A `sm` Button and `sm` IconButton must use the same icon size.

### Loading state pattern

```tsx
{loading
  ? <Icon name="progress_activity" size={iconSizePx[size]} className="animate-spin shrink-0" />
  : icon}
```

Always: `disabled={disabled || loading}`, `aria-busy={loading || undefined}`.

### Button height classes (web)

Web uses fixed Tailwind height classes (not hug — CSS doesn't have that concept):

```tsx
const sizeClasses = {
  sm: 'h-7 ...',   // 28px
  md: 'h-9 ...',   // 36px
  lg: 'h-11 ...',  // 44px
}
```

### Surface tokens

| Token | Usage |
|---|---|
| `--color-bg` | Page canvas |
| `--color-surface` | Inset/recessed areas |
| `--color-surface-raised` | Elevated panels: cards, modals, popovers, drawers |

Cards, modals, drawers, and popovers use `bg-(--color-surface-raised)`, not `bg-(--color-bg)`.

---

## Completed Components

These are fully built with the above conventions applied:

- **Button** — 4 variants, 3 sizes, 5 states (default/hover/pressed/disabled/loading), hug sizing, prototype interactions, Figma + web
- **IconButton** — 4 variants, 3 sizes, 5 states, hug sizing, square, prototype interactions, Figma + web
- **Link** — 2 variants (internal/external), 2 states (default/hover), prototype interactions, Figma + web. Text underlined, icon (16px) not underlined.

When building the next component, use Button and IconButton as the reference implementations.
