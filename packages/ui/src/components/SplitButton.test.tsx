import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SplitButton } from './SplitButton'

const actions = [
  { label: 'Save as draft', onClick: vi.fn() },
  { label: 'Save and close', onClick: vi.fn() },
]

describe('SplitButton', () => {
  it('renders the primary label', () => {
    render(<SplitButton label="Save" onClick={() => {}} actions={actions} />)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onClick when primary button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SplitButton label="Save" onClick={onClick} actions={actions} />)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('opens dropdown when chevron button clicked', async () => {
    const user = userEvent.setup()
    render(<SplitButton label="Save" onClick={() => {}} actions={actions} />)
    await user.click(screen.getByRole('button', { name: 'More options' }))
    expect(screen.getByText('Save as draft')).toBeInTheDocument()
  })

  it('calls action onClick and closes dropdown', async () => {
    const user = userEvent.setup()
    const actionFn = vi.fn()
    const localActions = [{ label: 'Draft', onClick: actionFn }]
    render(<SplitButton label="Save" onClick={() => {}} actions={localActions} />)
    await user.click(screen.getByRole('button', { name: 'More options' }))
    await user.click(screen.getByText('Draft'))
    expect(actionFn).toHaveBeenCalledOnce()
    expect(screen.queryByText('Draft')).not.toBeInTheDocument()
  })

  it('disables both buttons when disabled', () => {
    render(<SplitButton label="Save" onClick={() => {}} actions={actions} disabled />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => expect(btn).toBeDisabled())
  })
})
