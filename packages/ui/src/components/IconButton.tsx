import { forwardRef } from 'react'
import { cn } from '../utils'
import type { IconButtonProps } from './IconButton.types'

const variantClasses = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover) active:bg-(--color-brand-pressed)',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover) active:bg-(--color-danger-pressed)',
}
const sizeClasses = { sm: 'size-7', md: 'size-9', lg: 'size-11' }

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'secondary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-(--button-radius) transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  ),
)
IconButton.displayName = 'IconButton'
