'use client'
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
            'bg-(--color-surface-raised) text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
            'transition-colors',
            'enabled:hover:bg-(--color-surface-raised-hover)',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-(--color-surface) disabled:opacity-40 disabled:cursor-not-allowed',
            error
              ? 'border-(--color-danger) focus:ring-(--color-danger) focus:border-(--color-danger)'
              : 'focus:ring-(--color-brand) focus:border-(--color-brand)',
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
