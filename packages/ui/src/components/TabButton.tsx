import { cn } from '../utils'
import { Icon } from './Icon'
import type { TabButtonProps } from './TabButton.types'

export function TabButton({ label, icon, active, disabled, className, ...props }: TabButtonProps) {
  return (
    <button
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3 text-sm rounded-(--button-radius)',
        'transition-colors border-b-2 -mb-px',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand)',
        active
          ? 'border-(--color-brand) text-(--color-brand) font-medium'
          : 'border-transparent text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-interaction-hover)',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={20} className="shrink-0" />}
      {label}
    </button>
  )
}
