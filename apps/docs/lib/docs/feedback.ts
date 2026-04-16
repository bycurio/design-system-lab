// @ts-nocheck
import { createElement as h } from 'react'
import { Badge, Toast, Alert, Tooltip, Progress, Skeleton, Spinner } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const badgeDoc: ComponentDoc = {
  title: 'Badge',
  slug: 'badge',
  description:
    'A small inline label used to communicate status, category, or counts. Comes in subtle (tinted background + border) and strong (bold background + white text) strengths across five semantic variants.',
  whenToUse: [
    'Communicating status: Active, Draft, Archived',
    'Labeling items by category or priority',
    'Highlighting one high-importance badge in a row of multiple badges — use strong',
    'Showing a count or numeric indicator',
  ],
  whenNotToUse: [
    'Interactive actions — use Button or Chip instead',
    'Long descriptive text — use Alert or inline text',
    'Navigation labels — use Tabs or NavBar',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h('div', { className: 'flex flex-wrap gap-2' },
        h(Badge, { variant: 'info' }, 'Info'),
        h(Badge, { variant: 'success' }, 'Active'),
        h(Badge, { variant: 'warning' }, 'Pending'),
        h(Badge, { variant: 'danger' }, 'Failed'),
        h(Badge, { variant: 'neutral' }, 'Draft'),
      ),
      h('div', { className: 'flex flex-wrap gap-2' },
        h(Badge, { variant: 'info', strength: 'strong' }, 'Info'),
        h(Badge, { variant: 'success', strength: 'strong' }, 'Active'),
        h(Badge, { variant: 'warning', strength: 'strong' }, 'Pending'),
        h(Badge, { variant: 'danger', strength: 'strong' }, 'Failed'),
        h(Badge, { variant: 'neutral', strength: 'strong' }, 'Draft'),
      ),
    ),
  variants: [
    {
      label: 'Subtle (default)',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-2' },
          h(Badge, { variant: 'info' }, 'In review'),
          h(Badge, { variant: 'success' }, 'Published'),
          h(Badge, { variant: 'warning' }, 'Expiring soon'),
          h(Badge, { variant: 'danger' }, 'Overdue'),
          h(Badge, { variant: 'neutral' }, 'Draft'),
        ),
    },
    {
      label: 'Strong',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-2' },
          h(Badge, { variant: 'info', strength: 'strong' }, 'In review'),
          h(Badge, { variant: 'success', strength: 'strong' }, 'Published'),
          h(Badge, { variant: 'warning', strength: 'strong' }, 'Expiring soon'),
          h(Badge, { variant: 'danger', strength: 'strong' }, 'Overdue'),
          h(Badge, { variant: 'neutral', strength: 'strong' }, 'Draft'),
        ),
    },
    {
      label: 'Mixed row — one strong to signal priority',
      preview: () =>
        h('div', { className: 'flex items-center gap-2' },
          h(Badge, { variant: 'neutral' }, 'Draft'),
          h(Badge, { variant: 'success' }, 'Reviewed'),
          h(Badge, { variant: 'danger', strength: 'strong' }, 'Blocked'),
        ),
    },
    {
      label: 'In context',
      preview: () =>
        h('div', { className: 'flex items-center gap-2' },
          h('span', { className: 'text-sm font-medium' }, 'Project Alpha'),
          h(Badge, { variant: 'success' }, 'Active'),
        ),
    },
  ],
  usage: `import { Badge } from '@ds/ui'

// Subtle (default) — status column in a table
<Badge variant={statusVariant[order.status]}>{order.status}</Badge>

// Strong — highlight the most important badge in a row
<Badge variant="neutral">Draft</Badge>
<Badge variant="success">Reviewed</Badge>
<Badge variant="danger" strength="strong">Blocked</Badge>

// All subtle variants
<Badge variant="info">Info</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="neutral">Draft</Badge>

// All strong variants
<Badge variant="info" strength="strong">Info</Badge>
<Badge variant="success" strength="strong">Active</Badge>
<Badge variant="warning" strength="strong">Pending</Badge>
<Badge variant="danger" strength="strong">Failed</Badge>
<Badge variant="neutral" strength="strong">Draft</Badge>`,
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'neutral'", description: 'Semantic color variant.' },
    { name: 'strength', type: "'subtle' | 'strong'", default: "'subtle'", description: 'Visual weight. Subtle: tinted background + matching border + accessible text color. Strong: bold solid background + white text + darker border for definition. Use strong to make one badge stand out in a row.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Badge content — typically short text.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--badge-radius', value: 'var(--radius-full)', description: 'Border radius — pill shape.' },
    { name: '--color-{variant}-surface', value: 'e.g. sky-100 / sky-900', description: 'Subtle variant background (light/dark).' },
    { name: '--color-{variant}-border', value: 'e.g. sky-200 / sky-800', description: 'Subtle variant border (light/dark).' },
    { name: '--color-{variant}-text', value: 'darker shade / lighter shade', description: 'Subtle variant text — dedicated token for each variant ensuring WCAG AA 4.5:1 on its surface. Info: sky-700/sky-200. Success: green-800/green-200. Warning: amber-800/amber-200. Danger: red-700/red-200. Neutral uses color/neutral (slate-600/slate-400 — passes without a dedicated token).' },
    { name: '--color-{variant}-strong-border', value: 'one step darker than fill', description: 'Strong variant border — one shade darker than the fill for each variant to add definition. Info: sky-700/sky-600. Success: green-700/green-600. Warning: amber-800 (both). Danger: red-700/red-600. Neutral: slate-700/slate-600.' },
    { name: '--color-warning-strong', value: 'amber-700', description: 'Warning strong background — amber-700 used instead of amber-600 to meet WCAG AA contrast with white text.' },
    { name: '--color-neutral-strong', value: 'slate-600 / slate-500', description: 'Neutral strong background (light/dark) — slate-400 (default neutral in dark) is too light for white text.' },
  ],
}

