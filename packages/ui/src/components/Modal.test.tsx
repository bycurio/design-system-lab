import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={vi.fn()} title="My Modal">Modal content</Modal>)
    expect(screen.queryByText('My Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('shows title when open', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Modal content</Modal>)
    expect(screen.getByText('My Modal')).toBeInTheDocument()
  })

  it('shows children when open', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Modal body text</Modal>)
    expect(screen.getByText('Modal body text')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title="My Modal">Content</Modal>)
    await user.click(screen.getByRole('button', { name: 'Close modal' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title="My Modal">Content</Modal>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose on Escape when closed', () => {
    const onClose = vi.fn()
    render(<Modal open={false} onClose={onClose} title="My Modal">Content</Modal>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="My Modal" footer={<button>Confirm</button>}>
        Content
      </Modal>
    )
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })

  it('does not render footer area when footer not provided', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Content</Modal>)
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('has role="dialog" when open', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Content</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-labelledby="modal-title"', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal">Content</Modal>)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title')
  })
})
