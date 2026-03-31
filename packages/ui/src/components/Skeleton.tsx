import { cn } from '../utils'
import type { SkeletonProps } from './Skeleton.types'

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('rounded-(--radius-md) bg-(--color-surface) animate-pulse', className)}
    />
  )
}
