// @ts-nocheck
import { createElement as h } from 'react'
import { IconButton, Icon, Link, FAB, SplitButton } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const iconButtonDoc: ComponentDoc = {
  title: 'Icon Button',
  slug: 'icon-button',
  description:
    'A button that renders only an icon with no visible label. Requires an aria-label for accessibility. Used for compact toolbar actions, close buttons, and icon-only controls.',
  whenToUse: [
    'Toolbar or header actions where space is limited',
    'Close, dismiss, or expand controls next to other elements',
    'Actions that are universally understood through their icon alone',
  ],
  whenNotToUse: [
    'Actions that need an explanatory label — use Button instead',
    'Navigation — use Link or NavBar instead',
    'When the icon meaning may be ambiguous to your audience',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-3 items-center' },
      h(IconButton, { variant: 'primary', 'aria-label': 'Add item', icon: h(Icon, { name: 'add' }) }),
      h(IconButton, { variant: 'secondary', 'aria-label': 'Settings', icon: h(Icon, { name: 'settings' }) }),
      h(IconButton, { variant: 'ghost', 'aria-label': 'Close', icon: h(Icon, { name: 'close' }) }),
      h(IconButton, { variant: 'danger', 'aria-label': 'Delete', icon: h(Icon, { name: 'delete' }) }),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-center' },
          h(IconButton, { variant: 'primary', 'aria-label': 'Primary', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'secondary', 'aria-label': 'Secondary', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'ghost', 'aria-label': 'Ghost', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'danger', 'aria-label': 'Danger', icon: h(Icon, { name: 'star' }) }),
        ),
    },
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-center' },
          h(IconButton, { size: 'sm', 'aria-label': 'Small', icon: h(Icon, { name: 'close' }) }),
          h(IconButton, { size: 'md', 'aria-label': 'Medium', icon: h(Icon, { name: 'close' }) }),
          h(IconButton, { size: 'lg', 'aria-label': 'Large', icon: h(Icon, { name: 'close' }) }),
        ),
    },
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-center' },
          h(IconButton, { variant: 'primary', 'aria-label': 'Default', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'primary', disabled: true, 'aria-label': 'Disabled', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'primary', loading: true, 'aria-label': 'Loading' }),
          h(IconButton, { variant: 'secondary', 'aria-label': 'Default', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'secondary', disabled: true, 'aria-label': 'Disabled', icon: h(Icon, { name: 'star' }) }),
          h(IconButton, { variant: 'secondary', loading: true, 'aria-label': 'Loading' }),
        ),
    },
  ],
  usage: `import { IconButton, Icon } from '@ds/ui'

// Close a dialog
<IconButton
  variant="ghost"
  size="sm"
  aria-label="Close dialog"
  icon={<Icon name="close" />}
/>

// Danger action in a row
<IconButton variant="danger" size="md" aria-label="Delete row" icon={<Icon name="delete" />} />

// Loading state
<IconButton variant="primary" size="md" aria-label="Saving" loading />`,
  props: [
    { name: 'icon', type: 'ReactNode', required: true, description: 'The icon element to render inside the button.' },
    { name: 'aria-label', type: 'string', required: true, description: 'Accessible label describing the action. Required since there is no visible text.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'secondary'", description: 'Visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls button dimensions and icon size (sm=16px, md=20px, lg=24px). Matches Button heights at each tier.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Replaces the icon with a spinner and disables interaction. Sets aria-busy.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction and reduces opacity.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes.' },
  ],
  tokens: [
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius shared with Button.' },
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Primary variant background.' },
    { name: '--color-danger', value: 'var(--color-red-600)', description: 'Danger variant background.' },
    { name: '--color-interaction-hover', value: 'rgba(0,0,0,0.06)', description: 'Secondary and ghost hover overlay — surface-agnostic.' },
    { name: '--color-interaction-pressed', value: 'rgba(0,0,0,0.12)', description: 'Secondary and ghost pressed overlay — surface-agnostic.' },
    { name: '--color-text-inverse', value: 'var(--color-white)', description: 'Icon colour on primary and danger variants.' },
    { name: '--color-text-primary', value: 'var(--color-slate-900)', description: 'Icon colour on secondary and ghost variants.' },
  ],
}

export const linkDoc: ComponentDoc = {
  title: 'Link',
  slug: 'link',
  description:
    'An inline text link for navigation. One visual style, two variants: internal links navigate within the app, external links open in a new tab and show an icon to signal that behaviour.',
  whenToUse: [
    'Inline text links within body copy',
    'Navigation to another page within the app',
    'Links to external resources that open in a new tab',
  ],
  whenNotToUse: [
    'Triggering actions — use Button instead',
    'Large clickable areas — use Card or a styled anchor with padding',
    'Navigation items in a header or sidebar — use NavBar or Sidebar',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-4' },
      h(Link, { href: '#', children: 'Internal link' }),
      h(Link, { href: 'https://example.com', variant: 'external', children: 'External link' }),
    ),
  variants: [
    {
      label: 'Internal',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4' },
          h(Link, { href: '#', children: 'Getting started' }),
          h(Link, { href: '#', children: 'View documentation' }),
        ),
    },
    {
      label: 'External',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4' },
          h(Link, { href: 'https://example.com', variant: 'external', children: 'View on example.com' }),
          h(Link, { href: 'https://github.com/example', variant: 'external', children: 'GitHub repository' }),
        ),
    },
  ],
  usage: `import { Link } from '@ds/ui'

// Internal — navigates within the app
<p>Read the <Link href="/docs/getting-started">getting started guide</Link> first.</p>

// External — opens in new tab, shows open_in_new icon automatically
<Link href="https://example.com" variant="external">
  View on example.com
</Link>`,
  props: [
    { name: 'href', type: 'string', required: true, description: 'The URL the link navigates to.' },
    { name: 'variant', type: "'internal' | 'external'", default: "'internal'", description: 'internal navigates within the app. external opens in a new tab and appends an icon.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'The visible link text or content.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    { name: '...rest', type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>', description: 'All native anchor attributes.' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Link colour.' },
    { name: '--color-brand-hover', value: 'var(--color-blue-700)', description: 'Link hover colour.' },
  ],
}

