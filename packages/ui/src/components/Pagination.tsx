import { cn } from '../utils'
import { Icon } from './Icon'
import type { PaginationProps } from './Pagination.types'

function getPages(page: number, total: number, siblings: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const left = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const pages: (number | '…')[] = [1]
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, className }: PaginationProps) {
  const pages = getPages(page, totalPages, siblingCount)
  const btnBase = 'inline-flex items-center justify-center size-8 text-sm rounded-(--button-radius) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-focus)'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={cn(btnBase, 'border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed) disabled:opacity-50 disabled:cursor-not-allowed')}
      >
        <Icon name="chevron_left" size={14} />
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="size-8 flex items-center justify-center text-sm text-(--color-text-secondary)">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              btnBase,
              p === page
                ? 'bg-(--color-brand) text-(--color-text-inverse)'
                : 'border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed)',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={cn(btnBase, 'border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed) disabled:opacity-50 disabled:cursor-not-allowed')}
      >
        <Icon name="chevron_right" size={14} />
      </button>
    </nav>
  )
}
