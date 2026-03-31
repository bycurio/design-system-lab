import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading>Page Title</Heading>)
    expect(screen.getByText('Page Title')).toBeInTheDocument()
  })

  it('renders as h2 by default', () => {
    render(<Heading>Default Heading</Heading>)
    const el = screen.getByText('Default Heading')
    expect(el.tagName).toBe('H2')
  })

  it('renders as h1 when as="h1"', () => {
    render(<Heading as="h1">Main Title</Heading>)
    const el = screen.getByText('Main Title')
    expect(el.tagName).toBe('H1')
  })

  it('renders as h3 when as="h3"', () => {
    render(<Heading as="h3">Section Title</Heading>)
    expect(screen.getByText('Section Title').tagName).toBe('H3')
  })

  it('renders as h4 when as="h4"', () => {
    render(<Heading as="h4">Sub Section</Heading>)
    expect(screen.getByText('Sub Section').tagName).toBe('H4')
  })

  it('renders as h1 when as="display"', () => {
    render(<Heading as="display">Display Heading</Heading>)
    expect(screen.getByText('Display Heading').tagName).toBe('H1')
  })

  it('applies display style class for display variant', () => {
    render(<Heading as="display">Big Display</Heading>)
    expect(screen.getByText('Big Display').className).toContain('text-4xl')
  })
})
