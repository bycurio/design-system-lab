# Monorepo Scaffold, Design Tokens & React Components — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Turborepo monorepo, define all design tokens as Tailwind v4 CSS, and implement all 40 React components with TypeScript and Vitest TDD.

**Architecture:** Turborepo monorepo with npm workspaces. `packages/tokens` holds `tailwind.css` as the single source of truth for all design tokens. `packages/ui` contains 40 React components consuming those tokens via Tailwind v4 utility classes. Components are tested with Vitest + Testing Library in jsdom.

**Tech Stack:** npm workspaces, Turborepo 2, TypeScript 5.7, React 18, Tailwind CSS v4, Vitest 3, @testing-library/react 16, Lucide React

---

## File Map

### Root
- Create: `package.json`
- Create: `turbo.json`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

### packages/tokens
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tailwind.css`

### packages/ui
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vitest.config.ts`
- Create: `packages/ui/src/test-setup.ts`
- Create: `packages/ui/src/utils.ts`
- Create: `packages/ui/src/components/Button.types.ts`
- Create: `packages/ui/src/components/Button.tsx`
- Create: `packages/ui/src/components/Button.test.tsx`
- Create: `packages/ui/src/components/IconButton.types.ts`
- Create: `packages/ui/src/components/IconButton.tsx`
- Create: `packages/ui/src/components/IconButton.test.tsx`
- Create: `packages/ui/src/components/Link.types.ts`
- Create: `packages/ui/src/components/Link.tsx`
- Create: `packages/ui/src/components/Link.test.tsx`
- Create: `packages/ui/src/components/FAB.types.ts`
- Create: `packages/ui/src/components/FAB.tsx`
- Create: `packages/ui/src/components/FAB.test.tsx`
- Create: `packages/ui/src/components/SplitButton.types.ts`
- Create: `packages/ui/src/components/SplitButton.tsx`
- Create: `packages/ui/src/components/SplitButton.test.tsx`
- Create: `packages/ui/src/components/Input.types.ts`
- Create: `packages/ui/src/components/Input.tsx`
- Create: `packages/ui/src/components/Input.test.tsx`
- Create: `packages/ui/src/components/Textarea.types.ts`
- Create: `packages/ui/src/components/Textarea.tsx`
- Create: `packages/ui/src/components/Textarea.test.tsx`
- Create: `packages/ui/src/components/Select.types.ts`
- Create: `packages/ui/src/components/Select.tsx`
- Create: `packages/ui/src/components/Select.test.tsx`
- Create: `packages/ui/src/components/Checkbox.types.ts`
- Create: `packages/ui/src/components/Checkbox.tsx`
- Create: `packages/ui/src/components/Checkbox.test.tsx`
- Create: `packages/ui/src/components/Radio.types.ts`
- Create: `packages/ui/src/components/Radio.tsx`
- Create: `packages/ui/src/components/Radio.test.tsx`
- Create: `packages/ui/src/components/Toggle.types.ts`
- Create: `packages/ui/src/components/Toggle.tsx`
- Create: `packages/ui/src/components/Toggle.test.tsx`
- Create: `packages/ui/src/components/Slider.types.ts`
- Create: `packages/ui/src/components/Slider.tsx`
- Create: `packages/ui/src/components/Slider.test.tsx`
- Create: `packages/ui/src/components/DatePicker.types.ts`
- Create: `packages/ui/src/components/DatePicker.tsx`
- Create: `packages/ui/src/components/DatePicker.test.tsx`
- Create: `packages/ui/src/components/NavBar.types.ts`
- Create: `packages/ui/src/components/NavBar.tsx`
- Create: `packages/ui/src/components/NavBar.test.tsx`
- Create: `packages/ui/src/components/Tabs.types.ts`
- Create: `packages/ui/src/components/Tabs.tsx`
- Create: `packages/ui/src/components/Tabs.test.tsx`
- Create: `packages/ui/src/components/Breadcrumb.types.ts`
- Create: `packages/ui/src/components/Breadcrumb.tsx`
- Create: `packages/ui/src/components/Breadcrumb.test.tsx`
- Create: `packages/ui/src/components/Sidebar.types.ts`
- Create: `packages/ui/src/components/Sidebar.tsx`
- Create: `packages/ui/src/components/Sidebar.test.tsx`
- Create: `packages/ui/src/components/Pagination.types.ts`
- Create: `packages/ui/src/components/Pagination.tsx`
- Create: `packages/ui/src/components/Pagination.test.tsx`
- Create: `packages/ui/src/components/Badge.types.ts`
- Create: `packages/ui/src/components/Badge.tsx`
- Create: `packages/ui/src/components/Badge.test.tsx`
- Create: `packages/ui/src/components/Toast.types.ts`
- Create: `packages/ui/src/components/Toast.tsx`
- Create: `packages/ui/src/components/Toast.test.tsx`
- Create: `packages/ui/src/components/Alert.types.ts`
- Create: `packages/ui/src/components/Alert.tsx`
- Create: `packages/ui/src/components/Alert.test.tsx`
- Create: `packages/ui/src/components/Tooltip.types.ts`
- Create: `packages/ui/src/components/Tooltip.tsx`
- Create: `packages/ui/src/components/Tooltip.test.tsx`
- Create: `packages/ui/src/components/Progress.types.ts`
- Create: `packages/ui/src/components/Progress.tsx`
- Create: `packages/ui/src/components/Progress.test.tsx`
- Create: `packages/ui/src/components/Skeleton.types.ts`
- Create: `packages/ui/src/components/Skeleton.tsx`
- Create: `packages/ui/src/components/Skeleton.test.tsx`
- Create: `packages/ui/src/components/Spinner.types.ts`
- Create: `packages/ui/src/components/Spinner.tsx`
- Create: `packages/ui/src/components/Spinner.test.tsx`
- Create: `packages/ui/src/components/Card.types.ts`
- Create: `packages/ui/src/components/Card.tsx`
- Create: `packages/ui/src/components/Card.test.tsx`
- Create: `packages/ui/src/components/Modal.types.ts`
- Create: `packages/ui/src/components/Modal.tsx`
- Create: `packages/ui/src/components/Modal.test.tsx`
- Create: `packages/ui/src/components/Drawer.types.ts`
- Create: `packages/ui/src/components/Drawer.tsx`
- Create: `packages/ui/src/components/Drawer.test.tsx`
- Create: `packages/ui/src/components/Popover.types.ts`
- Create: `packages/ui/src/components/Popover.tsx`
- Create: `packages/ui/src/components/Popover.test.tsx`
- Create: `packages/ui/src/components/Accordion.types.ts`
- Create: `packages/ui/src/components/Accordion.tsx`
- Create: `packages/ui/src/components/Accordion.test.tsx`
- Create: `packages/ui/src/components/Divider.types.ts`
- Create: `packages/ui/src/components/Divider.tsx`
- Create: `packages/ui/src/components/Divider.test.tsx`
- Create: `packages/ui/src/components/Table.types.ts`
- Create: `packages/ui/src/components/Table.tsx`
- Create: `packages/ui/src/components/Table.test.tsx`
- Create: `packages/ui/src/components/List.types.ts`
- Create: `packages/ui/src/components/List.tsx`
- Create: `packages/ui/src/components/List.test.tsx`
- Create: `packages/ui/src/components/Avatar.types.ts`
- Create: `packages/ui/src/components/Avatar.tsx`
- Create: `packages/ui/src/components/Avatar.test.tsx`
- Create: `packages/ui/src/components/Chip.types.ts`
- Create: `packages/ui/src/components/Chip.tsx`
- Create: `packages/ui/src/components/Chip.test.tsx`
- Create: `packages/ui/src/components/Heading.types.ts`
- Create: `packages/ui/src/components/Heading.tsx`
- Create: `packages/ui/src/components/Heading.test.tsx`
- Create: `packages/ui/src/components/Body.types.ts`
- Create: `packages/ui/src/components/Body.tsx`
- Create: `packages/ui/src/components/Body.test.tsx`
- Create: `packages/ui/src/components/Label.types.ts`
- Create: `packages/ui/src/components/Label.tsx`
- Create: `packages/ui/src/components/Label.test.tsx`
- Create: `packages/ui/src/components/Caption.types.ts`
- Create: `packages/ui/src/components/Caption.tsx`
- Create: `packages/ui/src/components/Caption.test.tsx`
- Create: `packages/ui/src/components/Code.types.ts`
- Create: `packages/ui/src/components/Code.tsx`
- Create: `packages/ui/src/components/Code.test.tsx`
- Create: `packages/ui/src/components/index.ts`
- Create: `packages/ui/src/index.ts`

---

### Task 1: Initialize Turborepo monorepo

**Files:**
- Create: `package.json`
- Create: `turbo.json`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

- [ ] **Step 1: Create root `package.json`**

```json
{
  "name": "design-system-lab",
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "test": "turbo test",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "^5.7.2"
  }
}
```

- [ ] **Step 2: Create `turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] },
    "test": {},
    "dev": { "cache": false, "persistent": true }
  }
}
```

- [ ] **Step 3: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true
  }
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
.turbo/
dist/
.next/
out/
*.log
.DS_Store
```

- [ ] **Step 5: Create workspace directories**

```bash
mkdir -p packages/tokens packages/ui/src/components apps/docs
```

- [ ] **Step 6: Commit**

```bash
git add package.json turbo.json tsconfig.base.json .gitignore
git commit -m "feat: initialize Turborepo monorepo"
```

---

### Task 2: Design tokens — packages/tokens

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tailwind.css`

- [ ] **Step 1: Create `packages/tokens/package.json`**

```json
{
  "name": "@ds/tokens",
  "version": "0.0.1",
  "main": "tailwind.css",
  "files": ["tailwind.css"]
}
```

- [ ] **Step 2: Create `packages/tokens/tailwind.css`**

