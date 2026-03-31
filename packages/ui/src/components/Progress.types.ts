export type ProgressVariant = 'default' | 'success'
export interface ProgressProps { value: number; label: string; variant?: ProgressVariant; showLabel?: boolean; className?: string }
