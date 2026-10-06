// Lesson 04: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import type { ReactNode } from 'react'

export type Product = {
  name: string
  price: number
  salePrice?: number
  stock: number
  reviewCount: number
  discontinued?: boolean
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export function Badge({ children, tone }: { children: ReactNode; tone: 'danger' | 'warning' | 'sale' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function ProductTile({ product }: { product: Product }) {
  const { name, price, salePrice, stock, reviewCount, discontinued } = product

  // Returning null renders nothing. Do it early, before computing anything else.
  if (discontinued) return null

  // Name the conditions. The JSX below then reads almost like the spec.
  const soldOut = stock === 0
  const lowStock = stock > 0 && stock <= 5
  const onSale = salePrice !== undefined && salePrice < price
  const savingsPercent = onSale ? Math.round((1 - salePrice / price) * 100) : 0

  return (
    <article className="tile">
      <h3>{name}</h3>

      <div className="badges">
        {soldOut && <Badge tone="danger">Sold out</Badge>}
        {lowStock && <Badge tone="warning">Only {stock} left</Badge>}
        {onSale && <Badge tone="sale">Save {savingsPercent}%</Badge>}
      </div>

      {/* A ternary picks between two alternatives; `&&` is for "this or nothing". */}
      <p className="price">
        {onSale ? (
          <>
            {formatPrice(salePrice)} <del>{formatPrice(price)}</del>
          </>
        ) : (
          formatPrice(price)
        )}
      </p>

      {/* `reviewCount > 0` is a boolean, so a count of 0 renders nothing.
          `reviewCount && …` would render the number 0. */}
      {reviewCount > 0 && (
        <span className="reviews">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}

      <button disabled={soldOut}>Add to cart</button>
    </article>
  )
}
