import type { ReactNode } from 'react'

export type PropDef = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export type TokenDef = {
  name: string
  value: string
  description: string
}

export type VariantDef = {
  label: string
  preview: () => ReactNode
}

export type ComponentDoc = {
  title: string
  slug: string
  description: string
  whenToUse: string[]
  whenNotToUse: string[]
  preview: () => ReactNode
  variants: VariantDef[]
  usage: string
  props: PropDef[]
  tokens: TokenDef[]
}
