// @ts-nocheck
import { createElement as h } from 'react'
import { NavBar, Tabs, Breadcrumb, Sidebar, Pagination } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const navBarDoc: ComponentDoc = {
  title: 'NavBar',
  slug: 'nav-bar',
  description:
    'A top-level horizontal navigation bar that holds the brand identity, primary navigation links, and optional action slots. Typically rendered once at the top of the application layout.',
  whenToUse: [
    'Top-level app navigation across all pages',
    'Branding + nav links + action area (user menu, CTA button)',
  ],
  whenNotToUse: [
    'Section or page-level navigation — use Tabs or Sidebar instead',
    'In-page step navigation — use Breadcrumb',
  ],
  preview: () =>
    h(NavBar, {
      brand: 'Acme',
      links: [
        { label: 'Dashboard', href: '/dashboard', active: true },
        { label: 'Projects', href: '/projects', active: false },
        { label: 'Team', href: '/team', active: false },
      ],
      actions: h('div', { className: 'flex gap-2' },
        h('span', { className: 'text-sm text-(--color-text-secondary)' }, 'Jane Smith'),
      ),
    }),
  variants: [
    {
      label: 'With actions',
      preview: () =>
        h(NavBar, {
          brand: 'DesignCo',
          links: [
            { label: 'Home', href: '/', active: true },
            { label: 'Docs', href: '/docs', active: false },
          ],
          actions: h('button', { className: 'text-sm font-medium' }, 'Sign out'),
        }),
    },
    {
      label: 'No actions',
      preview: () =>
        h(NavBar, {
          brand: 'Minimal',
          links: [
            { label: 'About', href: '/about', active: false },
            { label: 'Contact', href: '/contact', active: false },
          ],
        }),
    },
  ],
  usage: `import { NavBar } from '@ds/ui'

<NavBar
  brand="MyApp"
  links={[
    { label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { label: 'Projects', href: '/projects', active: pathname === '/projects' },
    { label: 'Settings', href: '/settings', active: pathname === '/settings' },
  ]}
  actions={<UserMenu user={user} />}
/>`,
  props: [
    { name: 'brand', type: 'string', required: true, description: 'Brand name or logo text displayed at the start.' },
    { name: 'links', type: "{ label: string; href: string; active: boolean }[]", required: true, description: 'Navigation links. Active item receives highlighted styling.' },
    { name: 'actions', type: 'ReactNode', description: 'Slot for right-aligned actions: user menu, CTA button, etc.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-bg', value: '#ffffff', description: 'NavBar background.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Bottom border separating the bar from content.' },
    { name: '--color-brand', value: '#2563eb', description: 'Active link and brand text accent.' },
  ],
}

export const tabsDoc: ComponentDoc = {
  title: 'Tabs',
  slug: 'tabs',
  description:
    'A horizontal tab control that switches between panels of related content. Only one panel is visible at a time. Manages active state and ARIA roles internally.',
  whenToUse: [
    'Switching between views of the same entity (Overview, Activity, Settings)',
    'Organizing related content sections at page or card level',
  ],
  whenNotToUse: [
    'Sequential wizard steps — use a step indicator',
    'Top-level app navigation — use NavBar or Sidebar',
    'More than ~7 tabs — consider a Select or overflow menu',
  ],
  preview: () =>
    h(Tabs, {
      defaultValue: 'overview',
      tabs: [
        { label: 'Overview', value: 'overview', content: h('p', { className: 'p-4 text-sm' }, 'Overview content goes here.') },
        { label: 'Activity', value: 'activity', content: h('p', { className: 'p-4 text-sm' }, 'Recent activity feed.') },
        { label: 'Settings', value: 'settings', content: h('p', { className: 'p-4 text-sm' }, 'Settings panel.') },
      ],
    }),
  variants: [
    {
      label: 'Two tabs',
      preview: () =>
        h(Tabs, {
          defaultValue: 'code',
          tabs: [
            { label: 'Preview', value: 'preview', content: h('p', { className: 'p-4 text-sm' }, 'Rendered output.') },
            { label: 'Code', value: 'code', content: h('p', { className: 'p-4 text-sm font-mono' }, '<Component />') },
          ],
        }),
    },
  ],
  usage: `import { Tabs } from '@ds/ui'

<Tabs
  defaultValue="details"
  items={[
    {
      label: 'Details',
      value: 'details',
      content: <DetailsPanel order={order} />,
    },
    {
      label: 'History',
      value: 'history',
      content: <HistoryPanel orderId={order.id} />,
    },
  ]}
/>`,
  props: [
    { name: 'items', type: '{ label: string; value: string; content: ReactNode }[]', required: true, description: 'Tab definitions. Each item defines a tab label and its associated panel content.' },
    { name: 'defaultValue', type: 'string', description: 'The value of the tab open by default.' },
    { name: 'value', type: 'string', description: 'Controlled active tab value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Called when active tab changes.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Active tab indicator and text color.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Tab list bottom border.' },
  ],
}

