import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false} onClose={vi.fn()} title="My Drawer">Drawer content</Drawer>)
    expect(screen.queryByText('My Drawer')).not.toBeInTheDocument()
    expect(screen.queryByText('Drawer content')).not.toBeInTheDocument()
  })

  it('shows title when open', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="My Drawer">Drawer content</Drawer>)
    expect(screen.getByText('My Drawer')).toBeInTheDocument()
  })

  it('shows children when open', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="Settings">Settings content</Drawer>)
    expect(screen.getByText('Settings content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Drawer open={true} onClose={onClose} title="My Drawer">Content</Drawer>)
    await user.click(screen.getByRole('button', { name: 'Close drawer' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<Drawer open={true} onClose={onClose} title="My Drawer">Content</Drawer>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on Escape when closed', () => {
    const onClose = vi.fn()
    render(<Drawer open={false} onClose={onClose} title="My Drawer">Content</Drawer>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('has role="dialog" when open', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="My Drawer">Content</Drawer>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-labelledby="drawer-title"', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="My Drawer">Content</Drawer>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'drawer-title')
  })
})
