import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders with label', () => {
    render(<DatePicker label="Start date" />)
    expect(screen.getByLabelText('Start date')).toBeInTheDocument()
  })

  it('applies error styles when error', () => {
    render(<DatePicker label="Start date" error />)
    expect(screen.getByLabelText('Start date').className).toContain('border-(--color-danger)')
  })

  it('shows error message', () => {
    render(<DatePicker label="Start date" error errorMessage="Date required" />)
    expect(screen.getByText('Date required')).toBeInTheDocument()
  })

  it('is disabled when disabled', () => {
    render(<DatePicker label="Start date" disabled />)
    expect(screen.getByLabelText('Start date')).toBeDisabled()
  })
})
