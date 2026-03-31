export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'
export interface ToastProps {
  message: string
  variant?: ToastVariant
  open?: boolean
  onClose?: () => void
  duration?: number
  className?: string
}
