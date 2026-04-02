import { forwardRef } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { FABProps } from './FAB.types'

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ iconName, loading, label, className, ...props }, ref) => (
    <button
      ref={ref}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center bg-(--color-brand) text-(--color-text-inverse)',
        'hover:bg-(--color-brand-hover) active:bg-(--color-brand-pressed) transition-colors shadow-(--shadow-lg)',
        label ? 'h-14 px-5 gap-2 rounded-full text-base font-medium' : 'size-14 rounded-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {loading
        ? <Icon name="progress_activity" size={24} className="animate-spin shrink-0" aria-hidden="true" />
        : <Icon name={iconName} size={24} aria-hidden="true" className="shrink-0" />
      }
      {label && <span>{label}</span>}
    </button>
  ),
)
FAB.displayName = 'FAB'
