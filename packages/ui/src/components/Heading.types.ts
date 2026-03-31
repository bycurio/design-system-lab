import type { ReactNode } from 'react'
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'display'
export interface HeadingProps { as?: HeadingLevel; children: ReactNode; className?: string }
