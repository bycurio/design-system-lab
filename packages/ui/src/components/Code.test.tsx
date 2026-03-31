import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Code } from './Code'

describe('Code', () => {
  it('renders as <code> for inline variant (default)', () => {
    render(<Code>const x = 1</Code>)
    const el = screen.getByText('const x = 1')
    expect(el.tagName).toBe('CODE')
  })

  it('renders as <pre><code> for block variant', () => {
    render(<Code variant="block">const x = 1</Code>)
    const code = screen.getByText('const x = 1')
    expect(code.tagName).toBe('CODE')
    expect(code.parentElement!.tagName).toBe('PRE')
  })

  it('renders children text for inline', () => {
    render(<Code>npm install</Code>)
    expect(screen.getByText('npm install')).toBeInTheDocument()
  })

  it('renders children text for block', () => {
    render(<Code variant="block">function hello() {}</Code>)
    expect(screen.getByText(/function hello/)).toBeInTheDocument()
  })

  it('inline variant does not wrap in pre', () => {
    render(<Code>inline code</Code>)
    const el = screen.getByText('inline code')
    expect(el.parentElement!.tagName).not.toBe('PRE')
  })
})
