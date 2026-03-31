import { cn } from '../utils'
import type { CaptionProps } from './Caption.types'

const variantClasses = {
  default: 'text-(--color-text-secondary)',
  error: 'text-(--color-danger)',
  success: 'text-(--color-success)',
}

export function Caption({ variant = 'default', children, className }: CaptionProps) {
  return (
    <p className={cn('text-xs leading-normal', variantClasses[variant], className)}>
      {children}
    </p>
  )
}
