# Docs App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `apps/docs` Next.js 14 documentation site that renders live previews, props tables, token tables, and syntax-highlighted code for all 40 components plus 5 foundation pages.

**Architecture:** A Next.js 14 App Router app with static export. Shared doc components (ComponentPreview, PropsTable, TokensTable, CodeBlock) render per-component documentation. A central registry in `lib/docs/` holds all component data (preview function, props, tokens, usage snippet). A single dynamic route `app/components/[slug]/page.tsx` renders any component from the registry. Foundation pages are individual static files. Dark mode via `next-themes` + Tailwind `dark:` class strategy.

**Tech Stack:** Next.js 14, React 18, next-themes 0.3, shiki 1.x, Tailwind v4 (via `@ds/tokens`), TypeScript 5, Lucide React (from `@ds/ui`).

**Depends on:** `packages/tokens` and `packages/ui` from Plan 1 must exist before running `npm run build`.

---

## File Map

**Config**
- Create: `apps/docs/package.json`
- Create: `apps/docs/next.config.ts`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/postcss.config.js`

**App shell**
- Create: `apps/docs/app/globals.css`
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/page.tsx`

**Shared UI components**
- Create: `apps/docs/components/Sidebar.tsx`
- Create: `apps/docs/components/ThemeToggle.tsx`
- Create: `apps/docs/components/ComponentPreview.tsx`
- Create: `apps/docs/components/PropsTable.tsx`
- Create: `apps/docs/components/TokensTable.tsx`
- Create: `apps/docs/components/CodeBlock.tsx`

**Lib**
- Create: `apps/docs/lib/shiki.ts`
- Create: `apps/docs/lib/types.ts`
- Create: `apps/docs/lib/docs/index.ts`
- Create: `apps/docs/lib/docs/button.ts`
- Create: `apps/docs/lib/docs/actions.ts`
- Create: `apps/docs/lib/docs/forms.ts`
- Create: `apps/docs/lib/docs/navigation.ts`
- Create: `apps/docs/lib/docs/feedback.ts`
- Create: `apps/docs/lib/docs/containers.ts`
- Create: `apps/docs/lib/docs/data.ts`
- Create: `apps/docs/lib/docs/typography.ts`

**Getting Started pages**
- Create: `apps/docs/app/getting-started/introduction/page.tsx`
- Create: `apps/docs/app/getting-started/installation/page.tsx`

**Foundation pages**
- Create: `apps/docs/app/foundations/colors/page.tsx`
- Create: `apps/docs/app/foundations/typography/page.tsx`
- Create: `apps/docs/app/foundations/spacing/page.tsx`
- Create: `apps/docs/app/foundations/elevation/page.tsx`
- Create: `apps/docs/app/foundations/icons/page.tsx`

**Component route**
- Create: `apps/docs/app/components/[slug]/page.tsx`

---

### Task 1: apps/docs scaffold

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/next.config.ts`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/postcss.config.js`
- Create: `apps/docs/app/globals.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "docs",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@ds/tokens": "*",
    "@ds/ui": "*",
    "lucide-react": "^0.479.0",
    "next": "14.2.29",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "shiki": "^1.29.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@ds/ui', '@ds/tokens'],
}

export default nextConfig
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create postcss.config.js**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 5: Create app/globals.css**

```css
@import '@ds/tokens/tailwind.css';

/* Shiki dual-theme dark mode support */
.dark .shiki,
.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

.shiki code {
  display: block;
  padding: 1rem;
}
```

- [ ] **Step 6: Install dependencies from monorepo root**

Run: `npm install` (from `design-system-lab/` root)
Expected: resolves workspace packages `@ds/tokens` and `@ds/ui` from local packages

- [ ] **Step 7: Commit**

```bash
git add apps/docs/package.json apps/docs/next.config.ts apps/docs/tsconfig.json apps/docs/postcss.config.js apps/docs/app/globals.css
git commit -m "feat(docs): scaffold Next.js 14 docs app"
```

---

### Task 2: ThemeToggle, Sidebar, root layout, root redirect

**Files:**
- Create: `apps/docs/components/ThemeToggle.tsx`
- Create: `apps/docs/components/Sidebar.tsx`
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/page.tsx`

- [ ] **Step 1: Create ThemeToggle.tsx**

```tsx
'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-1.5 rounded-(--radius-md) text-(--color-text-secondary) hover:bg-(--color-bg) transition-colors"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

- [ ] **Step 2: Create Sidebar.tsx**

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navGroups = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/getting-started/introduction' },
      { label: 'Installation', href: '/getting-started/installation' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Colors', href: '/foundations/colors' },
      { label: 'Typography', href: '/foundations/typography' },
      { label: 'Spacing', href: '/foundations/spacing' },
      { label: 'Elevation', href: '/foundations/elevation' },
      { label: 'Icons', href: '/foundations/icons' },
    ],
  },
  {
    title: 'Actions',
    items: [
      { label: 'Button', href: '/components/button' },
      { label: 'Icon Button', href: '/components/icon-button' },
      { label: 'Link', href: '/components/link' },
      { label: 'FAB', href: '/components/fab' },
      { label: 'Split Button', href: '/components/split-button' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { label: 'Input', href: '/components/input' },
      { label: 'Textarea', href: '/components/textarea' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'Slider', href: '/components/slider' },
      { label: 'Date Picker', href: '/components/date-picker' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Nav Bar', href: '/components/nav-bar' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Sidebar', href: '/components/sidebar' },
      { label: 'Pagination', href: '/components/pagination' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Badge', href: '/components/badge' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Progress', href: '/components/progress' },
      { label: 'Skeleton', href: '/components/skeleton' },
      { label: 'Spinner', href: '/components/spinner' },
    ],
  },
  {
    title: 'Containers',
    items: [
      { label: 'Card', href: '/components/card' },
      { label: 'Modal', href: '/components/modal' },
      { label: 'Drawer', href: '/components/drawer' },
      { label: 'Popover', href: '/components/popover' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Divider', href: '/components/divider' },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Table', href: '/components/table' },
      { label: 'List', href: '/components/list' },
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Chip', href: '/components/chip' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { label: 'Heading', href: '/components/heading' },
      { label: 'Body', href: '/components/body' },
      { label: 'Label', href: '/components/label' },
      { label: 'Caption', href: '/components/caption' },
      { label: 'Code', href: '/components/code' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen border-r border-(--color-border) bg-(--color-surface) flex flex-col shrink-0">
      <div className="p-4 border-b border-(--color-border) flex items-center justify-between">
        <span className="font-semibold text-sm text-(--color-text-primary)">Design System Lab</span>
        <ThemeToggle />
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-2">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-1.5 rounded-(--radius-md) text-sm transition-colors ${
                      pathname === item.href
                        ? 'bg-(--color-brand) text-white'
                        : 'text-(--color-text-primary) hover:bg-(--color-bg)'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 3: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/Sidebar'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design System Lab',
  description: 'Component library documentation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen bg-(--color-bg)">
            <Suspense
              fallback={
                <div className="w-64 min-h-screen border-r border-(--color-border) bg-(--color-surface) shrink-0" />
              }
            >
              <Sidebar />
            </Suspense>
            <main className="flex-1 overflow-auto text-(--color-text-primary)">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create app/page.tsx (redirect)**

```tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/getting-started/introduction')
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/docs/components/ThemeToggle.tsx apps/docs/components/Sidebar.tsx apps/docs/app/layout.tsx apps/docs/app/page.tsx
git commit -m "feat(docs): add root layout, sidebar, theme toggle"
```

---

### Task 3: Shared documentation components and lib

**Files:**
- Create: `apps/docs/lib/types.ts`
- Create: `apps/docs/lib/shiki.ts`
- Create: `apps/docs/components/ComponentPreview.tsx`
- Create: `apps/docs/components/PropsTable.tsx`
- Create: `apps/docs/components/TokensTable.tsx`
- Create: `apps/docs/components/CodeBlock.tsx`

- [ ] **Step 1: Create lib/types.ts**

```typescript
import type { ReactNode } from 'react'

export type PropDef = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export type TokenDef = {
  name: string
  value: string
  description: string
}

export type VariantDef = {
  label: string
  preview: () => ReactNode
}

export type ComponentDoc = {
  title: string
  slug: string
  description: string
  whenToUse: string[]
  whenNotToUse: string[]
  preview: () => ReactNode
  variants: VariantDef[]
  usage: string
  props: PropDef[]
  tokens: TokenDef[]
}
```

- [ ] **Step 2: Create lib/shiki.ts**

```typescript
import { codeToHtml } from 'shiki'

export async function highlight(code: string, lang = 'tsx'): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  })
}
```

- [ ] **Step 3: Create components/ComponentPreview.tsx**

```tsx
export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-(--radius-lg) border border-(--color-border) overflow-hidden">
      <div className="p-8 flex flex-wrap items-center justify-center gap-4 bg-(--color-bg) min-h-32">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create components/PropsTable.tsx**

```tsx
import type { PropDef } from '@/lib/types'

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-(--color-border)">
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Prop</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Type</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Default</th>
            <th className="text-left py-2 font-semibold text-(--color-text-secondary)">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-(--color-border)">
              <td className="py-2 pr-6 font-mono text-xs text-(--color-brand)">
                {prop.name}
                {prop.required && <span className="text-(--color-danger) ml-0.5">*</span>}
              </td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">{prop.type}</td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">
                {prop.default ?? '—'}
              </td>
              <td className="py-2 text-(--color-text-primary)">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 5: Create components/TokensTable.tsx**

```tsx
import type { TokenDef } from '@/lib/types'

