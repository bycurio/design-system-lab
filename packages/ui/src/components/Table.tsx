import { cn } from '../utils'
import type { TableProps, TableRow } from './Table.types'

export function Table<T extends TableRow>({ columns, rows, onRowClick, loading, emptyState, className }: TableProps<T>) {
  return (
    <div className={cn('rounded-(--card-radius) border border-(--color-border) overflow-hidden', className)}>
      <table className="w-full text-sm">
        <thead className="bg-(--color-surface) border-b border-(--color-border)">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wide">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border)">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 w-3/4 rounded-(--radius-md) bg-(--color-surface) animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-(--color-text-secondary)">{emptyState ?? 'No results'}</td></tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn('bg-(--color-bg)', onRowClick && 'cursor-pointer hover:bg-(--color-surface)')}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-(--color-text-primary)">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
