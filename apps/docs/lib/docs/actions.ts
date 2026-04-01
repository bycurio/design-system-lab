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
<IconButton variant="danger" size="md" aria-label="Delete row" icon={<Icon name="delete" />} />`,
  props: [
    { name: 'icon', type: 'ReactNode', required: true, description: 'The icon element to render inside the button.' },
    { name: 'aria-label', type: 'string', required: true, description: 'Accessible label describing the action. Required since there is no visible text.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the button dimensions.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction and reduces opacity.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    { name: '...rest', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes.' },
  ],
  tokens: [
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Border radius shared with Button.' },
    { name: '--color-brand', value: '#2563eb', description: 'Primary variant background color.' },
  ],
}

export const linkDoc: ComponentDoc = {
  title: 'Link',
  slug: 'link',
  description:
    'An inline text link for navigation. Wraps a native anchor element with design-system styling. Supports primary and secondary visual variants and can open in a new tab.',
  whenToUse: [
    'Navigating to another page or URL',
    'Inline text links within body copy',
    'External resource links that should open in a new tab',
  ],
  whenNotToUse: [
    'Triggering actions — use Button instead',
    'Large clickable areas — use Card or a styled anchor with padding',
    'Navigation items in a header or sidebar — use NavBar or Sidebar',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-4' },
      h(Link, { href: '#', children: 'Primary link' }),
      h(Link, { href: '#', children: 'Secondary link' }),
      h(Link, { href: 'https://example.com', external: true, children: 'Opens in new tab ↗' }),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4' },
          h(Link, { href: '#', children: 'Primary' }),
          h(Link, { href: '#', children: 'Secondary' }),
        ),
    },
    {
      label: 'External',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-4' },
          h(Link, { href: 'https://docs.example.com', external: true, children: 'View documentation ↗' }),
          h(Link, { href: 'https://github.com/example', external: true, children: 'GitHub ↗' }),
        ),
    },
  ],
  usage: `import { Link } from '@ds/ui'

// Inline navigation
<p>Read the <Link href="/docs/getting-started" variant="primary">getting started guide</Link> first.</p>

// External link — opens in new tab
<Link href="https://example.com" external variant="primary">
  View on example.com ↗
</Link>

// Secondary for less prominent links
<Link href="/privacy" variant="secondary">Privacy policy</Link>`,
  props: [
    { name: 'href', type: 'string', required: true, description: 'The URL the link navigates to.' },
    { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Controls link color and underline style.' },
    { name: 'external', type: 'boolean', default: 'false', description: 'When true, adds target="_blank" and rel="noopener noreferrer".' },
    { name: 'children', type: 'ReactNode', required: true, description: 'The visible link text or content.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
    { name: '...rest', type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>', description: 'All native anchor attributes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Primary link color.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Secondary variant link color.' },
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
