import type { ReactNode } from 'react'
export type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
export type BadgeStrength = 'subtle' | 'strong'
export interface BadgeProps { variant?: BadgeVariant; strength?: BadgeStrength; children: ReactNode; className?: string }
