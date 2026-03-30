import { forwardRef } from 'react'
import { cn } from '../utils'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary: 'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover)',
  secondary: 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-surface)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-surface)',
  danger: 'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover)',
}

const sizeClasses = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
}

const Spinner = () => (
  <svg className="animate-spin size-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className, children, ...props }, ref) => (
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
      {loading && <Spinner />}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
