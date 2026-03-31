import { cn } from '../utils'
import type { DividerProps } from './Divider.types'

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('self-stretch w-px bg-(--color-border)', className)} aria-hidden="true" />
  }
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)} role="separator">
        <div className="flex-1 h-px bg-(--color-border)" />
        <span className="text-xs text-(--color-text-secondary)">{label}</span>
        <div className="flex-1 h-px bg-(--color-border)" />
      </div>
    )
  }
  return <hr className={cn('border-0 h-px bg-(--color-border)', className)} />
}
