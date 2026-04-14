'use client'
import { useState } from 'react'
import { cn } from '../utils'
import { TabButton } from './TabButton'
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
          <TabButton
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            active={tab.value === active}
            disabled={tab.disabled}
            aria-controls={`panel-${tab.value}`}
            onClick={() => !tab.disabled && select(tab.value)}
          />
        ))}
      </div>
      <div id={`panel-${active}`} role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}
