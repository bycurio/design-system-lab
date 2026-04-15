import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders title', () => {
    render(<Toast title="Changes saved" />)
    expect(screen.getByText('Changes saved')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Toast title="Saved" description="Your changes have been saved." />)
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<Toast title="Saved" />)
    expect(screen.queryByText(/your changes/i)).not.toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(<Toast title="Hidden" open={false} />)
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('calls onClose when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Toast title="Hi" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has role="alert"', () => {
    render(<Toast title="Alert" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
