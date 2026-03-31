'use client'
import { useState, useRef, useEffect } from 'react'
import { cn } from '../utils'
import type { PopoverProps } from './Popover.types'

const placementClasses = {
  top: 'bottom-full left-0 mb-2',
  bottom: 'top-full left-0 mt-2',
  left: 'right-full top-0 mr-2',
  right: 'left-full top-0 ml-2',
}

export function Popover({ trigger, content, placement = 'bottom', open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const ref = useRef<HTMLDivElement>(null)

  function toggle() {
    const next = !open
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setInternalOpen(false)
        onOpenChange?.(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onOpenChange])

  return (
    <div ref={ref} className="relative inline-flex">
      <div onClick={toggle}>{trigger}</div>
      {open && (
        <div className={cn('absolute z-40 rounded-(--popover-radius) border border-(--color-border) bg-(--color-bg) shadow-(--shadow-md)', placementClasses[placement])}>
          {content}
        </div>
      )}
    </div>
  )
}
