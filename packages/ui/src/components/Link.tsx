import { cn } from '../utils'
import { Icon } from './Icon'
import type { LinkProps } from './Link.types'

export function Link({ href, external = false, children, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1 text-(--color-brand) underline underline-offset-2 hover:text-(--color-brand-hover) transition-colors',
        className,
      )}
      {...props}
    >
      {children}
      {external && <Icon name="open_in_new" size={12} />}
    </a>
  )
}