export function TokensTable({ tokens }: { tokens: TokenDef[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-(--color-border)">
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Token</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Default value</th>
            <th className="text-left py-2 font-semibold text-(--color-text-secondary)">Description</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b border-(--color-border)">
              <td className="py-2 pr-6 font-mono text-xs text-(--color-brand)">{token.name}</td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">{token.value}</td>
              <td className="py-2 text-(--color-text-primary)">{token.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 6: Create components/CodeBlock.tsx**

```tsx
import { highlight } from '@/lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: string
}

export async function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const html = await highlight(code, lang)
  return (
    <div
      className="rounded-(--radius-md) border border-(--color-border) overflow-hidden text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add apps/docs/lib/types.ts apps/docs/lib/shiki.ts apps/docs/components/ComponentPreview.tsx apps/docs/components/PropsTable.tsx apps/docs/components/TokensTable.tsx apps/docs/components/CodeBlock.tsx
git commit -m "feat(docs): add shared doc components and lib"
```

---

### Task 4: Getting Started pages

**Files:**
- Create: `apps/docs/app/getting-started/introduction/page.tsx`
- Create: `apps/docs/app/getting-started/installation/page.tsx`

- [ ] **Step 1: Create introduction/page.tsx**

```tsx
export default function IntroductionPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-4">Introduction</h1>
      <p className="text-(--color-text-secondary) text-lg mb-8">
        Design System Lab is a production-grade component library with 1:1 parity between Figma and code,
        connected via Figma Code Connect.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">What's included</h2>
        <ul className="space-y-2 text-(--color-text-primary)">
          <li className="flex gap-2"><span className="text-(--color-success) font-bold">✓</span> 40 production-ready React components</li>
          <li className="flex gap-2"><span className="text-(--color-success) font-bold">✓</span> Tailwind v4 semantic token system (light + dark)</li>
          <li className="flex gap-2"><span className="text-(--color-success) font-bold">✓</span> Figma Variables mirroring every code token</li>
          <li className="flex gap-2"><span className="text-(--color-success) font-bold">✓</span> Code Connect — real snippets in Figma Dev Mode</li>
          <li className="flex gap-2"><span className="text-(--color-success) font-bold">✓</span> TypeScript prop types for every component</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">Design principles</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Code is source of truth', desc: 'Figma mirrors code — never the other way around.' },
            { title: 'Semantic tokens', desc: 'Components reference semantic tokens, not primitive values.' },
            { title: 'Clean & Professional', desc: '4px radius on controls, pill only on badges and chips.' },
            { title: 'Light + Dark', desc: 'Every token maps to both modes. Toggle at the top of the sidebar.' },
          ].map((p) => (
            <div key={p.title} className="p-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface)">
              <h3 className="font-semibold text-(--color-text-primary) mb-1">{p.title}</h3>
              <p className="text-sm text-(--color-text-secondary)">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create installation/page.tsx**

```tsx
import { CodeBlock } from '@/components/CodeBlock'

export default async function InstallationPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-4">Installation</h1>
      <p className="text-(--color-text-secondary) text-lg mb-8">
        Components live in <code className="font-mono text-(--color-brand) text-sm">@ds/ui</code> and
        tokens in <code className="font-mono text-(--color-brand) text-sm">@ds/tokens</code>. Both are
        workspace packages — consumed directly from the monorepo.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">1. Import tokens</h2>
        <p className="text-(--color-text-secondary) mb-3">Add to your app's global CSS:</p>
        <CodeBlock lang="css" code={`@import '@ds/tokens/tailwind.css';`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">2. Use components</h2>
        <CodeBlock code={`import { Button, Badge, Input } from '@ds/ui'

export function MyForm() {
  return (
    <form>
      <Input placeholder="Email address" />
      <Button variant="primary" type="submit">Subscribe</Button>
    </form>
  )
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">3. Dark mode</h2>
        <p className="text-(--color-text-secondary) mb-3">
          Add the <code className="font-mono text-(--color-brand) text-sm">dark</code> class to the{' '}
          <code className="font-mono text-(--color-brand) text-sm">&lt;html&gt;</code> element to activate dark mode.
          With <code className="font-mono text-(--color-brand) text-sm">next-themes</code>:
        </p>
        <CodeBlock code={`import { ThemeProvider } from 'next-themes'

export function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}`} />
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/docs/app/getting-started/
git commit -m "feat(docs): add getting started pages"
```

---

### Task 5: Foundation pages

**Files:**
- Create: `apps/docs/app/foundations/colors/page.tsx`
- Create: `apps/docs/app/foundations/typography/page.tsx`
- Create: `apps/docs/app/foundations/spacing/page.tsx`
- Create: `apps/docs/app/foundations/elevation/page.tsx`
- Create: `apps/docs/app/foundations/icons/page.tsx`

- [ ] **Step 1: Create foundations/colors/page.tsx**

```tsx
const primitiveScales = [
  { name: 'Blue', prefix: 'blue', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Slate', prefix: 'slate', shades: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'Green', prefix: 'green', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Red', prefix: 'red', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Amber', prefix: 'amber', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Sky', prefix: 'sky', shades: ['50','100','200','300','400','500','600','700','800','900'] },
]

const semanticTokens = [
  { token: '--color-bg', description: 'Page background' },
  { token: '--color-surface', description: 'Card / sidebar background' },
  { token: '--color-brand', description: 'Primary brand (interactive)' },
  { token: '--color-text-primary', description: 'Primary text' },
  { token: '--color-text-secondary', description: 'Muted / helper text' },
  { token: '--color-border', description: 'Default border' },
  { token: '--color-danger', description: 'Destructive actions & errors' },
  { token: '--color-success', description: 'Positive feedback' },
  { token: '--color-warning', description: 'Caution feedback' },
  { token: '--color-info', description: 'Informational feedback' },
]

export default function ColorsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Colors</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Three-tier token system: Primitives (raw palette) → Semantic (intent) → Component (scoped).
        Always use semantic tokens in components.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Semantic tokens</h2>
        <div className="grid grid-cols-2 gap-3">
          {semanticTokens.map(({ token, description }) => (
            <div key={token} className="flex items-center gap-3 p-3 rounded-(--radius-md) border border-(--color-border)">
              <div
                style={{ backgroundColor: `var(${token})`, border: '1px solid var(--color-border)' }}
                className="w-10 h-10 rounded-(--radius-md) shrink-0"
              />
              <div>
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Primitive palette</h2>
        <div className="space-y-6">
          {primitiveScales.map(({ name, prefix, shades }) => (
            <div key={prefix}>
              <p className="text-sm font-semibold text-(--color-text-secondary) mb-2">{name}</p>
              <div className="flex gap-1">
                {shades.map((shade) => (
                  <div key={shade} className="flex flex-col items-center gap-1">
                    <div
                      style={{ backgroundColor: `var(--color-${prefix}-${shade})` }}
                      className="w-9 h-9 rounded-(--radius-sm)"
                    />
                    <span className="text-[10px] text-(--color-text-secondary)">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create foundations/typography/page.tsx**

```tsx
const typeScale = [
  { token: '--text-xs', size: '12px', usage: 'Captions, labels' },
  { token: '--text-sm', size: '14px', usage: 'Body small, helper text' },
  { token: '--text-base', size: '16px', usage: 'Body default' },
  { token: '--text-lg', size: '18px', usage: 'Body large, intro text' },
  { token: '--text-xl', size: '20px', usage: 'Section headings' },
  { token: '--text-2xl', size: '24px', usage: 'Page headings (h2)' },
  { token: '--text-3xl', size: '30px', usage: 'Page titles (h1)' },
  { token: '--text-4xl', size: '36px', usage: 'Display headings' },
]

export default function TypographyPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Typography</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Inter for UI text, JetBrains Mono for code. Sizes from{' '}
        <code className="font-mono text-sm text-(--color-brand)">--text-xs</code> (12px) to{' '}
        <code className="font-mono text-sm text-(--color-brand)">--text-4xl</code> (36px).
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Type scale</h2>
        <div className="space-y-4 border border-(--color-border) rounded-(--radius-lg) overflow-hidden">
          {typeScale.map(({ token, size, usage }) => (
            <div
              key={token}
              className="flex items-baseline gap-6 px-6 py-4 border-b border-(--color-border) last:border-b-0"
            >
              <div style={{ fontSize: `var(${token})` }} className="text-(--color-text-primary) font-sans leading-none w-48 shrink-0">
                The quick brown fox
              </div>
              <div>
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{size} — {usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Fonts</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-(--color-border) rounded-(--radius-lg)">
            <p className="text-xs font-semibold text-(--color-text-secondary) mb-2">--font-sans</p>
            <p className="font-sans text-lg text-(--color-text-primary)">Inter</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">abcdefghijklmnopqrstuvwxyz</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">0123456789</p>
          </div>
          <div className="p-4 border border-(--color-border) rounded-(--radius-lg)">
            <p className="text-xs font-semibold text-(--color-text-secondary) mb-2">--font-mono</p>
            <p className="font-mono text-lg text-(--color-text-primary)">JetBrains Mono</p>
            <p className="font-mono text-sm text-(--color-text-secondary)">const x = 42</p>
            <p className="font-mono text-sm text-(--color-text-secondary)">{'<Button variant="primary" />'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Create foundations/spacing/page.tsx**

```tsx
const spacingScale = [
  { token: '--size-1', px: '4px' },
  { token: '--size-2', px: '8px' },
  { token: '--size-3', px: '12px' },
  { token: '--size-4', px: '16px' },
  { token: '--size-5', px: '20px' },
  { token: '--size-6', px: '24px' },
  { token: '--size-8', px: '32px' },
  { token: '--size-10', px: '40px' },
  { token: '--size-12', px: '48px' },
  { token: '--size-16', px: '64px' },
]

export default function SpacingPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Spacing</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Base-4 rem scale. Use <code className="font-mono text-sm text-(--color-brand)">--size-*</code> tokens
        for padding, margin, and gap. Never use raw pixel values in components.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Spacing scale</h2>
        <div className="space-y-3">
          {spacingScale.map(({ token, px }) => (
            <div key={token} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{px}</p>
              </div>
              <div
                style={{ width: `var(${token})`, height: '24px' }}
                className="bg-(--color-brand) rounded-sm shrink-0"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Create foundations/elevation/page.tsx**

```tsx
const elevationLevels = [
  { name: 'Level 0', token: '--shadow-none', shadow: 'none', usage: 'Flat cards, no depth' },
  { name: 'Level 1', token: '--shadow-sm', shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', usage: 'Dropdown headers, subtle cards' },
  { name: 'Level 2', token: '--shadow-md', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', usage: 'Cards, popovers' },
  { name: 'Level 3', token: '--shadow-lg', shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', usage: 'Modals, drawers' },
  { name: 'Level 4', token: '--shadow-xl', shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', usage: 'Full-screen overlays' },
]

export default function ElevationPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Elevation</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Five shadow levels. Use higher elevation for content that appears above the page (modals, tooltips).
      </p>

      <section className="mb-10">
        <div className="grid grid-cols-1 gap-6">
          {elevationLevels.map(({ name, token, shadow, usage }) => (
            <div key={token} className="flex items-center gap-6">
              <div
                style={{ boxShadow: shadow }}
                className="w-24 h-16 rounded-(--radius-lg) bg-(--color-bg) border border-(--color-border) shrink-0"
              />
              <div>
                <p className="font-semibold text-(--color-text-primary)">{name}</p>
                <p className="font-mono text-xs text-(--color-brand) mb-1">{token}</p>
                <p className="text-sm text-(--color-text-secondary)">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 5: Create foundations/icons/page.tsx**

```tsx
import {
  AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Bell, Calendar,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle,
  Clock, Copy, Download, Edit, ExternalLink, Eye, EyeOff, File,
  Filter, Globe, Grid, Heart, Home, Image, Info, Link, List,
  Loader2, Lock, Mail, Menu, Minus, Moon, MoreHorizontal, MoreVertical,
  Plus, RefreshCw, Search, Settings, Share, Shield, Star, Sun,
  Trash2, Upload, User, Users, X, XCircle, ZoomIn, ZoomOut,
} from 'lucide-react'

const icons = [
  { name: 'AlertCircle', Icon: AlertCircle },
  { name: 'AlertTriangle', Icon: AlertTriangle },
  { name: 'ArrowLeft', Icon: ArrowLeft },
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'Bell', Icon: Bell },
  { name: 'Calendar', Icon: Calendar },
  { name: 'Check', Icon: Check },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'ChevronUp', Icon: ChevronUp },
  { name: 'Circle', Icon: Circle },
  { name: 'Clock', Icon: Clock },
  { name: 'Copy', Icon: Copy },
  { name: 'Download', Icon: Download },
  { name: 'Edit', Icon: Edit },
  { name: 'ExternalLink', Icon: ExternalLink },
  { name: 'Eye', Icon: Eye },
  { name: 'EyeOff', Icon: EyeOff },
  { name: 'File', Icon: File },
  { name: 'Filter', Icon: Filter },
  { name: 'Globe', Icon: Globe },
  { name: 'Grid', Icon: Grid },
  { name: 'Heart', Icon: Heart },
  { name: 'Home', Icon: Home },
  { name: 'Image', Icon: Image },
  { name: 'Info', Icon: Info },
  { name: 'Link', Icon: Link },
  { name: 'List', Icon: List },
  { name: 'Loader2', Icon: Loader2 },
  { name: 'Lock', Icon: Lock },
  { name: 'Mail', Icon: Mail },
  { name: 'Menu', Icon: Menu },
  { name: 'Minus', Icon: Minus },
  { name: 'Moon', Icon: Moon },
  { name: 'MoreHorizontal', Icon: MoreHorizontal },
  { name: 'MoreVertical', Icon: MoreVertical },
  { name: 'Plus', Icon: Plus },
  { name: 'RefreshCw', Icon: RefreshCw },
  { name: 'Search', Icon: Search },
  { name: 'Settings', Icon: Settings },
  { name: 'Share', Icon: Share },
  { name: 'Shield', Icon: Shield },
  { name: 'Star', Icon: Star },
  { name: 'Sun', Icon: Sun },
  { name: 'Trash2', Icon: Trash2 },
  { name: 'Upload', Icon: Upload },
  { name: 'User', Icon: User },
  { name: 'Users', Icon: Users },
  { name: 'X', Icon: X },
  { name: 'XCircle', Icon: XCircle },
  { name: 'ZoomIn', Icon: ZoomIn },
  { name: 'ZoomOut', Icon: ZoomOut },
]

export default function IconsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Icons</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Lucide React — zero config, tree-shakeable, consistent 24×24 geometry.
        Import individual icons: <code className="font-mono text-sm text-(--color-brand)">{'import { Check } from \'lucide-react\''}</code>
      </p>

      <div className="grid grid-cols-6 gap-2">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-(--radius-md) border border-(--color-border) hover:bg-(--color-surface) transition-colors"
          >
            <Icon size={20} className="text-(--color-text-primary)" />
            <p className="text-[10px] text-(--color-text-secondary) text-center leading-tight">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add apps/docs/app/foundations/
git commit -m "feat(docs): add foundation pages (colors, typography, spacing, elevation, icons)"
```

---

### Task 6: Component docs registry types and dynamic page

**Files:**
- Create: `apps/docs/lib/docs/index.ts`
- Create: `apps/docs/app/components/[slug]/page.tsx`

- [ ] **Step 1: Create lib/docs/index.ts (stub — filled by Tasks 7–8)**

```typescript
import type { ComponentDoc } from '@/lib/types'
import { buttonDoc } from './button'
import { iconButtonDoc, linkDoc, fabDoc, splitButtonDoc } from './actions'
import {
  inputDoc, textareaDoc, selectDoc, checkboxDoc,
  radioDoc, toggleDoc, sliderDoc, datePickerDoc,
} from './forms'
import {
  navBarDoc, tabsDoc, breadcrumbDoc, sidebarDoc, paginationDoc,
} from './navigation'
import {
  badgeDoc, toastDoc, alertDoc, tooltipDoc,
  progressDoc, skeletonDoc, spinnerDoc,
} from './feedback'
import {
  cardDoc, modalDoc, drawerDoc, popoverDoc, accordionDoc, dividerDoc,
} from './containers'
import { tableDoc, listDoc, avatarDoc, chipDoc } from './data'
import {
  headingDoc, bodyDoc, labelDoc, captionDoc, codeDoc,
} from './typography'

export const componentDocs: Record<string, ComponentDoc> = {
  button: buttonDoc,
  'icon-button': iconButtonDoc,
  link: linkDoc,
  fab: fabDoc,
  'split-button': splitButtonDoc,
  input: inputDoc,
  textarea: textareaDoc,
  select: selectDoc,
  checkbox: checkboxDoc,
  radio: radioDoc,
  toggle: toggleDoc,
  slider: sliderDoc,
  'date-picker': datePickerDoc,
  'nav-bar': navBarDoc,
  tabs: tabsDoc,
  breadcrumb: breadcrumbDoc,
  sidebar: sidebarDoc,
  pagination: paginationDoc,
  badge: badgeDoc,
  toast: toastDoc,
  alert: alertDoc,
  tooltip: tooltipDoc,
  progress: progressDoc,
  skeleton: skeletonDoc,
  spinner: spinnerDoc,
  card: cardDoc,
  modal: modalDoc,
  drawer: drawerDoc,
  popover: popoverDoc,
  accordion: accordionDoc,
  divider: dividerDoc,
  table: tableDoc,
  list: listDoc,
  avatar: avatarDoc,
  chip: chipDoc,
  heading: headingDoc,
  body: bodyDoc,
  label: labelDoc,
  caption: captionDoc,
  code: codeDoc,
}
```

- [ ] **Step 2: Create app/components/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation'
import { componentDocs } from '@/lib/docs'
import { ComponentPreview } from '@/components/ComponentPreview'
import { PropsTable } from '@/components/PropsTable'
import { TokensTable } from '@/components/TokensTable'
import { CodeBlock } from '@/components/CodeBlock'

export function generateStaticParams() {
  return Object.keys(componentDocs).map((slug) => ({ slug }))
}

export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const doc = componentDocs[params.slug]
  if (!doc) notFound()

  const Preview = doc.preview as React.ComponentType

  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">{doc.title}</h1>
      <p className="text-(--color-text-secondary) text-lg mb-10">{doc.description}</p>

      {/* 1. Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-secondary) uppercase tracking-wide mb-2">
              When to use
            </h3>
            <ul className="space-y-1.5">
              {doc.whenToUse.map((item, i) => (
                <li key={i} className="text-sm text-(--color-text-primary) flex gap-2">
                  <span className="text-(--color-success) font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-secondary) uppercase tracking-wide mb-2">
              When not to use
            </h3>
            <ul className="space-y-1.5">
              {doc.whenNotToUse.map((item, i) => (
                <li key={i} className="text-sm text-(--color-text-primary) flex gap-2">
                  <span className="text-(--color-danger) font-bold shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Live Preview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Live Preview</h2>
        <ComponentPreview>
          <Preview />
        </ComponentPreview>
      </section>

      {/* 3. Variants */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Variants</h2>
        <div className="space-y-4">
          {doc.variants.map((variant) => {
            const VariantPreview = variant.preview as React.ComponentType
            return (
              <div
                key={variant.label}
                className="border border-(--color-border) rounded-(--radius-lg) overflow-hidden"
              >
                <div className="px-4 py-2 bg-(--color-surface) border-b border-(--color-border)">
                  <span className="text-sm font-medium text-(--color-text-secondary)">{variant.label}</span>
                </div>
                <div className="p-6 flex flex-wrap gap-4 items-center bg-(--color-bg)">
                  <VariantPreview />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Code */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Code</h2>
        <CodeBlock code={doc.usage} />
      </section>

      {/* 5. Props */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Props</h2>
        <PropsTable props={doc.props} />
      </section>

      {/* 6. Tokens */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Tokens</h2>
        <TokensTable tokens={doc.tokens} />
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/docs/lib/docs/index.ts apps/docs/app/components/
git commit -m "feat(docs): add component registry and dynamic route"
```

---

### Task 7: Button docs — full exemplar

**Files:**
- Create: `apps/docs/lib/docs/button.ts`

- [ ] **Step 1: Create lib/docs/button.ts**

```tsx
// apps/docs/lib/docs/button.ts
// NOTE: This file uses JSX. Rename to button.tsx if your TS config requires it.
// With moduleResolution: bundler and jsx: preserve, .ts files allow JSX in Next.js 14.
// If you get a JSX error, rename to button.tsx and update the import in index.ts.
import { createElement as h } from 'react'
import { Button, Spinner } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const buttonDoc: ComponentDoc = {
  title: 'Button',
  slug: 'button',
  description:
    'A clickable element used to trigger actions. Supports four semantic variants, three sizes, and loading/disabled states.',
  whenToUse: [
    'Triggering form submissions',
    'Initiating actions like "Save", "Delete", or "Confirm"',
    'Primary calls-to-action on a page',
    'Destructive actions using the danger variant',
  ],
  whenNotToUse: [
    'Navigating to another URL — use the Link component instead',
    'Displaying status or labels — use Badge or Alert instead',
    'Inline toggles — use Toggle instead',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-3' },
      h(Button, { variant: 'primary' }, 'Primary'),
      h(Button, { variant: 'secondary' }, 'Secondary'),
      h(Button, { variant: 'ghost' }, 'Ghost'),
      h(Button, { variant: 'danger' }, 'Danger'),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3' },
          h(Button, { variant: 'primary' }, 'Primary'),
          h(Button, { variant: 'secondary' }, 'Secondary'),
          h(Button, { variant: 'ghost' }, 'Ghost'),
          h(Button, { variant: 'danger' }, 'Danger'),
        ),
    },
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-center' },
          h(Button, { size: 'sm' }, 'Small'),
          h(Button, { size: 'md' }, 'Medium'),
          h(Button, { size: 'lg' }, 'Large'),
        ),
    },
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-center' },
          h(Button, { variant: 'primary' }, 'Default'),
          h(Button, { variant: 'primary', disabled: true }, 'Disabled'),
          h(Button, { variant: 'primary', loading: true }, 'Loading'),
        ),
    },
  ],
  usage: `import { Button } from '@ds/ui'

// Basic usage
<Button variant="primary" size="md">Save changes</Button>

// All variants
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="danger">Delete account</Button>

// States
<Button variant="primary" disabled>Disabled</Button>
<Button variant="primary" loading>Saving...</Button>

// Size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>`,
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost' | 'danger'",
      default: "'primary'",
      description: 'Visual style variant. Use primary for main CTA, danger for destructive actions.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls padding and font size.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a spinner and disables interaction. Sets aria-busy.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the button and reduces opacity.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes merged via cn().',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button label or content.',
    },
    {
      name: '...rest',
      type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
      description: 'All native button attributes (onClick, type, form, etc.).',
    },
  ],
  tokens: [
    { name: '--button-bg', value: 'var(--color-brand)', description: 'Primary variant background' },
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius — 4px (sharp)' },
  ],
}
```

- [ ] **Step 2: Verify the docs page renders**

Run: `cd apps/docs && npm run dev`
Navigate to: `http://localhost:3000/components/button`
Expected: Page renders with all 6 sections — Overview, Live Preview showing 4 Button variants, Variants accordion, Code block with syntax highlighting, Props table with 7 rows, Tokens table with 2 rows.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/lib/docs/button.ts
git commit -m "feat(docs): add Button docs entry — full exemplar"
```

---

### Task 8: Remaining Actions, Forms, Navigation, Feedback docs

**Files:**
- Create: `apps/docs/lib/docs/actions.ts`
- Create: `apps/docs/lib/docs/forms.ts`
- Create: `apps/docs/lib/docs/navigation.ts`
- Create: `apps/docs/lib/docs/feedback.ts`

Each doc entry follows the same `ComponentDoc` shape as `buttonDoc`. The full fields are required — preview function, variants array, usage string, props array, tokens array.

- [ ] **Step 1: Create lib/docs/actions.ts**

```tsx
import { createElement as h } from 'react'
import { IconButton, Link, FAB, SplitButton } from '@ds/ui'
import { Plus, Edit, Share, Trash2, ChevronDown } from 'lucide-react'
import type { ComponentDoc } from '@/lib/types'

export const iconButtonDoc: ComponentDoc = {
  title: 'Icon Button',
  slug: 'icon-button',
  description: 'A square button containing only an icon. Use when label text is not needed or available space is limited.',
  whenToUse: ['Toolbars where labels waste space', 'Actions with universally understood icons (close, edit, delete)'],
  whenNotToUse: ['Primary page CTAs — use Button with label instead', 'Actions whose meaning is ambiguous without a label'],
  preview: () =>
    h('div', { className: 'flex gap-3' },
      h(IconButton, { icon: h(Edit, { size: 16 }), 'aria-label': 'Edit' }),
      h(IconButton, { icon: h(Share, { size: 16 }), 'aria-label': 'Share', variant: 'secondary' }),
      h(IconButton, { icon: h(Trash2, { size: 16 }), 'aria-label': 'Delete', variant: 'danger' }),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex gap-3' },
          h(IconButton, { icon: h(Edit, { size: 16 }), 'aria-label': 'Edit', variant: 'primary' }),
          h(IconButton, { icon: h(Edit, { size: 16 }), 'aria-label': 'Edit', variant: 'secondary' }),
          h(IconButton, { icon: h(Edit, { size: 16 }), 'aria-label': 'Edit', variant: 'ghost' }),
          h(IconButton, { icon: h(Trash2, { size: 16 }), 'aria-label': 'Delete', variant: 'danger' }),
        ),
    },
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex gap-3 items-center' },
          h(IconButton, { icon: h(Edit, { size: 14 }), 'aria-label': 'Edit', size: 'sm' }),
          h(IconButton, { icon: h(Edit, { size: 16 }), 'aria-label': 'Edit', size: 'md' }),
          h(IconButton, { icon: h(Edit, { size: 20 }), 'aria-label': 'Edit', size: 'lg' }),
        ),
    },
  ],
  usage: `import { IconButton } from '@ds/ui'
import { Edit } from 'lucide-react'

<IconButton icon={<Edit size={16} />} aria-label="Edit item" variant="secondary" />`,
  props: [
    { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element to render inside the button.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'secondary'", description: 'Visual style.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'aria-label', type: 'string', required: true, description: 'Accessible label — required since there is no visible text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
  ],
  tokens: [
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius — 4px' },
  ],
}

export const linkDoc: ComponentDoc = {
  title: 'Link',
  slug: 'link',
  description: 'An inline hyperlink. Use for navigation, not for triggering actions.',
  whenToUse: ['Navigating to another page or URL', 'Inline text links within paragraphs'],
  whenNotToUse: ['Triggering actions — use Button instead', 'Navigation that looks like a button — use Button with link styling'],
  preview: () =>
    h('div', { className: 'flex gap-6' },
      h(Link, { href: '#' }, 'Internal link'),
      h(Link, { href: '#', external: true }, 'External link'),
    ),
  variants: [
    {
      label: 'External',
      preview: () =>
        h('div', { className: 'flex gap-6' },
          h(Link, { href: '#' }, 'Internal'),
          h(Link, { href: '#', external: true }, 'External (opens in new tab)'),
        ),
    },
  ],
  usage: `import { Link } from '@ds/ui'

<Link href="/docs">Read the docs</Link>
<Link href="https://example.com" external>External site</Link>`,
  props: [
    { name: 'href', type: 'string', required: true, description: 'Destination URL.' },
    { name: 'external', type: 'boolean', default: 'false', description: 'Opens in new tab. Adds rel="noopener noreferrer" and an external icon.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Link text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Link colour' },
  ],
}

export const fabDoc: ComponentDoc = {
  title: 'FAB',
  slug: 'fab',
  description: 'Floating Action Button. The primary action for a view, rendered fixed to the bottom-right corner.',
  whenToUse: ['Single primary action on a mobile-first page', 'Create-new actions (compose, add, upload)'],
  whenNotToUse: ['Desktop-primary layouts where a regular Button is clearer', 'When there are multiple primary actions'],
  preview: () =>
    h('div', { className: 'relative h-24 w-64 border border-(--color-border) rounded-(--radius-lg)' },
      h(FAB, { icon: h(Plus, { size: 20 }), 'aria-label': 'Create new', className: 'absolute bottom-4 right-4' }),
    ),
  variants: [
    {
      label: 'With label',
      preview: () =>
        h('div', { className: 'relative h-24 w-64 border border-(--color-border) rounded-(--radius-lg)' },
          h(FAB, { icon: h(Plus, { size: 20 }), label: 'New item', 'aria-label': 'Create new item', className: 'absolute bottom-4 right-4' }),
        ),
    },
  ],
  usage: `import { FAB } from '@ds/ui'
import { Plus } from 'lucide-react'

// Typically placed inside a relative-positioned container or fixed globally
<FAB icon={<Plus size={20} />} aria-label="Create new" />
<FAB icon={<Plus size={20} />} label="New" aria-label="Create new item" />`,
  props: [
    { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element.' },
    { name: 'label', type: 'string', description: 'Optional visible text label rendered next to the icon.' },
    { name: 'aria-label', type: 'string', required: true, description: 'Accessible label.' },
    { name: 'className', type: 'string', description: 'Use to position (absolute/fixed) the FAB.' },
  ],
  tokens: [
    { name: '--button-bg', value: 'var(--color-brand)', description: 'FAB background' },
    { name: '--shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', description: 'FAB elevation shadow' },
  ],
}

export const splitButtonDoc: ComponentDoc = {
  title: 'Split Button',
  slug: 'split-button',
  description: 'A button with a primary action and a dropdown trigger for secondary actions.',
  whenToUse: ['When a primary action has closely related secondary actions', '"Save" with "Save as draft", "Save and close" variants'],
  whenNotToUse: ['When actions are unrelated — use separate buttons', 'More than 5 dropdown options — use a dedicated menu'],
  preview: () =>
    h(SplitButton, {
      label: 'Save',
      onClick: () => {},
      actions: [
        { label: 'Save as draft', onClick: () => {} },
        { label: 'Save and close', onClick: () => {} },
      ],
    }),
  variants: [
    {
      label: 'Variants',
      preview: () =>
        h('div', { className: 'flex gap-4' },
          h(SplitButton, {
            label: 'Save', variant: 'primary', onClick: () => {},
            actions: [{ label: 'Save as draft', onClick: () => {} }],
          }),
          h(SplitButton, {
            label: 'Export', variant: 'secondary', onClick: () => {},
            actions: [{ label: 'Export as CSV', onClick: () => {} }, { label: 'Export as PDF', onClick: () => {} }],
          }),
        ),
    },
  ],
  usage: `import { SplitButton } from '@ds/ui'

<SplitButton
  label="Save"
  onClick={() => handleSave()}
  actions={[
    { label: 'Save as draft', onClick: () => handleDraft() },
    { label: 'Save and close', onClick: () => handleSaveClose() },
  ]}
/>`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Primary button label.' },
    { name: 'onClick', type: '() => void', required: true, description: 'Primary action handler.' },
    { name: 'actions', type: 'Array<{ label: string; onClick: () => void }>', required: true, description: 'Dropdown actions.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'danger'", default: "'primary'", description: 'Visual style.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both parts.' },
  ],
  tokens: [
    { name: '--button-bg', value: 'var(--color-brand)', description: 'Button background' },
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius' },
  ],
}
```

- [ ] **Step 2: Create lib/docs/forms.ts**

```tsx
import { createElement as h } from 'react'
import { Input, Textarea, Select, Checkbox, Radio, Toggle, Slider, DatePicker } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const inputDoc: ComponentDoc = {
  title: 'Input',
  slug: 'input',
  description: 'A single-line text field. Supports default, error, and disabled states with optional leading/trailing icons.',
  whenToUse: ['Collecting single-line text (name, email, search)', 'Form fields that need labels and error messages'],
  whenNotToUse: ['Multi-line text — use Textarea', 'Selecting from a list — use Select'],
  preview: () => h(Input, { placeholder: 'Email address', type: 'email' }),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 w-72' },
          h(Input, { placeholder: 'Default state' }),
          h(Input, { placeholder: 'Error state', error: true, errorMessage: 'This field is required' }),
          h(Input, { placeholder: 'Disabled state', disabled: true }),
        ),
    },
  ],
  usage: `import { Input } from '@ds/ui'

<Input placeholder="Email address" type="email" />
<Input placeholder="With error" error errorMessage="Email is required" />
<Input placeholder="With icon" leadingIcon={<Mail size={16} />} />`,
  props: [
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Applies error border and colour.' },
    { name: 'errorMessage', type: 'string', description: 'Error text shown below the input when error is true.' },
    { name: 'leadingIcon', type: 'React.ReactNode', description: 'Icon rendered inside the left edge.' },
    { name: 'trailingIcon', type: 'React.ReactNode', description: 'Icon rendered inside the right edge.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: '...rest', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes.' },
  ],
  tokens: [
    { name: '--input-border', value: 'var(--color-border)', description: 'Default border colour' },
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius — 4px' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Error state border and message colour' },
  ],
}

export const textareaDoc: ComponentDoc = {
  title: 'Textarea',
  slug: 'textarea',
  description: 'A multi-line text input. Use for comments, descriptions, or any free-form text longer than one line.',
  whenToUse: ['Comments and notes', 'Message composition', 'Any text likely to span multiple lines'],
  whenNotToUse: ['Single-line input — use Input instead'],
  preview: () => h(Textarea, { placeholder: 'Write a comment...', rows: 3 }),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 w-72' },
          h(Textarea, { placeholder: 'Default', rows: 2 }),
          h(Textarea, { placeholder: 'Error state', rows: 2, error: true, errorMessage: 'Required' }),
          h(Textarea, { placeholder: 'Disabled', rows: 2, disabled: true }),
        ),
    },
  ],
  usage: `import { Textarea } from '@ds/ui'

<Textarea placeholder="Write a comment..." rows={4} />
<Textarea placeholder="With error" error errorMessage="Comment is required" />`,
  props: [
    { name: 'rows', type: 'number', default: '3', description: 'Initial visible row count.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state styling.' },
    { name: 'errorMessage', type: 'string', description: 'Error message shown below.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    { name: '...rest', type: 'React.TextareaHTMLAttributes<HTMLTextAreaElement>', description: 'All native textarea attributes.' },
  ],
  tokens: [
    { name: '--input-border', value: 'var(--color-border)', description: 'Border colour' },
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius' },
  ],
}

export const selectDoc: ComponentDoc = {
  title: 'Select',
  slug: 'select',
  description: 'A dropdown for selecting one option from a list.',
  whenToUse: ['5+ options where radio buttons would be too long', 'Constrained space like table cells or filter bars'],
  whenNotToUse: ['2–4 options — use Radio instead', 'Selecting multiple — use a multi-select or Checkbox group'],
  preview: () =>
    h(Select, {
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ],
      placeholder: 'Choose a framework',
    }),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 w-64' },
          h(Select, { options: [{ value: 'a', label: 'Option A' }], placeholder: 'Default' }),
          h(Select, { options: [{ value: 'a', label: 'Option A' }], placeholder: 'Error', error: true }),
          h(Select, { options: [{ value: 'a', label: 'Option A' }], placeholder: 'Disabled', disabled: true }),
        ),
    },
  ],
  usage: `import { Select } from '@ds/ui'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

<Select options={options} placeholder="Choose a framework" onChange={(val) => console.log(val)} />`,
  props: [
    { name: 'options', type: 'Array<{ value: string; label: string }>', required: true, description: 'List of options.' },
    { name: 'value', type: 'string', description: 'Controlled selected value.' },
    { name: 'onChange', type: '(value: string) => void', description: 'Change handler.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder when no option is selected.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  ],
  tokens: [
    { name: '--input-border', value: 'var(--color-border)', description: 'Border colour' },
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius' },
  ],
}

export const checkboxDoc: ComponentDoc = {
  title: 'Checkbox',
  slug: 'checkbox',
  description: 'A binary on/off control. Use for multi-select option groups or agreeing to terms.',
  whenToUse: ['Selecting multiple items from a list', 'Agree-to-terms confirmations'],
  whenNotToUse: ['Single binary setting — use Toggle for immediate-effect settings'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Checkbox, { label: 'Email notifications', defaultChecked: true }),
      h(Checkbox, { label: 'SMS notifications' }),
      h(Checkbox, { label: 'Disabled option', disabled: true }),
    ),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Checkbox, { label: 'Unchecked' }),
          h(Checkbox, { label: 'Checked', defaultChecked: true }),
          h(Checkbox, { label: 'Disabled', disabled: true }),
          h(Checkbox, { label: 'Disabled checked', disabled: true, defaultChecked: true }),
        ),
    },
  ],
  usage: `import { Checkbox } from '@ds/ui'

<Checkbox label="Accept terms and conditions" onChange={(checked) => setAccepted(checked)} />`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label text.' },
    { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Uncontrolled initial state.' },
    { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Checked background colour' },
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Checkbox border radius' },
  ],
}

export const radioDoc: ComponentDoc = {
  title: 'Radio',
  slug: 'radio',
  description: 'A mutually exclusive selection control. Use in a RadioGroup for selecting exactly one option.',
  whenToUse: ['2–4 options where all choices should be visible', 'Settings where selection is mutually exclusive'],
  whenNotToUse: ['5+ options — use Select', 'Binary toggle with immediate effect — use Toggle'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Radio, { name: 'plan', value: 'free', label: 'Free plan', defaultChecked: true }),
      h(Radio, { name: 'plan', value: 'pro', label: 'Pro plan' }),
      h(Radio, { name: 'plan', value: 'enterprise', label: 'Enterprise', disabled: true }),
    ),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Radio, { name: 'r', value: 'a', label: 'Unselected' }),
          h(Radio, { name: 'r', value: 'b', label: 'Selected', defaultChecked: true }),
          h(Radio, { name: 'r', value: 'c', label: 'Disabled', disabled: true }),
        ),
    },
  ],
  usage: `import { Radio } from '@ds/ui'

<fieldset>
  <Radio name="plan" value="free" label="Free" defaultChecked />
  <Radio name="plan" value="pro" label="Pro" />
  <Radio name="plan" value="enterprise" label="Enterprise" />
</fieldset>`,
  props: [
    { name: 'name', type: 'string', required: true, description: 'Radio group name — same for all radios in a group.' },
    { name: 'value', type: 'string', required: true, description: 'Value submitted with the form.' },
    { name: 'label', type: 'string', required: true, description: 'Visible label.' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initially selected.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the radio.' },
    { name: 'onChange', type: '(value: string) => void', description: 'Change handler.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Selected indicator colour' },
  ],
}

