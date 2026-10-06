import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductTile, type Product } from './starter/ProductTile'

const base: Product = { name: 'Trail runner', price: 120, stock: 14, reviewCount: 87 }
const renderTile = (overrides: Partial<Product> = {}) => render(<ProductTile product={{ ...base, ...overrides }} />)

describe('ProductTile', () => {
  it('renders nothing for a discontinued product', () => {
    const { container } = renderTile({ discontinued: true })
    expect(container).toBeEmptyDOMElement()
  })

  it('shows "Sold out" and disables the button when stock is 0', () => {
    renderTile({ stock: 0 })
    expect(screen.getByText('Sold out')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeDisabled()
    expect(screen.queryByText(/only .* left/i)).toBeNull()
  })

  it('shows "Only N left" when stock is between 1 and 5', () => {
    renderTile({ stock: 3 })
    expect(screen.getByText('Only 3 left')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeEnabled()
  })

  it('shows no stock badge when there is plenty of stock', () => {
    renderTile({ stock: 6 })
    expect(screen.queryByText(/sold out|left/i)).toBeNull()
  })

  it('shows the discount, sale price and the original price in <del> when on sale', () => {
    renderTile({ price: 180, salePrice: 135 })
    expect(screen.getByText('Save 25%')).toBeInTheDocument()
    expect(screen.getByText('$135.00', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('$180.00').tagName).toBe('DEL')
  })

  it('shows only the normal price when not on sale', () => {
    renderTile({ price: 120 })
    expect(screen.queryByText(/save/i)).toBeNull()
    expect(screen.getByText('$120.00')).toBeInTheDocument()
  })

  it('pluralises reviews correctly', () => {
    const { unmount } = renderTile({ reviewCount: 12 })
    expect(screen.getByText('(12 reviews)')).toBeInTheDocument()
    unmount()
    renderTile({ reviewCount: 1 })
    expect(screen.getByText('(1 review)')).toBeInTheDocument()
  })

  it('renders nothing (not even "0") for zero reviews', () => {
    const { container } = renderTile({ reviewCount: 0 })
    expect(container).not.toHaveTextContent(/review/)

    // A stray `{0 && …}` shows up as a text node containing just "0".
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
    const textNodes: string[] = []
    while (walker.nextNode()) textNodes.push(walker.currentNode.textContent ?? '')
    expect(textNodes).not.toContain('0')
  })
})
