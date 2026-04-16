export type ProgressVariant = 'default' | 'success' | 'error'
export interface ProgressProps { value: number; label: string; variant?: ProgressVariant; showLabel?: boolean; className?: string }
