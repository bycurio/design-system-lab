import { cn } from '../utils'
import { Icon } from './Icon'
import { Button } from './Button'
import { IconButton } from './IconButton'
import type { AlertProps, AlertVariant } from './Alert.types'

const config: Record<AlertVariant, { icon: string; borderClass: string; bgClass: string; iconClass: string }> = {
  info:    { icon: 'info',         borderClass: 'border-(--color-info-border)',    bgClass: 'bg-(--color-info-surface)',    iconClass: 'text-(--color-info-text)'    },
  success: { icon: 'check_circle', borderClass: 'border-(--color-success-border)', bgClass: 'bg-(--color-success-surface)', iconClass: 'text-(--color-success-text)' },
  warning: { icon: 'warning',      borderClass: 'border-(--color-warning-border)', bgClass: 'bg-(--color-warning-surface)', iconClass: 'text-(--color-warning-text)' },
  danger:  { icon: 'error',        borderClass: 'border-(--color-danger-border)',  bgClass: 'bg-(--color-danger-surface)',  iconClass: 'text-(--color-danger-text)'  },
}

export function Alert({ variant, title, description, action, onDismiss, className }: AlertProps) {
  const { icon, borderClass, bgClass, iconClass } = config[variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-3 p-4 rounded-(--radius-lg) border',
        bgClass,
        borderClass,
        className,
      )}
    >
      <Icon name={icon} size={20} className={cn('shrink-0', iconClass)} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-(--color-text-primary)">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-(--color-text-secondary)">{description}</p>
        )}
      </div>

      {action && (
        <Button variant="ghost" size="sm" onClick={action.onClick} className="shrink-0">
          {action.label}
        </Button>
      )}

      {onDismiss && (
        <IconButton
          variant="ghost"
          size="sm"
          icon={<Icon name="close" size={16} />}
          aria-label="Dismiss alert"
          onClick={onDismiss}
          className="shrink-0"
        />
      )}
    </div>
  )
}
