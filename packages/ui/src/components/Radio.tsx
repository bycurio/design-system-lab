'use client'
import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { RadioProps } from './Radio.types'

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, value, name, onChange, className, disabled, ...props }, ref) => {
    const id = useId()
    return (
      <label htmlFor={id} className={cn('inline-flex items-center gap-2 cursor-pointer', disabled && 'opacity-40 cursor-not-allowed', className)}>
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          className="size-4 border border-(--color-border) accent-(--color-brand) cursor-pointer disabled:cursor-not-allowed"
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />
        <span className="text-sm text-(--color-text-primary)">{label}</span>
      </label>
    )
  },
)
Radio.displayName = 'Radio'
