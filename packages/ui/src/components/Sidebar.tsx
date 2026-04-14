import { cn } from '../utils'
import { Icon } from './Icon'
import type { SidebarItem, SidebarGroup, SidebarProps } from './Sidebar.types'

function SidebarNavItem({ label, href, icon, active, disabled }: SidebarItem) {
  return (
    <li className="w-full">
      <a
        href={disabled ? undefined : href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          'flex items-center justify-start gap-1.5 w-full h-9 px-3 text-sm rounded-(--button-radius) transition-colors',
          'outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2',
          active
            ? 'bg-(--color-brand-subtle) text-(--color-brand) font-medium'
            : 'text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
          disabled && 'opacity-40 pointer-events-none',
        )}
      >
        {icon && <Icon name={icon} size={20} className="shrink-0" />}
        {label}
      </a>
    </li>
  )
}

function SidebarNavGroup({ label, items }: SidebarGroup) {
  return (
    <div className="w-full">
      {label && (
        <p className="px-3 py-1 mb-1 text-xs font-medium text-(--color-text-secondary) uppercase tracking-wider">
          {label}
        </p>
      )}
      <ul className="w-full">
        {items.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </ul>
    </div>
  )
}

export function Sidebar({ logo, groups, footer, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col w-60 h-full border-r border-(--color-border) bg-(--color-surface-raised)',
        className,
      )}
    >
      {logo && (
        <div className="flex items-center h-16 px-3 border-b border-(--color-border) shrink-0">
          {logo}
        </div>
      )}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-4">
        {groups.map((group, i) => (
          <SidebarNavGroup key={group.label ?? i} {...group} />
        ))}
      </nav>
      {footer && (
        <div className="flex items-center gap-0 px-2 py-2 border-t border-(--color-border) shrink-0">
          {footer}
        </div>
      )}
    </aside>
  )
}
