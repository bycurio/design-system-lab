import type { ReactNode } from 'react'

export interface SidebarItem {
  label: string
  href: string
  icon?: string
  active?: boolean
  disabled?: boolean
}

export interface SidebarProps {
  logo?: ReactNode
  sectionLabel?: string
  items: SidebarItem[]
  className?: string
}
