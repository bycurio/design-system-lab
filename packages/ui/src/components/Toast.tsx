'use client'
import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../utils'
import type { ToastProps } from './Toast.types'

const config = {
  info:    { icon: Info, classes: 'border-l-4 border-(--color-info) bg-(--color-info-surface)' },
  success: { icon: CheckCircle, classes: 'border-l-4 border-(--color-success) bg-(--color-success-surface)' },
  warning: { icon: AlertTriangle, classes: 'border-l-4 border-(--color-warning) bg-(--color-warning-surface)' },
  danger:  { icon: AlertCircle, classes: 'border-l-4 border-(--color-danger) bg-(--color-danger-surface)' },
}

export function Toast({ message, variant = 'info', open = true, onClose, duration = 3000, className }: ToastProps) {
  useEffect(() => {
    if (!open || !onClose || !duration) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, onClose, duration])

  if (!open) return null

  const { icon: Icon, classes } = config[variant]

  return (
    <div role="alert" className={cn('flex items-center gap-3 p-4 rounded-(--radius-md) shadow-(--shadow-md) text-sm text-(--color-text-primary)', classes, className)}>
      <Icon size={16} aria-hidden="true" className="shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" className="text-(--color-text-secondary) hover:text-(--color-text-primary)">
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
