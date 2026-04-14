import { cn } from '../utils'
import { NavButton } from './NavButton'
import type { NavBarProps } from './NavBar.types'

export function NavBar({ logo, links, actions, className }: NavBarProps) {
  return (
    <nav
      className={cn(
        'flex items-center h-16 px-4 gap-4',
        'bg-(--color-surface-raised) border-b border-(--color-border)',
        className,
      )}
    >
      <div className="shrink-0">{logo}</div>

      <ul className="flex items-center gap-1" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <NavButton
              label={link.label}
              href={link.href}
              icon={link.icon}
              active={link.active}
              disabled={link.disabled}
            />
          </li>
        ))}
      </ul>

      {actions && (
        <>
          <div className="flex-1" aria-hidden="true" />
          <div className="flex items-center gap-1">{actions}</div>
        </>
      )}
    </nav>
  )
}
