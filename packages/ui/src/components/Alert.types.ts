export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'
export interface AlertProps {
  variant: AlertVariant
  title: string
  message: string
  onClose?: () => void
  className?: string
}