export const toastDoc: ComponentDoc = {
  title: 'Toast',
  slug: 'toast',
  description:
    'A brief, auto-dismissing notification that appears temporarily to confirm an action or communicate system status. Positioned at the edge of the viewport and does not interrupt the user workflow.',
  whenToUse: [
    'Confirming a completed action: "Changes saved"',
    'Reporting a background process result',
    'Non-critical error feedback that does not require immediate action',
  ],
  whenNotToUse: [
    'Critical errors requiring the user to take action — use Alert or a modal',
    'Persistent status — use a Banner or Alert',
    'Multiple simultaneous notifications that need to be read carefully',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3 max-w-sm' },
      h(Toast, { variant: 'success', title: 'Saved', description: 'Your changes have been saved.', onClose: () => {} }),
      h(Toast, { variant: 'danger', title: 'Error', description: 'Failed to upload the file.', onClose: () => {} }),
      h(Toast, { variant: 'info', title: 'Update available', description: 'Reload to get the latest version.', onClose: () => {} }),
    ),
  variants: [
    {
      label: 'All variants',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3 max-w-sm' },
          h(Toast, { variant: 'info', title: 'Info', description: 'Something happened.', onClose: () => {} }),
          h(Toast, { variant: 'success', title: 'Success', description: 'Action completed.', onClose: () => {} }),
          h(Toast, { variant: 'warning', title: 'Warning', description: 'This may take longer than expected.', onClose: () => {} }),
          h(Toast, { variant: 'danger', title: 'Error', description: 'Something went wrong.', onClose: () => {} }),
        ),
    },
  ],
  usage: `import { Toast } from '@ds/ui'

<Toast
  variant="success"
  title="Changes saved"
  description="Your draft has been updated."
  onClose={() => setOpen(false)}
/>

// All variants
<Toast variant="info"    title="Update available" description="Reload to get v2.4.0." onClose={close} />
<Toast variant="success" title="Saved"            description="Your changes have been saved." onClose={close} />
<Toast variant="warning" title="Taking longer"    description="This may take a moment." onClose={close} />
<Toast variant="danger"  title="Payment failed"   description="Update your billing details." onClose={close} />`,
  props: [
    { name: 'title', type: 'string', required: true, description: 'Short toast headline.' },
    { name: 'description', type: 'string', description: 'Optional supporting detail text.' },
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic color variant — controls border and icon colour.' },
    { name: 'open', type: 'boolean', default: 'true', description: 'Controls visibility. Set to false to hide without unmounting.' },
    { name: 'onClose', type: '() => void', description: 'Called when the dismiss button is clicked or the auto-dismiss timer fires.' },
    { name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss delay in ms. Pass 0 to disable auto-dismiss.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface-raised', value: 'white / slate-800', description: 'Toast background — floats above page content.' },
    { name: '--color-{variant}-border', value: 'e.g. sky-200 / sky-800', description: 'Full border colour matching the semantic variant (light/dark).' },
    { name: '--color-{variant}-text', value: 'e.g. sky-700 / sky-200', description: 'Icon colour — WCAG AA compliant on surface-raised.' },
    { name: '--shadow-lg', value: '0 10px 15px…', description: 'Elevation shadow — positions toast visually above page content.' },
  ],
}

