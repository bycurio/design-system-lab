import { cn } from '../utils'
import { Icon } from './Icon'
import type { ChipProps } from './Chip.types'

export function Chip({ children, onRemove, disabled = false, className }: ChipProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-(--chip-radius) bg-(--color-surface) border border-(--color-border) text-(--color-text-primary)', className)}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          className="ml-0.5 text-(--color-text-secondary) hover:text-(--color-text-primary) disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
        >
          <Icon name="close" size={12} />
        </button>
      )}
    </span>
  )
}
