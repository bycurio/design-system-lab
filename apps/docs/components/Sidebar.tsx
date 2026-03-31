'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navGroups = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/getting-started/introduction' },
      { label: 'Installation', href: '/getting-started/installation' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Colors', href: '/foundations/colors' },
      { label: 'Typography', href: '/foundations/typography' },
      { label: 'Spacing', href: '/foundations/spacing' },
      { label: 'Elevation', href: '/foundations/elevation' },
      { label: 'Icons', href: '/foundations/icons' },
    ],
  },
  {
    title: 'Actions',
    items: [
      { label: 'Button', href: '/components/button' },
      { label: 'Icon Button', href: '/components/icon-button' },
      { label: 'Link', href: '/components/link' },
      { label: 'FAB', href: '/components/fab' },
      { label: 'Split Button', href: '/components/split-button' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { label: 'Input', href: '/components/input' },
      { label: 'Textarea', href: '/components/textarea' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'Slider', href: '/components/slider' },
      { label: 'Date Picker', href: '/components/date-picker' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Nav Bar', href: '/components/nav-bar' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Sidebar', href: '/components/sidebar' },
      { label: 'Pagination', href: '/components/pagination' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Badge', href: '/components/badge' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Progress', href: '/components/progress' },
      { label: 'Skeleton', href: '/components/skeleton' },
      { label: 'Spinner', href: '/components/spinner' },
    ],
  },
  {
    title: 'Containers',
    items: [
      { label: 'Card', href: '/components/card' },
      { label: 'Modal', href: '/components/modal' },
      { label: 'Drawer', href: '/components/drawer' },
      { label: 'Popover', href: '/components/popover' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Divider', href: '/components/divider' },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Table', href: '/components/table' },
      { label: 'List', href: '/components/list' },
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Chip', href: '/components/chip' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { label: 'Heading', href: '/components/heading' },
      { label: 'Body', href: '/components/body' },
      { label: 'Label', href: '/components/label' },
      { label: 'Caption', href: '/components/caption' },
      { label: 'Code', href: '/components/code' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen border-r border-(--color-border) bg-(--color-surface) flex flex-col shrink-0">
      <div className="p-4 border-b border-(--color-border) flex items-center justify-between">
        <span className="font-semibold text-sm text-(--color-text-primary)">Design System Lab</span>
        <ThemeToggle />
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-2">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-1.5 rounded-(--radius-md) text-sm transition-colors ${
                      pathname === item.href
                        ? 'bg-(--color-brand) text-white'
                        : 'text-(--color-text-primary) hover:bg-(--color-bg)'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
