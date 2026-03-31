import { cn } from '../utils'
import type { SidebarProps } from './Sidebar.types'

export function Sidebar({ groups, header, footer, className }: SidebarProps) {
  return (
    <aside className={cn('flex flex-col w-64 min-h-screen border-r border-(--color-border) bg-(--color-surface)', className)}>
      {header && <div className="p-4 border-b border-(--color-border)">{header}</div>}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-2">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.active ? 'page' : undefined}
                    className={cn(
                      'block px-3 py-1.5 rounded-(--button-radius) text-sm transition-colors',
                      item.active
                        ? 'bg-(--color-brand) text-(--color-text-inverse)'
                        : 'text-(--color-text-primary) hover:bg-(--color-bg)',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="p-4 border-t border-(--color-border)">{footer}</div>}
    </aside>
  )
}
