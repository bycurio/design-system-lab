import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders a horizontal divider by default', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders with role="separator" when label is provided', () => {
    render(<Divider label="OR" />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders label text when provided', () => {
    render(<Divider label="OR" />)
    expect(screen.getByText('OR')).toBeInTheDocument()
  })

  it('renders vertical divider with aria-hidden when orientation is vertical', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('horizontal divider with label has role separator', () => {
    render(<Divider orientation="horizontal" label="Section" />)
    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
    expect(screen.getByText('Section')).toBeInTheDocument()
  })
})
