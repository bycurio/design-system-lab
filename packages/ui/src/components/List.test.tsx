import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { List } from './List'

const items = [
  { id: '1', label: 'Apple', description: 'A red fruit' },
  { id: '2', label: 'Banana', description: 'A yellow fruit' },
  { id: '3', label: 'Cherry' },
]

describe('List', () => {
  it('renders all item labels', () => {
    render(<List items={items} />)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<List items={items} />)
    expect(screen.getByText('A red fruit')).toBeInTheDocument()
    expect(screen.getByText('A yellow fruit')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<List items={[{ id: '1', label: 'Cherry' }]} />)
    expect(screen.queryByText('A red fruit')).not.toBeInTheDocument()
  })

  it('calls onClick when item clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<List items={[{ id: '1', label: 'Clickable', onClick }]} />)
    await user.click(screen.getByText('Clickable'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders item as button when onClick is provided', () => {
    render(<List items={[{ id: '1', label: 'Button item', onClick: vi.fn() }]} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders item as div (not button) when no onClick', () => {
    render(<List items={[{ id: '1', label: 'Static item' }]} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
