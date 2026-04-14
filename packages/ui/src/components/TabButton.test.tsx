import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TabButton } from './TabButton'

describe('TabButton', () => {
  it('renders label', () => {
    render(<TabButton label="Overview" />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
  })

  it('has role="tab"', () => {
    render(<TabButton label="Overview" />)
    expect(screen.getByRole('tab')).toBeInTheDocument()
  })

  it('sets aria-selected when active', () => {
    render(<TabButton label="Overview" active />)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
  })

  it('is disabled when disabled prop is set', () => {
    render(<TabButton label="Overview" disabled />)
    expect(screen.getByRole('tab')).toBeDisabled()
  })
})
