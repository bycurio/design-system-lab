import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NavBar } from './NavBar'

const links = [
  { label: 'Home', href: '/', active: true },
  { label: 'Docs', href: '/docs' },
]

describe('NavBar', () => {
  it('renders logo', () => {
    render(<NavBar logo={<span>Acme</span>} links={links} />)
    expect(screen.getByText('Acme')).toBeInTheDocument()
  })

  it('renders links', () => {
    render(<NavBar logo={<span>Logo</span>} links={links} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Docs')).toBeInTheDocument()
  })

  it('marks active link with aria-current', () => {
    render(<NavBar logo={<span>Logo</span>} links={links} />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('aria-current', 'page')
  })

  it('renders actions slot', () => {
    render(<NavBar logo={<span>Logo</span>} links={links} actions={<button>Sign in</button>} />)
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })
})