export const toggleDoc: ComponentDoc = {
  title: 'Toggle',
  slug: 'toggle',
  description: 'An on/off switch with immediate visual effect. Use for settings that apply instantly.',
  whenToUse: ['Settings with immediate effect (dark mode, notifications on/off)', 'Feature flags in admin panels'],
  whenNotToUse: ['Form submissions where the user must confirm — use Checkbox'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Toggle, { label: 'Email notifications', defaultChecked: true }),
      h(Toggle, { label: 'Dark mode' }),
      h(Toggle, { label: 'Disabled', disabled: true }),
    ),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Toggle, { label: 'Off' }),
          h(Toggle, { label: 'On', defaultChecked: true }),
          h(Toggle, { label: 'Disabled', disabled: true }),
        ),
    },
  ],
  usage: `import { Toggle } from '@ds/ui'

<Toggle label="Email notifications" checked={enabled} onChange={setEnabled} />`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label.' },
    { name: 'checked', type: 'boolean', description: 'Controlled state.' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Uncontrolled initial state.' },
    { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Active track colour' },
    { name: '--radius-full', value: '9999px', description: 'Pill shape for track and thumb' },
  ],
}

export const sliderDoc: ComponentDoc = {
  title: 'Slider',
  slug: 'slider',
  description: 'A range input for selecting a numeric value within a min–max range.',
  whenToUse: ['Volume, brightness, opacity controls', 'Price range filters'],
  whenNotToUse: ['Precise numeric input — use Input type="number" instead'],
  preview: () => h(Slider, { min: 0, max: 100, defaultValue: 60, label: 'Volume' }),
  variants: [
    {
      label: 'Range',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 w-72' },
          h(Slider, { min: 0, max: 100, defaultValue: 30, label: '0–100' }),
          h(Slider, { min: 0, max: 10, defaultValue: 5, step: 1, label: '0–10 (step 1)' }),
          h(Slider, { min: 0, max: 100, defaultValue: 50, disabled: true, label: 'Disabled' }),
        ),
    },
  ],
  usage: `import { Slider } from '@ds/ui'

<Slider min={0} max={100} defaultValue={50} label="Volume" onChange={(val) => setVolume(val)} />`,
  props: [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment step.' },
    { name: 'value', type: 'number', description: 'Controlled value.' },
    { name: 'defaultValue', type: 'number', description: 'Uncontrolled initial value.' },
    { name: 'label', type: 'string', required: true, description: 'Accessible label.' },
    { name: 'onChange', type: '(value: number) => void', description: 'Change handler.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Track fill and thumb colour' },
    { name: '--radius-full', value: '9999px', description: 'Pill shape on track and thumb' },
  ],
}

