import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { CheckboxProps } from './Checkbox.types'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, onChange, className, disabled, ...props }, ref) => {
    const id = useId()
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className="size-4 rounded-(--input-radius) border border-(--color-border) accent-(--color-brand) cursor-pointer disabled:cursor-not-allowed"
          onChange={(e) => onChange?.(e.target.checked)}
          {...props}
        />
        <span className="text-sm text-(--color-text-primary)">{label}</span>
      </label>
    )
  },
)
Checkbox.displayName = 'Checkbox'