export const alertDoc: ComponentDoc = {
  title: 'Alert',
  slug: 'alert',
  description:
    'An inline notification block that draws attention to important information within the page flow. Unlike Toast, Alert is persistent and embedded in the layout.',
  whenToUse: [
    'Form-level validation summaries',
    'Warning about destructive or irreversible actions',
    'Contextual information required before proceeding',
    'System-level notices (maintenance window, account issues)',
  ],
  whenNotToUse: [
    'Brief confirmation of an action — use Toast',
    'Simple inline field errors — use the Input error prop',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Alert, { variant: 'info', title: 'New version available', description: 'Refresh to load v2.4.0.', action: { label: 'Reload', onClick: () => {} } }),
      h(Alert, { variant: 'warning', title: 'Unsaved changes', description: 'You have 3 unsaved fields.', onDismiss: () => {} }),
      h(Alert, { variant: 'danger', title: 'Payment failed', description: 'Update your billing details to continue.', action: { label: 'Update billing', onClick: () => {} }, onDismiss: () => {} }),
    ),
  variants: [
    {
      label: 'All variants',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Alert, { variant: 'info',    title: 'Info',    description: 'Informational message.' }),
          h(Alert, { variant: 'success', title: 'Success', description: 'Everything is working.' }),
          h(Alert, { variant: 'warning', title: 'Warning', description: 'Proceed with caution.' }),
          h(Alert, { variant: 'danger',  title: 'Error',   description: 'Action required.' }),
        ),
    },
    {
      label: 'With action',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Alert, { variant: 'info',    title: 'Update available',  description: 'v2.4.0 is ready.',             action: { label: 'Reload', onClick: () => {} } }),
          h(Alert, { variant: 'danger',  title: 'Subscription lapsed', description: 'Renew to restore access.',   action: { label: 'Renew now', onClick: () => {} } }),
        ),
    },
    {
      label: 'With dismiss',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Alert, { variant: 'success', title: 'Import complete', description: '1,204 records imported.', onDismiss: () => {} }),
          h(Alert, { variant: 'warning', title: 'Unsaved changes', description: 'You have 3 unsaved fields.', onDismiss: () => {} }),
        ),
    },
    {
      label: 'With action and dismiss',
      preview: () =>
        h(Alert, { variant: 'danger', title: 'Payment failed', description: 'Update your billing details to continue.', action: { label: 'Update billing', onClick: () => {} }, onDismiss: () => {} }),
    },
  ],
  usage: `import { Alert } from '@ds/ui'

// With action and dismiss
<Alert
  variant="danger"
  title="Payment failed"
  description="Update your billing details to continue."
  action={{ label: 'Update billing', onClick: () => router.push('/billing') }}
  onDismiss={() => setVisible(false)}
/>

// Info with action only
<Alert
  variant="info"
  title="New version available"
  description="Reload to get v2.4.0."
  action={{ label: 'Reload', onClick: () => window.location.reload() }}
/>

// Dismissible with no action
<Alert
  variant="success"
  title="Import complete"
  description="1,204 records imported successfully."
  onDismiss={() => setVisible(false)}
/>`,
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", required: true, description: 'Semantic color variant — controls background, border, and icon colour.' },
    { name: 'title', type: 'string', required: true, description: 'Alert headline.' },
    { name: 'description', type: 'string', description: 'Optional supporting detail text.' },
    { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Optional action button rendered to the right of the content.' },
    { name: 'onDismiss', type: '() => void', description: 'When provided, renders a dismiss (×) button to the right of the action.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-{variant}-surface', value: 'e.g. sky-100 / sky-900', description: 'Alert background (light/dark).' },
    { name: '--color-{variant}-border', value: 'e.g. sky-200 / sky-800', description: 'Alert border (light/dark).' },
    { name: '--color-{variant}-text', value: 'e.g. sky-700 / sky-200', description: 'Icon and action button colour — WCAG AA on the surface background.' },
  ],
}

