import type { AnchorHTMLAttributes } from 'react'

export interface NavButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string
  href: string
  icon?: string
  active?: boolean
  disabled?: boolean
}
