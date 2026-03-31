import { cn } from '../utils'
import type { CardProps, CardSectionProps } from './Card.types'

function CardHeader({ children, className }: CardSectionProps) {
  return <div className={cn('px-6 py-4 border-b border-(--color-border)', className)}>{children}</div>
}

function CardBody({ children, className }: CardSectionProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

function CardFooter({ children, className }: CardSectionProps) {
  return <div className={cn('px-6 py-4 border-t border-(--color-border) bg-(--color-surface)', className)}>{children}</div>
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-(--card-radius) border border-(--color-border) bg-(--color-bg) overflow-hidden', className)}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
