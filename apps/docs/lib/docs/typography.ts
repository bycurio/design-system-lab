// @ts-nocheck
import { createElement as h } from 'react'
import { Heading, Body, Label, Caption, Code } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const headingDoc: ComponentDoc = {
  title: 'Heading',
  slug: 'heading',
  description:
    'A typographic heading component for page titles, section headers, and display text. Renders the appropriate HTML element via the `as` prop while applying consistent design-system type styles.',
  whenToUse: [
    'Page titles and section headers',
    'Marketing or landing page display text',
    'Card and modal titles (use h3/h4)',
  ],
  whenNotToUse: [
    'Body copy or explanatory text — use Body',
    'Form field labels — use Label',
    'Small supporting text — use Caption',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Heading, { as: 'display' }, 'Display heading'),
      h(Heading, { as: 'h1' }, 'Page title (h1)'),
      h(Heading, { as: 'h2' }, 'Section header (h2)'),
      h(Heading, { as: 'h3' }, 'Card title (h3)'),
    ),
  variants: [
    {
      label: 'All levels',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Heading, { as: 'display' }, 'Display'),
          h(Heading, { as: 'h1' }, 'Heading 1'),
          h(Heading, { as: 'h2' }, 'Heading 2'),
          h(Heading, { as: 'h3' }, 'Heading 3'),
          h(Heading, { as: 'h4' }, 'Heading 4'),
        ),
    },
  ],
  usage: `import { Heading } from '@ds/ui'

// Page title
<Heading as="h1">Account settings</Heading>

// Section header
<Heading as="h2">Billing</Heading>

// Card title
<Card.Header>
  <Heading as="h3">Recent activity</Heading>
</Card.Header>

// Marketing display
<Heading as="display">Ship faster with a solid system.</Heading>`,
  props: [
    { name: 'as', type: "'h1' | 'h2' | 'h3' | 'h4' | 'display'", default: "'h2'", description: 'Semantic HTML element and visual size. "display" renders as h1 but with larger, lighter type.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Heading text content.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-text', value: '#111827', description: 'Heading text color.' },
    { name: '--font-sans', value: "'Inter', sans-serif", description: 'Heading font family.' },
  ],
}

export const bodyDoc: ComponentDoc = {
  title: 'Body',
  slug: 'body',
  description:
    'The standard paragraph text component for prose content. Offers three sizes to accommodate different reading contexts: long-form articles, default UI copy, and compact descriptions.',
  whenToUse: [
    'Paragraphs, descriptions, and explanatory copy',
    'Card and panel body text',
    'Long-form content and documentation',
  ],
  whenNotToUse: [
    'Titles — use Heading',
    'Field labels — use Label',
    'Error/helper text below fields — use Caption',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-prose' },
      h(Body, { size: 'lg' }, 'Large body — used for introductory paragraphs and marketing copy that benefits from extra readability.'),
      h(Body, { size: 'base' }, 'Base body — the default size for most UI text, descriptions, and instructional content.'),
      h(Body, { size: 'sm' }, 'Small body — compact text for secondary descriptions, footnotes, or dense data views.'),
    ),
  variants: [
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 max-w-prose' },
          h(Body, { size: 'lg' }, 'Large — 18px'),
          h(Body, { size: 'base' }, 'Base — 16px'),
          h(Body, { size: 'sm' }, 'Small — 14px'),
        ),
    },
  ],
  usage: `import { Body } from '@ds/ui'

// Default description
<Body>
  Configure your workspace settings below. Changes take effect immediately.
</Body>

// Compact helper text
<Body size="sm">
  Your password must be at least 8 characters and include a number.
</Body>`,
  props: [
    { name: 'size', type: "'sm' | 'base' | 'lg'", default: "'base'", description: 'Font size variant.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Text content.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-text', value: '#111827', description: 'Primary body text color.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Secondary/muted body text.' },
  ],
}

export const labelDoc: ComponentDoc = {
  title: 'Label',
  slug: 'label',
  description:
    'A form field label rendered as an HTML label element. Supports a required indicator and htmlFor association for accessibility.',
  whenToUse: [
    'Labeling form inputs, selects, and textareas',
    'Marking fields as required with a visual indicator',
  ],
  whenNotToUse: [
    'General UI text — use Body',
    'Table column headers — use native th or a Table column label',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Label, { htmlFor: 'email' }, 'Email address'),
      h(Label, { htmlFor: 'name', required: true }, 'Full name'),
      h(Label, { htmlFor: 'bio' }, 'Bio'),
    ),
  variants: [
    {
      label: 'Required indicator',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Label, { htmlFor: 'optional' }, 'Optional field'),
          h(Label, { htmlFor: 'required', required: true }, 'Required field'),
        ),
    },
  ],
  usage: `import { Label } from '@ds/ui'
import { Input } from '@ds/ui'

// Standalone label (Input also renders its own label)
<div>
  <Label htmlFor="username" required>Username</Label>
  <input id="username" type="text" />
</div>`,
  props: [
    { name: 'htmlFor', type: 'string', description: 'ID of the associated form control.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Appends a required indicator (typically "*") to the label.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Label text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-text', value: '#111827', description: 'Label text color.' },
    { name: '--color-danger', value: '#dc2626', description: 'Required indicator color.' },
  ],
}

