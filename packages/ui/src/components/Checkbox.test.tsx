import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('is checked when defaultChecked', () => {
    render(<Checkbox label="Check me" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange with boolean', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Check me" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled', () => {
    render(<Checkbox label="Check me" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})
