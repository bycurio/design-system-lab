import type { InputHTMLAttributes } from 'react'
export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  onChange?: (checked: boolean) => void
}
