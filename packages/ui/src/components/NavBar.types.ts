import type { ReactNode } from 'react'
export interface NavBarLink { label: string; href: string; active?: boolean }
export interface NavBarProps {
  logo: ReactNode
  links: NavBarLink[]
  actions?: ReactNode
  className?: string
}
