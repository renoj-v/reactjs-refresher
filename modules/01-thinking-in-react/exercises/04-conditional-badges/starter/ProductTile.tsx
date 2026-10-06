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
  // TODO: discontinued products render nothing.

  return (
    <article className="tile">
      <h3>{product.name}</h3>

      <div className="badges">
        {/* TODO: "Sold out" (stock 0) or "Only N left" (stock 1–5) */}
        {/* TODO: "Save N%" when on sale */}
      </div>

      <p className="price">
        {/* TODO: on sale → sale price + original price in <del>. Otherwise the normal price. */}
        {formatPrice(product.price)}
      </p>

      {/* TODO: this has a bug when there are no reviews. Also handle "1 review". */}
      {product.reviewCount && <span className="reviews">({product.reviewCount} reviews)</span>}

      {/* TODO: disable when sold out */}
      <button>Add to cart</button>
    </article>
  )
}
