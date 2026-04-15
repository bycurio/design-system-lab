export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'
export interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
  open?: boolean
  onClose?: () => void
  duration?: number
  className?: string
}