```css
@import "tailwindcss";

@theme {
  /* ── PRIMITIVES: Colors ── */
  --color-white: #ffffff;
  --color-black: #000000;

  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;

  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1;
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
  --color-slate-950: #020617;

  --color-red-100: #fee2e2;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;

  --color-green-100: #dcfce7;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;

  --color-amber-100: #fef3c7;
  --color-amber-500: #f59e0b;
  --color-amber-600: #d97706;
  --color-amber-700: #b45309;

  --color-sky-100: #e0f2fe;
  --color-sky-500: #0ea5e9;
  --color-sky-600: #0284c7;
  --color-sky-700: #0369a1;

  /* ── PRIMITIVES: Spacing ── */
  --size-0: 0px;
  --size-0-5: 0.125rem;
  --size-1: 0.25rem;
  --size-1-5: 0.375rem;
  --size-2: 0.5rem;
  --size-2-5: 0.625rem;
  --size-3: 0.75rem;
  --size-4: 1rem;
  --size-5: 1.25rem;
  --size-6: 1.5rem;
  --size-8: 2rem;
  --size-10: 2.5rem;
  --size-12: 3rem;
  --size-14: 3.5rem;
  --size-16: 4rem;

  /* ── PRIMITIVES: Radius ── */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* ── PRIMITIVES: Typography ── */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-normal: 1.5;

  /* ── PRIMITIVES: Elevation ── */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* ── SEMANTIC TOKENS (light defaults) ── */
  --color-bg: var(--color-white);
  --color-surface: var(--color-slate-50);
  --color-surface-raised: var(--color-white);
  --color-brand: var(--color-blue-600);
  --color-brand-hover: var(--color-blue-700);
  --color-text-primary: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-600);
  --color-text-disabled: var(--color-slate-400);
  --color-text-inverse: var(--color-white);
  --color-border: var(--color-slate-200);
  --color-border-focus: var(--color-blue-600);
  --color-danger: var(--color-red-600);
  --color-danger-hover: var(--color-red-700);
  --color-danger-surface: var(--color-red-100);
  --color-success: var(--color-green-600);
  --color-success-surface: var(--color-green-100);
  --color-warning: var(--color-amber-600);
  --color-warning-surface: var(--color-amber-100);
  --color-info: var(--color-sky-600);
  --color-info-surface: var(--color-sky-100);

  /* ── COMPONENT TOKENS ── */
  --button-radius: var(--radius-md);
  --badge-radius: var(--radius-full);
  --chip-radius: var(--radius-full);
  --input-radius: var(--radius-md);
  --card-radius: var(--radius-lg);
  --modal-radius: var(--radius-xl);
  --popover-radius: var(--radius-lg);
  --tooltip-radius: var(--radius-md);
}

/* ── DARK MODE OVERRIDES ── */
.dark {
  --color-bg: var(--color-slate-950);
  --color-surface: var(--color-slate-800);
  --color-surface-raised: var(--color-slate-700);
  --color-brand: var(--color-blue-500);
  --color-brand-hover: var(--color-blue-400);
  --color-text-primary: var(--color-slate-100);
  --color-text-secondary: var(--color-slate-400);
  --color-text-disabled: var(--color-slate-600);
  --color-text-inverse: var(--color-slate-900);
  --color-border: var(--color-slate-700);
  --color-border-focus: var(--color-blue-500);
  --color-danger: var(--color-red-500);
  --color-danger-hover: var(--color-red-400);
  --color-danger-surface: var(--color-slate-700);
  --color-success: var(--color-green-500);
  --color-success-surface: var(--color-slate-700);
  --color-warning: var(--color-amber-500);
  --color-warning-surface: var(--color-slate-700);
  --color-info: var(--color-sky-500);
  --color-info-surface: var(--color-slate-700);
}
```

- [ ] **Step 3: Commit**

```bash
git add packages/tokens/
git commit -m "feat(tokens): add Tailwind v4 design token system"
```

---

### Task 3: Scaffold packages/ui

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vitest.config.ts`
- Create: `packages/ui/src/test-setup.ts`
- Create: `packages/ui/src/utils.ts`

- [ ] **Step 1: Create `packages/ui/package.json`**

```json
{
  "name": "@ds/ui",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "lucide-react": "^0.479.0"
  },
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@ds/tokens": "*",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^26.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^4.0.12",
    "vitest": "^3.0.7"
  }
}
```

- [ ] **Step 2: Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

- [ ] **Step 3: Create `packages/ui/vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

- [ ] **Step 4: Create `packages/ui/src/test-setup.ts`**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Create `packages/ui/src/utils.ts`**

