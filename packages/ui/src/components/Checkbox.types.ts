import type { InputHTMLAttributes } from 'react'
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
}
