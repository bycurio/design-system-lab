'use client'
import { useState } from 'react'
import { cn } from '../utils'
import type { TabsProps } from './Tabs.types'

export function Tabs({ tabs, defaultValue, value: controlledValue, onChange, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.value)
  const active = controlledValue ?? internalValue

  function select(val: string) {
    setInternalValue(val)
    onChange?.(val)
  }

  const activeTab = tabs.find((t) => t.value === active)

  return (
    <div className={cn('flex flex-col', className)}>
      <div role="tablist" className="flex border-b border-(--color-border)">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={tab.value === active}
            aria-controls={`panel-${tab.value}`}
            onClick={() => select(tab.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
              tab.value === active
                ? 'border-(--color-brand) text-(--color-brand)'
                : 'border-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`panel-${active}`} role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}
