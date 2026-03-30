import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button').className).toContain('bg-(--color-brand)')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Click me</Button>)
    expect(screen.getByRole('button').className).toContain('border-(--color-border)')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Click me</Button>)
    expect(screen.getByRole('button').className).toContain('bg-transparent')
  })

  it('applies danger variant classes', () => {
    render(<Button variant="danger">Click me</Button>)
    expect(screen.getByRole('button').className).toContain('bg-(--color-danger)')
  })

  it('applies sm size', () => {
    render(<Button size="sm">Click me</Button>)
    expect(screen.getByRole('button').className).toContain('h-7')
  })

  it('applies lg size', () => {
    render(<Button size="lg">Click me</Button>)
    expect(screen.getByRole('button').className).toContain('h-11')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled and aria-busy when loading', () => {
    render(<Button loading>Click me</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
