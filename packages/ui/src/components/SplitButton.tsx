'use client'
import { useState, useRef, useEffect } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { SplitButtonProps } from './SplitButton.types'

const variantClasses = {
  primary:   'bg-(--color-brand) text-(--color-text-inverse) hover:bg-(--color-brand-hover) active:bg-(--color-brand-pressed)',
  secondary: 'text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
  danger:    'bg-(--color-danger) text-(--color-text-inverse) hover:bg-(--color-danger-hover) active:bg-(--color-danger-pressed)',
}

// Secondary gets a unified outer border on the wrapper; primary/danger are filled
const wrapperVariantClasses = {
  primary:   '',
  secondary: 'border border-(--color-border)',
  danger:    '',
}

// Divider between the two segments
const dividerClasses = {
  primary:   'border-r border-white/20',
  secondary: 'border-r border-(--color-border)',
  danger:    'border-r border-white/20',
}

const sizeClasses = {
  sm: 'h-7 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-11 text-base',
}

const paddingClasses = {
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-4',
}

const chevronSize = { sm: 14, md: 16, lg: 16 }

export function SplitButton({
  label, onClick, actions, variant = 'primary', size = 'md', disabled = false, className,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const base = cn(
    'inline-flex items-center justify-center font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
  )

  return (
    <div ref={ref} className={cn('relative inline-flex rounded-(--button-radius)', wrapperVariantClasses[variant], className)}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(base, paddingClasses[size], 'rounded-l-(--button-radius)', dividerClasses[variant])}
      >
        {label}
      </button>
      <button
        disabled={disabled}
        aria-label="More options"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(base, 'px-2 rounded-r-(--button-radius)')}
      >
        <Icon name="expand_more" size={chevronSize[size]} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-(--button-radius) border border-(--color-border) bg-(--color-surface-raised) shadow-(--shadow-md) z-50">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => { action.onClick(); setOpen(false) }}
              className="w-full text-left px-4 py-2 text-sm text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed) first:rounded-t-(--button-radius) last:rounded-b-(--button-radius)"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
