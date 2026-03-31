import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Caption } from './Caption'

describe('Caption', () => {
  it('renders children', () => {
    render(<Caption>Caption text</Caption>)
    expect(screen.getByText('Caption text')).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    render(<Caption>Default</Caption>)
    expect(screen.getByText('Default').className).toContain('text-(--color-text-secondary)')
  })

  it('applies text-(--color-danger) class for error variant', () => {
    render(<Caption variant="error">Error message</Caption>)
    expect(screen.getByText('Error message').className).toContain('text-(--color-danger)')
  })

  it('applies text-(--color-success) class for success variant', () => {
    render(<Caption variant="success">Success message</Caption>)
    expect(screen.getByText('Success message').className).toContain('text-(--color-success)')
  })
})
