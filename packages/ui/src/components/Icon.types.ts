import type { HTMLAttributes } from 'react'

export interface IconProps extends Pick<HTMLAttributes<HTMLSpanElement>, 'role' | 'className'> {
  name: string
  size?: number
  'aria-hidden'?: boolean | 'true' | 'false' | undefined
  'aria-label'?: string
}
