'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { DrawerProps } from './Drawer.types'

const sizeClasses = { sm: 'w-72', md: 'w-96', lg: 'w-[32rem]' }

export function Drawer({ open, onClose, title, children, placement = 'right', size = 'md', className }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const content = (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className={cn(
        'relative flex flex-col bg-(--color-bg) shadow-(--shadow-xl) h-full',
        sizeClasses[size],
        placement === 'right' ? 'ml-auto' : 'mr-auto',
        className,
      )}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-(--color-border)">
          <h2 id="drawer-title" className="text-lg font-semibold text-(--color-text-primary)">{title}</h2>
          <button onClick={onClose} aria-label="Close drawer" className="text-(--color-text-secondary) hover:text-(--color-text-primary)">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  )

  if (typeof window === 'undefined') return content
  return createPortal(content, document.body)
}
