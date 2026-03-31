import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Sidebar } from './Sidebar'

const groups = [
  { title: 'Main', items: [{ label: 'Dashboard', href: '/', active: true }, { label: 'Settings', href: '/settings' }] },
]

describe('Sidebar', () => {
  it('renders group title', () => {
    render(<Sidebar groups={groups} />)
    expect(screen.getByText('Main')).toBeInTheDocument()
  })

  it('renders nav items', () => {
    render(<Sidebar groups={groups} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('marks active item with aria-current', () => {
    render(<Sidebar groups={groups} />)
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('aria-current', 'page')
  })

  it('renders header slot', () => {
    render(<Sidebar groups={groups} header={<span>Logo</span>} />)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('renders footer slot', () => {
    render(<Sidebar groups={groups} footer={<span>User</span>} />)
    expect(screen.getByText('User')).toBeInTheDocument()
  })
})
