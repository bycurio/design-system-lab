import { cn } from '../utils'
import type { BadgeProps } from './Badge.types'

const variantClasses: Record<string, string> = {
  info:    'bg-(--color-info-surface) text-(--color-info)',
  success: 'bg-(--color-success-surface) text-(--color-success)',
  warning: 'bg-(--color-warning-surface) text-(--color-warning)',
  danger:  'bg-(--color-danger-surface) text-(--color-danger)',
  neutral: 'bg-(--color-surface) text-(--color-text-secondary) border border-(--color-border)',
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-(--badge-radius)', variantClasses[variant], className)}>
      {children}
    </span>
  )
}