export const datePickerDoc: ComponentDoc = {
  title: 'Date Picker',
  slug: 'date-picker',
  description: 'A calendar-based date selection input. Opens a popover with a monthly calendar on click.',
  whenToUse: ['Date of birth, event date, booking date fields', 'When the date should be selected from a calendar, not typed'],
  whenNotToUse: ['Relative dates ("in 3 days") — use a different UI', 'Date ranges — pair two DatePicker instances or use a dedicated range picker'],
  preview: () => h(DatePicker, { label: 'Select date', placeholder: 'Pick a date' }),
  variants: [
    {
      label: 'State',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 w-64' },
          h(DatePicker, { label: 'Default', placeholder: 'Pick a date' }),
          h(DatePicker, { label: 'Error', placeholder: 'Pick a date', error: true, errorMessage: 'Date required' }),
          h(DatePicker, { label: 'Disabled', placeholder: 'Pick a date', disabled: true }),
        ),
    },
  ],
  usage: `import { DatePicker } from '@ds/ui'

<DatePicker
  label="Start date"
  value={date}
  onChange={(date) => setDate(date)}
  placeholder="Pick a date"
/>`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Accessible label.' },
    { name: 'value', type: 'Date | undefined', description: 'Controlled selected date.' },
    { name: 'onChange', type: '(date: Date) => void', description: 'Called when a date is selected.' },
    { name: 'placeholder', type: 'string', description: 'Shown when no date is selected.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state.' },
    { name: 'errorMessage', type: 'string', description: 'Error message below the field.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
    { name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
  ],
  tokens: [
    { name: '--input-border', value: 'var(--color-border)', description: 'Input border colour' },
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Input border radius' },
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Selected day highlight' },
  ],
}
```

- [ ] **Step 3: Create lib/docs/navigation.ts**

```tsx
import { createElement as h } from 'react'
import { NavBar, Tabs, Breadcrumb, Sidebar as SidebarComponent, Pagination } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const navBarDoc: ComponentDoc = {
  title: 'Nav Bar',
  slug: 'nav-bar',
  description: 'A horizontal top navigation bar with logo, nav links, and optional actions.',
  whenToUse: ['Primary site navigation', 'App header with logo and user menu'],
  whenNotToUse: ['In-page tab navigation — use Tabs', 'Complex nested navigation — use Sidebar'],
  preview: () =>
    h(NavBar, {
      logo: h('span', { className: 'font-bold text-(--color-text-primary)' }, 'Acme'),
      links: [
        { label: 'Home', href: '#', active: true },
        { label: 'Products', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    }),
  variants: [
    {
      label: 'With actions',
      preview: () =>
        h(NavBar, {
          logo: h('span', { className: 'font-bold' }, 'Acme'),
          links: [{ label: 'Home', href: '#', active: true }, { label: 'Docs', href: '#' }],
          actions: h('button', { className: 'text-sm text-(--color-text-secondary)' }, 'Sign in'),
        }),
    },
  ],
  usage: `import { NavBar } from '@ds/ui'

<NavBar
  logo={<img src="/logo.svg" alt="Acme" />}
  links={[
    { label: 'Home', href: '/', active: true },
    { label: 'Docs', href: '/docs' },
  ]}
  actions={<Button size="sm">Sign in</Button>}
/>`,
  props: [
    { name: 'logo', type: 'React.ReactNode', required: true, description: 'Logo element (image or text).' },
    { name: 'links', type: "Array<{ label: string; href: string; active?: boolean }>", required: true, description: 'Navigation links.' },
    { name: 'actions', type: 'React.ReactNode', description: 'Right-side content (sign in button, user avatar, etc.).' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Nav bar background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Bottom border colour' },
  ],
}

export const tabsDoc: ComponentDoc = {
  title: 'Tabs',
  slug: 'tabs',
  description: 'Horizontal tab navigation for switching between content panels within a page.',
  whenToUse: ['Switching between related content views (Overview / Code / Tokens)', 'Reducing page length by hiding secondary content'],
  whenNotToUse: ['Navigation between pages — use NavBar or Sidebar', 'More than 7 tabs — use a Select instead'],
  preview: () =>
    h(Tabs, {
      tabs: [
        { label: 'Overview', value: 'overview', content: h('p', { className: 'pt-4 text-sm text-(--color-text-secondary)' }, 'Overview content') },
        { label: 'Code', value: 'code', content: h('p', { className: 'pt-4 text-sm text-(--color-text-secondary)' }, 'Code content') },
        { label: 'Props', value: 'props', content: h('p', { className: 'pt-4 text-sm text-(--color-text-secondary)' }, 'Props content') },
      ],
      defaultValue: 'overview',
    }),
  variants: [
    {
      label: 'Three tabs',
      preview: () =>
        h(Tabs, {
          tabs: [
            { label: 'Tab 1', value: '1', content: h('p', { className: 'pt-4 text-sm' }, 'Content 1') },
            { label: 'Tab 2', value: '2', content: h('p', { className: 'pt-4 text-sm' }, 'Content 2') },
            { label: 'Tab 3', value: '3', content: h('p', { className: 'pt-4 text-sm' }, 'Content 3') },
          ],
          defaultValue: '1',
        }),
    },
  ],
  usage: `import { Tabs } from '@ds/ui'

<Tabs
  tabs={[
    { label: 'Overview', value: 'overview', content: <Overview /> },
    { label: 'Code', value: 'code', content: <CodeBlock code={...} /> },
  ]}
  defaultValue="overview"
/>`,
  props: [
    { name: 'tabs', type: "Array<{ label: string; value: string; content: React.ReactNode }>", required: true, description: 'Tab items.' },
    { name: 'defaultValue', type: 'string', description: 'Initially selected tab value.' },
    { name: 'value', type: 'string', description: 'Controlled active tab value.' },
    { name: 'onChange', type: '(value: string) => void', description: 'Called when active tab changes.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Active tab underline colour' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Tab bar bottom border' },
  ],
}

export const breadcrumbDoc: ComponentDoc = {
  title: 'Breadcrumb',
  slug: 'breadcrumb',
  description: 'A secondary navigation trail showing the current page\'s location within the hierarchy.',
  whenToUse: ['Deep hierarchical navigation (3+ levels)', 'Helping users understand where they are'],
  whenNotToUse: ['Flat navigation with no hierarchy', 'Mobile where horizontal space is limited — truncate or hide'],
  preview: () =>
    h(Breadcrumb, {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumb' },
      ],
    }),
  variants: [
    {
      label: 'Two levels',
      preview: () =>
        h(Breadcrumb, {
          items: [{ label: 'Home', href: '#' }, { label: 'Current page' }],
        }),
    },
  ],
  usage: `import { Breadcrumb } from '@ds/ui'

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },  // last item has no href — current page
  ]}
/>`,
  props: [
    { name: 'items', type: "Array<{ label: string; href?: string }>", required: true, description: 'Breadcrumb items. Last item with no href is the current page.' },
    { name: 'separator', type: 'React.ReactNode', default: "'/'", description: 'Separator element between items.' },
  ],
  tokens: [
    { name: '--color-text-secondary', value: 'var(--color-slate-600)', description: 'Link and separator colour' },
    { name: '--color-text-primary', value: 'var(--color-slate-900)', description: 'Current page label colour' },
  ],
}

export const sidebarDoc: ComponentDoc = {
  title: 'Sidebar',
  slug: 'sidebar',
  description: 'A vertical navigation panel, typically fixed on the left side of the layout.',
  whenToUse: ['Application navigation with many sections', 'Dashboard layouts with persistent nav'],
  whenNotToUse: ['Marketing sites — use NavBar', 'Simple apps with 2–3 pages — use Tabs or NavBar'],
  preview: () =>
    h('div', { className: 'w-48 border border-(--color-border) rounded-(--radius-lg) overflow-hidden' },
      h(SidebarComponent, {
        groups: [
          {
            title: 'General',
            items: [
              { label: 'Dashboard', href: '#', active: true },
              { label: 'Settings', href: '#' },
            ],
          },
        ],
      }),
    ),
  variants: [
    {
      label: 'With groups',
      preview: () =>
        h('div', { className: 'w-48 border border-(--color-border) rounded-(--radius-lg) overflow-hidden' },
          h(SidebarComponent, {
            groups: [
              { title: 'Main', items: [{ label: 'Home', href: '#', active: true }, { label: 'Explore', href: '#' }] },
              { title: 'Account', items: [{ label: 'Profile', href: '#' }, { label: 'Billing', href: '#' }] },
            ],
          }),
        ),
    },
  ],
  usage: `import { Sidebar } from '@ds/ui'

<Sidebar
  groups={[
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
        { label: 'Projects', href: '/projects' },
      ],
    },
  ]}
/>`,
  props: [
    { name: 'groups', type: "Array<{ title: string; items: Array<{ label: string; href: string; active?: boolean }> }>", required: true, description: 'Navigation groups.' },
    { name: 'header', type: 'React.ReactNode', description: 'Content rendered above the nav groups (logo, etc.).' },
    { name: 'footer', type: 'React.ReactNode', description: 'Content rendered below the nav groups (user avatar, etc.).' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Sidebar background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Right border colour' },
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Active item background' },
  ],
}

export const paginationDoc: ComponentDoc = {
  title: 'Pagination',
  slug: 'pagination',
  description: 'A row of page controls for navigating multi-page data sets.',
  whenToUse: ['Tables or lists with 10+ items that span multiple pages', 'Search results with many pages'],
  whenNotToUse: ['Small data sets that fit on one page', 'Infinite scroll — use a load-more button instead'],
  preview: () =>
    h(Pagination, { page: 3, totalPages: 10, onPageChange: () => {} }),
  variants: [
    {
      label: 'Few pages',
      preview: () =>
        h(Pagination, { page: 1, totalPages: 3, onPageChange: () => {} }),
    },
    {
      label: 'Many pages (truncated)',
      preview: () =>
        h(Pagination, { page: 5, totalPages: 20, onPageChange: () => {} }),
    },
  ],
  usage: `import { Pagination } from '@ds/ui'

<Pagination
  page={currentPage}
  totalPages={Math.ceil(total / pageSize)}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
  props: [
    { name: 'page', type: 'number', required: true, description: 'Current active page (1-indexed).' },
    { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages.' },
    { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called with the new page number.' },
    { name: 'siblingCount', type: 'number', default: '1', description: 'Number of pages shown on each side of the current page.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Active page button background' },
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Page button border radius' },
  ],
}
```

- [ ] **Step 4: Create lib/docs/feedback.ts**

```tsx
import { createElement as h } from 'react'
import { Badge, Toast, Alert, Tooltip, Progress, Skeleton, Spinner } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const badgeDoc: ComponentDoc = {
  title: 'Badge',
  slug: 'badge',
  description: 'A small pill label used to indicate status, count, or category.',
  whenToUse: ['Status labels (Active, Draft, Error)', 'Notification counts', 'Category tags'],
  whenNotToUse: ['Long text — badges truncate; use a Tag or Chip instead'],
  preview: () =>
    h('div', { className: 'flex gap-2' },
      h(Badge, { variant: 'info' }, 'Info'),
      h(Badge, { variant: 'success' }, 'Success'),
      h(Badge, { variant: 'warning' }, 'Warning'),
      h(Badge, { variant: 'danger' }, 'Error'),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-2' },
          h(Badge, { variant: 'info' }, 'Info'),
          h(Badge, { variant: 'success' }, 'Success'),
          h(Badge, { variant: 'warning' }, 'Warning'),
          h(Badge, { variant: 'danger' }, 'Error'),
          h(Badge, { variant: 'neutral' }, 'Neutral'),
        ),
    },
  ],
  usage: `import { Badge } from '@ds/ui'

<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Beta</Badge>`,
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'neutral'", description: 'Semantic colour variant.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Badge label.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--badge-radius', value: 'var(--radius-full)', description: 'Pill border radius (9999px)' },
    { name: '--color-info', value: 'var(--color-sky-600)', description: 'Info variant colour' },
    { name: '--color-success', value: 'var(--color-green-600)', description: 'Success variant colour' },
    { name: '--color-warning', value: 'var(--color-amber-600)', description: 'Warning variant colour' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Danger variant colour' },
  ],
}

export const toastDoc: ComponentDoc = {
  title: 'Toast',
  slug: 'toast',
  description: 'A transient notification that appears at the edge of the screen and auto-dismisses.',
  whenToUse: ['Confirming actions ("Saved", "Deleted")', 'Non-blocking error messages'],
  whenNotToUse: ['Critical errors requiring user action — use Alert in-page', 'Long messages — Toast truncates after ~80 chars'],
  preview: () =>
    h(Toast, { message: 'Changes saved successfully.', variant: 'success' }),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Toast, { message: 'Info message', variant: 'info' }),
          h(Toast, { message: 'Success — changes saved', variant: 'success' }),
          h(Toast, { message: 'Warning: disk almost full', variant: 'warning' }),
          h(Toast, { message: 'Error: could not save', variant: 'danger' }),
        ),
    },
  ],
  usage: `import { Toast } from '@ds/ui'

// Controlled display — show and auto-dismiss
const [show, setShow] = useState(false)

<Toast
  message="Changes saved"
  variant="success"
  open={show}
  onClose={() => setShow(false)}
  duration={3000}
/>`,
  props: [
    { name: 'message', type: 'string', required: true, description: 'Toast message text.' },
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic colour.' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility.' },
    { name: 'onClose', type: '() => void', description: 'Called when the toast dismisses.' },
    { name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss delay in ms.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Toast background' },
    { name: '--shadow-lg', value: '...', description: 'Toast shadow elevation' },
    { name: '--radius-md', value: 'var(--radius-md)', description: 'Toast border radius' },
  ],
}

export const alertDoc: ComponentDoc = {
  title: 'Alert',
  slug: 'alert',
  description: 'An inline message banner for important contextual feedback.',
  whenToUse: ['Form-level validation errors', 'Page-level warnings ("You have unsaved changes")', 'Success confirmation after an action'],
  whenNotToUse: ['Transient notifications — use Toast', 'Minor helper text — use a label or caption'],
  preview: () =>
    h(Alert, { variant: 'info', title: 'Info', message: 'Your session expires in 10 minutes.' }),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Alert, { variant: 'info', title: 'Info', message: 'Informational alert.' }),
          h(Alert, { variant: 'success', title: 'Success', message: 'Operation completed.' }),
          h(Alert, { variant: 'warning', title: 'Warning', message: 'Review before continuing.' }),
          h(Alert, { variant: 'danger', title: 'Error', message: 'Something went wrong.' }),
        ),
    },
  ],
  usage: `import { Alert } from '@ds/ui'

<Alert
  variant="danger"
  title="Form errors"
  message="Please fix the errors below before submitting."
  onClose={() => setShowAlert(false)}
/>`,
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", required: true, description: 'Semantic colour variant.' },
    { name: 'title', type: 'string', required: true, description: 'Bold heading text.' },
    { name: 'message', type: 'string', required: true, description: 'Body message.' },
    { name: 'onClose', type: '() => void', description: 'If provided, shows a close button.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-info', value: 'var(--color-sky-600)', description: 'Info border and icon colour' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Danger border and icon colour' },
    { name: '--radius-md', value: '4px', description: 'Alert border radius' },
  ],
}

export const tooltipDoc: ComponentDoc = {
  title: 'Tooltip',
  slug: 'tooltip',
  description: 'A floating label that appears on hover/focus to explain a UI element.',
  whenToUse: ['Icon buttons with no visible label', 'Truncated text needing full content on hover', 'Abbreviations or technical terms needing definition'],
  whenNotToUse: ['Mobile-only contexts where hover is unavailable', 'Lengthy instructions — use a Popover instead'],
  preview: () =>
    h(Tooltip, { content: 'Copy to clipboard' },
      h('button', { className: 'px-3 py-1.5 text-sm border border-(--color-border) rounded-(--radius-md)' }, 'Hover me'),
    ),
  variants: [
    {
      label: 'Placement',
      preview: () =>
        h('div', { className: 'flex gap-6 py-8' },
          h(Tooltip, { content: 'Top', placement: 'top' },
            h('button', { className: 'px-2 py-1 text-xs border border-(--color-border) rounded-(--radius-md)' }, 'Top'),
          ),
          h(Tooltip, { content: 'Bottom', placement: 'bottom' },
            h('button', { className: 'px-2 py-1 text-xs border border-(--color-border) rounded-(--radius-md)' }, 'Bottom'),
          ),
          h(Tooltip, { content: 'Left', placement: 'left' },
            h('button', { className: 'px-2 py-1 text-xs border border-(--color-border) rounded-(--radius-md)' }, 'Left'),
          ),
          h(Tooltip, { content: 'Right', placement: 'right' },
            h('button', { className: 'px-2 py-1 text-xs border border-(--color-border) rounded-(--radius-md)' }, 'Right'),
          ),
        ),
    },
  ],
  usage: `import { Tooltip } from '@ds/ui'

<Tooltip content="Delete this item" placement="top">
  <IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="ghost" />
</Tooltip>`,
  props: [
    { name: 'content', type: 'string', required: true, description: 'Tooltip text.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Trigger element.' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred tooltip position.' },
    { name: 'delayMs', type: 'number', default: '300', description: 'Hover delay before showing.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Tooltip background (inverted in practice)' },
    { name: '--radius-md', value: '4px', description: 'Tooltip border radius' },
  ],
}

export const progressDoc: ComponentDoc = {
  title: 'Progress',
  slug: 'progress',
  description: 'A horizontal bar indicating completion percentage of a task or process.',
  whenToUse: ['File upload progress', 'Multi-step form completion', 'Loading states with known duration'],
  whenNotToUse: ['Unknown duration — use Spinner instead'],
  preview: () => h(Progress, { value: 65, label: 'Upload progress' }),
  variants: [
    {
      label: 'Values',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 w-64' },
          h(Progress, { value: 25, label: '25%' }),
          h(Progress, { value: 60, label: '60%' }),
          h(Progress, { value: 100, label: 'Complete', variant: 'success' }),
        ),
    },
  ],
  usage: `import { Progress } from '@ds/ui'

<Progress value={uploadProgress} label="Uploading file" />
<Progress value={100} variant="success" label="Upload complete" />`,
  props: [
    { name: 'value', type: 'number', required: true, description: 'Completion percentage (0–100).' },
    { name: 'label', type: 'string', required: true, description: 'Accessible label.' },
    { name: 'variant', type: "'default' | 'success'", default: "'default'", description: 'Colour variant.' },
    { name: 'showLabel', type: 'boolean', default: 'false', description: 'Shows percentage text next to the bar.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Default fill colour' },
    { name: '--color-success', value: 'var(--color-green-600)', description: 'Success fill colour' },
    { name: '--radius-full', value: '9999px', description: 'Track and fill border radius' },
  ],
}

export const skeletonDoc: ComponentDoc = {
  title: 'Skeleton',
  slug: 'skeleton',
  description: 'An animated placeholder shown while content is loading.',
  whenToUse: ['Before content loads from an API', 'Reducing perceived loading time'],
  whenNotToUse: ['Background operations the user doesn\'t need to wait for — show nothing', 'Known loading duration over 5s — use Progress'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3 w-64' },
      h(Skeleton, { className: 'h-4 w-3/4' }),
      h(Skeleton, { className: 'h-4 w-full' }),
      h(Skeleton, { className: 'h-4 w-1/2' }),
    ),
  variants: [
    {
      label: 'Card skeleton',
      preview: () =>
        h('div', { className: 'flex gap-3 p-4 border border-(--color-border) rounded-(--radius-lg) w-64' },
          h(Skeleton, { className: 'h-10 w-10 rounded-full shrink-0' }),
          h('div', { className: 'flex flex-col gap-2 flex-1' },
            h(Skeleton, { className: 'h-4 w-2/3' }),
            h(Skeleton, { className: 'h-3 w-full' }),
          ),
        ),
    },
  ],
  usage: `import { Skeleton } from '@ds/ui'

// Text lines
<Skeleton className="h-4 w-48" />

// Avatar placeholder
<Skeleton className="h-10 w-10 rounded-full" />

// Card placeholder
<div className="flex flex-col gap-2 p-4">
  <Skeleton className="h-4 w-2/3" />
  <Skeleton className="h-4 w-full" />
</div>`,
  props: [
    { name: 'className', type: 'string', description: 'Sets the skeleton dimensions and shape (width, height, border-radius).' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Skeleton base colour' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Shimmer highlight colour' },
  ],
}

export const spinnerDoc: ComponentDoc = {
  title: 'Spinner',
  slug: 'spinner',
  description: 'An animated circular loading indicator for indeterminate loading states.',
  whenToUse: ['Loading states with unknown duration', 'Button loading state (built into Button component)', 'Inline loading within content'],
  whenNotToUse: ['Known completion percentage — use Progress'],
  preview: () =>
    h('div', { className: 'flex gap-6 items-center' },
      h(Spinner, { size: 'sm' }),
      h(Spinner, { size: 'md' }),
      h(Spinner, { size: 'lg' }),
    ),
  variants: [
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex gap-6 items-center' },
          h(Spinner, { size: 'sm' }),
          h(Spinner, { size: 'md' }),
          h(Spinner, { size: 'lg' }),
        ),
    },
  ],
  usage: `import { Spinner } from '@ds/ui'

// Standalone loading state
<Spinner size="md" />

// With label for accessibility
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading...</span>
</div>`,
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner diameter.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Spinner arc colour' },
  ],
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/docs/lib/docs/actions.ts apps/docs/lib/docs/forms.ts apps/docs/lib/docs/navigation.ts apps/docs/lib/docs/feedback.ts
git commit -m "feat(docs): add Actions, Forms, Navigation, Feedback docs entries"
```

---

### Task 9: Containers, Data, Typography docs + final verification

**Files:**
- Create: `apps/docs/lib/docs/containers.ts`
- Create: `apps/docs/lib/docs/data.ts`
- Create: `apps/docs/lib/docs/typography.ts`

- [ ] **Step 1: Create lib/docs/containers.ts**

```tsx
import { createElement as h } from 'react'
import { Card, Modal, Drawer, Popover, Accordion, Divider } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const cardDoc: ComponentDoc = {
  title: 'Card',
  slug: 'card',
  description: 'A surface container for grouping related content with an optional header and footer.',
  whenToUse: ['Grouping related information (user profiles, product items, stats)', 'Dashboard widgets'],
  whenNotToUse: ['Full-page layout — use a main content area', 'Alert/feedback messages — use Alert'],
  preview: () =>
    h(Card, { className: 'w-64' },
      h(Card.Header, null, h('h3', { className: 'font-semibold text-(--color-text-primary)' }, 'Card title')),
      h(Card.Body, null, h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Card body content goes here.')),
      h(Card.Footer, null, h('button', { className: 'text-sm text-(--color-brand)' }, 'Action')),
    ),
  variants: [
    {
      label: 'Without header/footer',
      preview: () =>
        h(Card, { className: 'w-64' },
          h(Card.Body, null, h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Simple card with body only.')),
        ),
    },
  ],
  usage: `import { Card } from '@ds/ui'

<Card>
  <Card.Header>
    <h3>Card title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content.</p>
  </Card.Body>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>`,
  props: [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Card content (Card.Header, Card.Body, Card.Footer).' },
    { name: 'className', type: 'string', description: 'Additional CSS classes (width, etc.).' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Card background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Card border colour' },
    { name: '--radius-lg', value: '8px', description: 'Card border radius' },
  ],
}

export const modalDoc: ComponentDoc = {
  title: 'Modal',
  slug: 'modal',
  description: 'A dialog overlay that interrupts the user for a required decision or form.',
  whenToUse: ['Destructive confirmation dialogs ("Are you sure?")', 'Short forms that don\'t warrant a new page', 'Displaying focused detail without navigation'],
  whenNotToUse: ['Complex multi-step flows — open a new page', 'Non-critical information — use Toast or Alert'],
  preview: () =>
    h('div', { className: 'relative h-48 w-full' },
      h(Modal, {
        open: true,
        onClose: () => {},
        title: 'Confirm delete',
        className: 'static shadow-none',
      },
        h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'This action cannot be undone.'),
      ),
    ),
  variants: [
    {
      label: 'With footer actions',
      preview: () =>
        h('div', { className: 'relative h-56 w-full' },
          h(Modal, {
            open: true, onClose: () => {}, title: 'Delete account',
            className: 'static shadow-none',
            footer: h('div', { className: 'flex gap-2 justify-end' },
              h('button', { className: 'text-sm px-3 py-1.5 border border-(--color-border) rounded-(--radius-md)' }, 'Cancel'),
              h('button', { className: 'text-sm px-3 py-1.5 bg-(--color-danger) text-white rounded-(--radius-md)' }, 'Delete'),
            ),
          },
            h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'This will permanently delete your account.'),
          ),
        ),
    },
  ],
  usage: `import { Modal } from '@ds/ui'

const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm delete"
  footer={
    <div className="flex gap-2 justify-end">
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  }
>
  <p>This action cannot be undone.</p>
</Modal>`,
  props: [
    { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Mount/unmount happens inside.' },
    { name: 'onClose', type: '() => void', required: true, description: 'Called on overlay click and Escape key.' },
    { name: 'title', type: 'string', required: true, description: 'Modal heading.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Modal body.' },
    { name: 'footer', type: 'React.ReactNode', description: 'Footer content (action buttons).' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Maximum width.' },
  ],
  tokens: [
    { name: '--color-bg', value: 'var(--color-white)', description: 'Modal background' },
    { name: '--radius-lg', value: '8px', description: 'Modal border radius' },
    { name: '--shadow-xl', value: '...', description: 'Modal elevation shadow' },
  ],
}

export const drawerDoc: ComponentDoc = {
  title: 'Drawer',
  slug: 'drawer',
  description: 'A panel that slides in from the edge of the screen, used for secondary content or forms.',
  whenToUse: ['Detail views alongside a list (master–detail)', 'Settings panels', 'Long forms that need more space than a modal'],
  whenNotToUse: ['Simple confirmations — use Modal', 'Primary page content — use a page layout'],
  preview: () =>
    h('div', { className: 'relative h-48 border border-(--color-border) rounded-(--radius-lg) overflow-hidden' },
      h(Drawer, { open: true, onClose: () => {}, title: 'Edit profile', className: 'absolute' },
        h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Drawer body content.'),
      ),
    ),
  variants: [
    {
      label: 'Placement',
      preview: () =>
        h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Drawer placement (left/right) is controlled by the placement prop. Default is right.'),
    },
  ],
  usage: `import { Drawer } from '@ds/ui'

<Drawer
  open={isOpen}
  onClose={() => setOpen(false)}
  title="User details"
  placement="right"
>
  <UserForm onSubmit={handleSubmit} />
</Drawer>`,
  props: [
    { name: 'open', type: 'boolean', required: true, description: 'Controls visibility.' },
    { name: 'onClose', type: '() => void', required: true, description: 'Called on overlay click and Escape.' },
    { name: 'title', type: 'string', required: true, description: 'Drawer heading.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Drawer body.' },
    { name: 'placement', type: "'left' | 'right'", default: "'right'", description: 'Which edge the drawer slides from.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Drawer width.' },
  ],
  tokens: [
    { name: '--color-bg', value: 'var(--color-white)', description: 'Drawer panel background' },
    { name: '--shadow-xl', value: '...', description: 'Drawer shadow' },
  ],
}

export const popoverDoc: ComponentDoc = {
  title: 'Popover',
  slug: 'popover',
  description: 'A floating panel anchored to a trigger element, used for richer content than a Tooltip.',
  whenToUse: ['Rich content on hover/click (form fields, links)', 'Contextual menus with multiple actions', 'When Tooltip text is insufficient'],
  whenNotToUse: ['Simple text labels — use Tooltip', 'Complex overlapping content — use Modal'],
  preview: () =>
    h(Popover, {
      trigger: h('button', { className: 'px-3 py-1.5 text-sm border border-(--color-border) rounded-(--radius-md)' }, 'Open popover'),
      content: h('div', { className: 'p-3 w-48' },
        h('p', { className: 'text-sm font-semibold text-(--color-text-primary) mb-1' }, 'Popover title'),
        h('p', { className: 'text-xs text-(--color-text-secondary)' }, 'Rich content can go here.'),
      ),
    }),
  variants: [
    {
      label: 'Placement',
      preview: () =>
        h('div', { className: 'flex gap-4 py-8' },
          h(Popover, {
            trigger: h('button', { className: 'text-xs px-2 py-1 border border-(--color-border) rounded-(--radius-md)' }, 'Top'),
            placement: 'top',
            content: h('div', { className: 'p-2 text-xs' }, 'Top popover'),
          }),
          h(Popover, {
            trigger: h('button', { className: 'text-xs px-2 py-1 border border-(--color-border) rounded-(--radius-md)' }, 'Bottom'),
            placement: 'bottom',
            content: h('div', { className: 'p-2 text-xs' }, 'Bottom popover'),
          }),
        ),
    },
  ],
  usage: `import { Popover } from '@ds/ui'

<Popover
  trigger={<Button variant="ghost" size="sm">More options</Button>}
  placement="bottom"
  content={
    <div className="p-2 w-40">
      <button>Edit</button>
      <button>Duplicate</button>
      <button>Delete</button>
    </div>
  }
/>`,
  props: [
    { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Element that opens the popover on click.' },
    { name: 'content', type: 'React.ReactNode', required: true, description: 'Popover panel content.' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred position relative to trigger.' },
    { name: 'open', type: 'boolean', description: 'Controlled open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
  ],
  tokens: [
    { name: '--color-bg', value: 'var(--color-white)', description: 'Panel background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Panel border' },
    { name: '--radius-md', value: '4px', description: 'Panel border radius' },
    { name: '--shadow-md', value: '...', description: 'Panel shadow' },
  ],
}

export const accordionDoc: ComponentDoc = {
  title: 'Accordion',
  slug: 'accordion',
  description: 'A vertically stacked set of collapsible sections.',
  whenToUse: ['FAQ sections', 'Long settings pages with multiple groups', 'Progressive disclosure of secondary content'],
  whenNotToUse: ['Content that users always need — keep it always visible', 'Tab-style navigation — use Tabs'],
  preview: () =>
    h(Accordion, {
      items: [
        { title: 'What is a design system?', content: h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'A shared library of reusable components, tokens, and guidelines.') },
        { title: 'How do I contribute?', content: h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Open a PR following the contribution guide.') },
        { title: 'Is there a Figma file?', content: h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Yes — check the Figma link in the Introduction page.') },
      ],
    }),
  variants: [],
  usage: `import { Accordion } from '@ds/ui'

<Accordion
  items={[
    { title: 'Question one', content: <p>Answer to question one.</p> },
    { title: 'Question two', content: <p>Answer to question two.</p> },
  ]}
  allowMultiple
/>`,
  props: [
    { name: 'items', type: "Array<{ title: string; content: React.ReactNode }>", required: true, description: 'Accordion sections.' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allows multiple sections open simultaneously.' },
    { name: 'defaultOpen', type: 'number[]', description: 'Indices of sections open on initial render.' },
  ],
  tokens: [
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Section border colour' },
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Section header background' },
  ],
}

export const dividerDoc: ComponentDoc = {
  title: 'Divider',
  slug: 'divider',
  description: 'A horizontal or vertical line used to separate sections of content.',
  whenToUse: ['Separating form sections', 'Dividing list items', 'Visual separation between unrelated content groups'],
  whenNotToUse: ['Between every list item — use spacing instead', 'To create visual hierarchy — use headings and spacing'],
  preview: () =>
    h('div', { className: 'w-64' },
      h('p', { className: 'text-sm text-(--color-text-secondary) mb-3' }, 'Section above'),
      h(Divider, null),
      h('p', { className: 'text-sm text-(--color-text-secondary) mt-3' }, 'Section below'),
    ),
  variants: [
    {
      label: 'With label',
      preview: () =>
        h('div', { className: 'w-64' },
          h(Divider, { label: 'or' }),
        ),
    },
    {
      label: 'Vertical',
      preview: () =>
        h('div', { className: 'flex items-center gap-4 h-8' },
          h('span', { className: 'text-sm text-(--color-text-secondary)' }, 'Left'),
          h(Divider, { orientation: 'vertical' }),
          h('span', { className: 'text-sm text-(--color-text-secondary)' }, 'Right'),
        ),
    },
  ],
  usage: `import { Divider } from '@ds/ui'

<Divider />
<Divider label="or" />
<Divider orientation="vertical" className="h-6" />`,
  props: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Line direction.' },
    { name: 'label', type: 'string', description: 'Optional text label centered on the line.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Divider line colour' },
  ],
}
```

- [ ] **Step 2: Create lib/docs/data.ts**

```tsx
import { createElement as h } from 'react'
import { Table, List, Avatar, Chip } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const tableDoc: ComponentDoc = {
  title: 'Table',
  slug: 'table',
  description: 'A structured data grid for displaying rows and columns of information.',
  whenToUse: ['Displaying comparable data across multiple items', 'Admin panels, data dashboards, reports'],
  whenNotToUse: ['Simple lists with a single column — use List', 'Fewer than 3 columns — use Cards instead'],
  preview: () =>
    h(Table, {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { id: '1', name: 'Alice', role: 'Designer', status: 'Active' },
        { id: '2', name: 'Bob', role: 'Engineer', status: 'Away' },
        { id: '3', name: 'Carol', role: 'PM', status: 'Active' },
      ],
    }),
  variants: [],
  usage: `import { Table } from '@ds/ui'

<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]}
  rows={users.map((u) => ({ id: u.id, ...u }))}
  onRowClick={(row) => router.push(\`/users/\${row.id}\`)}
/>`,
  props: [
    { name: 'columns', type: "Array<{ key: string; label: string; render?: (row: Row) => React.ReactNode }>", required: true, description: 'Column definitions.' },
    { name: 'rows', type: 'Array<{ id: string } & Record<string, unknown>>', required: true, description: 'Data rows. Each row must have a unique id.' },
    { name: 'onRowClick', type: '(row: Row) => void', description: 'Optional row click handler.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows skeleton rows while loading.' },
    { name: 'emptyState', type: 'React.ReactNode', description: 'Content shown when rows is empty.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Header background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Row divider colour' },
    { name: '--radius-lg', value: '8px', description: 'Table container border radius' },
  ],
}

export const listDoc: ComponentDoc = {
  title: 'List',
  slug: 'list',
  description: 'A vertical list of items, each optionally clickable. Supports leading icons and trailing content.',
  whenToUse: ['Menus and option lists', 'Activity feeds', 'Simple navigation lists'],
  whenNotToUse: ['Tabular data with multiple columns — use Table'],
  preview: () =>
    h(List, {
      items: [
        { id: '1', label: 'Profile settings', description: 'Manage your account info' },
        { id: '2', label: 'Notifications', description: 'Configure alerts' },
        { id: '3', label: 'Security', description: 'Password and 2FA' },
      ],
    }),
  variants: [],
  usage: `import { List } from '@ds/ui'
import { Settings } from 'lucide-react'

<List
  items={[
    { id: '1', label: 'Profile', description: 'Edit your profile', icon: <User size={16} />, onClick: () => {} },
    { id: '2', label: 'Settings', description: 'App settings', icon: <Settings size={16} />, onClick: () => {} },
  ]}
/>`,
  props: [
    { name: 'items', type: "Array<{ id: string; label: string; description?: string; icon?: React.ReactNode; trailing?: React.ReactNode; onClick?: () => void }>", required: true, description: 'List items.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Row divider' },
  ],
}

export const avatarDoc: ComponentDoc = {
  title: 'Avatar',
  slug: 'avatar',
  description: 'A circular image or initials placeholder representing a user.',
  whenToUse: ['User profile images throughout the UI', 'Comment threads and activity feeds'],
  whenNotToUse: ['Logos or product images — use a regular img or Image component'],
  preview: () =>
    h('div', { className: 'flex gap-3 items-center' },
      h(Avatar, { src: '', alt: 'Alice', fallback: 'AL', size: 'sm' }),
      h(Avatar, { src: '', alt: 'Bob', fallback: 'BO', size: 'md' }),
      h(Avatar, { src: '', alt: 'Carol', fallback: 'CA', size: 'lg' }),
    ),
  variants: [
    {
      label: 'Fallback (no image)',
      preview: () =>
        h('div', { className: 'flex gap-3 items-center' },
          h(Avatar, { alt: 'Alice', fallback: 'AL' }),
          h(Avatar, { alt: 'Bob', fallback: 'BO' }),
          h(Avatar, { alt: 'Carol', fallback: 'CA' }),
        ),
    },
  ],
  usage: `import { Avatar } from '@ds/ui'

<Avatar src={user.avatarUrl} alt={user.name} fallback={user.initials} size="md" />`,
  props: [
    { name: 'src', type: 'string', description: 'Image URL. When empty or invalid, shows fallback.' },
    { name: 'alt', type: 'string', required: true, description: 'Accessible alt text.' },
    { name: 'fallback', type: 'string', required: true, description: 'Initials shown when image is unavailable (max 2 chars).' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar diameter.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Fallback background colour' },
    { name: '--radius-full', value: '9999px', description: 'Circular shape' },
  ],
}

export const chipDoc: ComponentDoc = {
  title: 'Chip',
  slug: 'chip',
  description: 'A compact pill element representing an attribute, filter, or tag. Supports a removable variant.',
  whenToUse: ['Tags on blog posts or products', 'Active filter indicators', 'Multi-select values shown inline'],
  whenNotToUse: ['Status labels — use Badge', 'Single-select choices — use Radio or Select'],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-2' },
      h(Chip, null, 'React'),
      h(Chip, null, 'TypeScript'),
      h(Chip, { onRemove: () => {} }, 'Removable'),
    ),
  variants: [
    {
      label: 'Removable',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-2' },
          h(Chip, { onRemove: () => {} }, 'Design'),
          h(Chip, { onRemove: () => {} }, 'Engineering'),
          h(Chip, { onRemove: () => {} }, 'Product'),
        ),
    },
  ],
  usage: `import { Chip } from '@ds/ui'

// Static chip
<Chip>React</Chip>

// Removable filter chip
{activeFilters.map((filter) => (
  <Chip key={filter} onRemove={() => removeFilter(filter)}>
    {filter}
  </Chip>
))}`,
  props: [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Chip label.' },
    { name: 'onRemove', type: '() => void', description: 'If provided, shows a remove (×) button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the remove button.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--chip-radius', value: 'var(--radius-full)', description: 'Pill border radius (9999px)' },
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Chip background' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Chip border colour' },
  ],
}
```

- [ ] **Step 3: Create lib/docs/typography.ts**

```tsx
import { createElement as h } from 'react'
import { Heading, Body, Label, Caption, Code as CodeTypography } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const headingDoc: ComponentDoc = {
  title: 'Heading',
  slug: 'heading',
  description: 'Semantic heading elements (h1–h4) with consistent typographic scale.',
  whenToUse: ['Page titles, section headings, card titles'],
  whenNotToUse: ['Bold body text — use Body with font-semibold', 'Labels — use Label component'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Heading, { as: 'h1' }, 'Heading 1 — Display'),
      h(Heading, { as: 'h2' }, 'Heading 2 — Page title'),
      h(Heading, { as: 'h3' }, 'Heading 3 — Section'),
      h(Heading, { as: 'h4' }, 'Heading 4 — Subsection'),
    ),
  variants: [
    {
      label: 'Level',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Heading, { as: 'h1' }, 'H1 — 36px'),
          h(Heading, { as: 'h2' }, 'H2 — 30px'),
          h(Heading, { as: 'h3' }, 'H3 — 24px'),
          h(Heading, { as: 'h4' }, 'H4 — 20px'),
        ),
    },
  ],
  usage: `import { Heading } from '@ds/ui'

<Heading as="h1">Page title</Heading>
<Heading as="h2">Section heading</Heading>
<Heading as="h3">Card title</Heading>`,
  props: [
    { name: 'as', type: "'h1' | 'h2' | 'h3' | 'h4' | 'display'", default: "'h2'", description: 'Semantic heading level. display maps to a styled h1 with --text-4xl.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Heading text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--text-4xl', value: '36px', description: 'Display / H1 size' },
    { name: '--text-3xl', value: '30px', description: 'H1 size' },
    { name: '--text-2xl', value: '24px', description: 'H2 size' },
    { name: '--text-xl', value: '20px', description: 'H3 size' },
    { name: '--font-sans', value: 'Inter', description: 'Heading typeface' },
  ],
}

