import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Chip } from './Chip'

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>React</Chip>)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('does not render remove button when onRemove is not provided', () => {
    render(<Chip>TypeScript</Chip>)
    expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument()
  })

  it('renders remove button when onRemove is provided', () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove}>Vue</Chip>)
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove}>Angular</Chip>)
    await user.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('does not call onRemove when disabled', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove} disabled>Svelte</Chip>)
    await user.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onRemove).not.toHaveBeenCalled()
  })

  it('remove button is disabled when disabled prop is true', () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove} disabled>Disabled</Chip>)
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled()
  })
})
