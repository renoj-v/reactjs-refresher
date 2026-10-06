import { formatCents, type Product } from './data'

export type CartLine = { productId: string; quantity: number }

export const SHIPPING_CENTS = 499
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000

export function Shop({ products }: { products: Product[] }) {
  // TODO: cart state (an array of CartLine). Anything else you need?

  // TODO: handlers: add, increase, decrease, remove, checkout

  // TODO: derived values: item count, subtotal, shipping, total

  return (
    <div className="shop">
      <section aria-label="Products">
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>{formatCents(product.priceCents)}</p>
              {/* TODO: make this work, and give it an accessible name */}
              <button>Add to cart</button>
            </article>
          ))}
        </div>
      </section>

      <aside aria-label="Cart" className="cart">
        <h2>Cart</h2>
        {/* TODO: implement the cart (see ../README.md) */}
        <p>Your cart is empty.</p>
      </aside>
    </div>
  )
}
