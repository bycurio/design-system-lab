import type { ReactNode } from 'react'
export type BodySize = 'sm' | 'base' | 'lg'
export interface BodyProps { size?: BodySize; children: ReactNode; className?: string }
