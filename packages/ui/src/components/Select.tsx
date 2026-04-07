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
            'bg-(--color-surface-raised) text-(--color-text-primary) appearance-none',
            'transition-colors',
            'enabled:hover:bg-(--color-surface-raised-hover)',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-(--color-surface) disabled:opacity-40 disabled:cursor-not-allowed',
            error
              ? 'border-(--color-danger) focus:ring-(--color-danger) focus:border-(--color-danger)'
              : 'focus:ring-(--color-brand) focus:border-(--color-brand)',
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
          size={16}
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
