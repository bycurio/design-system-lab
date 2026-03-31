import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion } from './Accordion'

const items = [
  { title: 'First Item', content: 'First content' },
  { title: 'Second Item', content: 'Second content' },
  { title: 'Third Item', content: 'Third content' },
]

describe('Accordion', () => {
  it('renders item titles', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('First Item')).toBeInTheDocument()
    expect(screen.getByText('Second Item')).toBeInTheDocument()
    expect(screen.getByText('Third Item')).toBeInTheDocument()
  })

  it('content is hidden initially', () => {
    render(<Accordion items={items} />)
    expect(screen.queryByText('First content')).not.toBeInTheDocument()
  })

  it('toggles open on click', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    await user.click(screen.getByText('First Item'))
    expect(screen.getByText('First content')).toBeInTheDocument()
  })

  it('toggles closed on second click', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    await user.click(screen.getByText('First Item'))
    await user.click(screen.getByText('First Item'))
    expect(screen.queryByText('First content')).not.toBeInTheDocument()
  })

  it('sets aria-expanded to true when open', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    const button = screen.getByText('First Item').closest('button')!
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes previous item when allowMultiple is false', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    await user.click(screen.getByText('First Item'))
    expect(screen.getByText('First content')).toBeInTheDocument()
    await user.click(screen.getByText('Second Item'))
    expect(screen.queryByText('First content')).not.toBeInTheDocument()
    expect(screen.getByText('Second content')).toBeInTheDocument()
  })

  it('allowMultiple allows multiple items open simultaneously', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} allowMultiple />)
    await user.click(screen.getByText('First Item'))
    await user.click(screen.getByText('Second Item'))
    expect(screen.getByText('First content')).toBeInTheDocument()
    expect(screen.getByText('Second content')).toBeInTheDocument()
  })

  it('respects defaultOpen', () => {
    render(<Accordion items={items} defaultOpen={[0]} />)
    expect(screen.getByText('First content')).toBeInTheDocument()
    expect(screen.queryByText('Second content')).not.toBeInTheDocument()
  })
})
