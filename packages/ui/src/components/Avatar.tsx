import { useState } from 'react'
import { cn } from '../utils'
import type { AvatarProps } from './Avatar.types'

const sizeClasses = { xs: 'size-6 text-[10px]', sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-12 text-base', xl: 'size-16 text-lg' }

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showFallback = !src || imgError

  return (
    <div className={cn('rounded-full overflow-hidden flex items-center justify-center bg-(--color-surface) border border-(--color-border) shrink-0 font-medium text-(--color-text-secondary)', sizeClasses[size], className)}>
      {showFallback ? (
        <span aria-label={alt}>{fallback.slice(0, 2).toUpperCase()}</span>
      ) : (
        <img src={src} alt={alt} className="size-full object-cover" onError={() => setImgError(true)} />
      )}
    </div>
  )
}
