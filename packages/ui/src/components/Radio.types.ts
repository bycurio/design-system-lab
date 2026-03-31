import type { InputHTMLAttributes } from 'react'
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  value: string
  name: string
  onChange?: (value: string) => void
}
