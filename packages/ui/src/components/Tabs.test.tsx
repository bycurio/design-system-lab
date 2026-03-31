import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tabs } from './Tabs'

const tabs = [
  { label: 'Overview', value: 'overview', content: <p>Overview content</p> },
  { label: 'Code', value: 'code', content: <p>Code content</p> },
]

describe('Tabs', () => {
  it('renders tab labels', () => {
    render(<Tabs tabs={tabs} />)
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Code' })).toBeInTheDocument()
  })

  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />)
    expect(screen.getByText('Overview content')).toBeInTheDocument()
  })

  it('shows defaultValue tab content', () => {
    render(<Tabs tabs={tabs} defaultValue="code" />)
    expect(screen.getByText('Code content')).toBeInTheDocument()
  })

  it('switches content on tab click', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={tabs} />)
    await user.click(screen.getByRole('tab', { name: 'Code' }))
    expect(screen.getByText('Code content')).toBeInTheDocument()
  })

  it('calls onChange when tab clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tabs tabs={tabs} onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Code' }))
    expect(onChange).toHaveBeenCalledWith('code')
  })

  it('marks active tab with aria-selected', () => {
    render(<Tabs tabs={tabs} defaultValue="overview" />)
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute('aria-selected', 'false')
  })
})
