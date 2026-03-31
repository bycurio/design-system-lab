import type { ReactNode } from 'react'
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export interface PopoverProps {
  trigger: ReactNode
  content: ReactNode
  placement?: PopoverPlacement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
