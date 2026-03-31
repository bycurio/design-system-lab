import type { ReactNode } from 'react'
export type DrawerPlacement = 'left' | 'right'
export type DrawerSize = 'sm' | 'md' | 'lg'
export interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  placement?: DrawerPlacement
  size?: DrawerSize
  className?: string
}
