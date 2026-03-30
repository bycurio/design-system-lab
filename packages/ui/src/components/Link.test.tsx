import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Link } from './Link'

describe('Link', () => {
  it('renders link text', () => {
    render(<Link href="/docs">Read docs</Link>)
    expect(screen.getByRole('link', { name: /read docs/i })).toBeInTheDocument()
  })

  it('sets href', () => {
    render(<Link href="/docs">Read docs</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/docs')
  })

  it('opens in new tab when external', () => {
    render(<Link href="https://example.com" external>External</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not set target when not external', () => {
    render(<Link href="/docs">Docs</Link>)
    expect(screen.getByRole('link')).not.toHaveAttribute('target')
  })
})
