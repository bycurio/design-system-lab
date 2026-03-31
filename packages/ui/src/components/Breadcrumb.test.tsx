import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from './Breadcrumb'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Button' },
]

describe('Breadcrumb', () => {
  it('renders all labels', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Components')).toBeInTheDocument()
    expect(screen.getByText('Button')).toBeInTheDocument()
  })

  it('renders nav with accessible label', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('marks last item with aria-current="page"', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Button')).toHaveAttribute('aria-current', 'page')
  })

  it('renders links for non-last items with href', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
  })
})
