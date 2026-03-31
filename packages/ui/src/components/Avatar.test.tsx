import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('shows fallback text (first 2 chars uppercased) when no src', () => {
    render(<Avatar alt="John Doe" fallback="john" />)
    expect(screen.getByText('JO')).toBeInTheDocument()
  })

  it('uppercases fallback text', () => {
    render(<Avatar alt="Alice" fallback="alice" />)
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('renders img when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Profile" fallback="PR" />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
    expect(img).toHaveAttribute('alt', 'Profile')
  })

  it('shows fallback when img errors', () => {
    render(<Avatar src="https://example.com/broken.jpg" alt="Broken" fallback="broken" />)
    const img = screen.getByRole('img')
    fireEvent.error(img)
    expect(screen.getByText('BR')).toBeInTheDocument()
  })

  it('applies size-10 class for md (default) size', () => {
    render(<Avatar alt="User" fallback="user" />)
    const container = screen.getByText('US').closest('div')!
    expect(container.className).toContain('size-10')
  })

  it('applies size-6 class for xs size', () => {
    render(<Avatar alt="User" fallback="user" size="xs" />)
    const container = screen.getByText('US').closest('div')!
    expect(container.className).toContain('size-6')
  })
})
