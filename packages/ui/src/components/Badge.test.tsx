import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success').className).toContain('text-(--color-success)')
  })

  it('applies danger variant', () => {
    render(<Badge variant="danger">Error</Badge>)
    expect(screen.getByText('Error').className).toContain('text-(--color-danger)')
  })

  it('applies pill radius class', () => {
    render(<Badge>Pill</Badge>)
    expect(screen.getByText('Pill').className).toContain('rounded-(--badge-radius)')
  })
})
