import { cn } from '../utils'
import type { BreadcrumbProps } from './Breadcrumb.types'

export function Breadcrumb({ items, separator = '/', className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-(--color-text-secondary)" aria-hidden="true">{separator}</span>}
              {isLast || !item.href ? (
                <span className={cn(isLast ? 'text-(--color-text-primary) font-medium' : 'text-(--color-text-secondary)')} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">
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
