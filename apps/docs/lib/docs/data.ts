// @ts-nocheck
import { createElement as h } from 'react'
import { Table, List, Avatar, Chip } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const tableDoc: ComponentDoc = {
  title: 'Table',
  slug: 'table',
  description:
    'A data table for displaying rows of structured information. Supports custom cell renderers, row click handlers, loading states, and an empty state slot.',
  whenToUse: [
    'Displaying structured records: users, orders, transactions',
    'When users need to scan and compare values across columns',
    'Data that requires sorting, filtering, or pagination alongside it',
  ],
  whenNotToUse: [
    'Small amounts of data better shown in Cards or Lists',
    'Unstructured content — use a List or prose layout',
  ],
  preview: () =>
    h(Table, {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status', render: (row: Record<string, unknown>) => h('span', { className: row.status === 'Active' ? 'text-green-600' : 'text-(--color-text-secondary)' }, String(row.status)) },
      ],
      rows: [
        { id: '1', name: 'Jane Smith', role: 'Admin', status: 'Active' },
        { id: '2', name: 'Bob Lee', role: 'Editor', status: 'Inactive' },
        { id: '3', name: 'Sara Cole', role: 'Viewer', status: 'Active' },
      ],
    }),
  variants: [
    {
      label: 'Loading state',
      preview: () =>
        h(Table, {
          loading: true,
          columns: [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
          ],
          rows: [],
        }),
    },
    {
      label: 'Empty state',
      preview: () =>
        h(Table, {
          columns: [
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
          ],
          rows: [],
          emptyState: h('p', { className: 'text-sm text-(--color-text-secondary) text-center py-8' }, 'No members found.'),
        }),
    },
  ],
  usage: `import { Table } from '@ds/ui'

<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: row => <Badge variant={statusMap[row.status]}>{row.status}</Badge>,
    },
  ]}
  rows={users}
  onRowClick={user => navigate(\`/users/\${user.id}\`)}
  loading={isLoading}
  emptyState={<EmptyState message="No users yet" />}
/>`,
  props: [
    { name: 'columns', type: '{ key: string; label: string; render?: (row: Record<string, unknown>) => ReactNode }[]', required: true, description: 'Column definitions. Optional render function enables custom cell content.' },
    { name: 'rows', type: '{ id: string; [key: string]: unknown }[]', required: true, description: 'Data rows. Each row must have a unique id.' },
    { name: 'onRowClick', type: '(row: Record<string, unknown>) => void', description: 'If provided, rows become clickable.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Displays a skeleton loading state.' },
    { name: 'emptyState', type: 'ReactNode', description: 'Content shown when rows is empty.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: '#e5e7eb', description: 'Row and header divider color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Table header background.' },
  ],
}

export const listDoc: ComponentDoc = {
  title: 'List',
  slug: 'list',
  description:
    'A vertical list of items with optional descriptions and click handlers. A simpler alternative to Table for when data doesn\'t require column structure.',
  whenToUse: [
    'Notification feeds, activity logs, or simple record lists',
    'Search result items without tabular structure',
    'Settings options or menu-style lists',
  ],
  whenNotToUse: [
    'Data requiring column comparison — use Table',
    'Navigation — use Sidebar or NavBar',
  ],
  preview: () =>
    h(List, {
      items: [
        { id: '1', label: 'Invoice #1041', description: 'Due Jan 15 · $450.00', onClick: () => {} },
        { id: '2', label: 'Invoice #1042', description: 'Due Jan 31 · $1,200.00', onClick: () => {} },
        { id: '3', label: 'Invoice #1043', description: 'Overdue · $80.00' },
      ],
    }),
  variants: [
    {
      label: 'Labels only',
      preview: () =>
        h(List, {
          items: [
            { id: '1', label: 'Dashboard' },
            { id: '2', label: 'Analytics' },
            { id: '3', label: 'Settings' },
          ],
        }),
    },
  ],
  usage: `import { List } from '@ds/ui'

<List
  items={notifications.map(n => ({
    id: n.id,
    label: n.title,
    description: n.body,
    onClick: () => markAsRead(n.id),
  }))}
/>`,
  props: [
    { name: 'items', type: '{ id: string; label: string; description?: string; onClick?: () => void }[]', required: true, description: 'List items. Items with onClick are rendered as interactive rows.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-border', value: '#e5e7eb', description: 'Row divider color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Row hover background.' },
  ],
}