```typescript
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: `node_modules` created in root and each package. No errors.

- [ ] **Step 7: Verify test runner**

```bash
npm run test -w @ds/ui
```

Expected: "No test files found" (no tests yet — confirms Vitest is configured).

- [ ] **Step 8: Commit**

```bash
git add packages/ui/
git commit -m "feat(ui): scaffold packages/ui with Vitest"
```

---

### Task 4: Button component — full TDD exemplar

**Files:**
- Create: `packages/ui/src/components/Button.types.ts`
- Create: `packages/ui/src/components/Button.test.tsx`
- Create: `packages/ui/src/components/Button.tsx`

- [ ] **Step 1: Create `Button.types.ts`**

```typescript
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}
```

- [ ] **Step 2: Write the failing test — create `Button.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button').className).toContain('bg-(--color-brand)');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('border-(--color-border)');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('bg-transparent');
  });

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('bg-(--color-danger)');
  });

  it('applies sm size', () => {
    render(<Button size="sm">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('h-7');
  });

  it('applies lg size', () => {
    render(<Button size="lg">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('h-11');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and aria-busy when loading', () => {
    render(<Button loading>Click me</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 3: Run tests — verify they FAIL**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: `Button.test.tsx` fails with "Cannot find module './Button'".

- [ ] **Step 4: Implement `Button.tsx`**

```typescript
import { forwardRef } from 'react';
import { cn } from '../utils';
import type { ButtonProps } from './Button.types';

const variantClasses = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover)',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-surface)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover)',
};

const sizeClasses = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
};

const Spinner = () => (
  <svg className="animate-spin size-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-(--button-radius) transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
```

- [ ] **Step 5: Run tests — verify they PASS**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all 11 `Button` tests pass, 0 failures.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/components/Button.types.ts packages/ui/src/components/Button.tsx packages/ui/src/components/Button.test.tsx
git commit -m "feat(ui): add Button component"
```

---

### Task 5: Actions — IconButton, Link, FAB, SplitButton

> Follow the Button TDD pattern for each: write test → `npm run test -w @ds/ui -- --reporter verbose` (verify FAIL) → implement → verify PASS → commit.

**Files:**
- Create: `packages/ui/src/components/IconButton.types.ts`
- Create: `packages/ui/src/components/IconButton.tsx`
- Create: `packages/ui/src/components/IconButton.test.tsx`
- Create: `packages/ui/src/components/Link.types.ts`
- Create: `packages/ui/src/components/Link.tsx`
- Create: `packages/ui/src/components/Link.test.tsx`
- Create: `packages/ui/src/components/FAB.types.ts`
- Create: `packages/ui/src/components/FAB.tsx`
- Create: `packages/ui/src/components/FAB.test.tsx`
- Create: `packages/ui/src/components/SplitButton.types.ts`
- Create: `packages/ui/src/components/SplitButton.tsx`
- Create: `packages/ui/src/components/SplitButton.test.tsx`

- [ ] **Step 1: Create `IconButton.types.ts`**

```typescript
import type { ButtonHTMLAttributes, ReactElement } from 'react';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
}
```

- [ ] **Step 2: Create `IconButton.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Plus } from 'lucide-react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with accessible label', () => {
    render(<IconButton icon={<Plus />} label="Add item" />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<IconButton icon={<Plus />} label="Add" />);
    expect(screen.getByRole('button').className).toContain('bg-(--color-brand)');
  });

  it('is disabled when disabled prop set', () => {
    render(<IconButton icon={<Plus />} label="Add" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and aria-busy when loading', () => {
    render(<IconButton icon={<Plus />} label="Add" loading />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<Plus />} label="Add" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 3: Implement `IconButton.tsx`**

```typescript
import { forwardRef } from 'react';
import { cn } from '../utils';
import type { IconButtonProps } from './IconButton.types';

const variantClasses = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover)',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-surface)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover)',
};

const sizeClasses = { sm: 'size-7', md: 'size-9', lg: 'size-11' };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = 'primary', size = 'md', loading = false, disabled, className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-(--button-radius) transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
```

- [ ] **Step 4: Create `Link.types.ts`**

```typescript
import type { AnchorHTMLAttributes, ReactElement } from 'react';

export type LinkVariant = 'default' | 'muted';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  icon?: ReactElement;
  external?: boolean;
}
```

- [ ] **Step 5: Create `Link.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExternalLink } from 'lucide-react';
import { Link } from './Link';

describe('Link', () => {
  it('renders as an anchor', () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('adds target and rel for external links', () => {
    render(<Link href="https://example.com" external>Visit</Link>);
    const a = screen.getByRole('link');
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies muted variant', () => {
    render(<Link href="/" variant="muted">Home</Link>);
    expect(screen.getByRole('link').className).toContain('text-(--color-text-secondary)');
  });

  it('renders icon when provided', () => {
    render(<Link href="/" icon={<ExternalLink data-testid="icon" />}>Visit</Link>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Implement `Link.tsx`**

```typescript
import { cn } from '../utils';
import type { LinkProps } from './Link.types';

const variantClasses = {
  default: 'text-(--color-brand) hover:underline',
  muted: 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:underline',
};

export function Link({ href, variant = 'default', icon, external = false, children, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn('inline-flex items-center gap-1.5 transition-colors', variantClasses[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}
```

- [ ] **Step 7: Create `FAB.types.ts`**

```typescript
import type { ButtonHTMLAttributes, ReactElement } from 'react';

export type FABSize = 'sm' | 'md' | 'lg';

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  label: string;
  size?: FABSize;
}
```

- [ ] **Step 8: Create `FAB.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Plus } from 'lucide-react';
import { FAB } from './FAB';

describe('FAB', () => {
  it('renders with accessible label', () => {
    render(<FAB icon={<Plus />} label="Create" />);
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('applies lg size by default', () => {
    render(<FAB icon={<Plus />} label="Create" />);
    expect(screen.getByRole('button').className).toContain('size-14');
  });

  it('applies sm size', () => {
    render(<FAB icon={<Plus />} label="Create" size="sm" />);
    expect(screen.getByRole('button').className).toContain('size-10');
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<FAB icon={<Plus />} label="Create" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 9: Implement `FAB.tsx`**

```typescript
import { forwardRef } from 'react';
import { cn } from '../utils';
import type { FABProps } from './FAB.types';

const sizeClasses = { sm: 'size-10', md: 'size-12', lg: 'size-14' };

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ icon, label, size = 'lg', className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'bg-(--color-brand) text-(--color-text-inverse)',
        'hover:bg-(--color-brand-hover) shadow-lg hover:shadow-xl transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  ),
);
FAB.displayName = 'FAB';
```

- [ ] **Step 10: Create `SplitButton.types.ts`**

```typescript
export type SplitButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type SplitButtonSize = 'sm' | 'md' | 'lg';

export interface SplitButtonProps {
  label: string;
  onClick: () => void;
  onMenuClick: () => void;
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  disabled?: boolean;
  className?: string;
}
```

- [ ] **Step 11: Create `SplitButton.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  it('renders label and chevron buttons', () => {
    render(<SplitButton label="Save" onClick={vi.fn()} onMenuClick={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More options' })).toBeInTheDocument();
  });

  it('calls onClick when label button clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SplitButton label="Save" onClick={onClick} onMenuClick={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onMenuClick when chevron clicked', async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    render(<SplitButton label="Save" onClick={vi.fn()} onMenuClick={onMenuClick} />);
    await user.click(screen.getByRole('button', { name: 'More options' }));
    expect(onMenuClick).toHaveBeenCalledOnce();
  });

  it('disables both buttons when disabled', () => {
    render(<SplitButton label="Save" onClick={vi.fn()} onMenuClick={vi.fn()} disabled />);
    screen.getAllByRole('button').forEach(btn => expect(btn).toBeDisabled());
  });
});
```

- [ ] **Step 12: Implement `SplitButton.tsx`**

```typescript
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import type { SplitButtonProps } from './SplitButton.types';

const variantMain = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover)',
  secondary: 'border border-(--color-border) border-r-0 text-(--color-text-primary) hover:bg-(--color-surface)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover)',
};

const variantChevron = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover) border-l border-l-white/20',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-surface)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover) border-l border-l-white/20',
};

const sizeClasses = { sm: 'h-7 px-3 text-xs', md: 'h-9 px-4 text-sm', lg: 'h-11 px-5 text-base' };
const chevronSize = { sm: 'h-7 px-1.5', md: 'h-9 px-2', lg: 'h-11 px-2.5' };

export function SplitButton({ label, onClick, onMenuClick, variant = 'primary', size = 'md', disabled, className }: SplitButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  return (
    <div className={cn('inline-flex', className)}>
      <button onClick={onClick} disabled={disabled} className={cn(base, 'rounded-l-(--button-radius) rounded-r-none', variantMain[variant], sizeClasses[size])}>
        {label}
      </button>
      <button onClick={onMenuClick} disabled={disabled} aria-label="More options" className={cn(base, 'rounded-r-(--button-radius) rounded-l-none', variantChevron[variant], chevronSize[size])}>
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
}
```

- [ ] **Step 13: Run tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all IconButton, Link, FAB, SplitButton tests pass.

```bash
git add packages/ui/src/components/IconButton.* packages/ui/src/components/Link.* packages/ui/src/components/FAB.* packages/ui/src/components/SplitButton.*
git commit -m "feat(ui): add IconButton, Link, FAB, SplitButton"
```

---

### Task 6: Input — full TDD exemplar for form inputs

**Files:**
- Create: `packages/ui/src/components/Input.types.ts`
- Create: `packages/ui/src/components/Input.test.tsx`
- Create: `packages/ui/src/components/Input.tsx`

- [ ] **Step 1: Create `Input.types.ts`**

```typescript
import type { InputHTMLAttributes, ReactElement } from 'react';

export type InputVariant = 'default' | 'error' | 'disabled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
}
```

- [ ] **Step 2: Write the failing test — create `Input.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Search } from 'lucide-react';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input placeholder="Search" />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('calls onChange when typed into', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies error border class for error variant', () => {
    render(<Input variant="error" />);
    expect(screen.getByRole('textbox').className).toContain('border-(--color-danger)');
  });

  it('is disabled when disabled prop set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders leadingIcon', () => {
    render(<Input leadingIcon={<Search data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders trailingIcon', () => {
    render(<Input trailingIcon={<Search data-testid="trailing" />} />);
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests — verify they FAIL**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: `Input.test.tsx` fails with "Cannot find module './Input'".

- [ ] **Step 4: Implement `Input.tsx`**

```typescript
import { forwardRef } from 'react';
import { cn } from '../utils';
import type { InputProps } from './Input.types';

const variantClasses = {
  default: 'border-(--color-border) focus:border-(--color-border-focus) focus:ring-1 focus:ring-(--color-border-focus)',
  error: 'border-(--color-danger) focus:border-(--color-danger) focus:ring-1 focus:ring-(--color-danger)',
  disabled: 'border-(--color-border) opacity-50 cursor-not-allowed',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', leadingIcon, trailingIcon, className, disabled, ...props }, ref) => {
    const resolvedVariant = disabled ? 'disabled' : variant;
    return (
      <div className="relative flex items-center w-full">
        {leadingIcon && (
          <span className="absolute left-3 text-(--color-text-secondary) pointer-events-none flex items-center">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'h-9 w-full rounded-(--input-radius) border bg-(--color-bg)',
            'px-3 text-sm text-(--color-text-primary) placeholder:text-(--color-text-disabled)',
            'outline-none transition-colors',
            variantClasses[resolvedVariant],
            leadingIcon && 'pl-9',
            trailingIcon && 'pr-9',
            className,
          )}
          {...props}
        />
        {trailingIcon && (
          <span className="absolute right-3 text-(--color-text-secondary) pointer-events-none flex items-center">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
```

- [ ] **Step 5: Run tests — verify they PASS**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all 6 Input tests pass.

- [ ] **Step 6: Commit**

```bash
git add packages/ui/src/components/Input.types.ts packages/ui/src/components/Input.tsx packages/ui/src/components/Input.test.tsx
git commit -m "feat(ui): add Input component"
```

---

### Task 7: Forms — Textarea, Select, Checkbox, Radio, Toggle, Slider, DatePicker

> Follow Button TDD pattern for each. Run `npm run test -w @ds/ui -- --reporter verbose` after each component to verify FAIL then PASS.

**Files:** `Textarea.*`, `Select.*`, `Checkbox.*`, `Radio.*`, `Toggle.*`, `Slider.*`, `DatePicker.*` (types + tsx + test)

- [ ] **Step 1: Create `Textarea.types.ts`**

```typescript
import type { TextareaHTMLAttributes } from 'react';
export type TextareaVariant = 'default' | 'error' | 'disabled';
export type TextareaResize = 'none' | 'vertical' | 'both';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  resize?: TextareaResize;
}
```

- [ ] **Step 2: Create `Textarea.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument();
  });

  it('applies error border for error variant', () => {
    render(<Textarea variant="error" />);
    expect(screen.getByRole('textbox').className).toContain('border-(--color-danger)');
  });

  it('is disabled when disabled prop set', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies resize-none for resize=none', () => {
    render(<Textarea resize="none" />);
    expect(screen.getByRole('textbox').className).toContain('resize-none');
  });
});
```

- [ ] **Step 3: Implement `Textarea.tsx`**

```typescript
import { forwardRef } from 'react';
import { cn } from '../utils';
import type { TextareaProps } from './Textarea.types';

const variantClasses = {
  default: 'border-(--color-border) focus:border-(--color-border-focus) focus:ring-1 focus:ring-(--color-border-focus)',
  error: 'border-(--color-danger) focus:border-(--color-danger) focus:ring-1 focus:ring-(--color-danger)',
  disabled: 'border-(--color-border) opacity-50 cursor-not-allowed',
};

const resizeClasses = { none: 'resize-none', vertical: 'resize-y', both: 'resize' };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'default', resize = 'vertical', disabled, className, ...props }, ref) => (
    <textarea
      ref={ref}
      disabled={disabled}
      className={cn(
        'w-full min-h-[80px] rounded-(--input-radius) border bg-(--color-bg)',
        'px-3 py-2 text-sm text-(--color-text-primary) placeholder:text-(--color-text-disabled)',
        'outline-none transition-colors',
        variantClasses[disabled ? 'disabled' : variant],
        resizeClasses[resize],
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
```

- [ ] **Step 4: Create `Select.types.ts`**

```typescript
import type { SelectHTMLAttributes } from 'react';
export type SelectVariant = 'default' | 'error' | 'disabled';
export interface SelectOption { label: string; value: string; }
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  placeholder?: string;
  variant?: SelectVariant;
}
```

- [ ] **Step 5: Create `Select.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

const opts = [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }];

describe('Select', () => {
  it('renders a select element', () => {
    render(<Select options={opts} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<Select options={opts} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={opts} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('is disabled when disabled prop set', () => {
    render(<Select options={opts} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
```

- [ ] **Step 6: Implement `Select.tsx`**

```typescript
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import type { SelectProps } from './Select.types';

const variantClasses = {
  default: 'border-(--color-border) focus:border-(--color-border-focus) focus:ring-1 focus:ring-(--color-border-focus)',
  error: 'border-(--color-danger) focus:border-(--color-danger) focus:ring-1 focus:ring-(--color-danger)',
  disabled: 'border-(--color-border) opacity-50 cursor-not-allowed',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, variant = 'default', disabled, className, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          'h-9 w-full appearance-none rounded-(--input-radius) border bg-(--color-bg)',
          'px-3 pr-8 text-sm text-(--color-text-primary) outline-none transition-colors',
          variantClasses[disabled ? 'disabled' : variant],
          className,
        )}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-(--color-text-secondary) pointer-events-none" />
    </div>
  ),
);
Select.displayName = 'Select';
```

- [ ] **Step 7: Create `Checkbox.types.ts`**

```typescript
export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: (checked: boolean) => void;
}
```

- [ ] **Step 8: Create `Checkbox.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('is checked when checked=true', () => {
    render(<Checkbox checked label="Accept" onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('is disabled when disabled=true', () => {
    render(<Checkbox disabled label="Accept" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Accept" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
```

- [ ] **Step 9: Implement `Checkbox.tsx`**

```typescript
import { useRef, useEffect, useId } from 'react';
import { cn } from '../utils';
import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({ label, checked, indeterminate = false, disabled, id, onChange }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        className="size-4 rounded-sm border-(--color-border) accent-(--color-brand)"
      />
      {label && <span className="text-sm text-(--color-text-primary)">{label}</span>}
    </label>
  );
}
```

- [ ] **Step 10: Create `Radio.types.ts`**

```typescript
export interface RadioProps {
  label?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string) => void;
}
```

- [ ] **Step 11: Create `Radio.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio value="a" label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('is checked when checked=true', () => {
    render(<Radio value="a" label="A" checked onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('calls onChange with value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio value="a" label="A" onChange={onChange} />);
    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith('a');
  });
});
```

- [ ] **Step 12: Implement `Radio.tsx`**

```typescript
import { useId } from 'react';
import { cn } from '../utils';
import type { RadioProps } from './Radio.types';

export function Radio({ label, value, checked, disabled, name, onChange }: RadioProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={() => onChange?.(value)}
        className="size-4 accent-(--color-brand)"
      />
      {label && <span className="text-sm text-(--color-text-primary)">{label}</span>}
    </label>
  );
}
```

- [ ] **Step 13: Create `Toggle.types.ts`**

```typescript
export type ToggleSize = 'sm' | 'md' | 'lg';
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: ToggleSize;
  disabled?: boolean;
}
```

- [ ] **Step 14: Create `Toggle.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle checked={false} onChange={vi.fn()} label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('has aria-checked=true when checked', () => {
    render(<Toggle checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 15: Implement `Toggle.tsx`**

```typescript
import { cn } from '../utils';
import type { ToggleProps } from './Toggle.types';

const trackSize = { sm: 'w-8 h-4', md: 'w-10 h-5', lg: 'w-12 h-6' };
const thumbSize = { sm: 'size-3', md: 'size-4', lg: 'size-5' };
const thumbTranslate = { sm: 'translate-x-4', md: 'translate-x-5', lg: 'translate-x-6' };

export function Toggle({ checked, onChange, label, size = 'md', disabled }: ToggleProps) {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
          trackSize[size],
          checked ? 'bg-(--color-brand)' : 'bg-(--color-border)',
        )}
      >
        <span className={cn('absolute left-0.5 rounded-full bg-white shadow transition-transform', thumbSize[size], checked && thumbTranslate[size])} />
      </button>
      {label && <span className="text-sm text-(--color-text-primary)">{label}</span>}
    </label>
  );
}
```

- [ ] **Step 16: Create `Slider.types.ts`**

```typescript
export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}
```

- [ ] **Step 17: Create `Slider.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders a range input', () => {
    render(<Slider min={0} max={100} value={50} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('reflects value', () => {
    render(<Slider min={0} max={100} value={30} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toHaveValue('30');
  });

  it('is disabled when disabled=true', () => {
    render(<Slider min={0} max={100} value={50} disabled onChange={() => {}} />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
```

- [ ] **Step 18: Implement `Slider.tsx`**

```typescript
import { cn } from '../utils';
import type { SliderProps } from './Slider.types';

export function Slider({ min, max, step = 1, value, onChange, disabled, label, className }: SliderProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && <span className="block text-sm text-(--color-text-primary) mb-1">{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={e => onChange(Number(e.target.value))}
        className={cn('w-full h-2 accent-(--color-brand) cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
      />
    </div>
  );
}
```

- [ ] **Step 19: Create `DatePicker.types.ts`**

```typescript
export interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
}
```

- [ ] **Step 20: Create `DatePicker.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders a date input', () => {
    render(<DatePicker onChange={() => {}} />);
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('reflects value', () => {
    render(<DatePicker value="2026-01-15" onChange={() => {}} />);
    expect(screen.getByDisplayValue('2026-01-15')).toBeInTheDocument();
  });

  it('is disabled when disabled=true', () => {
    render(<DatePicker disabled onChange={() => {}} />);
    expect(document.querySelector('input[type="date"]')).toBeDisabled();
  });
});
```

- [ ] **Step 21: Implement `DatePicker.tsx`**

```typescript
import { cn } from '../utils';
import type { DatePickerProps } from './DatePicker.types';

export function DatePicker({ value, onChange, min, max, disabled, label, className }: DatePickerProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="block text-sm font-medium text-(--color-text-primary) mb-1">{label}</label>}
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className={cn(
          'h-9 w-full rounded-(--input-radius) border border-(--color-border) bg-(--color-bg)',
          'px-3 text-sm text-(--color-text-primary) outline-none transition-colors',
          'focus:border-(--color-border-focus) focus:ring-1 focus:ring-(--color-border-focus)',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      />
    </div>
  );
}
```

- [ ] **Step 22: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: Textarea, Select, Checkbox, Radio, Toggle, Slider, DatePicker all pass.

```bash
git add packages/ui/src/components/Textarea.* packages/ui/src/components/Select.* packages/ui/src/components/Checkbox.* packages/ui/src/components/Radio.* packages/ui/src/components/Toggle.* packages/ui/src/components/Slider.* packages/ui/src/components/DatePicker.*
git commit -m "feat(ui): add Textarea, Select, Checkbox, Radio, Toggle, Slider, DatePicker"
```

---

### Task 8: Navigation — NavBar, Tabs, Breadcrumb, Sidebar, Pagination

> Follow Button TDD pattern for each.

**Files:** `NavBar.*`, `Tabs.*`, `Breadcrumb.*`, `Sidebar.*`, `Pagination.*`

- [ ] **Step 1: Create `NavBar.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface NavItem { label: string; href: string; active?: boolean; }
export interface NavBarProps {
  logo?: ReactNode;
  items?: NavItem[];
  actions?: ReactNode;
  sticky?: boolean;
  className?: string;
}
```

- [ ] **Step 2: Create `NavBar.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders nav element', () => {
    render(<NavBar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(<NavBar logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders nav items as links', () => {
    render(<NavBar items={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('adds sticky class when sticky=true', () => {
    render(<NavBar sticky />);
    expect(screen.getByRole('navigation').className).toContain('sticky');
  });
});
```

- [ ] **Step 3: Implement `NavBar.tsx`**

```typescript
import { cn } from '../utils';
import type { NavBarProps } from './NavBar.types';

export function NavBar({ logo, items = [], actions, sticky, className }: NavBarProps) {
  return (
    <nav className={cn(
      'h-14 flex items-center justify-between px-6 border-b border-(--color-border) bg-(--color-bg)',
      sticky && 'sticky top-0 z-40',
      className,
    )}>
      <div className="flex items-center gap-8">
        {logo && <div className="shrink-0">{logo}</div>}
        {items.length > 0 && (
          <ul className="flex items-center gap-1">
            {items.map(item => (
              <li key={item.href}>
                <a href={item.href} className={cn(
                  'px-3 py-1.5 text-sm rounded-(--button-radius) transition-colors',
                  item.active ? 'text-(--color-brand) font-medium' : 'text-(--color-text-secondary) hover:text-(--color-text-primary)',
                )}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </nav>
  );
}
```

- [ ] **Step 4: Create `Tabs.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface TabItem { id: string; label: string; content: ReactNode; }
export interface TabsProps {
  items: TabItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
  className?: string;
}
```

- [ ] **Step 5: Create `Tabs.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';

const items = [
  { id: 'a', label: 'Tab A', content: <div>Content A</div> },
  { id: 'b', label: 'Tab B', content: <div>Content B</div> },
];

describe('Tabs', () => {
  it('renders all tab buttons', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument();
  });

  it('shows content of first tab by default', () => {
    render(<Tabs items={items} />);
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });

  it('switches content on tab click', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByText('Content B')).toBeInTheDocument();
  });

  it('calls onChange when tab clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await user.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
```

- [ ] **Step 6: Implement `Tabs.tsx`**

```typescript
import { useState } from 'react';
import { cn } from '../utils';
import type { TabsProps } from './Tabs.types';

export function Tabs({ items, defaultActive, onChange, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultActive ?? items[0]?.id);

  function handleSelect(id: string) {
    setActiveId(id);
    onChange?.(id);
  }

  const active = items.find(i => i.id === activeId);

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" className="flex border-b border-(--color-border)">
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === activeId}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            onClick={() => handleSelect(item.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus-visible:outline-none',
              item.id === activeId
                ? 'border-(--color-brand) text-(--color-brand)'
                : 'border-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeId}`}
        aria-labelledby={`tab-${activeId}`}
        tabIndex={0}
        className="pt-4 focus-visible:outline-none"
      >
        {active?.content}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `Breadcrumb.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface BreadcrumbItem { label: string; href?: string; }
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}
```

- [ ] **Step 8: Create `Breadcrumb.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

const items = [{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Button' }];

describe('Breadcrumb', () => {
  it('renders nav landmark', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('renders last item as text, not link', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.queryByRole('link', { name: 'Button' })).not.toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
```

- [ ] **Step 9: Implement `Breadcrumb.tsx`**

```typescript
import { cn } from '../utils';
import type { BreadcrumbProps } from './Breadcrumb.types';

export function Breadcrumb({ items, separator = '/', className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-(--color-text-disabled)">{separator}</span>}
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={cn(isLast ? 'text-(--color-text-primary) font-medium' : 'text-(--color-text-secondary)')}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">{item.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 10: Create `Sidebar.types.ts`**

```typescript
import type { ReactElement } from 'react';
export interface SidebarChildItem { label: string; href: string; active?: boolean; }
export interface SidebarItem { label: string; href: string; icon?: ReactElement; active?: boolean; children?: SidebarChildItem[]; }
export interface SidebarProps { items: SidebarItem[]; collapsible?: boolean; className?: string; }
```

- [ ] **Step 11: Create `Sidebar.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { LayoutDashboard } from 'lucide-react';
import { Sidebar } from './Sidebar';

const items = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard />, active: true },
  { label: 'Settings', href: '/settings', children: [{ label: 'Profile', href: '/settings/profile' }] },
];

describe('Sidebar', () => {
  it('renders top-level links', () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toBeInTheDocument();
  });

  it('expands children on click', async () => {
    const user = userEvent.setup();
    render(<Sidebar items={items} />);
    await user.click(screen.getByRole('button', { name: /Settings/ }));
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 12: Implement `Sidebar.tsx`**

```typescript
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utils';
import type { SidebarProps } from './Sidebar.types';

export function Sidebar({ items, className }: SidebarProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  function toggle(label: string) {
    setExpanded(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  }

  return (
    <nav className={cn('w-56 py-2', className)}>
      {items.map(item => {
        const isExpanded = expanded.includes(item.label);
        return (
          <div key={item.label}>
            {item.children ? (
              <button
                onClick={() => toggle(item.label)}
                className={cn('w-full flex items-center gap-2 px-3 py-2 text-sm rounded-(--button-radius) transition-colors', 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface)')}
              >
                {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight className={cn('size-3.5 transition-transform', isExpanded && 'rotate-90')} />
              </button>
            ) : (
              <a href={item.href} className={cn('flex items-center gap-2 px-3 py-2 text-sm rounded-(--button-radius) transition-colors', item.active ? 'bg-(--color-surface) text-(--color-brand) font-medium' : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface)')}>
                {item.icon && <span className="size-4 shrink-0">{item.icon}</span>}
                {item.label}
              </a>
            )}
            {item.children && isExpanded && (
              <div className="ml-4 mt-0.5">
                {item.children.map(child => (
                  <a key={child.href} href={child.href} className={cn('block px-3 py-1.5 text-sm rounded-(--button-radius) transition-colors', child.active ? 'text-(--color-brand) font-medium' : 'text-(--color-text-secondary) hover:text-(--color-text-primary)')}>
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 13: Create `Pagination.types.ts`**

```typescript
export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}
```

- [ ] **Step 14: Create `Pagination.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders prev and next buttons', () => {
    render(<Pagination page={3} totalPages={10} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument();
  });

  it('disables prev on first page', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls onChange with next page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
```

- [ ] **Step 15: Implement `Pagination.tsx`**

```typescript
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';
import type { PaginationProps } from './Pagination.types';

function getPages(page: number, total: number, siblings: number): (number | '...')[] {
  const pages: (number | '...')[] = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  pages.push(1);
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  if (total > 1) pages.push(total);
  return pages;
}

export function Pagination({ page, totalPages, onChange, siblingCount = 1, className }: PaginationProps) {
  const pages = getPages(page, totalPages, siblingCount);
  const btnBase = 'inline-flex items-center justify-center size-8 rounded-(--button-radius) text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus)';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} className={cn(btnBase, 'border border-(--color-border) hover:bg-(--color-surface) disabled:opacity-50 disabled:cursor-not-allowed')}>
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p, i) => p === '...' ? (
        <span key={`ellipsis-${i}`} className="size-8 inline-flex items-center justify-center text-sm text-(--color-text-secondary)">…</span>
      ) : (
        <button key={p} onClick={() => onChange(p as number)} aria-current={p === page ? 'page' : undefined} className={cn(btnBase, p === page ? 'bg-(--color-brand) text-(--color-text-inverse)' : 'border border-(--color-border) hover:bg-(--color-surface)')}>
          {p}
        </button>
      ))}
      <button aria-label="Next page" disabled={page === totalPages} onClick={() => onChange(page + 1)} className={cn(btnBase, 'border border-(--color-border) hover:bg-(--color-surface) disabled:opacity-50 disabled:cursor-not-allowed')}>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
```

- [ ] **Step 16: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all Navigation tests pass.

```bash
git add packages/ui/src/components/NavBar.* packages/ui/src/components/Tabs.* packages/ui/src/components/Breadcrumb.* packages/ui/src/components/Sidebar.* packages/ui/src/components/Pagination.*
git commit -m "feat(ui): add NavBar, Tabs, Breadcrumb, Sidebar, Pagination"
```

---

### Task 9: Feedback — Badge, Toast, Alert, Tooltip, Progress, Skeleton, Spinner

> Follow Button TDD pattern for each.

**Files:** `Badge.*`, `Toast.*`, `Alert.*`, `Tooltip.*`, `Progress.*`, `Skeleton.*`, `Spinner.*`

- [ ] **Step 1: Create `Badge.types.ts`**

```typescript
export type BadgeVariant = 'info' | 'success' | 'danger' | 'warning' | 'neutral';
export type BadgeSize = 'sm' | 'md';
export interface BadgeProps { label: string; variant?: BadgeVariant; size?: BadgeSize; className?: string; }
```

- [ ] **Step 2: Create `Badge.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies pill radius', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New').className).toContain('rounded-(--badge-radius)');
  });

  it('applies info variant', () => {
    render(<Badge label="Info" variant="info" />);
    expect(screen.getByText('Info').className).toContain('bg-(--color-info-surface)');
  });

  it('applies danger variant', () => {
    render(<Badge label="Error" variant="danger" />);
    expect(screen.getByText('Error').className).toContain('bg-(--color-danger-surface)');
  });
});
```

- [ ] **Step 3: Implement `Badge.tsx`**

```typescript
import { cn } from '../utils';
import type { BadgeProps } from './Badge.types';

const variantClasses = {
  neutral: 'bg-(--color-surface) text-(--color-text-primary) border border-(--color-border)',
  info: 'bg-(--color-info-surface) text-(--color-info)',
  success: 'bg-(--color-success-surface) text-(--color-success)',
  danger: 'bg-(--color-danger-surface) text-(--color-danger)',
  warning: 'bg-(--color-warning-surface) text-(--color-warning)',
};
const sizeClasses = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-xs' };

export function Badge({ label, variant = 'neutral', size = 'md', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center font-medium rounded-(--badge-radius)', variantClasses[variant], sizeClasses[size], className)}>
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Create `Toast.types.ts`**

```typescript
export type ToastVariant = 'info' | 'success' | 'danger' | 'warning';
export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onDismiss?: () => void;
  duration?: number;
  className?: string;
}
```

- [ ] **Step 5: Create `Toast.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Saved!" />);
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('renders dismiss button when onDismiss provided', () => {
    render(<Toast message="Saved!" onDismiss={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when X clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Toast message="Saved!" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 6: Implement `Toast.tsx`**

```typescript
import { useEffect } from 'react';
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../utils';
import type { ToastProps } from './Toast.types';

const config = {
  info: { icon: Info, classes: 'bg-(--color-info-surface) text-(--color-info)' },
  success: { icon: CheckCircle, classes: 'bg-(--color-success-surface) text-(--color-success)' },
  danger: { icon: AlertCircle, classes: 'bg-(--color-danger-surface) text-(--color-danger)' },
  warning: { icon: AlertTriangle, classes: 'bg-(--color-warning-surface) text-(--color-warning)' },
};

export function Toast({ message, variant = 'info', onDismiss, duration = 4000, className }: ToastProps) {
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const t = setTimeout(onDismiss, duration);
      return () => clearTimeout(t);
    }
  }, [duration, onDismiss]);

  const { icon: Icon, classes } = config[variant];
  return (
    <div role="alert" className={cn('flex items-start gap-3 px-4 py-3 rounded-(--card-radius) shadow-lg max-w-sm', classes, className)}>
      <Icon className="size-4 mt-0.5 shrink-0" aria-hidden="true" />
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" className="shrink-0 opacity-70 hover:opacity-100">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 7: Create `Alert.types.ts`**

```typescript
export type AlertVariant = 'info' | 'success' | 'danger' | 'warning';
export interface AlertProps {
  message: string;
  title?: string;
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

- [ ] **Step 8: Create `Alert.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert message="Details" title="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Alert message="Info" dismissible onDismiss={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when button clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert message="Info" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 9: Implement `Alert.tsx`**

```typescript
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../utils';
import type { AlertProps } from './Alert.types';

const config = {
  info: { icon: Info, classes: 'bg-(--color-info-surface) text-(--color-info)' },
  success: { icon: CheckCircle, classes: 'bg-(--color-success-surface) text-(--color-success)' },
  danger: { icon: AlertCircle, classes: 'bg-(--color-danger-surface) text-(--color-danger)' },
  warning: { icon: AlertTriangle, classes: 'bg-(--color-warning-surface) text-(--color-warning)' },
};

export function Alert({ message, title, variant = 'info', dismissible, onDismiss, className }: AlertProps) {
  const { icon: Icon, classes } = config[variant];
  return (
    <div role="alert" className={cn('flex gap-3 rounded-(--card-radius) p-4', classes, className)}>
      <Icon className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 text-sm">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <p>{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" className="shrink-0 opacity-70 hover:opacity-100">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 10: Create `Tooltip.types.ts`**

```typescript
import type { ReactElement } from 'react';
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps { content: string; children: ReactElement; side?: TooltipSide; }
```

- [ ] **Step 11: Create `Tooltip.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip content="Helpful tip"><button>Hover me</button></Tooltip>);
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('renders tooltip content', () => {
    render(<Tooltip content="Helpful tip"><button>Hover me</button></Tooltip>);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful tip');
  });
});
```

- [ ] **Step 12: Implement `Tooltip.tsx`**

```typescript
import { cloneElement } from 'react';
import { useId } from 'react';
import { cn } from '../utils';
import type { TooltipProps } from './Tooltip.types';

const posClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
};

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const id = useId();
  return (
    <span className="relative inline-flex group/tooltip">
      {cloneElement(children, { 'aria-describedby': id })}
      <span
        id={id}
        role="tooltip"
        className={cn(
          'absolute z-50 px-2 py-1 text-xs rounded-(--tooltip-radius) bg-slate-900 text-white whitespace-nowrap pointer-events-none',
          'invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-opacity',
          posClasses[side],
        )}
      >
        {content}
      </span>
    </span>
  );
}
```

- [ ] **Step 13: Create `Progress.types.ts`**

```typescript
export type ProgressVariant = 'default' | 'success' | 'danger' | 'warning';
export type ProgressSize = 'sm' | 'md' | 'lg';
export interface ProgressProps { value: number; variant?: ProgressVariant; size?: ProgressSize; label?: string; className?: string; }
```

- [ ] **Step 14: Create `Progress.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progressbar role', () => {
    render(<Progress value={60} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow', () => {
    render(<Progress value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');
  });

  it('clamps value to 0-100', () => {
    render(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });
});
```

- [ ] **Step 15: Implement `Progress.tsx`**

```typescript
import { cn } from '../utils';
import type { ProgressProps } from './Progress.types';

const fillClasses = { default: 'bg-(--color-brand)', success: 'bg-(--color-success)', danger: 'bg-(--color-danger)', warning: 'bg-(--color-warning)' };
const trackHeight = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

export function Progress({ value, variant = 'default', size = 'md', label, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('w-full', className)}>
      {label && <span className="block text-sm text-(--color-text-secondary) mb-1">{label}</span>}
      <div role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} className={cn('w-full rounded-full bg-(--color-surface)', trackHeight[size])}>
        <div className={cn('rounded-full transition-all', fillClasses[variant], trackHeight[size])} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
```

- [ ] **Step 16: Create `Skeleton.types.ts`**

```typescript
export interface SkeletonProps { width?: string; height?: string; rounded?: boolean; count?: number; className?: string; }
```

- [ ] **Step 17: Create `Skeleton.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a skeleton element', () => {
    render(<Skeleton />);
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders count number of skeletons', () => {
    render(<Skeleton count={3} />);
    expect(document.querySelectorAll('.animate-pulse')).toHaveLength(3);
  });

  it('applies rounded-full when rounded=true', () => {
    render(<Skeleton rounded />);
    expect(document.querySelector('.rounded-full')).toBeInTheDocument();
  });
});
```

- [ ] **Step 18: Implement `Skeleton.tsx`**

```typescript
import { cn } from '../utils';
import type { SkeletonProps } from './Skeleton.types';

