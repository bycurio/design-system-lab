import { forwardRef } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover) active:bg-(--color-brand-pressed)',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
  ghost: 'text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover) active:bg-(--color-danger-pressed)',
}

const sizeClasses = {
  sm: 'h-7 px-(--button-padding-x-sm) text-xs gap-1.5',
  md: 'h-9 px-(--button-padding-x-md) text-sm gap-2',
  lg: 'h-11 px-(--button-padding-x-lg) text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-(--button-radius) transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? <Icon name="progress_activity" size={16} className="animate-spin shrink-0" /> : icon}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
