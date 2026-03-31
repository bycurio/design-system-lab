import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Changes saved" />)
    expect(screen.getByText('Changes saved')).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(<Toast message="Hidden" open={false} />)
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('calls onClose when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Toast message="Hi" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has role="alert"', () => {
    render(<Toast message="Alert" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
