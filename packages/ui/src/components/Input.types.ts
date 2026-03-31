import type { InputHTMLAttributes } from 'react'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  errorMessage?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}
