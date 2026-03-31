import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './Select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]

describe('Select', () => {
  it('renders options', () => {
    render(<Select options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Select options={options} placeholder="Choose" />)
    expect(screen.getByText('Choose')).toBeInTheDocument()
  })

  it('applies error styles when error', () => {
    render(<Select options={options} error />)
    expect(screen.getByRole('combobox').className).toContain('border-(--color-danger)')
  })

  it('shows error message', () => {
    render(<Select options={options} error errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('is disabled when disabled', () => {
    render(<Select options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('calls onValueChange with selected value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Select options={options} onValueChange={onValueChange} />)
    await user.selectOptions(screen.getByRole('combobox'), 'react')
    expect(onValueChange).toHaveBeenCalledWith('react')
  })
})
