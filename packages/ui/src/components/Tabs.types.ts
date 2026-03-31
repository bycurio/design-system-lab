import type { ReactNode } from 'react'
export interface TabItem { label: string; value: string; content: ReactNode }
export interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}
