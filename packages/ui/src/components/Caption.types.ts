import type { ReactNode } from 'react'
export type CaptionVariant = 'default' | 'error' | 'success'
export interface CaptionProps { variant?: CaptionVariant; children: ReactNode; className?: string }
