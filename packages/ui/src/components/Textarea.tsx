'use client'
import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { TextareaProps } from './Textarea.types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, disabled, required, id: propId, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={id}
          rows={props.rows ?? 3}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full px-3 py-2 text-sm rounded-(--input-radius) border border-(--input-border)',
            'bg-(--color-surface-raised) text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
            'transition-colors resize-y',
            'enabled:hover:bg-(--color-surface-raised-hover)',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-(--color-surface) disabled:opacity-40 disabled:cursor-not-allowed',
            error
              ? 'border-(--color-danger) focus:ring-(--color-danger) focus:border-(--color-danger)'
              : 'focus:ring-(--color-brand) focus:border-(--color-brand)',
            className,
          )}
          {...props}
        />
        {hint && !error && <p id={hintId} className="text-xs text-(--color-text-secondary)">{hint}</p>}
        {error && <p id={errorId} className="text-xs text-(--color-danger)" role="alert">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
