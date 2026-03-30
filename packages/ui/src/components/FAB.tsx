import { forwardRef } from 'react'
import { cn } from '../utils'
import type { FABProps } from './FAB.types'

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ icon, label, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 bg-(--color-brand) text-(--color-text-inverse)',
        'hover:bg-(--color-brand-hover) transition-colors shadow-(--shadow-lg)',
        label ? 'h-14 px-6 rounded-(--button-radius) text-sm font-medium' : 'size-14 rounded-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  ),
)
FAB.displayName = 'FAB'
