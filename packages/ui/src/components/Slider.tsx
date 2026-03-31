'use client'
import { forwardRef, useId } from 'react'
import { cn } from '../utils'
import type { SliderProps } from './Slider.types'

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, min = 0, max = 100, step = 1, onChange, className, disabled, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label htmlFor={id} className="text-sm text-(--color-text-secondary)">{label}</label>
        <input
          ref={ref}
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full accent-(--color-brand) disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={(e) => onChange?.(Number(e.target.value))}
          {...props}
        />
      </div>
    )
  },
)
Slider.displayName = 'Slider'
