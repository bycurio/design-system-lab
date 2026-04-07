import type { SelectHTMLAttributes } from 'react'

export interface SelectOption { value: string; label: string }

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  onValueChange?: (value: string) => void
}
