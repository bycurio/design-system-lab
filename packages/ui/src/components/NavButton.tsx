import { forwardRef } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { NavButtonProps } from './NavButton.types'

export const NavButton = forwardRef<HTMLAnchorElement, NavButtonProps>(
  ({ label, href, icon, active, disabled, className, ...props }, ref) => (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3 text-sm rounded-(--button-radius) transition-colors',
        'outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2',
        active
          ? 'bg-(--color-brand-subtle) text-(--color-brand) font-medium'
          : 'text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
        disabled && 'opacity-40 pointer-events-none',
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={20} className="shrink-0" />}
      {label}
    </a>
  ),
)

NavButton.displayName = 'NavButton'
