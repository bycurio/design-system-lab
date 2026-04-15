export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertAction {
  label: string
  onClick: () => void
}

export interface AlertProps {
  variant: AlertVariant
  title: string
  description?: string
  action?: AlertAction
  onDismiss?: () => void
  className?: string
}