export const tooltipDoc: ComponentDoc = {
  title: 'Tooltip',
  slug: 'tooltip',
  description:
    'A small floating label that appears on hover or focus to provide supplementary information about an element. Does not contain interactive content.',
  whenToUse: [
    'Explaining icon-only buttons to sighted users',
    'Surfacing keyboard shortcuts or secondary labels',
    'Truncated text where full content is hidden',
  ],
  whenNotToUse: [
    'Critical information the user must read — use Alert instead',
    'Interactive content like links or buttons inside the tooltip — use Popover',
    'Mobile-only layouts where hover is unavailable',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-8 p-8 items-center justify-center' },
      h(Tooltip, { content: 'Copy to clipboard', placement: 'top' },
        h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Copy'),
      ),
      h(Tooltip, { content: 'Opens in a new tab', placement: 'bottom' },
        h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Link ↗'),
      ),
    ),
  variants: [
    {
      label: 'Placement',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-8 p-8 items-center justify-center' },
          h(Tooltip, { content: 'Top tooltip', placement: 'top' },
            h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Top'),
          ),
          h(Tooltip, { content: 'Right tooltip', placement: 'right' },
            h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Right'),
          ),
          h(Tooltip, { content: 'Bottom tooltip', placement: 'bottom' },
            h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Bottom'),
          ),
          h(Tooltip, { content: 'Left tooltip', placement: 'left' },
            h('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Left'),
          ),
        ),
    },
  ],
  usage: `import { Tooltip, IconButton, Icon } from '@ds/ui'

// Wrapping an icon button
<Tooltip content="Delete record" placement="top">
  <IconButton variant="ghost" size="sm" icon={<Icon name="delete" size={16} />} aria-label="Delete" />
</Tooltip>

// Wrapping any element
<Tooltip content="Opens in a new tab">
  <a href="/docs">Read the docs ↗</a>
</Tooltip>

// Custom delay
<Tooltip content="Keyboard shortcut: ⌘S" delayMs={0}>
  <button>Save</button>
</Tooltip>`,
  props: [
    { name: 'content', type: 'string', required: true, description: 'The tooltip text.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'The element that triggers the tooltip on hover or focus.' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Position of the tooltip relative to the trigger.' },
    { name: 'delayMs', type: 'number', default: '300', description: 'Delay in ms before the tooltip appears. Pass 0 for instant.' },
  ],
  tokens: [
    { name: '--tooltip-bg', value: 'slate-900 / slate-700', description: 'Tooltip background — stays dark in both light and dark modes.' },
    { name: '--tooltip-radius', value: 'var(--radius-md)', description: 'Tooltip border radius.' },
    { name: '--color-white', value: '#ffffff', description: 'Tooltip text color.' },
  ],
}

export const progressDoc: ComponentDoc = {
  title: 'Progress',
  slug: 'progress',
  description:
    'A horizontal progress bar indicating completion of a task or process. Supports a label and an optional numeric percentage display.',
  whenToUse: [
    'File uploads or long-running operations',
    'Profile completion or onboarding steps',
    'Storage or quota usage indicators',
  ],
  whenNotToUse: [
    'Unknown duration — use Spinner instead',
    'Stepped wizard progress — use a step indicator',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(Progress, { value: 35, label: 'Uploading file…', variant: 'default' }),
      h(Progress, { value: 100, label: 'Complete', variant: 'success', showLabel: true }),
      h(Progress, { value: 68, showLabel: true }),
    ),
  variants: [
    {
      label: 'Variant',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(Progress, { value: 60, label: 'Uploading', variant: 'default', showLabel: true }),
          h(Progress, { value: 100, label: 'Done', variant: 'success', showLabel: true }),
        ),
    },
  ],
  usage: `import { Progress } from '@ds/ui'

// Upload progress
<Progress value={uploadPercent} label="Uploading…" showLabel />

// Storage usage
<Progress
  value={Math.round((usedBytes / totalBytes) * 100)}
  label="Storage used"
  variant={usedBytes > totalBytes * 0.9 ? 'default' : 'success'}
/>`,
  props: [
    { name: 'value', type: 'number', required: true, description: 'Progress percentage from 0 to 100.' },
    { name: 'label', type: 'string', description: 'Accessible label and visible caption above the bar.' },
    { name: 'variant', type: "'default' | 'success'", default: "'default'", description: 'Color variant of the filled track.' },
    { name: 'showLabel', type: 'boolean', default: 'false', description: 'Shows the numeric percentage next to the bar.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Default filled track color.' },
    { name: '--color-success', value: '#16a34a', description: 'Success variant track color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Unfilled track background.' },
  ],
}

