import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Table } from './Table'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
]

const rows = [
  { id: '1', name: 'Alice', role: 'Admin' },
  { id: '2', name: 'Bob', role: 'User' },
]

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
  })

  it('calls onRowClick when a row is clicked', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(<Table columns={columns} rows={rows} onRowClick={onRowClick} />)
    await user.click(screen.getByText('Alice'))
    expect(onRowClick).toHaveBeenCalledTimes(1)
    expect(onRowClick).toHaveBeenCalledWith(rows[0])
  })

  it('shows default empty state message when rows is empty', () => {
    render(<Table columns={columns} rows={[]} />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('shows custom emptyState when rows is empty and emptyState provided', () => {
    render(<Table columns={columns} rows={[]} emptyState="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('shows loading skeletons when loading=true', () => {
    const { container } = render(<Table columns={columns} rows={rows} loading={true} />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('does not show row data when loading=true', () => {
    render(<Table columns={columns} rows={rows} loading={true} />)
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('renders with custom render function for column', () => {
    const customColumns = [
      { key: 'name', label: 'Name', render: (row: { id: string; name: string; role: string }) => <strong>{row.name}</strong> },
      { key: 'role', label: 'Role' },
    ]
    render(<Table columns={customColumns} rows={rows} />)
    expect(screen.getByText('Alice').tagName).toBe('STRONG')
  })
})
