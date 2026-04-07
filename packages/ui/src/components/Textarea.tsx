import { forwardRef } from 'react'
import { cn } from '../utils'
import type { TextareaProps } from './Textarea.types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, errorMessage, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <textarea
        ref={ref}
        rows={props.rows ?? 3}
        aria-invalid={error || undefined}
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
      {error && errorMessage && (
        <p className="text-xs text-(--color-danger)">{errorMessage}</p>
      )}
    </div>
  ),
)
Textarea.displayName = 'Textarea'
