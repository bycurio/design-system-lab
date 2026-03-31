import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea placeholder="Write here" />)
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument()
  })

  it('applies error border when error', () => {
    render(<Textarea error />)
    expect(screen.getByRole('textbox').className).toContain('border-(--color-danger)')
  })

  it('shows error message', () => {
    render(<Textarea error errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('is disabled when disabled prop passed', () => {
    render(<Textarea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
