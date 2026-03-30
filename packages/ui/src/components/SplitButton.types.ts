import type { ReactNode } from 'react'
export type SplitButtonVariant = 'primary' | 'secondary' | 'danger'
export type SplitButtonSize = 'sm' | 'md' | 'lg'
export interface SplitButtonAction {
  label: string
  onClick: () => void
}
export interface SplitButtonProps {
  label: string
  onClick: () => void
  actions: SplitButtonAction[]
  variant?: SplitButtonVariant
  size?: SplitButtonSize
  disabled?: boolean
  className?: string
}