export function Skeleton({ width, height = '1rem', rounded = false, count = 1, className }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('animate-pulse bg-(--color-surface)', rounded ? 'rounded-full' : 'rounded-(--radius-md)', i < count - 1 && 'mb-2', className)}
          style={{ width: i === count - 1 && count > 1 ? '60%' : width, height }}
        />
      ))}
    </>
  );
}
```

- [ ] **Step 19: Create `Spinner.types.ts`**

```typescript
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps { size?: SpinnerSize; className?: string; }
```

- [ ] **Step 20: Create `Spinner.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a status element', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has sr-only loading text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies md size by default', () => {
    render(<Spinner />);
    expect(document.querySelector('svg')!.className).toContain('size-6');
  });
});
```

- [ ] **Step 21: Implement `Spinner.tsx`**

```typescript
import { cn } from '../utils';
import type { SpinnerProps } from './Spinner.types';

const sizeClasses = { sm: 'size-4', md: 'size-6', lg: 'size-8' };

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex', className)}>
      <svg className={cn('animate-spin text-(--color-brand)', sizeClasses[size])} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span className="sr-only">Loading...</span>
    </span>
  );
}
```

- [ ] **Step 22: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all Feedback tests pass.

```bash
git add packages/ui/src/components/Badge.* packages/ui/src/components/Toast.* packages/ui/src/components/Alert.* packages/ui/src/components/Tooltip.* packages/ui/src/components/Progress.* packages/ui/src/components/Skeleton.* packages/ui/src/components/Spinner.*
git commit -m "feat(ui): add Badge, Toast, Alert, Tooltip, Progress, Skeleton, Spinner"
```

---

### Task 10: Containers — Card, Modal, Drawer, Popover, Accordion, Divider

> Follow Button TDD pattern for each.

**Files:** `Card.*`, `Modal.*`, `Drawer.*`, `Popover.*`, `Accordion.*`, `Divider.*`

- [ ] **Step 1: Create `Card.types.ts`**

```typescript
import type { ReactNode } from 'react';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export interface CardProps { children: ReactNode; header?: ReactNode; footer?: ReactNode; padding?: CardPadding; className?: string; }
```

- [ ] **Step 2: Create `Card.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders header', () => {
    render(<Card header={<span>Title</span>}>Body</Card>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<Card footer={<span>Footer</span>}>Body</Card>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies card radius class', () => {
    const { container } = render(<Card>Body</Card>);
    expect(container.firstChild).toHaveClass('rounded-(--card-radius)');
  });
});
```

- [ ] **Step 3: Implement `Card.tsx`**

```typescript
import { cn } from '../utils';
import type { CardProps } from './Card.types';

