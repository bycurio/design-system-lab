import type { ReactNode } from 'react'
export interface ListItem { id: string; label: string; description?: string; icon?: ReactNode; trailing?: ReactNode; onClick?: () => void }
export interface ListProps { items: ListItem[]; className?: string }
