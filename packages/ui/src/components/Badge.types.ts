import type { ReactNode } from 'react'
export type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
export interface BadgeProps { variant?: BadgeVariant; children: ReactNode; className?: string }
