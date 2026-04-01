import { cn } from '../utils'
import { Icon } from './Icon'
import type { AlertProps } from './Alert.types'

const config = {
  info:    { icon: 'info', classes: 'border border-(--color-info) bg-(--color-info-surface) text-(--color-info)' },
  success: { icon: 'check_circle', classes: 'border border-(--color-success) bg-(--color-success-surface) text-(--color-success)' },
  warning: { icon: 'warning', classes: 'border border-(--color-warning) bg-(--color-warning-surface) text-(--color-warning)' },
  danger:  { icon: 'error', classes: 'border border-(--color-danger) bg-(--color-danger-surface) text-(--color-danger)' },
}

export function Alert({ variant, title, message, onClose, className }: AlertProps) {
  const { icon, classes } = config[variant]
  return (
    <div role="alert" className={cn('flex gap-3 p-4 rounded-(--radius-md)', classes, className)}>
      <Icon name={icon} size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-(--color-text-primary) mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss alert" className="text-(--color-text-secondary) hover:text-(--color-text-primary) shrink-0">
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  )
}
