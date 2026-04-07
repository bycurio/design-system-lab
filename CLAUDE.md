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

### Size primitives

Values in the **Primitives** collection, group `Size/`. Token names use the actual pixel value — no mapping needed.

| Token | Value |
|---|---|
| `Size/4` | 4px |
| `Size/8` | 8px |
| `Size/12` | 12px |
| `Size/14` | 14px (body/label text — off the 4px grid but justified as a standard type size) |
| `Size/16` | 16px |
| `Size/20` | 20px |
| `Size/24` | 24px |
| `Size/32` | 32px |
| `Size/40` | 40px |
| `Size/48` | 48px |
| `Size/64` | 64px |

### Component primitives

Values that fall outside the regular 4px grid but are needed for specific component sizing targets. In the **Primitives** collection, group `Component/`.

| Token | Value | Used for |
|---|---|---|
| `Component/button-padding-y-sm` | 6px | Button/IconButton sm vertical padding |
| `Component/button-padding-y-lg` | 10px | Button/IconButton lg vertical padding |

Only add to this group when a value is genuinely off-grid AND tied to a specific component sizing constraint. Do not add speculatively.

### Font primitives

STRING variables in the **Primitives** collection, group `Font/`. All text nodes in components must be bound to these rather than using hardcoded font family names.

| Token | Value |
|---|---|
| `Font/sans` | `Inter` |
| `Font/mono` | `JetBrains Mono` |
| `Font/icons` | `Material Symbols Rounded` |
| `Font/weight/regular` | 400 |
| `Font/weight/medium` | 500 |
| `Font/weight/bold` | 700 |

All text nodes inside component sets must have `fontSize` bound to a `Size/*` token and `fontWeight` bound to a `Font/weight/*` token, in addition to `fontFamily` bound to a `Font/*` family token.

**Note:** `Material Symbols Rounded` cannot be loaded via `figma.loadFontAsync()` as it is a variable font added at the file level. You can still bind STRING variables to text nodes using `node.setBoundVariable('fontFamily', fontVar)` without loading the font first. To modify the `fontName` property of icon text nodes, use the Figma UI directly.

---

## Figma Component Conventions

### Sizing: always hug

Components must use **hug (AUTO) sizing**, not fixed dimensions. Height and width emerge from padding + content. Never set a fixed `width` or `height` on a component variant unless there is no other way.

- `primaryAxisSizingMode = 'AUTO'`
- `counterAxisSizingMode = 'AUTO'`

### Padding controls size

Bind `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` to Spacing primitives. This is how component size is controlled, not with a fixed-height token.

**Button padding by size:**

| Size | Target height | padding-x | padding-y | Tokens |
|---|---|---|---|---|
| sm | 28px | 8px | 6px | `Size/8`, `Component/button-padding-y-sm` |
| md | 36px | 12px | 8px | `Size/12`, `Size/8` |
| lg | 44px | 16px | 10px | `Size/16`, `Component/button-padding-y-lg` |

**IconButton padding by size (equal all sides):**

| Size | Target size | Padding | Token |
|---|---|---|---|
| sm | 28×28px | 6px | `Component/button-padding-y-sm` |
| md | 36×36px | 8px | `Size/8` |
| lg | 44×44px | 10px | `Component/button-padding-y-lg` |

### Icon sizes — consistent across Button and IconButton

Icon size must be identical for the same size tier across all components. A `sm` Button and `sm` IconButton placed side by side must have the same icon size.

| Size | Icon size | Token |
|---|---|---|
| sm | 16px | `Size/16` |
| md | 20px | `Size/20` |
| lg | 24px | `Size/24` |

Bind icon text node `fontSize` to the appropriate `Size/*` primitive.

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
- **`loadFontAsync` is reliable:** Inter and JetBrains Mono resolve in ~3ms via the MCP plugin runner. Font loading is NOT the cause of plugin failures — errors elsewhere in async plugin code are. Always confirm root cause before assuming timing.
- **Full rollback on any async error:** Any unhandled error (or even a caught error that prevents `figma.closePlugin()` from being called) causes the entire plugin's document changes to roll back. Structure every async build as one top-level `try/catch` that always reaches `figma.closePlugin()`.
- **`clipsContent`:** Set `clipsContent = true` on any auto-layout frame that has a `cornerRadius` and children that could overflow (e.g. inner frames with borders). Without it the border corners bleed outside the parent.
- **Individual stroke sides:** `strokeTopWeight`, `strokeRightWeight`, `strokeBottomWeight`, `strokeLeftWeight` are valid on frames. Use `strokeAlign = 'INSIDE'` when adding partial-side strokes to auto-layout children (e.g. row dividers).

---

## Form Component Conventions

### Input sizing

Inputs are a **single size** — no size variants. Consistent height across all forms is the goal; multiple sizes would cause field alignment issues.

