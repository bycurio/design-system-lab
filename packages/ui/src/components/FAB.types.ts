import type { ButtonHTMLAttributes } from 'react'
export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string
  label?: string
  'aria-label': string
}
