import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title and message', () => {
    render(<Alert variant="info" title="Note" message="Something happened" />)
    expect(screen.getByText('Note')).toBeInTheDocument()
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('applies danger styles', () => {
    const { container } = render(<Alert variant="danger" title="Error" message="Failed" />)
    expect(container.firstChild).toHaveClass('border-(--color-danger)')
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Alert variant="info" title="Info" message="Msg" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Dismiss alert' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not render close button without onClose', () => {
    render(<Alert variant="info" title="Info" message="Msg" />)
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument()
  })
})
