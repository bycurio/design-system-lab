import { cn } from '../utils'
import type { BadgeProps, BadgeVariant } from './Badge.types'

const subtleClasses: Record<BadgeVariant, string> = {
  info:    'bg-(--color-info-surface)    text-(--color-info-text)    border border-(--color-info-border)',
  success: 'bg-(--color-success-surface) text-(--color-success-text) border border-(--color-success-border)',
  warning: 'bg-(--color-warning-surface) text-(--color-warning-text) border border-(--color-warning-border)',
  danger:  'bg-(--color-danger-surface)  text-(--color-danger-text)  border border-(--color-danger-border)',
  neutral: 'bg-(--color-neutral-surface) text-(--color-neutral)      border border-(--color-neutral-border)',
}

const strongClasses: Record<BadgeVariant, string> = {
  info:    'bg-(--color-info)           text-(--color-text-inverse) border border-(--color-info-strong-border)',
  success: 'bg-(--color-success)        text-(--color-text-inverse) border border-(--color-success-strong-border)',
  warning: 'bg-(--color-warning-strong) text-(--color-text-inverse) border border-(--color-warning-strong-border)',
  danger:  'bg-(--color-danger)         text-(--color-text-inverse) border border-(--color-danger-strong-border)',
  neutral: 'bg-(--color-neutral-strong) text-(--color-text-inverse) border border-(--color-neutral-strong-border)',
}

export function Badge({ variant = 'neutral', strength = 'subtle', children, className }: BadgeProps) {
  const classes = strength === 'strong' ? strongClasses[variant] : subtleClasses[variant]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-(--badge-radius)', classes, className)}>
      {children}
    </span>
  )
}
