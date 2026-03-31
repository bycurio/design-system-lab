import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Radio } from './Radio'

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label="Option A" value="a" name="group" />)
    expect(screen.getByLabelText('Option A')).toBeInTheDocument()
  })

  it('is checked when defaultChecked', () => {
    render(<Radio label="Option A" value="a" name="group" defaultChecked />)
    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('calls onChange with value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Radio label="Option A" value="a" name="group" onChange={onChange} />)
    await user.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('is disabled when disabled', () => {
    render(<Radio label="Option A" value="a" name="group" disabled />)
    expect(screen.getByRole('radio')).toBeDisabled()
  })
})
