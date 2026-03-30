import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FAB } from './FAB'

const icon = <svg data-testid="fab-icon" />

describe('FAB', () => {
  it('renders the icon', () => {
    render(<FAB icon={icon} aria-label="Create" />)
    expect(screen.getByTestId('fab-icon')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<FAB icon={icon} aria-label="Create" label="New item" />)
    expect(screen.getByText('New item')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<FAB icon={icon} aria-label="Create" />)
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop passed', () => {
    render(<FAB icon={icon} aria-label="Create" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
