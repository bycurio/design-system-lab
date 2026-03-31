import { cn } from '../utils'
import type { CodeProps } from './Code.types'

export function Code({ variant = 'inline', children, className }: CodeProps) {
  if (variant === 'block') {
    return (
      <pre className={cn('rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) p-4 overflow-x-auto text-sm font-mono text-(--color-text-primary)', className)}>
        <code>{children}</code>
      </pre>
    )
  }
  return (
    <code className={cn('px-1.5 py-0.5 rounded-(--radius-sm) bg-(--color-surface) border border-(--color-border) text-sm font-mono text-(--color-brand)', className)}>
      {children}
    </code>
  )
}
