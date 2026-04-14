import type { ButtonHTMLAttributes } from 'react'

export interface TabButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string
  icon?: string
  active?: boolean
}
