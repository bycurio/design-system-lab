import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders with accessible label', () => {
    render(<Progress value={50} label="Loading" />)
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeInTheDocument()
  })

  it('sets aria-valuenow', () => {
    render(<Progress value={75} label="Progress" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
  })

  it('clamps value to 0-100', () => {
    render(<Progress value={150} label="Over" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
