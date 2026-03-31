import { cn } from '../utils'
import type { ProgressProps } from './Progress.types'

export function Progress({ value, label, variant = 'default', showLabel = false, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-(--color-text-secondary)">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-(--color-surface) border border-(--color-border)" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div
          className={cn('h-full rounded-full transition-all', variant === 'success' ? 'bg-(--color-success)' : 'bg-(--color-brand)')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
