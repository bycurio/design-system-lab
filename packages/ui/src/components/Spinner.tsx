import { cn } from '../utils'
import type { SpinnerProps } from './Spinner.types'

const sizeClasses = { sm: 'size-4', md: 'size-6', lg: 'size-8' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <svg
      aria-label="Loading"
      role="status"
      viewBox="0 0 24 24"
      fill="none"
      className={cn('animate-spin text-(--color-brand)', sizeClasses[size], className)}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
