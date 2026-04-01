'use client'
import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { ToggleProps } from './Toggle.types'

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, onChange, className, disabled, ...props }, ref) => {
    const id = useId()
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            disabled={disabled}
            className="sr-only peer"
            onChange={(e) => onChange?.(e.target.checked)}
            {...props}
          />
          <div className="w-10 h-6 rounded-full border border-(--color-border) bg-(--color-surface) peer-checked:bg-(--color-brand) peer-checked:border-(--color-brand) transition-colors" />
          <div className="absolute top-1 left-1 size-4 rounded-full bg-(--color-white) shadow-sm transition-transform peer-checked:translate-x-4" />
        </div>
        <span className="text-sm text-(--color-text-primary)">{label}</span>
      </label>
    )
  },
)
Toggle.displayName = 'Toggle'