const paddingClasses = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };

export function Card({ children, header, footer, padding = 'md', className }: CardProps) {
  return (
    <div className={cn('rounded-(--card-radius) border border-(--color-border) bg-(--color-surface-raised) shadow-sm overflow-hidden', className)}>
      {header && <div className="px-4 py-3 border-b border-(--color-border)">{header}</div>}
      <div className={paddingClasses[padding]}>{children}</div>
      {footer && <div className="px-4 py-3 border-t border-(--color-border)">{footer}</div>}
    </div>
  );
}
```

- [ ] **Step 4: Create `Modal.types.ts`**

```typescript
import type { ReactNode } from 'react';
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';
export interface ModalProps { open: boolean; onClose: () => void; title?: string; children: ReactNode; size?: ModalSize; }
```

- [ ] **Step 5: Create `Modal.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<Modal open={true} onClose={vi.fn()}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Content</Modal>);
    expect(screen.getByText('My Modal')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Modal">Content</Modal>);
    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 6: Implement `Modal.tsx`**

```typescript
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';
import type { ModalProps } from './Modal.types';

const sizeClasses = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', full: 'max-w-full min-h-screen' };

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} className={cn('bg-(--color-bg) rounded-(--modal-radius) shadow-xl w-full pointer-events-auto', sizeClasses[size])}>
          {title && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border)">
              <h2 id="modal-title" className="text-base font-semibold text-(--color-text-primary)">{title}</h2>
              <button onClick={onClose} aria-label="Close modal" className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"><X className="size-5" /></button>
            </div>
          )}
          <div className="p-5">{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}
```

- [ ] **Step 7: Create `Drawer.types.ts`**

```typescript
import type { ReactNode } from 'react';
export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export interface DrawerProps { open: boolean; onClose: () => void; title?: string; children: ReactNode; side?: DrawerSide; }
```

- [ ] **Step 8: Create `Drawer.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false} onClose={vi.fn()}>Content</Drawer>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<Drawer open={true} onClose={vi.fn()}>Content</Drawer>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer open={true} onClose={onClose} title="Drawer">Content</Drawer>);
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 9: Implement `Drawer.tsx`**

```typescript
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils';
import type { DrawerProps } from './Drawer.types';

const panelClasses = {
  right: 'fixed right-0 top-0 h-full w-80 shadow-xl',
  left: 'fixed left-0 top-0 h-full w-80 shadow-xl',
  top: 'fixed top-0 left-0 w-full shadow-xl',
  bottom: 'fixed bottom-0 left-0 w-full shadow-xl',
};

export function Drawer({ open, onClose, title, children, side = 'right' }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className={cn('z-50 bg-(--color-bg)', panelClasses[side])}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border)">
          {title && <h2 className="text-base font-semibold text-(--color-text-primary)">{title}</h2>}
          <button onClick={onClose} aria-label="Close drawer" className="ml-auto text-(--color-text-secondary) hover:text-(--color-text-primary)"><X className="size-5" /></button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body,
  );
}
```

- [ ] **Step 10: Create `Popover.types.ts`**

```typescript
import type { ReactElement, ReactNode } from 'react';
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export interface PopoverProps { trigger: ReactElement; content: ReactNode; side?: PopoverSide; open?: boolean; onOpenChange?: (open: boolean) => void; }
```

- [ ] **Step 11: Create `Popover.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders trigger', () => {
    render(<Popover trigger={<button>Open</button>} content={<p>Content</p>} />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('shows content on trigger click', async () => {
    const user = userEvent.setup();
    render(<Popover trigger={<button>Open</button>} content={<p>Popover content</p>} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('hides content initially', () => {
    render(<Popover trigger={<button>Open</button>} content={<p>Popover content</p>} />);
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 12: Implement `Popover.tsx`**

```typescript
import { useState, useEffect, useRef, cloneElement } from 'react';
import { cn } from '../utils';
import type { PopoverProps } from './Popover.types';

const posClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Popover({ trigger, content, side = 'bottom', open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const ref = useRef<HTMLDivElement>(null);

  function toggle() {
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setInternalOpen(false);
        onOpenChange?.(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onOpenChange]);

  return (
    <span ref={ref} className="relative inline-flex">
      {cloneElement(trigger, { onClick: toggle })}
      {isOpen && (
        <span className={cn('absolute z-10 bg-(--color-bg) rounded-(--popover-radius) border border-(--color-border) shadow-md p-3 min-w-[10rem]', posClasses[side])}>
          {content}
        </span>
      )}
    </span>
  );
}
```

- [ ] **Step 13: Create `Accordion.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface AccordionItem { id: string; trigger: ReactNode; content: ReactNode; }
export interface AccordionProps { items: AccordionItem[]; allowMultiple?: boolean; defaultOpen?: string[]; className?: string; }
```

- [ ] **Step 14: Create `Accordion.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion } from './Accordion';

const items = [
  { id: '1', trigger: 'Section 1', content: <p>Content 1</p> },
  { id: '2', trigger: 'Section 2', content: <p>Content 2</p> },
];

describe('Accordion', () => {
  it('renders all triggers', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('content is hidden initially', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('shows content on trigger click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByRole('button', { name: /Section 1/ }));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('closes other items when allowMultiple=false', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByRole('button', { name: /Section 1/ }));
    await user.click(screen.getByRole('button', { name: /Section 2/ }));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
```

- [ ] **Step 15: Implement `Accordion.tsx`**

```typescript
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils';
import type { AccordionProps } from './Accordion.types';

export function Accordion({ items, allowMultiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  function toggle(id: string) {
    setOpenIds(prev => {
      const isOpen = prev.includes(id);
      if (isOpen) return prev.filter(i => i !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  }

  return (
    <div className={cn('divide-y divide-(--color-border) border border-(--color-border) rounded-(--card-radius) overflow-hidden', className)}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              id={`trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-surface) transition-colors text-left"
            >
              {item.trigger}
              <ChevronDown className={cn('size-4 text-(--color-text-secondary) transition-transform shrink-0', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div id={`panel-${item.id}`} role="region" aria-labelledby={`trigger-${item.id}`} className="px-4 py-3 text-sm text-(--color-text-secondary) border-t border-(--color-border)">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 16: Create `Divider.types.ts`**

```typescript
export type DividerOrientation = 'horizontal' | 'vertical';
export interface DividerProps { orientation?: DividerOrientation; label?: string; className?: string; }
```

- [ ] **Step 17: Create `Divider.test.tsx`**

```typescript
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('renders label text when provided', () => {
    const { getByText } = render(<Divider label="OR" />);
    expect(getByText('OR')).toBeInTheDocument();
  });
});
```

- [ ] **Step 18: Implement `Divider.tsx`**

```typescript
import { cn } from '../utils';
import type { DividerProps } from './Divider.types';

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('h-full w-px bg-(--color-border)', className)} role="separator" aria-orientation="vertical" />;
  }
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)} role="separator">
        <div className="flex-1 h-px bg-(--color-border)" />
        <span className="text-xs text-(--color-text-secondary) shrink-0">{label}</span>
        <div className="flex-1 h-px bg-(--color-border)" />
      </div>
    );
  }
  return <hr className={cn('w-full border-0 h-px bg-(--color-border)', className)} role="separator" />;
}
```

- [ ] **Step 19: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all Container tests pass.

```bash
git add packages/ui/src/components/Card.* packages/ui/src/components/Modal.* packages/ui/src/components/Drawer.* packages/ui/src/components/Popover.* packages/ui/src/components/Accordion.* packages/ui/src/components/Divider.*
git commit -m "feat(ui): add Card, Modal, Drawer, Popover, Accordion, Divider"
```

---

### Task 11: Data — Table, List, Avatar, Chip

> Follow Button TDD pattern for each.

**Files:** `Table.*`, `List.*`, `Avatar.*`, `Chip.*`

- [ ] **Step 1: Create `Table.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface Column<T> { key: keyof T; header: string; sortable?: boolean; render?: (value: T[keyof T], row: T) => ReactNode; }
export interface TableProps<T extends Record<string, unknown>> { data: T[]; columns: Column<T>[]; caption?: string; onSort?: (key: string) => void; }
```

- [ ] **Step 2: Create `Table.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table } from './Table';

const data = [{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'Member' }];
const columns = [{ key: 'name' as const, header: 'Name', sortable: true }, { key: 'role' as const, header: 'Role' }];

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onSort when sortable header clicked', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(<Table data={data} columns={columns} onSort={onSort} />);
    await user.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSort).toHaveBeenCalledWith('name');
  });
});
```

- [ ] **Step 3: Implement `Table.tsx`**

```typescript
import { ChevronUp } from 'lucide-react';
import { cn } from '../utils';
import type { TableProps } from './Table.types';

export function Table<T extends Record<string, unknown>>({ data, columns, caption, onSort, className }: TableProps<T> & { className?: string }) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-sm">
        {caption && <caption className="text-sm text-(--color-text-secondary) mb-2 text-left">{caption}</caption>}
        <thead>
          <tr className="border-b border-(--color-border)">
            {columns.map(col => (
              <th key={String(col.key)} className="text-left px-4 py-3 font-medium text-(--color-text-secondary)">
                {col.sortable && onSort ? (
                  <button onClick={() => onSort(String(col.key))} className="inline-flex items-center gap-1 hover:text-(--color-text-primary) transition-colors">
                    {col.header}
                    <ChevronUp className="size-3.5 opacity-50" />
                  </button>
                ) : col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border)">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-(--color-surface) transition-colors">
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-3 text-(--color-text-primary)">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Create `List.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface ListItem { id: string; content: ReactNode; leading?: ReactNode; trailing?: ReactNode; }
export interface ListProps { items: ListItem[]; divided?: boolean; className?: string; }
```

- [ ] **Step 5: Create `List.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List } from './List';

const items = [{ id: '1', content: 'Item one' }, { id: '2', content: 'Item two' }];

describe('List', () => {
  it('renders items', () => {
    render(<List items={items} />);
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
  });

  it('applies divide class when divided=true', () => {
    const { container } = render(<List items={items} divided />);
    expect(container.querySelector('ul')!.className).toContain('divide-y');
  });
});
```

- [ ] **Step 6: Implement `List.tsx`**

```typescript
import { cn } from '../utils';
import type { ListProps } from './List.types';

export function List({ items, divided = false, className }: ListProps) {
  return (
    <ul role="list" className={cn(divided && 'divide-y divide-(--color-border)', className)}>
      {items.map(item => (
        <li key={item.id} className="flex items-center gap-3 py-3">
          {item.leading && <span className="shrink-0">{item.leading}</span>}
          <span className="flex-1 text-sm text-(--color-text-primary)">{item.content}</span>
          {item.trailing && <span className="shrink-0">{item.trailing}</span>}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 7: Create `Avatar.types.ts`**

```typescript
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export interface AvatarProps { src?: string; alt?: string; initials?: string; size?: AvatarSize; shape?: AvatarShape; className?: string; }
```

- [ ] **Step 8: Create `Avatar.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="/photo.jpg" alt="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('renders initials when no src', () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies circle shape by default', () => {
    const { container } = render(<Avatar initials="JD" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('applies square shape', () => {
    const { container } = render(<Avatar initials="JD" shape="square" />);
    expect(container.firstChild).toHaveClass('rounded-(--radius-md)');
  });
});
```

- [ ] **Step 9: Implement `Avatar.tsx`**

```typescript
import { useState } from 'react';
import { cn } from '../utils';
import type { AvatarProps } from './Avatar.types';

const sizeClasses = { sm: 'size-6 text-xs', md: 'size-8 text-sm', lg: 'size-10 text-base', xl: 'size-14 text-lg' };
const shapeClasses = { circle: 'rounded-full', square: 'rounded-(--radius-md)' };

export function Avatar({ src, alt, initials, size = 'md', shape = 'circle', className }: AvatarProps) {
  const [error, setError] = useState(false);
  return (
    <span className={cn('inline-flex items-center justify-center overflow-hidden font-medium shrink-0', sizeClasses[size], shapeClasses[shape], (!src || error) && 'bg-(--color-brand) text-(--color-text-inverse)', className)} aria-label={alt ?? initials}>
      {src && !error ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setError(true)} />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
```

- [ ] **Step 10: Create `Chip.types.ts`**

```typescript
export type ChipVariant = 'default' | 'info' | 'success' | 'danger' | 'warning';
export type ChipSize = 'sm' | 'md';
export interface ChipProps { label: string; onRemove?: () => void; variant?: ChipVariant; size?: ChipSize; className?: string; }
```

- [ ] **Step 11: Create `Chip.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders remove button when onRemove provided', () => {
    render(<Chip label="React" onRemove={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Remove React' })).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Chip label="React" onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: 'Remove React' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('applies pill radius', () => {
    const { container } = render(<Chip label="React" />);
    expect(container.firstChild).toHaveClass('rounded-(--chip-radius)');
  });
});
```

- [ ] **Step 12: Implement `Chip.tsx`**

```typescript
import { X } from 'lucide-react';
import { cn } from '../utils';
import type { ChipProps } from './Chip.types';

const variantClasses = {
  default: 'bg-(--color-surface) text-(--color-text-primary) border border-(--color-border)',
  info: 'bg-(--color-info-surface) text-(--color-info)',
  success: 'bg-(--color-success-surface) text-(--color-success)',
  danger: 'bg-(--color-danger-surface) text-(--color-danger)',
  warning: 'bg-(--color-warning-surface) text-(--color-warning)',
};
const sizeClasses = { sm: 'px-2 py-0.5 text-xs gap-1', md: 'px-3 py-1 text-sm gap-1.5' };

export function Chip({ label, onRemove, variant = 'default', size = 'md', className }: ChipProps) {
  return (
    <span className={cn('inline-flex items-center font-medium rounded-(--chip-radius)', variantClasses[variant], sizeClasses[size], className)}>
      {label}
      {onRemove && (
        <button onClick={onRemove} aria-label={`Remove ${label}`} className="opacity-60 hover:opacity-100 transition-opacity">
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}
```

- [ ] **Step 13: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all Data tests pass.

```bash
git add packages/ui/src/components/Table.* packages/ui/src/components/List.* packages/ui/src/components/Avatar.* packages/ui/src/components/Chip.*
git commit -m "feat(ui): add Table, List, Avatar, Chip"
```

---

### Task 12: Typography — Heading, Body, Label, Caption, Code

> Follow Button TDD pattern for each.

**Files:** `Heading.*`, `Body.*`, `Label.*`, `Caption.*`, `Code.*`

- [ ] **Step 1: Create `Heading.types.ts`**

```typescript
import type { ReactNode } from 'react';
export type HeadingLevel = 1 | 2 | 3 | 4 | 'display';
export interface HeadingProps { level?: HeadingLevel; children: ReactNode; className?: string; }
```

- [ ] **Step 2: Create `Heading.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders h1 by default', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders h3 for level=3', () => {
    render(<Heading level={3}>Sub</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders h1 for display level', () => {
    render(<Heading level="display">Display</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Implement `Heading.tsx`**

```typescript
import { cn } from '../utils';
import type { HeadingProps } from './Heading.types';

const styles = {
  display: 'text-4xl font-bold leading-tight',
  1: 'text-3xl font-bold leading-tight',
  2: 'text-2xl font-semibold leading-tight',
  3: 'text-xl font-semibold',
  4: 'text-lg font-medium',
};

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = level === 'display' ? 'h1' : (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4');
  return <Tag className={cn('text-(--color-text-primary)', styles[level], className)}>{children}</Tag>;
}
```

- [ ] **Step 4: Create `Body.types.ts`**

```typescript
import type { ReactNode } from 'react';
export type BodySize = 'sm' | 'base' | 'lg';
export interface BodyProps { size?: BodySize; children: ReactNode; className?: string; }
```

- [ ] **Step 5: Create `Body.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Body } from './Body';

describe('Body', () => {
  it('renders a paragraph', () => {
    render(<Body>Hello</Body>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('applies sm text class for size=sm', () => {
    render(<Body size="sm">Hello</Body>);
    expect(screen.getByText('Hello').className).toContain('text-sm');
  });

  it('applies lg text class for size=lg', () => {
    render(<Body size="lg">Hello</Body>);
    expect(screen.getByText('Hello').className).toContain('text-lg');
  });
});
```

- [ ] **Step 6: Implement `Body.tsx`**

```typescript
import { cn } from '../utils';
import type { BodyProps } from './Body.types';

const sizeClasses = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' };

export function Body({ size = 'base', children, className }: BodyProps) {
  return <p className={cn('text-(--color-text-primary) leading-normal', sizeClasses[size], className)}>{children}</p>;
}
```

- [ ] **Step 7: Create `Label.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface LabelProps { htmlFor?: string; required?: boolean; children: ReactNode; className?: string; }
```

- [ ] **Step 8: Create `Label.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders a label element', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email').tagName).toBe('LABEL');
  });

  it('shows required asterisk when required=true', () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('links to input via htmlFor', () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'email');
  });
});
```

- [ ] **Step 9: Implement `Label.tsx`**

```typescript
import { cn } from '../utils';
import type { LabelProps } from './Label.types';

export function Label({ htmlFor, required, children, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-sm font-medium text-(--color-text-primary)', className)}>
      {children}
      {required && <span aria-hidden="true" className="text-(--color-danger) ml-0.5">*</span>}
    </label>
  );
}
```

- [ ] **Step 10: Create `Caption.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface CaptionProps { children: ReactNode; className?: string; }
```

- [ ] **Step 11: Create `Caption.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Caption } from './Caption';

describe('Caption', () => {
  it('renders children', () => {
    render(<Caption>Helper text</Caption>);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('applies muted text color', () => {
    render(<Caption>Helper text</Caption>);
    expect(screen.getByText('Helper text').className).toContain('text-(--color-text-secondary)');
  });
});
```

- [ ] **Step 12: Implement `Caption.tsx`**

```typescript
import { cn } from '../utils';
import type { CaptionProps } from './Caption.types';

export function Caption({ children, className }: CaptionProps) {
  return <p className={cn('text-xs text-(--color-text-secondary) leading-normal', className)}>{children}</p>;
}
```

- [ ] **Step 13: Create `Code.types.ts`**

```typescript
import type { ReactNode } from 'react';
export interface CodeProps { children: ReactNode; block?: boolean; className?: string; }
```

- [ ] **Step 14: Create `Code.test.tsx`**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Code } from './Code';

describe('Code', () => {
  it('renders inline code by default', () => {
    render(<Code>const x = 1</Code>);
    expect(screen.getByText('const x = 1').tagName).toBe('CODE');
  });

  it('renders pre > code when block=true', () => {
    render(<Code block>const x = 1</Code>);
    const code = screen.getByText('const x = 1');
    expect(code.tagName).toBe('CODE');
    expect(code.parentElement!.tagName).toBe('PRE');
  });
});
```

- [ ] **Step 15: Implement `Code.tsx`**

```typescript
import { cn } from '../utils';
import type { CodeProps } from './Code.types';

export function Code({ children, block = false, className }: CodeProps) {
  if (block) {
    return (
      <pre className={cn('rounded-(--radius-lg) bg-(--color-surface) p-4 overflow-x-auto', className)}>
        <code className="font-mono text-sm text-(--color-text-primary)">{children}</code>
      </pre>
    );
  }
  return <code className={cn('font-mono text-sm bg-(--color-surface) px-1 py-0.5 rounded-sm text-(--color-text-primary)', className)}>{children}</code>;
}
```

- [ ] **Step 16: Run all tests and commit**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all Typography tests pass.

```bash
git add packages/ui/src/components/Heading.* packages/ui/src/components/Body.* packages/ui/src/components/Label.* packages/ui/src/components/Caption.* packages/ui/src/components/Code.*
git commit -m "feat(ui): add Heading, Body, Label, Caption, Code"
```

---

### Task 13: Barrel exports + full test run

**Files:**
- Create: `packages/ui/src/components/index.ts`
- Create: `packages/ui/src/index.ts`

- [ ] **Step 1: Create `packages/ui/src/components/index.ts`**

```typescript
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
export { IconButton } from './IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './IconButton.types';
export { Link } from './Link';
export type { LinkProps, LinkVariant } from './Link.types';
export { FAB } from './FAB';
export type { FABProps, FABSize } from './FAB.types';
export { SplitButton } from './SplitButton';
export type { SplitButtonProps, SplitButtonVariant, SplitButtonSize } from './SplitButton.types';
export { Input } from './Input';
export type { InputProps, InputVariant } from './Input.types';
export { Textarea } from './Textarea';
export type { TextareaProps, TextareaVariant, TextareaResize } from './Textarea.types';
export { Select } from './Select';
export type { SelectProps, SelectOption, SelectVariant } from './Select.types';
export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox.types';
export { Radio } from './Radio';
export type { RadioProps } from './Radio.types';
export { Toggle } from './Toggle';
export type { ToggleProps, ToggleSize } from './Toggle.types';
export { Slider } from './Slider';
export type { SliderProps } from './Slider.types';
export { DatePicker } from './DatePicker';
export type { DatePickerProps } from './DatePicker.types';
export { NavBar } from './NavBar';
export type { NavBarProps, NavItem } from './NavBar.types';
export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs.types';
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
export { Sidebar } from './Sidebar';
export type { SidebarProps, SidebarItem, SidebarChildItem } from './Sidebar.types';
export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination.types';
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';
export { Toast } from './Toast';
export type { ToastProps, ToastVariant } from './Toast.types';
export { Alert } from './Alert';
export type { AlertProps, AlertVariant } from './Alert.types';
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipSide } from './Tooltip.types';
export { Progress } from './Progress';
export type { ProgressProps, ProgressVariant, ProgressSize } from './Progress.types';
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton.types';
export { Spinner } from './Spinner';
export type { SpinnerProps, SpinnerSize } from './Spinner.types';
export { Card } from './Card';
export type { CardProps, CardPadding } from './Card.types';
export { Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal.types';
export { Drawer } from './Drawer';
export type { DrawerProps, DrawerSide } from './Drawer.types';
export { Popover } from './Popover';
export type { PopoverProps, PopoverSide } from './Popover.types';
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion.types';
export { Divider } from './Divider';
export type { DividerProps, DividerOrientation } from './Divider.types';
export { Table } from './Table';
export type { TableProps, Column } from './Table.types';
export { List } from './List';
export type { ListProps, ListItem } from './List.types';
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarSize, AvatarShape } from './Avatar.types';
export { Chip } from './Chip';
export type { ChipProps, ChipVariant, ChipSize } from './Chip.types';
export { Heading } from './Heading';
export type { HeadingProps, HeadingLevel } from './Heading.types';
export { Body } from './Body';
export type { BodyProps, BodySize } from './Body.types';
export { Label } from './Label';
export type { LabelProps } from './Label.types';
export { Caption } from './Caption';
export type { CaptionProps } from './Caption.types';
export { Code } from './Code';
export type { CodeProps } from './Code.types';
```

- [ ] **Step 2: Create `packages/ui/src/index.ts`**

```typescript
export * from './components';
export { cn } from './utils';
```

- [ ] **Step 3: Run the full test suite**

```bash
npm run test -w @ds/ui -- --reporter verbose
```

Expected: all test files pass, 0 failures. You should see output similar to:
```
✓ Button.test.tsx (11 tests)
✓ IconButton.test.tsx (5 tests)
✓ Link.test.tsx (4 tests)
✓ FAB.test.tsx (4 tests)
✓ SplitButton.test.tsx (4 tests)
✓ Input.test.tsx (6 tests)
✓ Textarea.test.tsx (4 tests)
✓ Select.test.tsx (4 tests)
✓ Checkbox.test.tsx (4 tests)
✓ Radio.test.tsx (3 tests)
✓ Toggle.test.tsx (4 tests)
✓ Slider.test.tsx (3 tests)
✓ DatePicker.test.tsx (3 tests)
✓ NavBar.test.tsx (4 tests)
✓ Tabs.test.tsx (4 tests)
✓ Breadcrumb.test.tsx (3 tests)
✓ Sidebar.test.tsx (2 tests)
✓ Pagination.test.tsx (4 tests)
✓ Badge.test.tsx (4 tests)
✓ Toast.test.tsx (3 tests)
✓ Alert.test.tsx (4 tests)
✓ Tooltip.test.tsx (2 tests)
✓ Progress.test.tsx (3 tests)
✓ Skeleton.test.tsx (3 tests)
✓ Spinner.test.tsx (3 tests)
✓ Card.test.tsx (4 tests)
✓ Modal.test.tsx (4 tests)
✓ Drawer.test.tsx (3 tests)
✓ Popover.test.tsx (3 tests)
✓ Accordion.test.tsx (4 tests)
✓ Divider.test.tsx (2 tests)
✓ Table.test.tsx (3 tests)
✓ List.test.tsx (2 tests)
✓ Avatar.test.tsx (4 tests)
✓ Chip.test.tsx (4 tests)
✓ Heading.test.tsx (3 tests)
✓ Body.test.tsx (3 tests)
✓ Label.test.tsx (3 tests)
✓ Caption.test.tsx (2 tests)
✓ Code.test.tsx (2 tests)
```

- [ ] **Step 4: Final commit**

```bash
git add packages/ui/src/components/index.ts packages/ui/src/index.ts
git commit -m "feat(ui): add barrel exports — packages/ui complete"
```
