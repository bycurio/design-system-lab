// @ts-nocheck
import { createElement as h } from 'react'
import { Card, Modal, Drawer, Popover, Accordion, Divider } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const cardDoc: ComponentDoc = {
  title: 'Card',
  slug: 'card',
  description:
    'A contained surface for grouping related content. Uses Card.Header, Card.Body, and Card.Footer sub-components for structured layouts with consistent padding and dividers.',
  whenToUse: [
    'Grouping a distinct piece of content: a user record, a metric, a feature',
    'Sectioning a dashboard or grid layout',
    'Wrapping a form with a header and action footer',
  ],
  whenNotToUse: [
    'Full-width page sections that do not need a border or elevation',
    'Simple list items — use List instead',
  ],
  preview: () =>
    h(Card, { className: 'max-w-sm' },
      h(Card.Header, null, h('h3', { className: 'text-sm font-semibold' }, 'Project Alpha')),
      h(Card.Body, null,
        h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'A redesign of the onboarding flow for new enterprise customers.'),
      ),
      h(Card.Footer, null,
        h('span', { className: 'text-xs text-(--color-text-secondary)' }, 'Last updated 2 hours ago'),
      ),
    ),
  variants: [
    {
      label: 'Header and body only',
      preview: () =>
        h(Card, { className: 'max-w-sm' },
          h(Card.Header, null, h('h3', { className: 'text-sm font-semibold' }, 'Summary')),
          h(Card.Body, null,
            h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Total revenue this month: $42,800.'),
          ),
        ),
    },
    {
      label: 'Body only',
      preview: () =>
        h(Card, { className: 'max-w-sm' },
          h(Card.Body, null,
            h('p', { className: 'text-sm' }, 'Simple card with no header or footer.'),
          ),
        ),
    },
  ],
  usage: `import { Card } from '@ds/ui'

<Card>
  <Card.Header>
    <h2 className="text-sm font-semibold">Invoice #1042</h2>
  </Card.Header>
  <Card.Body>
    <p className="text-sm text-(--color-text-secondary)">Due: Jan 31, 2026</p>
    <p className="text-sm">Amount: $1,200.00</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary" size="sm">Pay now</Button>
  </Card.Footer>
</Card>`,
  props: [
    { name: 'children', type: 'ReactNode', required: true, description: 'Card content. Typically composed of Card.Header, Card.Body, and Card.Footer.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--card-radius', value: 'var(--radius-lg)', description: 'Card corner radius.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Card border and internal divider color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Card.Footer background.' },
  ],
}

export const modalDoc: ComponentDoc = {
  title: 'Modal',
  slug: 'modal',
  description:
    'A dialog that overlays the page to focus user attention on a task or confirmation. Traps keyboard focus while open and dismisses on overlay click or Escape.',
  whenToUse: [
    'Confirming destructive actions (delete, revoke)',
    'Short focused tasks that should not navigate away: rename, invite, quick-edit',
    'Displaying expanded content that requires full attention',
  ],
  whenNotToUse: [
    'Complex multi-step flows — use a dedicated page or Drawer',
    'Informational content the user just needs to see — use Alert or Toast',
    'On mobile at full-screen width — use a Drawer instead',
  ],
  preview: () =>
    h(Modal, {
      open: true,
      onClose: () => {},
      title: 'Delete project',
      size: 'sm',
      footer: h('div', { className: 'flex justify-end gap-2' },
        h('button', { className: 'px-3 py-1.5 text-sm border rounded' }, 'Cancel'),
        h('button', { className: 'px-3 py-1.5 text-sm bg-red-600 text-white rounded' }, 'Delete'),
      ),
    },
      h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'This will permanently delete "Alpha Redesign" and all its data. This action cannot be undone.'),
    ),
  variants: [
    {
      label: 'Sizes',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4' },
          h(Modal, { open: true, onClose: () => {}, title: 'Small modal', size: 'sm' },
            h('p', { className: 'text-sm' }, 'A compact modal for quick confirmations.'),
          ),
        ),
    },
    {
      label: 'Large with form',
      preview: () =>
        h(Modal, { open: true, onClose: () => {}, title: 'Invite team member', size: 'lg',
          footer: h('div', { className: 'flex justify-end gap-2' },
            h('button', { className: 'px-3 py-1.5 text-sm border rounded' }, 'Cancel'),
            h('button', { className: 'px-3 py-1.5 text-sm bg-blue-600 text-white rounded' }, 'Send invite'),
          ),
        },
          h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Enter the email address of the person you want to invite.'),
        ),
    },
  ],
  usage: `import { Modal } from '@ds/ui'

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm deletion"
  size="sm"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </div>
  }
>
  <p>Are you sure? This cannot be undone.</p>
</Modal>`,
  props: [
    { name: 'open', type: 'boolean', required: true, description: 'Controls whether the modal is visible.' },
    { name: 'onClose', type: '() => void', required: true, description: 'Called when the user dismisses the modal via overlay click or Escape.' },
    { name: 'title', type: 'string', required: true, description: 'Modal title shown in the header.' },
    { name: 'children', type: 'ReactNode', description: 'Modal body content.' },
    { name: 'footer', type: 'ReactNode', description: 'Modal footer — typically action buttons.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the modal max-width.' },
  ],
  tokens: [
    { name: '--card-radius', value: 'var(--radius-lg)', description: 'Modal panel border radius.' },
    { name: '--color-bg', value: '#ffffff', description: 'Modal panel background.' },
  ],
}

