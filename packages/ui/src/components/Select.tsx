import { forwardRef } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { SelectProps } from './Select.types'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, error, errorMessage, onValueChange, className, onChange, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={error || undefined}
          className={cn(
            'w-full h-9 pl-3 pr-8 text-sm rounded-(--input-radius) border border-(--input-border)',
            'bg-(--color-bg) text-(--color-text-primary) appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-(--color-border-focus) focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-(--color-danger) focus:ring-(--color-danger)',
            className,
          )}
          onChange={(e) => { onChange?.(e); onValueChange?.(e.target.value) }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <Icon
          name="expand_more"
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-(--color-text-secondary) pointer-events-none"
        />
      </div>
      {error && errorMessage && (
        <p className="text-xs text-(--color-danger)">{errorMessage}</p>
      )}
    </div>
  ),
)
Select.displayName = 'Select'
