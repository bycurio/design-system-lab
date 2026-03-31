import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../utils'
import type { AlertProps } from './Alert.types'

const config = {
  info:    { icon: Info, classes: 'border border-(--color-info) bg-(--color-info-surface) text-(--color-info)' },
  success: { icon: CheckCircle, classes: 'border border-(--color-success) bg-(--color-success-surface) text-(--color-success)' },
  warning: { icon: AlertTriangle, classes: 'border border-(--color-warning) bg-(--color-warning-surface) text-(--color-warning)' },
  danger:  { icon: AlertCircle, classes: 'border border-(--color-danger) bg-(--color-danger-surface) text-(--color-danger)' },
}

export function Alert({ variant, title, message, onClose, className }: AlertProps) {
  const { icon: Icon, classes } = config[variant]
  return (
    <div role="alert" className={cn('flex gap-3 p-4 rounded-(--radius-md)', classes, className)}>
      <Icon size={18} aria-hidden="true" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-(--color-text-primary) mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss alert" className="text-(--color-text-secondary) hover:text-(--color-text-primary) shrink-0">
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
