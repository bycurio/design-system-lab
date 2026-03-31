export type CodeVariant = 'inline' | 'block'
export interface CodeProps { variant?: CodeVariant; children: string; className?: string }
