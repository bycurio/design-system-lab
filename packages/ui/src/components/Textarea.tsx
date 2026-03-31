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
          'bg-(--color-bg) text-(--color-text-primary) placeholder:text-(--color-text-secondary)',
          'focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1',
          'disabled:opacity-50 disabled:cursor-not-allowed resize-y',
          error && 'border-(--color-danger) focus:ring-(--color-danger)',
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
