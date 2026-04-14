import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NavButton } from './NavButton'

describe('NavButton', () => {
  it('renders label', () => {
    render(<NavButton label="Home" href="/" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders as anchor with correct href', () => {
    render(<NavButton label="Home" href="/home" />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home')
  })

  it('marks active with aria-current', () => {
    render(<NavButton label="Home" href="/" active />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('aria-current', 'page')
  })

  it('omits href when disabled', () => {
    render(<NavButton label="Home" href="/" disabled />)
    expect(screen.getByText('Home').closest('a')).not.toHaveAttribute('href')
  })

  it('marks disabled with aria-disabled', () => {
    render(<NavButton label="Home" href="/" disabled />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('aria-disabled', 'true')
  })
})
