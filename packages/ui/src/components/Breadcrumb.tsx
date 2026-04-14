import { cn } from '../utils'
import { Icon } from './Icon'
import type { BreadcrumbProps } from './Breadcrumb.types'

const defaultSeparator = <Icon name="chevron_right" size={16} className="text-(--color-text-secondary) shrink-0" />

export function Breadcrumb({ items, separator = defaultSeparator, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">{separator}</span>}
              {isLast || !item.href ? (
                <span
                  className={isLast ? 'text-(--color-text-primary) font-medium' : 'text-(--color-text-secondary)'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