export const captionDoc: ComponentDoc = {
  title: 'Caption',
  slug: 'caption',
  description:
    'Small supporting text used below form fields, images, or data points. Communicates hints, character counts, validation results, or supplementary context.',
  whenToUse: [
    'Helper text beneath form fields',
    'Error or success messages below inputs (complementing the error prop)',
    'Image captions or supplementary footnotes',
  ],
  whenNotToUse: [
    'Primary field labels — use Label',
    'Long paragraphs — use Body',
    'Status badges — use Badge',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2' },
      h(Caption, { variant: 'default' }, 'Use your organization email address.'),
      h(Caption, { variant: 'error' }, 'This email is already registered.'),
      h(Caption, { variant: 'success' }, 'Email verified successfully.'),
    ),
  variants: [
    {
      label: 'Variants',
      preview: () =>
        h('div', { className: 'flex flex-col gap-2' },
          h(Caption, { variant: 'default' }, 'Helper text — default'),
          h(Caption, { variant: 'error' }, 'Validation error message'),
          h(Caption, { variant: 'success' }, 'Positive confirmation text'),
        ),
    },
  ],
  usage: `import { Caption } from '@ds/ui'

// Below an input
<Input label="Email" placeholder="you@example.com" />
<Caption variant="default">Must be your company email.</Caption>

// Error state
<Caption variant="error">{errors.email}</Caption>

// Character count
<Caption variant={charCount > 200 ? 'error' : 'default'}>
  {charCount}/200 characters
</Caption>`,
  props: [
    { name: 'variant', type: "'default' | 'error' | 'success'", default: "'default'", description: 'Semantic color variant.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Caption text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-text-secondary', value: '#6b7280', description: 'Default caption text color.' },
    { name: '--color-danger', value: '#dc2626', description: 'Error variant text color.' },
    { name: '--color-success', value: '#16a34a', description: 'Success variant text color.' },
  ],
}

export const codeDoc: ComponentDoc = {
  title: 'Code',
  slug: 'code',
  description:
    'A component for displaying code snippets. Renders inline within text or as a standalone block. Uses a monospace font and subtle background to visually distinguish code from prose.',
  whenToUse: [
    'Displaying inline variable names, API keys, or short expressions in prose',
    'Showing multi-line code examples in documentation',
    'Terminal commands or configuration values',
  ],
  whenNotToUse: [
    'Editable code — use a CodeEditor or textarea',
    'Highlighted syntax with theming — use a Shiki or Prism-based block',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4' },
      h('p', { className: 'text-sm' },
        'Pass the ',
        h(Code, { variant: 'inline' }, 'variant'),
        ' prop to control the visual style.',
      ),
      h(Code, { variant: 'block' }, `import { Badge } from '@ds/ui'

<Badge variant="success">Active</Badge>`),
    ),
  variants: [
    {
      label: 'Inline',
      preview: () =>
        h('p', { className: 'text-sm' },
          'The ',
          h(Code, { variant: 'inline' }, 'className'),
          ' prop accepts any Tailwind utility classes.',
        ),
    },
    {
      label: 'Block',
      preview: () =>
        h(Code, { variant: 'block' }, `const greeting = 'Hello, world!'
console.log(greeting)`),
    },
  ],
  usage: `import { Code } from '@ds/ui'

// Inline in prose
<p>
  Set <Code variant="inline">NODE_ENV=production</Code> before building.
</p>

// Block snippet
<Code variant="block">
{\`npm install @ds/ui\`}
</Code>`,
  props: [
    { name: 'variant', type: "'inline' | 'block'", default: "'inline'", description: 'Inline renders as a span within text. Block renders as a preformatted code panel.' },
    { name: 'children', type: 'string', required: true, description: 'The code string to display.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface', value: '#f9fafb', description: 'Code block background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Code block border.' },
    { name: '--font-mono', value: "'JetBrains Mono', monospace", description: 'Monospace font used for all code.' },
  ],
}
