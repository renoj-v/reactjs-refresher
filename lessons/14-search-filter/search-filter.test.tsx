import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProductSearch, type Product } from './starter/ProductSearch'

const products: Product[] = [
  { id: 'p1', name: 'Pour-over dripper', stock: 12 },
  { id: 'p2', name: 'Burr grinder', stock: 0 },
  { id: 'p3', name: 'Paper filters', stock: 140 },
  { id: 'p4', name: 'Gooseneck kettle', stock: 3 },
  { id: 'p5', name: 'Glass carafe', stock: 0 },
]

const names = () => screen.queryAllByRole('listitem').map((li) => li.firstChild?.textContent?.trim())

describe('ProductSearch', () => {
  it('shows everything and a count to begin with', () => {
    render(<ProductSearch products={products} />)
    expect(names()).toHaveLength(5)
    expect(screen.getByText('Showing 5 of 5 products')).toBeInTheDocument()
  })

  it('filters by name, case-insensitively', async () => {
    const user = userEvent.setup()
    render(<ProductSearch products={products} />)
    await user.type(screen.getByLabelText('Search products'), 'GR')
    expect(names()).toEqual(['Burr grinder'])
    expect(screen.getByText('Showing 1 of 5 products')).toBeInTheDocument()
  })

  it('hides out-of-stock products, combined with the search', async () => {
    const user = userEvent.setup()
    render(<ProductSearch products={products} />)
    await user.click(screen.getByLabelText('In stock only'))
    expect(names()).toEqual(['Pour-over dripper', 'Paper filters', 'Gooseneck kettle'])

    await user.type(screen.getByLabelText('Search products'), 'er')
    expect(names()).toEqual(['Pour-over dripper', 'Paper filters'])
    expect(screen.getByText('Showing 2 of 5 products')).toBeInTheDocument()
  })

  it('shows an empty state', async () => {
    const user = userEvent.setup()
    render(<ProductSearch products={products} />)
    await user.type(screen.getByLabelText('Search products'), 'espresso')
    expect(screen.getByText('No products match “espresso”.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('reflects new products from the parent immediately', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<ProductSearch products={products} />)
    await user.click(screen.getByLabelText('In stock only'))
    expect(names()).toHaveLength(3)

    const restocked = products.map((p) => ({ ...p, stock: p.stock + 10 }))
    rerender(<ProductSearch products={restocked} />)

    expect(names()).toHaveLength(5)
    expect(screen.getByText('Showing 5 of 5 products')).toBeInTheDocument()
  })
})
