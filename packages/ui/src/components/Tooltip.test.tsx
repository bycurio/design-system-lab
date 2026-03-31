import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders trigger children', () => {
    render(<Tooltip content="Hint"><button>Hover me</button></Tooltip>)
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })

  it('shows tooltip on hover after delay', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Tooltip content="Tooltip text" delayMs={0}><button>Trigger</button></Tooltip>)
    await user.hover(screen.getByRole('button'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text')
  })

  it('hides tooltip on unhover', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Tooltip content="Tooltip text" delayMs={0}><button>Trigger</button></Tooltip>)
    await user.hover(screen.getByRole('button'))
    await user.unhover(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
