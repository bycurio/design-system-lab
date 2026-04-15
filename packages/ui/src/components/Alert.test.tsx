import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title', () => {
    render(<Alert variant="info" title="Note" />)
    expect(screen.getByText('Note')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Alert variant="info" title="Note" description="Something happened" />)
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<Alert variant="info" title="Note" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    render(<Alert variant="info" title="Note" action={{ label: 'Retry', onClick: vi.fn() }} />)
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  it('calls action onClick when action button clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Alert variant="info" title="Note" action={{ label: 'Retry', onClick }} />)
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders dismiss button when onDismiss provided', () => {
    render(<Alert variant="info" title="Note" onDismiss={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Alert variant="info" title="Note" onDismiss={onDismiss} />)
    await user.click(screen.getByRole('button', { name: 'Dismiss alert' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('does not render dismiss button without onDismiss', () => {
    render(<Alert variant="info" title="Note" />)
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument()
  })

  it('has role="alert"', () => {
    render(<Alert variant="info" title="Note" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