export const skeletonDoc: ComponentDoc = {
  title: 'Skeleton',
  slug: 'skeleton',
  description:
    'A placeholder shape that mimics the layout of content while it loads. Uses a shimmer animation to communicate loading state without a spinner.',
  whenToUse: [
    'Loading states for cards, text blocks, and lists',
    'When the content layout is known in advance',
    'Perceived performance — skeleton screens feel faster than spinners',
  ],
  whenNotToUse: [
    'Unknown content shape — use Spinner instead',
    'Very short loads under ~300ms — show nothing or flash of content is acceptable',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-2 max-w-sm' },
      h(Skeleton, { className: 'h-4 w-3/4 rounded' }),
      h(Skeleton, { className: 'h-4 w-full rounded' }),
      h(Skeleton, { className: 'h-4 w-5/6 rounded' }),
      h(Skeleton, { className: 'h-32 w-full rounded-lg mt-2' }),
    ),
  variants: [
    {
      label: 'Card skeleton',
      preview: () =>
        h('div', { className: 'border rounded-lg p-4 max-w-sm' },
          h('div', { className: 'flex items-center gap-3 mb-3' },
            h(Skeleton, { className: 'h-10 w-10 rounded-full' }),
            h('div', { className: 'flex flex-col gap-1 flex-1' },
              h(Skeleton, { className: 'h-3 w-1/2 rounded' }),
              h(Skeleton, { className: 'h-3 w-1/3 rounded' }),
            ),
          ),
          h(Skeleton, { className: 'h-3 w-full rounded mb-1' }),
          h(Skeleton, { className: 'h-3 w-4/5 rounded' }),
        ),
    },
  ],
  usage: `import { Skeleton } from '@ds/ui'

// Text block skeleton
{isLoading ? (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-3/4 rounded" />
    <Skeleton className="h-4 w-full rounded" />
    <Skeleton className="h-4 w-2/3 rounded" />
  </div>
) : (
  <p>{content}</p>
)}`,
  props: [
    { name: 'className', type: 'string', description: 'CSS classes controlling size and shape. Required in practice — set height, width, and border-radius.' },
  ],
  tokens: [
    { name: '--color-surface', value: '#f9fafb', description: 'Skeleton base background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Shimmer highlight color.' },
  ],
}

export const spinnerDoc: ComponentDoc = {
  title: 'Spinner',
  slug: 'spinner',
  description:
    'An animated circular loading indicator for indeterminate loading states. Use when you cannot show progress percentage or a skeleton layout.',
  whenToUse: [
    'Async operations with unknown duration',
    'Page-level or section-level loading gates',
    'Button loading state (via the Button loading prop instead)',
  ],
  whenNotToUse: [
    'Known progress — use Progress',
    'Content with a known shape — use Skeleton',
    'Inline button loading — use Button loading prop',
  ],
  preview: () =>
    h('div', { className: 'flex flex-wrap gap-6 items-center' },
      h(Spinner, { size: 'sm' }),
      h(Spinner, { size: 'md' }),
      h(Spinner, { size: 'lg' }),
    ),
  variants: [
    {
      label: 'Size',
      preview: () =>
        h('div', { className: 'flex flex-wrap gap-6 items-center' },
          h('div', { className: 'flex flex-col items-center gap-1' },
            h(Spinner, { size: 'sm' }),
            h('span', { className: 'text-xs text-(--color-text-secondary)' }, 'sm'),
          ),
          h('div', { className: 'flex flex-col items-center gap-1' },
            h(Spinner, { size: 'md' }),
            h('span', { className: 'text-xs text-(--color-text-secondary)' }, 'md'),
          ),
          h('div', { className: 'flex flex-col items-center gap-1' },
            h(Spinner, { size: 'lg' }),
            h('span', { className: 'text-xs text-(--color-text-secondary)' }, 'lg'),
          ),
        ),
    },
  ],
  usage: `import { Spinner } from '@ds/ui'

// Full-page loading gate
{isLoading ? (
  <div className="flex items-center justify-center h-64">
    <Spinner size="lg" />
  </div>
) : (
  <DataTable rows={rows} />
)}

// Inline in a card
{isFetching && <Spinner size="sm" />}`,
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the spinner diameter.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Spinner arc color.' },
  ],
}
