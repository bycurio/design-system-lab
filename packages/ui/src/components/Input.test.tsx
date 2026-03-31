import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('applies error border when error is true', () => {
    render(<Input error />)
    expect(screen.getByRole('textbox').className).toContain('border-(--color-danger)')
  })

  it('shows error message when error and errorMessage provided', () => {
    render(<Input error errorMessage="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('does not show error message when error is false', () => {
    render(<Input errorMessage="Required field" />)
    expect(screen.queryByText('Required field')).not.toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(<Input error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop passed', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })
})
