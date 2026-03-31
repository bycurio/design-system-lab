import type { InputHTMLAttributes } from 'react'
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  placeholder?: string
  error?: boolean
  errorMessage?: string
  onChange?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}
