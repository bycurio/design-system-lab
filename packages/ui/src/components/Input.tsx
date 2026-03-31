import { forwardRef } from 'react'
import { cn } from '../utils'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage, leadingIcon, trailingIcon, className, disabled, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="absolute left-3 text-(--color-text-secondary) pointer-events-none">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={cn(
            'w-full h-9 px-3 text-sm rounded-(--input-radius) border border-(--input-border)',
            'bg-(--color-bg) text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
            'focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-(--color-danger) focus:ring-(--color-danger)',
            leadingIcon && 'pl-9',
            trailingIcon && 'pr-9',
            className,
          )}
          {...props}
        />
        {trailingIcon && (
          <span className="absolute right-3 text-(--color-text-secondary) pointer-events-none">
            {trailingIcon}
          </span>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-xs text-(--color-danger)">{errorMessage}</p>
      )}
    </div>
  ),
)
Input.displayName = 'Input'