| Height | padding-x | padding-y | Text size | Tokens |
|---|---|---|---|---|
| 36px (h-9) | 12px | 8px | text-sm / 14px | `Size/12`, `Size/8`, `Size/14` |

### Input states

Five states: default, hover, focused, error, disabled. No pressed/loading state — inputs don't have those.

| State | Border token | Background token | Notes |
|---|---|---|---|
| default | `color/border` | `color/surface-raised` | |
| hover | `color/border` | `color/surface-raised-hover` | background lightens slightly |
| focused | `color/brand` | `color/surface-raised` | border switches to brand |
| error | `color/danger` | `color/surface-raised` | border switches to danger |
| disabled | `color/border` | `color/surface` | recessed bg; text/icon at 40% opacity |

No new semantic tokens needed — reference `color/brand` and `color/danger` directly for focus/error border. `--input-border` and `--input-radius` already exist in `tailwind.css`.

### Input web classes

```tsx
// Height classes — same as Button
const sizeClasses = {
  sm: 'h-7 text-xs px-2',   // 28px
  md: 'h-9 text-sm px-3',   // 36px
  lg: 'h-11 text-base px-4', // 44px
}

// Border/focus/error state classes
const baseClasses = 'border border-(--color-border) bg-(--color-surface-raised) rounded-(--input-radius)'
const focusClasses = 'outline-none focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-brand) focus:ring-offset-0 focus:ring-opacity-20'
const errorClasses = 'border-(--color-danger) focus:ring-(--color-danger)'
const disabledClasses = 'bg-(--color-surface) opacity-40 cursor-not-allowed'
```

### Input Figma component structure

- **Variant properties:** `Size` (sm/md/lg), `State` (default/hover/focused/error/disabled)
- **Phase 1:** 3 × 5 = 15 variants (base input, no icon variants)
- **Reference width:** 240px per variant (fixed — inputs don't hug horizontally)
- **Figma sizing:** hug height via padding (same as Button), fixed width set to 240px for the component set reference

**Prototype interactions:**
- `State=default` → `ON_HOVER` → `State=hover` (150ms ease-out, Smart Animate)
- `State=hover` → `ON_PRESS` → `State=focused` (80ms ease-out) — ON_PRESS is the closest Figma analog to click-to-focus
- Error and disabled states: no reactions

**Component set grid layout (5 variants):**
- 5 columns (states), 1 row
- Column x positions (240px wide + 16px gap): `[16, 272, 528, 784, 1040]`
- Frame size: 1296 × 68px

**Input structure (Figma):**
```
InputFrame [HORIZONTAL auto-layout, hug height, fixed width 240px]
  └─ ValueText [TEXT — 'Input value' or placeholder text]
```
Stroke bound to state-appropriate border token. Background fill bound to state-appropriate surface token. Radius bound to `Radius/md`.

For the focused state, simulate the focus ring with a drop shadow:
```js
{ type: 'DROP_SHADOW', color: { r: brandR, g: brandG, b: brandB, a: 0.25 }, offset: {x:0,y:0}, radius: 0, spread: 3, visible: true, blendMode: 'NORMAL' }
```

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
- **FAB** — single size (56px/24px icon), 2 types (circular/extended), 4 states (default/hover/pressed/loading), prototype interactions, Figma + web. Uses `iconName: string` — icon size is intrinsic. Extended type (with `label`) is pill-shaped (`rounded-full`). No disabled state — hide the FAB instead. No size prop — use IconButton for smaller circular actions.
- **SplitButton** — 3 variants (primary/secondary/danger), 3 sizes (sm/md/lg), 4 states (default/hover/pressed/disabled), prototype interactions, Figma + web. Secondary variant uses outer wrapper border (`border border-(--color-border)`); primary/danger use `border-r border-white/20` divider. Chevron sizes: `{ sm: 14, md: 16, lg: 16 }`. Note: Figma chevron icon nodes use Material Icons font — select all `Icon` layers inside the SplitButton set and manually update font to Material Symbols Rounded.
- **Input** — single size (36px / h-9), 5 states (default/hover/focused/error/disabled), prototype interactions, Figma + web. No size variants — inputs are one consistent height. Fixed `--color-border-focus` (non-existent token) → `--color-brand`. Background `--color-surface-raised`; disabled uses `--color-surface` + `opacity-40`. Focus ring via `focus:ring-2 focus:ring-offset-0`. `enabled:hover:` suppresses hover on disabled. Code Connect maps `State=error` → `error={true}`; `State=disabled` → `disabled={true}`; hover/focused are visual only.
- **Foundations documentation frames** — 5 frames on the Foundations page (Colors, Typography, Spacing, Elevation, Icons). Non-component frames. All color fills and text colors bound to semantic variables; size rectangle dimensions bound to `Size/*` primitives. Icons Sizes section labels use plain prose ("Button sm, IconButton sm") — no token-path syntax.

When building the next component, use Button and IconButton as the reference implementations.