export const avatarDoc: ComponentDoc = {
  title: 'Avatar',
  slug: 'avatar',
  description:
    'A circular image representing a user or entity. Falls back to initials or a placeholder icon when no image is provided or the image fails to load.',
  whenToUse: [
    'Representing a user in a header, comment, or list item',
    'User profile pictures in cards or tables',
    'Team member displays in dashboards',
  ],
  whenNotToUse: [
    'Brand or product images — use a plain img or Card',
    'Decorative icons — use IconButton or an icon component',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-3 items-end' },
      h(Avatar, { src: 'https://i.pravatar.cc/40?img=1', alt: 'Jane Smith', fallback: 'JS', size: 'sm' }),
      h(Avatar, { src: 'https://i.pravatar.cc/40?img=2', alt: 'Bob Lee', fallback: 'BL', size: 'md' }),
      h(Avatar, { fallback: 'SC', size: 'lg', alt: 'Sara Cole' }),
      h(Avatar, { fallback: 'DK', size: 'xl', alt: 'Dev Kapoor' }),
    ),
  variants: [
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-3 items-end' },
          h(Avatar, { fallback: 'XS', size: 'xs', alt: 'XS' }),
          h(Avatar, { fallback: 'SM', size: 'sm', alt: 'SM' }),
          h(Avatar, { fallback: 'MD', size: 'md', alt: 'MD' }),
          h(Avatar, { fallback: 'LG', size: 'lg', alt: 'LG' }),
          h(Avatar, { fallback: 'XL', size: 'xl', alt: 'XL' }),
        ),
    },
    {
      label: 'Image vs fallback',
      preview: () =>
        h('div', { className: 'flex gap-3 items-center' },
          h(Avatar, { src: 'https://i.pravatar.cc/40?img=3', alt: 'With image', fallback: 'WI', size: 'md' }),
          h(Avatar, { fallback: 'AB', alt: 'Fallback initials', size: 'md' }),
          h(Avatar, { alt: 'Broken image fallback', fallback: 'BI', size: 'md' }),
        ),
    },
  ],
  usage: `import { Avatar } from '@ds/ui'

// With image
<Avatar src={user.avatarUrl} alt={user.name} size="md" />

// Fallback to initials
<Avatar fallback={getInitials(user.name)} alt={user.name} size="md" />

// In a comment thread
<div className="flex gap-3">
  <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" />
  <p>{comment.body}</p>
</div>`,
  props: [
    { name: 'alt', type: 'string', required: true, description: 'Alt text for the image, also used for accessibility.' },
    { name: 'src', type: 'string', description: 'Image URL. Falls back to fallback or placeholder if empty or on error.' },
    { name: 'fallback', type: 'string', description: 'Text shown when no image is available. Typically 1–2 initials.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar diameter.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface', value: '#f9fafb', description: 'Fallback avatar background.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Fallback initials text color.' },
  ],
}

export const chipDoc: ComponentDoc = {
  title: 'Chip',
  slug: 'chip',
  description:
    'A compact, removable tag used to represent a selected filter, tag, or attribute. Includes an optional dismiss button to remove the chip from a collection.',
  whenToUse: [
    'Multi-select tag inputs where selected values appear inline',
    'Active filter indicators in a search or filter bar',
    'Showing a list of labels or attributes that can be cleared',
  ],
  whenNotToUse: [
    'Non-removable labels — use Badge instead',
    'Navigation links — use Tab or NavBar items',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-2' },
      h(Chip, { onRemove: () => {} }, 'React'),
      h(Chip, { onRemove: () => {} }, 'TypeScript'),
      h(Chip, { onRemove: () => {} }, 'Design systems'),
      h(Chip, { disabled: true }, 'Read-only'),
    ),
  variants: [
    {
      label: 'Removable vs read-only',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-2' },
          h(Chip, { onRemove: () => {} }, 'Removable tag'),
          h(Chip, null, 'Read-only tag'),
        ),
    },
  ],
  usage: `import { Chip } from '@ds/ui'

// Tag list with removal
{selectedTags.map(tag => (
  <Chip
    key={tag}
    onRemove={() => removeTag(tag)}
  >
    {tag}
  </Chip>
))}

// Active filter chips
{activeFilters.map(filter => (
  <Chip key={filter.key} onRemove={() => clearFilter(filter.key)}>
    {filter.label}: {filter.value}
  </Chip>
))}`,
  props: [
    { name: 'children', type: 'ReactNode', required: true, description: 'Chip label content.' },
    { name: 'onRemove', type: '() => void', description: 'When provided, renders a dismiss (×) button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the dismiss button.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--badge-radius', value: 'var(--radius-full)', description: 'Chip border radius — pill shape.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Chip background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Chip border.' },
  ],
}
