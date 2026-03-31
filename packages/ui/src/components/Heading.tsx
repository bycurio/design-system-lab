import { cn } from '../utils'
import type { HeadingProps } from './Heading.types'

const levelClasses: Record<string, string> = {
  display: 'text-4xl font-bold leading-tight',
  h1: 'text-3xl font-bold leading-tight',
  h2: 'text-2xl font-semibold leading-tight',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-semibold',
}

export function Heading({ as = 'h2', children, className }: HeadingProps) {
  const Tag = as === 'display' ? 'h1' : as
  return (
    <Tag className={cn('font-sans text-(--color-text-primary)', levelClasses[as], className)}>
      {children}
    </Tag>
  )
}
