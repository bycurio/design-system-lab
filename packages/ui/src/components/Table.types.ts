import type { ReactNode } from 'react'
export interface TableColumn<T = Record<string, unknown>> { key: string; label: string; render?: (row: T) => ReactNode }
export interface TableRow { id: string; [key: string]: unknown }
export interface TableProps<T extends TableRow = TableRow> {
  columns: TableColumn<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  loading?: boolean
  emptyState?: ReactNode
  className?: string
}
