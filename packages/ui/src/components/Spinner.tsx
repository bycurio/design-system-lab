import { cn } from '../utils'
import { Icon } from './Icon'
import type { SpinnerProps } from './Spinner.types'

const sizePx      = { sm: 16, md: 24, lg: 32 }
const sizeClasses = { sm: 'size-4', md: 'size-6', lg: 'size-8' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Icon
      name="progress_activity"
      size={sizePx[size]}
      role="status"
      aria-label="Loading"
      aria-hidden={undefined}
      className={cn('animate-spin text-(--color-brand)', sizeClasses[size], className)}
    />
  )
}