export const drawerDoc: ComponentDoc = {
  title: 'Drawer',
  slug: 'drawer',
  description:
    'A panel that slides in from the edge of the viewport. Used for secondary workflows, filters, or extended forms that benefit from more vertical space than a modal provides.',
  whenToUse: [
    'Filter panels for tables or search results',
    'Detail views alongside a list (master-detail pattern)',
    'Mobile navigation menus',
    'Long forms that need more space than a modal',
  ],
  whenNotToUse: [
    'Short confirmations — use Modal',
    'Content the user will spend more than a few minutes in — use a dedicated page',
  ],
  preview: () =>
    h(Drawer, {
      open: true,
      onClose: () => {},
      title: 'Filter results',
      placement: 'right',
      size: 'md',
    },
      h('div', { className: 'flex flex-col gap-4 p-4' },
        h('p', { className: 'text-sm text-(--color-text-secondary)' }, 'Adjust the filters below to narrow results.'),
      ),
    ),
  variants: [
    {
      label: 'Left placement',
      preview: () =>
        h(Drawer, { open: true, onClose: () => {}, title: 'Navigation', placement: 'left', size: 'sm' },
          h('p', { className: 'p-4 text-sm' }, 'Sidebar navigation links here.'),
        ),
    },
    {
      label: 'Large right drawer',
      preview: () =>
        h(Drawer, { open: true, onClose: () => {}, title: 'Edit profile', placement: 'right', size: 'lg' },
          h('p', { className: 'p-4 text-sm' }, 'Extended profile edit form.'),
        ),
    },
  ],
  usage: `import { Drawer } from '@ds/ui'

<Drawer
  open={filtersOpen}
  onClose={() => setFiltersOpen(false)}
  title="Filters"
  placement="right"
  size="md"
>
  <FilterForm filters={filters} onChange={setFilters} />
</Drawer>`,
  props: [
    { name: 'open', type: 'boolean', required: true, description: 'Controls whether the drawer is visible.' },
    { name: 'onClose', type: '() => void', required: true, description: 'Called when dismissed via overlay click or Escape.' },
    { name: 'title', type: 'string', required: true, description: 'Drawer header title.' },
    { name: 'children', type: 'ReactNode', description: 'Drawer body content.' },
    { name: 'placement', type: "'left' | 'right'", default: "'right'", description: 'Which edge the drawer slides in from.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Drawer width.' },
  ],
  tokens: [
    { name: '--color-bg', value: '#ffffff', description: 'Drawer panel background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Drawer header and footer divider.' },
  ],
}

