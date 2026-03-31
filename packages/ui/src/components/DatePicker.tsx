import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { DatePickerProps } from './DatePicker.types'

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, errorMessage, onChange, minDate, maxDate, className, disabled, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label htmlFor={id} className="text-sm font-medium text-(--color-text-primary)">{label}</label>
        <input
          ref={ref}
          id={id}
          type="date"
          disabled={disabled}
          min={minDate?.toISOString().split('T')[0]}
          max={maxDate?.toISOString().split('T')[0]}
          aria-invalid={error || undefined}
          className={cn(
            'h-9 px-3 text-sm rounded-(--input-radius) border border-(--input-border)',
            'bg-(--color-bg) text-(--color-text-primary)',
            'focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-(--color-danger) focus:ring-(--color-danger)',
          )}
          onChange={(e) => {
            if (e.target.value) onChange?.(new Date(e.target.value))
          }}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-xs text-(--color-danger)">{errorMessage}</p>
        )}
      </div>
    )
  },
)
DatePicker.displayName = 'DatePicker'
