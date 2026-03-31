import { cn } from '../utils'
import type { BodyProps } from './Body.types'

const sizeClasses = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' }

export function Body({ size = 'base', children, className }: BodyProps) {
  return (
    <p className={cn('font-sans text-(--color-text-primary) leading-normal', sizeClasses[size], className)}>
      {children}
    </p>
  )
}
