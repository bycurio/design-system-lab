import type { ReactNode } from 'react'

export interface SidebarItem {
  label: string
  href: string
  icon?: string
  active?: boolean
  disabled?: boolean
}

export interface SidebarGroup {
  label?: string
  items: SidebarItem[]
}

export interface SidebarProps {
  logo?: ReactNode
  groups: SidebarGroup[]
  className?: string
}
