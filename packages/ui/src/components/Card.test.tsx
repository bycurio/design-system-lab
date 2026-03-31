import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('Card.Header renders children', () => {
    render(<Card><Card.Header>Header text</Card.Header></Card>)
    expect(screen.getByText('Header text')).toBeInTheDocument()
  })

  it('Card.Header renders with border-b class', () => {
    render(<Card><Card.Header>Header</Card.Header></Card>)
    const header = screen.getByText('Header').closest('div')!
    expect(header.className).toContain('border-b')
  })

  it('Card.Body renders children', () => {
    render(<Card><Card.Body>Body text</Card.Body></Card>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('Card.Footer renders children', () => {
    render(<Card><Card.Footer>Footer text</Card.Footer></Card>)
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('Card.Footer renders with border-t class', () => {
    render(<Card><Card.Footer>Footer</Card.Footer></Card>)
    const footer = screen.getByText('Footer').closest('div')!
    expect(footer.className).toContain('border-t')
  })

  it('composes header, body, and footer together', () => {
    render(
      <Card>
        <Card.Header>My Title</Card.Header>
        <Card.Body>My Body</Card.Body>
        <Card.Footer>My Footer</Card.Footer>
      </Card>
    )
    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('My Body')).toBeInTheDocument()
    expect(screen.getByText('My Footer')).toBeInTheDocument()
  })
})