export const breadcrumbDoc: ComponentDoc = {
  title: 'Breadcrumb',
  slug: 'breadcrumb',
  description:
    'A linear trail of links showing the current page\'s location within the site hierarchy. Helps users understand where they are and navigate up the tree.',
  whenToUse: [
    'Pages nested 2 or more levels deep in a hierarchy',
    'File browsers, settings, or categorized content',
    'After search results or filtered views to indicate the current path',
  ],
  whenNotToUse: [
    'Top-level pages with no parent context',
    'Wizard or multi-step flows — use a step indicator instead',
  ],
  preview: () =>
    h(Breadcrumb, {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Alpha Redesign', href: '/projects/alpha' },
        { label: 'Settings' },
      ],
    }),
  variants: [
    {
      label: 'Short path',
      preview: () =>
        h(Breadcrumb, {
          items: [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Reports' },
          ],
        }),
    },
  ],
  usage: `import { Breadcrumb } from '@ds/ui'

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Notifications' }, // current page — no href
  ]}
/>`,
  props: [
    { name: 'items', type: '{ label: string; href?: string }[]', required: true, description: 'Ordered list of breadcrumb items. The last item is the current page and typically has no href.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Link item color.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Separator and current-page text color.' },
  ],
}

export const sidebarDoc: ComponentDoc = {
  title: 'Sidebar',
  slug: 'sidebar',
  description:
    'A vertical navigation panel for applications with grouped navigation sections. Typically positioned on the left side and supports active state highlighting.',
  whenToUse: [
    'Admin dashboards or multi-section applications',
    'Navigation with grouped categories and multiple items per group',
    'When page count makes a top NavBar insufficient',
  ],
  whenNotToUse: [
    'Simple single-level navigation — use NavBar',
    'In-page section switching — use Tabs',
    'Mobile-first layouts without a drawer treatment',
  ],
  preview: () =>
    h(Sidebar, {
      groups: [
        {
          title: 'General',
          items: [
            { label: 'Dashboard', href: '/dashboard', active: true },
            { label: 'Analytics', href: '/analytics', active: false },
          ],
        },
        {
          title: 'Settings',
          items: [
            { label: 'Profile', href: '/settings/profile', active: false },
            { label: 'Billing', href: '/settings/billing', active: false },
          ],
        },
      ],
    }),
  variants: [
    {
      label: 'Single group',
      preview: () =>
        h(Sidebar, {
          groups: [
            {
              title: 'Navigation',
              items: [
                { label: 'Overview', href: '/', active: false },
                { label: 'Components', href: '/components', active: true },
                { label: 'Tokens', href: '/tokens', active: false },
              ],
            },
          ],
        }),
    },
  ],
  usage: `import { Sidebar } from '@ds/ui'

<Sidebar
  groups={[
    {
      title: 'Workspace',
      items: [
        { label: 'Projects', href: '/projects', active: pathname === '/projects' },
        { label: 'Members', href: '/members', active: pathname === '/members' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', href: '/profile', active: pathname === '/profile' },
        { label: 'Billing', href: '/billing', active: pathname === '/billing' },
      ],
    },
  ]}
/>`,
  props: [
    { name: 'groups', type: "{ title: string; items: { label: string; href: string; active: boolean }[] }[]", required: true, description: 'Navigation groups. Each group has a title and a list of links.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Active item indicator and text.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Active item background.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Group title and inactive item text.' },
  ],
}

export const paginationDoc: ComponentDoc = {
  title: 'Pagination',
  slug: 'pagination',
  description:
    'A page navigation control for splitting large datasets across multiple pages. Shows page numbers with prev/next controls and an optional sibling window.',
  whenToUse: [
    'Tables or lists with more rows than fit on screen',
    'Search result sets paginated from an API',
    'Any content where loading everything at once is impractical',
  ],
  whenNotToUse: [
    'Fewer than 2 pages — hide pagination entirely',
    'Infinite scroll patterns',
  ],
  preview: () =>
    h(Pagination, { page: 3, totalPages: 10, onPageChange: () => {}, siblingCount: 1 }),
  variants: [
    {
      label: 'Few pages',
      preview: () =>
        h(Pagination, { page: 1, totalPages: 3, onPageChange: () => {} }),
    },
    {
      label: 'Many pages',
      preview: () =>
        h(Pagination, { page: 5, totalPages: 20, onPageChange: () => {}, siblingCount: 2 }),
    },
  ],
  usage: `import { Pagination } from '@ds/ui'

<Pagination
  page={currentPage}
  totalPages={Math.ceil(total / pageSize)}
  onPageChange={setCurrentPage}
  siblingCount={1}
/>`,
  props: [
    { name: 'page', type: 'number', required: true, description: 'The currently active page (1-indexed).' },
    { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages.' },
    { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when the user navigates to a different page.' },
    { name: 'siblingCount', type: 'number', default: '1', description: 'Number of page numbers shown on each side of the current page.' },
    { name: 'className', type: 'string', description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Active page button background.' },
    { name: '--button-radius', value: 'var(--radius-md)', description: 'Page button border radius.' },
  ],
}
