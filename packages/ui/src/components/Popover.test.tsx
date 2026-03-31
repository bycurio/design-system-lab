import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Popover } from './Popover'

describe('Popover', () => {
  it('renders trigger', () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover content</div>} />)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('hides content by default (uncontrolled)', () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover content</div>} />)
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('shows content when open=true (controlled)', () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover content</div>} open={true} />)
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('hides content when open=false (controlled)', () => {
    render(<Popover trigger={<button>Open</button>} content={<div>Popover content</div>} open={false} />)
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('toggles content visible on trigger click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Popover trigger={<button>Toggle</button>} content={<div>Pop content</div>} />)
    expect(screen.queryByText('Pop content')).not.toBeInTheDocument()
    await user.click(screen.getByText('Toggle'))
    expect(screen.getByText('Pop content')).toBeInTheDocument()
  })

  it('calls onOpenChange when trigger is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover
        trigger={<button>Toggle</button>}
        content={<div>Content</div>}
        onOpenChange={onOpenChange}
      />
    )
    await user.click(screen.getByText('Toggle'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })
})
