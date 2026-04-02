import { cn } from '../utils'
import { Icon } from './Icon'
import type { LinkProps } from './Link.types'

export function Link({ href, variant = 'internal', children, className, ...props }: LinkProps) {
  const isExternal = variant === 'external'
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1 text-(--color-brand) hover:text-(--color-brand-hover) transition-colors',
        className,
      )}
      {...props}
    >
      {children}
      {isExternal && <Icon name="open_in_new" size={14} aria-hidden="true" />}
    </a>
  )
}