export const bodyDoc: ComponentDoc = {
  title: 'Body',
  slug: 'body',
  description: 'A paragraph element for body copy with small, base, and large size variants.',
  whenToUse: ['Long-form content, descriptions, explanatory text'],
  whenNotToUse: ['Single-line UI labels — use Label', 'Very small helper text — use Caption'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3 max-w-sm' },
      h(Body, { size: 'lg' }, 'Large body text — used for intro paragraphs.'),
      h(Body, { size: 'base' }, 'Base body text — default reading size for paragraphs.'),
      h(Body, { size: 'sm' }, 'Small body text — secondary descriptive content.'),
    ),
  variants: [
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2 max-w-sm' },
          h(Body, { size: 'lg' }, 'Large — 18px'),
          h(Body, { size: 'base' }, 'Base — 16px'),
          h(Body, { size: 'sm' }, 'Small — 14px'),
        ),
    },
  ],
  usage: `import { Body } from '@ds/ui'

<Body size="lg">Introduction paragraph with larger text.</Body>
<Body>Default body copy for most content.</Body>
<Body size="sm">Supporting detail or helper text.</Body>`,
  props: [
    { name: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Font size variant.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Paragraph content.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--text-lg', value: '18px', description: 'Large size' },
    { name: '--text-base', value: '16px', description: 'Default size' },
    { name: '--text-sm', value: '14px', description: 'Small size' },
    { name: '--font-sans', value: 'Inter', description: 'Body typeface' },
  ],
}

