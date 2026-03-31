import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('is checked when defaultChecked', () => {
    render(<Toggle label="Dark mode" defaultChecked />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('calls onChange with boolean', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Toggle label="Dark mode" onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled', () => {
    render(<Toggle label="Dark mode" disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
