import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders with label', () => {
    render(<Slider label="Volume" />)
    expect(screen.getByLabelText('Volume')).toBeInTheDocument()
  })

  it('applies min and max', () => {
    render(<Slider label="Volume" min={10} max={50} />)
    const slider = screen.getByLabelText('Volume')
    expect(slider).toHaveAttribute('min', '10')
    expect(slider).toHaveAttribute('max', '50')
  })

  it('is disabled when disabled', () => {
    render(<Slider label="Volume" disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })
})
