import { forwardRef } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { FABProps } from './FAB.types'

const iconSizePx = { sm: 20, md: 24, lg: 24 }

const circularSizeClasses = {
  sm: 'size-10',  // 40px
  md: 'size-14',  // 56px
  lg: 'size-16',  // 64px
}

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ iconName, size = 'md', label, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center bg-(--color-brand) text-(--color-text-inverse)',
        'hover:bg-(--color-brand-hover) active:bg-(--color-brand-pressed) transition-colors shadow-(--shadow-lg)',
        label
          ? 'h-14 px-6 gap-2 rounded-(--button-radius) text-sm font-medium'
          : cn(circularSizeClasses[size], 'rounded-full'),
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus) focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <Icon name={iconName} size={iconSizePx[size]} aria-hidden="true" className="shrink-0" />
      {label && <span>{label}</span>}
    </button>
  ),
)
FAB.displayName = 'FAB'
