import type { ButtonHTMLAttributes } from 'react'
export type FABSize = 'sm' | 'md' | 'lg'
export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string
  size?: FABSize
  label?: string
  'aria-label': string
}
