'use client'
import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { InputProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leadingIcon, trailingIcon, className, disabled, required, id: propId, ...props }, ref) => {
    const generatedId = useId()
    const id = propId ?? generatedId
    const hintId = `${id}-hint`
    const errorId = `${id}-error`
    const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-(--color-text-primary)">
            {label}
            {required && <span aria-hidden="true" className="text-(--color-danger) ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leadingIcon && (
            <span className="absolute left-3 text-(--color-text-secondary) pointer-events-none">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
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
              !!leadingIcon && 'pl-9',
              !!trailingIcon && 'pr-9',
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
        {hint && !error && <p id={hintId} className="text-xs text-(--color-text-secondary)">{hint}</p>}
        {error && <p id={errorId} className="text-xs text-(--color-danger)" role="alert">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
