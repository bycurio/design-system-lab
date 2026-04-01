import { cn } from '../utils'
import { Icon } from './Icon'
import type { SpinnerProps } from './Spinner.types'

const sizePx = { sm: 16, md: 24, lg: 32 }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Icon
      name="progress_activity"
      size={sizePx[size]}
      aria-label="Loading"
      className={cn('animate-spin text-(--color-brand)', className)}
    />
  )
}