export const fabDoc: ComponentDoc = {
  title: 'FAB',
  slug: 'fab',
  description:
    'A Floating Action Button. A prominent circular button fixed to the screen, representing the primary action on a page or view. Contains only an icon.',
  whenToUse: [
    'Representing the single most important action on a mobile or dense layout',
    'Creating a new item (document, entry, message)',
    'Triggering a contextually relevant primary action',
  ],
  whenNotToUse: [
    'Multiple competing actions on the same screen',
    'Destructive actions — use a Button variant="danger" in a confirmation flow',
    'Dense desktop layouts where a regular Button fits naturally',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-4 items-end' },
      h(FAB, { 'aria-label': 'Add item', icon: h(Icon, { name: 'add' }) }),
      h(FAB, { 'aria-label': 'Add item 2', icon: h(Icon, { name: 'edit' }) }),
    ),
  variants: [
    {
      label: 'Example',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4 items-end' },
          h(FAB, { 'aria-label': 'Create', icon: h(Icon, { name: 'add' }) }),
          h(FAB, { 'aria-label': 'Upload', icon: h(Icon, { name: 'upload' }) }),
        ),
    },
  ],
  usage: `import { FAB, Icon } from '@ds/ui'

// Fixed to bottom-right of viewport
<div className="fixed bottom-6 right-6">
  <FAB
    aria-label="Create new document"
    size="md"
    icon={<Icon name="add" />}
    onClick={handleCreate}
  />
</div>`,
  props: [
    { name: 'icon', type: 'ReactNode', required: true, description: 'Icon rendered inside the FAB.' },
    { name: 'aria-label', type: 'string', required: true, description: 'Accessible label for the action.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the FAB diameter.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'FAB background color.' },
    { name: '--fab-radius', value: '9999px', description: 'Full circular border radius.' },
  ],
}

export const splitButtonDoc: ComponentDoc = {
  title: 'Split Button',
  slug: 'split-button',
  description:
    'A button with a primary action and a dropdown chevron that reveals additional related actions. Combines a main clickable area with a secondary action menu.',
  whenToUse: [
    'When there is one primary action but 2–5 secondary variants of it',
    '"Save" with options like "Save as draft", "Save and publish"',
    'Export actions with format options (CSV, JSON, PDF)',
  ],
  whenNotToUse: [
    'When all actions are equally important — use a Button group or separate Buttons',
    'More than 5–6 actions — use a standalone dropdown menu',
    'When no clear primary action exists',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-4' },
      h(SplitButton, {
        label: 'Save',
        onClick: () => {},
        variant: 'primary',
        actions: [
          { label: 'Save as draft', onClick: () => {} },
          { label: 'Save and publish', onClick: () => {} },
        ],
      }),
      h(SplitButton, {
        label: 'Export',
        onClick: () => {},
        variant: 'secondary',
        actions: [
          { label: 'Export as CSV', onClick: () => {} },
          { label: 'Export as JSON', onClick: () => {} },
        ],
      }),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4' },
          h(SplitButton, {
            label: 'Primary',
            onClick: () => {},
            variant: 'primary',
            actions: [{ label: 'Option A', onClick: () => {} }],
          }),
          h(SplitButton, {
            label: 'Secondary',
            onClick: () => {},
            variant: 'secondary',
            actions: [{ label: 'Option A', onClick: () => {} }],
          }),
          h(SplitButton, {
            label: 'Danger',
            onClick: () => {},
            variant: 'danger',
            actions: [{ label: 'Option A', onClick: () => {} }],
          }),
        ),
    },
  ],
  usage: `import { SplitButton } from '@ds/ui'

<SplitButton
  variant="primary"
  mainLabel="Save"
  onMainClick={handleSave}
  actions={[
    { label: 'Save as draft', onClick: handleSaveDraft },
    { label: 'Save and publish', onClick: handlePublish },
    { label: 'Save and close', onClick: handleSaveClose },
  ]}
/>`,
  props: [
    { name: 'mainLabel', type: 'string', required: true, description: 'Label for the primary action button.' },
    { name: 'onMainClick', type: '() => void', required: true, description: 'Handler for the primary action.' },
    { name: 'actions', type: "{ label: string; onClick: () => void }[]", required: true, description: 'List of secondary actions shown in the dropdown.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the primary action and the dropdown.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--button-bg', value: 'var(--color-brand)', description: 'Primary variant background.' },
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius for the button segments.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Divider between main and chevron sections.' },
  ],
}
