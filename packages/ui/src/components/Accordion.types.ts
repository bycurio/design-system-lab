import type { ReactNode } from 'react'
export interface AccordionItem { title: string; content: ReactNode }
export interface AccordionProps { items: AccordionItem[]; allowMultiple?: boolean; defaultOpen?: number[]; className?: string }
