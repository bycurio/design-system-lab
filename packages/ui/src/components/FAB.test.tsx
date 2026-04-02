import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FAB } from './FAB'

describe('FAB', () => {
  it('renders an icon button', () => {
    render(<FAB iconName="add" aria-label="Create" />)
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<FAB iconName="add" aria-label="Create" label="New item" />)
    expect(screen.getByText('New item')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<FAB iconName="add" aria-label="Create" />)
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })

  it('is disabled and aria-busy when loading', () => {
    render(<FAB iconName="add" aria-label="Create" loading />)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })
})