export const popoverDoc: ComponentDoc = {
  title: 'Popover',
  slug: 'popover',
  description:
    'A floating panel anchored to a trigger element. Unlike Tooltip, Popover can contain interactive content: forms, menus, or rich descriptions.',
  whenToUse: [
    'Contextual menus or options anchored to a button',
    'Inline forms: date picker, color picker, mini-settings',
    'Rich content previews with links or actions',
  ],
  whenNotToUse: [
    'Plain text labels — use Tooltip instead',
    'Full-screen overlays — use Modal or Drawer',
  ],
  preview: () =>
    h(Popover, {
      open: true,
      onOpenChange: () => {},
      placement: 'bottom',
      trigger: h('button', { className: 'px-3 py-1.5 text-sm border rounded' }, 'Options ▾'),
      content: h('div', { className: 'p-3 flex flex-col gap-1' },
        h('button', { className: 'text-sm text-left px-2 py-1 hover:bg-(--color-surface) rounded' }, 'Edit'),
        h('button', { className: 'text-sm text-left px-2 py-1 hover:bg-(--color-surface) rounded' }, 'Duplicate'),
        h('button', { className: 'text-sm text-left px-2 py-1 text-red-600 hover:bg-(--color-surface) rounded' }, 'Delete'),
      ),
    }),
  variants: [
    {
      label: 'Top placement',
      preview: () =>
        h(Popover, {
          open: true,
          onOpenChange: () => {},
          placement: 'top',
          trigger: h('button', { className: 'px-3 py-1.5 text-sm border rounded' }, 'More info'),
          content: h('p', { className: 'p-3 text-sm max-w-xs' }, 'This field controls the visibility of your profile across workspaces.'),
        }),
    },
  ],
  usage: `import { Popover } from '@ds/ui'

<Popover
  placement="bottom"
  trigger={<Button variant="secondary">Actions ▾</Button>}
  content={
    <div className="p-2 flex flex-col gap-1">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleArchive}>Archive</button>
    </div>
  }
/>`,
  props: [
    { name: 'trigger', type: 'ReactNode', required: true, description: 'The element that opens the popover on click.' },
    { name: 'content', type: 'ReactNode', required: true, description: 'The popover panel content.' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred position of the panel relative to the trigger.' },
    { name: 'open', type: 'boolean', description: 'Controlled open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
  ],
  tokens: [
    { name: '--card-radius', value: 'var(--radius-lg)', description: 'Popover panel border radius.' },
    { name: '--color-bg', value: '#ffffff', description: 'Panel background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Panel border.' },
  ],
}

export const accordionDoc: ComponentDoc = {
  title: 'Accordion',
  slug: 'accordion',
  description:
    'A vertically stacked list of disclosure panels. Each panel has a clickable header that expands or collapses its content. Useful for FAQs, settings sections, and grouped content.',
  whenToUse: [
    'FAQ sections where most users need only a few answers',
    'Progressive disclosure of advanced settings',
    'Long pages where collapsing sections reduces scrolling',
  ],
  whenNotToUse: [
    'Content users need to compare simultaneously — keep it all visible',
    'Navigation — use Sidebar or Tabs',
  ],
  preview: () =>
    h(Accordion, {
      defaultOpen: ['shipping'],
      items: [
        { title: 'Shipping policy', content: h('p', { className: 'text-sm' }, 'We ship to over 120 countries. Standard delivery takes 3–5 business days.') },
        { title: 'Return policy', content: h('p', { className: 'text-sm' }, 'Items can be returned within 30 days of delivery in original condition.') },
        { title: 'Warranty information', content: h('p', { className: 'text-sm' }, 'All products carry a 12-month manufacturer warranty.') },
      ],
    }),
  variants: [
    {
      label: 'Allow multiple open',
      preview: () =>
        h(Accordion, {
          allowMultiple: true,
          defaultOpen: ['a', 'b'],
          items: [
            { title: 'Section A', content: h('p', { className: 'text-sm' }, 'Content for section A.') },
            { title: 'Section B', content: h('p', { className: 'text-sm' }, 'Content for section B.') },
          ],
        }),
    },
  ],
  usage: `import { Accordion } from '@ds/ui'

<Accordion
  items={faqs.map(faq => ({
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }))}
  defaultOpen={[faqs[0].title]}
/>`,
  props: [
    { name: 'items', type: '{ title: string; content: ReactNode }[]', required: true, description: 'List of accordion panels, each with a title and expandable content.' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'When true, multiple panels can be open simultaneously.' },
    { name: 'defaultOpen', type: 'string[]', description: 'Titles of panels open by default.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: '#e5e7eb', description: 'Panel divider color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Panel header hover background.' },
  ],
}

export const dividerDoc: ComponentDoc = {
  title: 'Divider',
  slug: 'divider',
  description:
    'A thin rule used to visually separate sections of content. Supports horizontal and vertical orientations and an optional centered label.',
  whenToUse: [
    'Separating distinct sections within a form or card',
    'Dividing a sidebar into logical groups',
    '"Or" dividers between login options',
  ],
  whenNotToUse: [
    'Decorative borders — use CSS border utilities directly',
    'Spacing between elements — use gap or margin instead',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(Divider, { orientation: 'horizontal' }),
      h(Divider, { orientation: 'horizontal', label: 'or' }),
    ),
  variants: [
    {
      label: 'With label',
      preview: () =>
        h('div', { className: 'max-w-sm' },
          h(Divider, { orientation: 'horizontal', label: 'Continue with' }),
        ),
    },
    {
      label: 'Vertical',
      preview: () =>
        h('div', { className: 'flex items-center gap-4 h-8' },
          h('span', { className: 'text-sm' }, 'Left'),
          h(Divider, { orientation: 'vertical' }),
          h('span', { className: 'text-sm' }, 'Right'),
        ),
    },
  ],
  usage: `import { Divider } from '@ds/ui'

// Between sections
<section>Form fields</section>
<Divider orientation="horizontal" />
<section>Additional options</section>

// "Or" separator between auth methods
<Button variant="primary">Continue with Google</Button>
<Divider orientation="horizontal" label="or" />
<Input label="Email" placeholder="you@example.com" />`,
  props: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Axis of the dividing line.' },
    { name: 'label', type: 'string', description: 'Optional centered text label (e.g. "or", "and").' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: '#e5e7eb', description: 'Divider line color.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Optional label text color.' },
  ],
}
