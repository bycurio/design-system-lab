import type { ButtonHTMLAttributes, ReactNode } from 'react'
export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label?: string
  'aria-label': string
}
