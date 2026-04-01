import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { IconButton } from './IconButton'

const icon = <svg data-testid="icon" />

describe('IconButton', () => {
  it('renders the icon', () => {
    render(<IconButton icon={icon} aria-label="Edit" />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('has the accessible label', () => {
    render(<IconButton icon={icon} aria-label="Delete" />)
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('applies secondary variant by default', () => {
    render(<IconButton icon={icon} aria-label="Edit" />)
    expect(screen.getByRole('button').className).toContain('border-(--color-border)')
  })

  it('applies danger variant', () => {
    render(<IconButton icon={icon} aria-label="Delete" variant="danger" />)
    expect(screen.getByRole('button').className).toContain('bg-(--color-danger)')
  })

  it('applies sm size', () => {
    render(<IconButton icon={icon} aria-label="Edit" size="sm" />)
    expect(screen.getByRole('button').className).toContain('size-7')
  })

  it('is disabled when disabled prop passed', () => {
    render(<IconButton icon={icon} aria-label="Edit" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled and aria-busy when loading', () => {
    render(<IconButton icon={icon} aria-label="Edit" loading />)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('hides icon and shows spinner when loading', () => {
    render(<IconButton icon={icon} aria-label="Edit" loading />)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })
})
