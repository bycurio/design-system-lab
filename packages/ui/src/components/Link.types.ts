import type { AnchorHTMLAttributes, ReactNode } from 'react'
export type LinkVariant = 'internal' | 'external'
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: LinkVariant
  children: ReactNode
}
