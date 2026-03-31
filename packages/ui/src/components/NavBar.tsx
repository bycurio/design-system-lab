import { cn } from '../utils'
import type { NavBarProps } from './NavBar.types'

export function NavBar({ logo, links, actions, className }: NavBarProps) {
  return (
    <nav className={cn('flex items-center justify-between h-14 px-6 border-b border-(--color-border) bg-(--color-surface)', className)}>
      <div className="flex items-center gap-8">
        <div className="shrink-0">{logo}</div>
        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-(--button-radius) transition-colors',
                  link.active
                    ? 'bg-(--color-brand) text-(--color-text-inverse)'
                    : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg)',
                )}
                aria-current={link.active ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {actions && <div>{actions}</div>}
    </nav>
  )
}
