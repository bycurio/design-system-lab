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
    expect(screen.getByRole('button').className).toContain('hover:bg-(--color-interaction-hover)')
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

  it('renders icon before label', () => {
    render(<Button icon={<span data-testid="icon" />}>Click me</Button>)
    const btn = screen.getByRole('button')
    const icon = btn.querySelector('[data-testid="icon"]')
    expect(icon).toBeInTheDocument()
    expect(btn.firstElementChild).toBe(icon)
  })

  it('hides icon and shows spinner when loading', () => {
    render(<Button icon={<span data-testid="icon" />} loading>Click me</Button>)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
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
