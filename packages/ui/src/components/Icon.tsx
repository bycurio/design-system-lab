import { cn } from '../utils'
import type { IconProps } from './Icon.types'

export function Icon({ name, size, className, ...props }: IconProps) {
  return (
    <span
      className={cn('material-symbols-rounded', className)}
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  )
}
