import type { ReactNode, LabelHTMLAttributes } from 'react'
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> { required?: boolean; children: ReactNode }
