import type { ButtonHTMLAttributes } from 'react'
export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string
  loading?: boolean
  label?: string
  'aria-label': string
}
