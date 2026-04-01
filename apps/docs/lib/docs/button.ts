// @ts-nocheck
import { createElement as h } from 'react'
import { Button } from '@ds/ui'
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
          h(Button, { variant: 'secondary' }, 'Secondary'),
          h(Button, { variant: 'secondary', disabled: true }, 'Disabled'),
          h(Button, { variant: 'ghost' }, 'Ghost'),
          h(Button, { variant: 'ghost', disabled: true }, 'Disabled'),
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
    { name: '--color-interaction-hover', value: 'rgba(0,0,0,0.06)', description: 'Secondary and ghost hover fill — surface-agnostic alpha overlay' },
    { name: '--color-interaction-pressed', value: 'rgba(0,0,0,0.12)', description: 'Secondary and ghost pressed fill — surface-agnostic alpha overlay' },
    { name: '--color-brand-hover', value: 'var(--color-blue-700)', description: 'Primary hover background' },
    { name: '--color-brand-pressed', value: 'var(--color-blue-800)', description: 'Primary pressed background' },
    { name: '--color-danger-hover', value: 'var(--color-red-700)', description: 'Danger hover background' },
    { name: '--color-danger-pressed', value: 'var(--color-red-800)', description: 'Danger pressed background' },
  ],
}
