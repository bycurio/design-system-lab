import { cn } from '../utils'
import { Icon } from './Icon'
import type { SidebarItem, SidebarProps } from './Sidebar.types'

function SidebarNavItem({ label, href, icon, active, disabled }: SidebarItem) {
  return (
    <li>
      <a
        href={disabled ? undefined : href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          'flex items-center gap-1.5 w-full h-9 px-3 text-sm rounded-(--button-radius) transition-colors',
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

export function Sidebar({ logo, sectionLabel, items, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col w-60 border-r border-(--color-border) bg-(--color-surface-raised)',
        className,
      )}
    >
      {logo && (
        <div className="flex items-center h-16 px-3 border-b border-(--color-border) shrink-0">
          {logo}
        </div>
      )}
      <nav className="flex flex-col flex-1 px-3 py-3 gap-1 overflow-y-auto">
        {sectionLabel && (
          <p className="px-3 py-1 text-xs font-medium text-(--color-text-secondary) uppercase tracking-wider">
            {sectionLabel}
          </p>
        )}
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarNavItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
