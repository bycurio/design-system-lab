'use client'
import { useState, useRef } from 'react'
import { cn } from '../utils'
import type { TooltipProps } from './Tooltip.types'

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function Tooltip({ content, children, placement = 'top', delayMs = 300 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function show() { timer.current = setTimeout(() => setVisible(true), delayMs) }
  function hide() { if (timer.current) clearTimeout(timer.current); setVisible(false) }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-2 py-1 text-xs rounded-(--tooltip-radius)',
            'bg-(--tooltip-bg) text-(--tooltip-text) whitespace-nowrap pointer-events-none',
            placementClasses[placement],
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
