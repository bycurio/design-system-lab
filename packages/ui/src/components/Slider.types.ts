import type { InputHTMLAttributes } from 'react'
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}
