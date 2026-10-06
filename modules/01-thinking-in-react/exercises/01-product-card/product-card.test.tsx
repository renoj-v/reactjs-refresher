import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductCard } from './starter/ProductCard'

const product = {
  name: 'Ceramic pour-over',
  price: 12.5,
  imageUrl: 'https://example.com/pourover.jpg',
}

describe('ProductCard', () => {
  it('is an article with the product name as a level-2 heading', () => {
    render(<ProductCard {...product} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Ceramic pour-over' })).toBeInTheDocument()
  })

  it('shows the image with the product name as alt text', () => {
    render(<ProductCard {...product} />)
    expect(screen.getByRole('img', { name: 'Ceramic pour-over' })).toHaveAttribute('src', product.imageUrl)
  })

  it('formats the price in USD by default', () => {
    render(<ProductCard {...product} />)
    expect(screen.getByText('$12.50')).toBeInTheDocument()
  })

  it('formats the price in another currency when given one', () => {
    render(<ProductCard {...product} price={8} currency="EUR" />)
    expect(screen.getByText('€8.00')).toBeInTheDocument()
  })

  it('shows the description when one is passed', () => {
    render(<ProductCard {...product} description="Hand-glazed dripper." />)
    expect(screen.getByText('Hand-glazed dripper.')).toBeInTheDocument()
  })
})
