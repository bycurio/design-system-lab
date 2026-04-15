'use client'
import { useEffect } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { ToastProps, ToastVariant } from './Toast.types'

const config: Record<ToastVariant, { icon: string; iconClass: string; borderClass: string }> = {
  info:    { icon: 'info',         iconClass: 'text-(--color-info-text)',    borderClass: 'border-(--color-info-border)'    },
  success: { icon: 'check_circle', iconClass: 'text-(--color-success-text)', borderClass: 'border-(--color-success-border)' },
  warning: { icon: 'warning',      iconClass: 'text-(--color-warning-text)', borderClass: 'border-(--color-warning-border)' },
  danger:  { icon: 'error',        iconClass: 'text-(--color-danger-text)',  borderClass: 'border-(--color-danger-border)'  },
}

export function Toast({ title, description, variant = 'info', open = true, onClose, duration = 3000, className }: ToastProps) {
  useEffect(() => {
    if (!open || !onClose || !duration) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, onClose, duration])

  if (!open) return null

  const { icon, iconClass, borderClass } = config[variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 w-80 rounded-(--radius-lg) shadow-(--shadow-lg)',
        'bg-(--color-surface-raised) border',
        borderClass,
        className,
      )}
    >
      <Icon name={icon} size={20} className={cn('shrink-0 mt-0.5', iconClass)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-(--color-text-primary)">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-(--color-text-secondary)">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 -mt-0.5 text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
