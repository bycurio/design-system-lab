import type { ReactNode } from 'react'
export interface SidebarNavItem { label: string; href: string; active?: boolean }
export interface SidebarNavGroup { title: string; items: SidebarNavItem[] }
export interface SidebarProps {
  groups: SidebarNavGroup[]
  header?: ReactNode
  footer?: ReactNode
  className?: string
}
