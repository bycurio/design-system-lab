'use client'
import { useTheme } from 'next-themes'
import { Icon } from '@ds/ui'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="p-1.5 rounded-(--radius-md) text-(--color-text-secondary) hover:bg-(--color-bg) transition-colors"
    >
      {theme === 'dark' ? <Icon name="light_mode" size={16} /> : <Icon name="dark_mode" size={16} />}
    </button>
  )
}
