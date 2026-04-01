'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils'
import { Icon } from './Icon'
import type { ModalProps } from './Modal.types'

const sizeClasses = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

export function Modal({ open, onClose, title, children, footer, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className={cn('relative w-full rounded-(--modal-radius) bg-(--color-surface-raised) shadow-(--shadow-xl)', sizeClasses[size], className)}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-(--color-border)">
          <h2 id="modal-title" className="text-lg font-semibold text-(--color-text-primary)">{title}</h2>
          <button onClick={onClose} aria-label="Close modal" className="text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-(--color-border) bg-(--color-surface)">{footer}</div>}
      </div>
    </div>
  )

  if (typeof window === 'undefined') return content
  return createPortal(content, document.body)
}
