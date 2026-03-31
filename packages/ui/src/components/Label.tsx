import { cn } from '../utils'
import type { LabelProps } from './Label.types'

export function Label({ required, children, className, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm font-medium text-(--color-text-primary)', className)} {...props}>
      {children}
      {required && <span className="ml-0.5 text-(--color-danger)" aria-hidden="true">*</span>}
    </label>
  )
}