export const labelDoc: ComponentDoc = {
  title: 'Label',
  slug: 'label',
  description: 'A short form label or UI label, rendered as a semantic <label> or <span>.',
  whenToUse: ['Form field labels', 'Section labels and UI key-value pairs'],
  whenNotToUse: ['Long descriptive text — use Body', 'Very small helper text — use Caption'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Label, null, 'Email address'),
      h(Label, { required: true }, 'Password'),
      h(Label, { htmlFor: 'demo-input' }, 'Input label'),
    ),
  variants: [
    {
      label: 'Required',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Label, null, 'Optional field'),
          h(Label, { required: true }, 'Required field'),
        ),
    },
  ],
  usage: `import { Label } from '@ds/ui'

<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />

<Label required>Password</Label>`,
  props: [
    { name: 'htmlFor', type: 'string', description: 'Associates label with a form control id.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Appends a red asterisk (*) to indicate required field.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Label text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--text-sm', value: '14px', description: 'Label font size' },
    { name: '--color-text-primary', value: 'var(--color-slate-900)', description: 'Label colour' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Required asterisk colour' },
  ],
}

export const captionDoc: ComponentDoc = {
  title: 'Caption',
  slug: 'caption',
  description: 'Extra-small helper text used below form fields, images, or other content.',
  whenToUse: ['Form field helper text ("Must be at least 8 characters")', 'Image captions', 'Timestamps and metadata'],
  whenNotToUse: ['Primary body copy — use Body', 'Accessibility labels — use aria-label or Label'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Caption, null, 'Helper text shown below a form field.'),
      h(Caption, { variant: 'error' }, 'Error: this field is required.'),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Caption, null, 'Default helper text'),
          h(Caption, { variant: 'error' }, 'Error message'),
          h(Caption, { variant: 'success' }, 'Success confirmation'),
        ),
    },
  ],
  usage: `import { Caption } from '@ds/ui'

<Input placeholder="Password" />
<Caption>Must be at least 8 characters.</Caption>

<Input error />
<Caption variant="error">Password is required.</Caption>`,
  props: [
    { name: 'variant', type: "'default' | 'error' | 'success'", default: "'default'", description: 'Colour variant for semantic feedback.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Caption text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--text-xs', value: '12px', description: 'Caption font size' },
    { name: '--color-text-secondary', value: 'var(--color-slate-600)', description: 'Default colour' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Error colour' },
    { name: '--color-success', value: 'var(--color-green-600)', description: 'Success colour' },
  ],
}

