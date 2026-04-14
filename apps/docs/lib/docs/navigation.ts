// @ts-nocheck
import { createElement as h } from 'react'
import { NavBar, Tabs, Breadcrumb, Sidebar, Pagination, Icon, IconButton } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------

export const navBarDoc: ComponentDoc = {
  title: 'NavBar',
  slug: 'nav-bar',
  description:
    'A top-level horizontal navigation bar that holds the brand identity, primary navigation links, and optional action slots. Typically rendered once at the top of the application layout.',
  whenToUse: [
    'Top-level app navigation across all pages',
    'Branding + nav links + action area (alerts, user menu, theme toggle)',
  ],
  whenNotToUse: [
    'Section or page-level navigation — use Tabs or Sidebar instead',
    'In-page step navigation — use Breadcrumb',
  ],
  preview: () =>
    h('div', { className: 'w-full' },
      h(NavBar, {
        logo: h('span', { className: 'font-semibold text-sm text-(--color-text-primary)' }, 'Acme'),
        links: [
          { label: 'Dashboard', href: '/dashboard', active: true },
          { label: 'Projects',  href: '/projects' },
          { label: 'Team',      href: '/team' },
        ],
        actions: h('div', { className: 'flex items-center gap-1' },
          h(IconButton, { icon: h(Icon, { name: 'notifications', size: 20 }), variant: 'ghost', size: 'md', 'aria-label': 'Alerts' }),
          h(IconButton, { icon: h(Icon, { name: 'person',        size: 20 }), variant: 'ghost', size: 'md', 'aria-label': 'Profile' }),
        ),
      })
    ),
  variants: [
    {
      label: 'With icon links',
      preview: () =>
        h('div', { className: 'w-full' },
          h(NavBar, {
            logo: h('span', { className: 'font-semibold text-sm text-(--color-text-primary)' }, 'DesignCo'),
            links: [
              { label: 'Home',     href: '/',     icon: 'home',      active: true },
              { label: 'Docs',     href: '/docs', icon: 'description' },
              { label: 'Settings', href: '/settings', icon: 'settings' },
            ],
          })
        ),
    },
    {
      label: 'No actions',
      preview: () =>
        h('div', { className: 'w-full' },
          h(NavBar, {
            logo: h('span', { className: 'font-semibold text-sm text-(--color-text-primary)' }, 'Minimal'),
            links: [
              { label: 'About',   href: '/about' },
              { label: 'Contact', href: '/contact' },
            ],
          })
        ),
    },
  ],
  usage: `import { NavBar, IconButton, Icon } from '@ds/ui'

<NavBar
  logo={<img src="/logo.svg" alt="MyApp" className="h-7" />}
  links={[
    { label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { label: 'Projects',  href: '/projects',  active: pathname === '/projects' },
    { label: 'Settings',  href: '/settings',  active: pathname === '/settings' },
  ]}
  actions={
    <div className="flex items-center gap-1">
      <IconButton icon={<Icon name="notifications" size={20} />} variant="ghost" size="md" aria-label="Alerts" />
      <IconButton icon={<Icon name="person"        size={20} />} variant="ghost" size="md" aria-label="Profile" />
      <IconButton icon={<Icon name="dark_mode"     size={20} />} variant="ghost" size="md" aria-label="Toggle theme" />
    </div>
  }
/>`,
  props: [
    { name: 'logo',      type: 'ReactNode', required: true,  description: 'Brand mark rendered at the far left. Pass an <img>, SVG, or styled text node.' },
    { name: 'links',     type: 'NavBarLink[]', required: true,  description: 'Navigation links. Each link can have an optional icon, active, and disabled state.' },
    { name: 'actions',   type: 'ReactNode', description: 'Slot for right-aligned actions — icon buttons, user avatar, CTA.' },
    { name: 'className', type: 'string',    description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface-raised', value: '#ffffff',   description: 'NavBar background.' },
    { name: '--color-border',         value: '#e5e7eb',   description: 'Bottom border.' },
    { name: '--color-brand',          value: '#2563eb',   description: 'Active link text color.' },
    { name: '--color-brand-subtle',   value: '#eff6ff',   description: 'Active link background.' },
  ],
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

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
        { label: 'Overview', value: 'overview', content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Overview content goes here.') },
        { label: 'Activity', value: 'activity', content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Recent activity feed.') },
        { label: 'Settings', value: 'settings', content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Settings panel.') },
      ],
    }),
  variants: [
    {
      label: 'With icons',
      preview: () =>
        h(Tabs, {
          defaultValue: 'code',
          tabs: [
            { label: 'Preview', value: 'preview', icon: 'visibility',    content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Rendered output.') },
            { label: 'Code',    value: 'code',    icon: 'code',          content: h('p', { className: 'p-4 text-sm font-mono text-(--color-text-primary)' }, '<Component />') },
            { label: 'Docs',    value: 'docs',    icon: 'description',   content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Documentation.') },
          ],
        }),
    },
    {
      label: 'Two tabs',
      preview: () =>
        h(Tabs, {
          defaultValue: 'write',
          tabs: [
            { label: 'Write',   value: 'write',   content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Compose content here.') },
            { label: 'Preview', value: 'preview', content: h('p', { className: 'p-4 text-sm text-(--color-text-primary)' }, 'Rendered preview.') },
          ],
        }),
    },
  ],
  usage: `import { Tabs } from '@ds/ui'

<Tabs
  defaultValue="details"
  tabs={[
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
  onChange={(value) => console.log('active tab:', value)}
/>`,
  props: [
    { name: 'tabs',         type: 'TabItem[]',              required: true,  description: 'Tab definitions. Each item has a label, value, optional icon, optional disabled flag, and panel content.' },
    { name: 'defaultValue', type: 'string',                 description: 'Value of the tab open by default (uncontrolled).' },
    { name: 'value',        type: 'string',                 description: 'Controlled active tab value.' },
    { name: 'onChange',     type: '(value: string) => void', description: 'Called when the active tab changes.' },
    { name: 'className',    type: 'string',                 description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand',     value: '#2563eb', description: 'Active tab indicator and text color.' },
    { name: '--color-border',    value: '#e5e7eb', description: 'Tab list bottom border.' },
  ],
}

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

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
        { label: 'Home',            href: '/' },
        { label: 'Projects',        href: '/projects' },
        { label: 'Alpha Redesign',  href: '/projects/alpha' },
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
    { label: 'Home',     href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Notifications' }, // current page — no href
  ]}
/>`,
  props: [
    { name: 'items',     type: '{ label: string; href?: string }[]', required: true, description: 'Ordered list of breadcrumb items. The last item is the current page and typically has no href.' },
    { name: 'separator', type: 'ReactNode', description: 'Custom separator element. Defaults to a chevron_right icon.' },
    { name: 'className', type: 'string',    description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-text-primary',   value: '#111827', description: 'Current page label color.' },
    { name: '--color-text-secondary', value: '#6b7280', description: 'Separator and ancestor link color.' },
  ],
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export const sidebarDoc: ComponentDoc = {
  title: 'Sidebar',
  slug: 'sidebar',
  description:
    'A vertical navigation panel for multi-section applications. Supports grouped navigation with optional section labels, icons, active and disabled states, an optional logo slot, and an optional fixed footer for action icons.',
  whenToUse: [
    'Admin dashboards or applications with many navigation destinations',
    'Navigation grouped into distinct sections (e.g. Main, Account, Admin)',
    'When a top NavBar alone is insufficient for the page count',
  ],
  whenNotToUse: [
    'Simple single-level navigation — use NavBar',
    'In-page section switching — use Tabs',
    'Mobile-first layouts — consider a drawer or bottom nav instead',
  ],
  preview: () =>
    h('div', { style: { height: '380px', display: 'flex', alignItems: 'stretch' } },
      h(Sidebar, {
        groups: [
          {
            label: 'Main menu',
            items: [
              { label: 'Home',      href: '/',          icon: 'home',         active: true },
              { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
              { label: 'Products',  href: '/products',  icon: 'inventory_2' },
              { label: 'Orders',    href: '/orders',    icon: 'receipt_long' },
            ],
          },
          {
            label: 'Account',
            items: [
              { label: 'Settings', href: '/settings', icon: 'settings' },
            ],
          },
        ],
        footer: h('div', { className: 'flex items-center gap-0' },
          h(IconButton, { icon: h(Icon, { name: 'notifications', size: 20 }), variant: 'ghost', size: 'md', 'aria-label': 'Alerts' }),
          h(IconButton, { icon: h(Icon, { name: 'person',        size: 20 }), variant: 'ghost', size: 'md', 'aria-label': 'Profile' }),
          h(IconButton, { icon: h(Icon, { name: 'dark_mode',     size: 20 }), variant: 'ghost', size: 'md', 'aria-label': 'Toggle theme' }),
        ),
      })
    ),
  variants: [
    {
      label: 'With logo slot',
      preview: () =>
        h('div', { style: { height: '320px', display: 'flex', alignItems: 'stretch' } },
          h(Sidebar, {
            logo: h('span', { className: 'font-semibold text-sm text-(--color-text-primary)' }, 'Acme'),
            groups: [
              {
                label: 'Main menu',
                items: [
                  { label: 'Home',      href: '/',          icon: 'home',      active: true },
                  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
                  { label: 'Projects',  href: '/projects',  icon: 'folder' },
                ],
              },
            ],
          })
        ),
    },
    {
      label: 'Multiple groups',
      preview: () =>
        h('div', { style: { height: '420px', display: 'flex', alignItems: 'stretch' } },
          h(Sidebar, {
            groups: [
              {
                label: 'Main',
                items: [
                  { label: 'Home',      href: '/',          icon: 'home',      active: true },
                  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
                ],
              },
              {
                label: 'Content',
                items: [
                  { label: 'Products', href: '/products', icon: 'inventory_2' },
                  { label: 'Orders',   href: '/orders',   icon: 'receipt_long' },
                ],
              },
              {
                label: 'Account',
                items: [
                  { label: 'Settings', href: '/settings', icon: 'settings' },
                  { label: 'Billing',  href: '/billing',  icon: 'credit_card', disabled: true },
                ],
              },
            ],
          })
        ),
    },
    {
      label: 'No section labels',
      preview: () =>
        h('div', { style: { height: '280px', display: 'flex', alignItems: 'stretch' } },
          h(Sidebar, {
            groups: [
              {
                items: [
                  { label: 'Home',      href: '/',          icon: 'home',      active: true },
                  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
                  { label: 'Settings',  href: '/settings',  icon: 'settings' },
                ],
              },
            ],
          })
        ),
    },
  ],
  usage: `import { Sidebar, IconButton, Icon } from '@ds/ui'

<Sidebar
  logo={<img src="/logo.svg" alt="Acme" className="h-7" />}
  groups={[
    {
      label: 'Main menu',
      items: [
        { label: 'Home',      href: '/',          icon: 'home',         active: pathname === '/' },
        { label: 'Dashboard', href: '/dashboard', icon: 'dashboard',    active: pathname === '/dashboard' },
        { label: 'Products',  href: '/products',  icon: 'inventory_2',  active: pathname === '/products' },
        { label: 'Orders',    href: '/orders',    icon: 'receipt_long', active: pathname === '/orders' },
      ],
    },
    {
      label: 'Account',
      items: [
        { label: 'Settings', href: '/settings', icon: 'settings', active: pathname === '/settings' },
        { label: 'Billing',  href: '/billing',  icon: 'credit_card' },
      ],
    },
  ]}
  footer={
    <div className="flex items-center">
      <IconButton icon={<Icon name="notifications" size={20} />} variant="ghost" size="md" aria-label="Alerts" />
      <IconButton icon={<Icon name="person"        size={20} />} variant="ghost" size="md" aria-label="Profile" />
      <IconButton icon={<Icon name="dark_mode"     size={20} />} variant="ghost" size="md" aria-label="Toggle theme" />
    </div>
  }
/>`,
  props: [
    { name: 'groups',    type: 'SidebarGroup[]', required: true,  description: 'Navigation groups. Each group has an optional label and an array of items.' },
    { name: 'logo',      type: 'ReactNode',      description: 'Brand mark rendered in the header slot above the nav. Shown with a bottom border when present.' },
    { name: 'footer',    type: 'ReactNode',      description: 'Fixed footer slot rendered at the bottom of the sidebar, outside the scroll area. Intended for icon button actions (alerts, profile, theme toggle).' },
    { name: 'className', type: 'string',         description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-surface-raised',    value: '#ffffff', description: 'Sidebar background.' },
    { name: '--color-border',            value: '#e5e7eb', description: 'Right border, logo separator, and footer separator.' },
    { name: '--color-brand-subtle',      value: '#eff6ff', description: 'Active item background.' },
    { name: '--color-brand',             value: '#2563eb', description: 'Active item text and icon color.' },
    { name: '--color-interaction-hover', value: 'rgba(0,0,0,0.04)', description: 'Item hover background.' },
  ],
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

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
    { name: 'page',         type: 'number',                    required: true, description: 'The currently active page (1-indexed).' },
    { name: 'totalPages',   type: 'number',                    required: true, description: 'Total number of pages.' },
    { name: 'onPageChange', type: '(page: number) => void',    required: true, description: 'Called when the user navigates to a different page.' },
    { name: 'siblingCount', type: 'number', default: '1',      description: 'Number of page numbers shown on each side of the current page.' },
    { name: 'className',    type: 'string',                    description: 'Additional CSS classes.' },
  ],
  tokens: [
    { name: '--color-brand',      value: '#2563eb',          description: 'Active page button background.' },
    { name: '--button-radius',    value: 'var(--radius-md)', description: 'Page button border radius.' },
  ],
}
