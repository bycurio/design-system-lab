import { cn } from '../utils'
import type { ListProps } from './List.types'

export function List({ items, className }: ListProps) {
  return (
    <ul className={cn('divide-y divide-(--color-border) border border-(--color-border) rounded-(--card-radius) overflow-hidden', className)}>
      {items.map((item) => (
        <li key={item.id}>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed) transition-colors"
            >
              {item.icon && <span className="text-(--color-text-secondary) shrink-0">{item.icon}</span>}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-(--color-text-primary) truncate">{item.label}</p>
                {item.description && <p className="text-xs text-(--color-text-secondary) truncate">{item.description}</p>}
              </div>
              {item.trailing && <span className="shrink-0">{item.trailing}</span>}
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3">
              {item.icon && <span className="text-(--color-text-secondary) shrink-0">{item.icon}</span>}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-(--color-text-primary) truncate">{item.label}</p>
                {item.description && <p className="text-xs text-(--color-text-secondary) truncate">{item.description}</p>}
              </div>
              {item.trailing && <span className="shrink-0">{item.trailing}</span>}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
