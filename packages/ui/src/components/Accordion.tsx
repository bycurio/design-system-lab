'use client'
import { useState } from 'react'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { AccordionProps } from './Accordion.types'

export function Accordion({ items, allowMultiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set(defaultOpen))

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i) }
      else {
        if (!allowMultiple) next.clear()
        next.add(i)
      }
      return next
    })
  }

  return (
    <div className={cn('divide-y divide-(--color-border) border border-(--color-border) rounded-(--radius-md)', className)}>
      {items.map((item, i) => {
        const isOpen = openSet.has(i)
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-(--color-text-primary) hover:bg-(--color-interaction-hover) active:bg-(--color-interaction-pressed) transition-colors text-left"
            >
              {item.title}
              <Icon name="expand_more" size={16} className={cn('text-(--color-text-secondary) transition-transform shrink-0', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div className="px-4 py-3 text-sm text-(--color-text-secondary) border-t border-(--color-border)">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
