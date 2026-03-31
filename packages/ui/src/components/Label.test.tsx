import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders as <label>', () => {
    render(<Label>Email address</Label>)
    const el = screen.getByText('Email address')
    expect(el.tagName).toBe('LABEL')
  })

  it('renders children', () => {
    render(<Label>Username</Label>)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('shows required indicator (*) when required=true', () => {
    render(<Label required>Password</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not show required indicator when required is not set', () => {
    render(<Label>Optional field</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('does not show required indicator when required=false', () => {
    render(<Label required={false}>Optional</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('forwards htmlFor attribute', () => {
    render(<Label htmlFor="my-input">My Input</Label>)
    const label = screen.getByText('My Input').closest('label')!
    expect(label).toHaveAttribute('for', 'my-input')
  })
})
