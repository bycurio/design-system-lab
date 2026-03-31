import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Body } from './Body'

describe('Body', () => {
  it('renders children as a <p>', () => {
    render(<Body>Hello world</Body>)
    const el = screen.getByText('Hello world')
    expect(el.tagName).toBe('P')
  })

  it('renders children text', () => {
    render(<Body>Some body text</Body>)
    expect(screen.getByText('Some body text')).toBeInTheDocument()
  })

  it('applies text-base class by default', () => {
    render(<Body>Default size</Body>)
    expect(screen.getByText('Default size').className).toContain('text-base')
  })

  it('applies text-sm for sm size', () => {
    render(<Body size="sm">Small text</Body>)
    expect(screen.getByText('Small text').className).toContain('text-sm')
  })

  it('applies text-lg for lg size', () => {
    render(<Body size="lg">Large text</Body>)
    expect(screen.getByText('Large text').className).toContain('text-lg')
  })
})