export const codeDoc: ComponentDoc = {
  title: 'Code',
  slug: 'code',
  description: 'Inline and block code formatting using JetBrains Mono.',
  whenToUse: ['Displaying code snippets inline within prose', 'Technical values like token names, CLI flags, API keys'],
  whenNotToUse: ['Syntax-highlighted multi-line code — use CodeBlock (docs component)'],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h('p', { className: 'text-sm text-(--color-text-primary)' },
        'Use the ',
        h(CodeTypography, { variant: 'inline' }, '--color-brand'),
        ' token for interactive elements.',
      ),
      h(CodeTypography, { variant: 'block' }, `import { Button } from '@ds/ui'

<Button variant="primary">Click me</Button>`),
    ),
  variants: [
    {
      label: 'Inline vs block',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h('p', { className: 'text-sm' },
            'Import with ',
            h(CodeTypography, { variant: 'inline' }, "import { X } from '@ds/ui'"),
          ),
          h(CodeTypography, { variant: 'block' }, `const x = 42\nconsole.log(x)`),
        ),
    },
  ],
  usage: `import { Code } from '@ds/ui'

// Inline
<p>Use the <Code variant="inline">Button</Code> component for CTAs.</p>

// Block
<Code variant="block">{\`
import { Button } from '@ds/ui'
<Button>Click me</Button>
\`}</Code>`,
  props: [
    { name: 'variant', type: "'inline' | 'block'", default: "'inline'", description: 'Inline renders a <code> tag; block renders a <pre><code> block.' },
    { name: 'children', type: 'string', required: true, description: 'Code string to display.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--font-mono', value: 'JetBrains Mono', description: 'Code typeface' },
    { name: '--text-sm', value: '14px', description: 'Code font size' },
    { name: '--color-surface', value: 'var(--color-slate-50)', description: 'Block code background' },
  ],
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/docs/lib/docs/containers.ts apps/docs/lib/docs/data.ts apps/docs/lib/docs/typography.ts
git commit -m "feat(docs): add Containers, Data, Typography docs entries"
```

---

### Task 10: Final build verification

**Files:** No new files — verification only.

- [ ] **Step 1: Run full docs build**

Run from monorepo root: `npm run build --workspace=docs`
Expected: Build succeeds. 43 pages generated (2 getting-started + 5 foundations + 40 components + root redirect).

- [ ] **Step 2: Check all component pages exist in output**

Run: `ls apps/docs/out/components/`
Expected: 40 directories: `button/`, `icon-button/`, `link/`, `fab/`, `split-button/`, `input/`, `textarea/`, `select/`, `checkbox/`, `radio/`, `toggle/`, `slider/`, `date-picker/`, `nav-bar/`, `tabs/`, `breadcrumb/`, `sidebar/`, `pagination/`, `badge/`, `toast/`, `alert/`, `tooltip/`, `progress/`, `skeleton/`, `spinner/`, `card/`, `modal/`, `drawer/`, `popover/`, `accordion/`, `divider/`, `table/`, `list/`, `avatar/`, `chip/`, `heading/`, `body/`, `label/`, `caption/`, `code/`

- [ ] **Step 3: Start dev server and smoke-test**

Run: `npm run dev --workspace=docs`
Check each of the following loads without errors:
- `http://localhost:3000` → redirects to `/getting-started/introduction`
- `http://localhost:3000/foundations/colors` → shows semantic token swatches and primitive palette
- `http://localhost:3000/components/button` → shows all 6 sections; Live Preview renders 4 Button variants
- `http://localhost:3000/components/badge` → Badge renders with pill radius
- `http://localhost:3000/components/chip` → Chip renders with pill radius
- Click theme toggle in sidebar → dark mode activates, syntax highlighting theme switches

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(docs): complete apps/docs — all 40 component pages and 5 foundation pages"
```

---

## Complete

All three plans are now written:

| Plan | File | Covers |
|------|------|--------|
| 1 | `2026-03-27-plan-1-tokens-and-components.md` | Turborepo scaffold, Tailwind v4 tokens, all 40 React components with TDD |
| 2 | `2026-03-27-plan-2-docs-app.md` | Next.js 14 docs app, 40 component pages, 5 foundation pages |
| 3 | `2026-03-27-plan-3-figma-and-ci.md` | 40 `.figma.tsx` Code Connect files, GitHub Actions CI/CD |

**Recommended execution order:** Plan 1 → Plan 2 → Plan 3. Plan 2 depends on `@ds/ui` existing. Plan 3 requires Figma component node IDs to be filled in after Figma components are built.
