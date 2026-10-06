import { useState } from 'react'
import { formatCents, type Product } from './data'

export type CartLine = { productId: string; quantity: number }

export const SHIPPING_CENTS = 499
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000

export function Shop({ products }: { products: Product[] }) {
  // Minimal state: the cart lines and whether we just checked out.
  // Lines store an *id*, not a copy of the product, so if a product's name or
  // price changes, the cart can't show stale data.
  const [cart, setCart] = useState<CartLine[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  function addToCart(productId: string) {
    setOrderPlaced(false)
    // Updater form: correct even if "Add" fires several times before a re-render.
    setCart((lines) =>
      lines.some((line) => line.productId === productId)
        ? lines.map((line) => (line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line))
        : [...lines, { productId, quantity: 1 }],
    )
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((lines) =>
      lines
        .map((line) => (line.productId === productId ? { ...line, quantity: line.quantity + delta } : line))
        // Dropping to 0 removes the line: map, then filter, all immutable.
        .filter((line) => line.quantity > 0),
    )
  }

  function removeLine(productId: string) {
    setCart((lines) => lines.filter((line) => line.productId !== productId))
  }

  function checkout() {
    // Two state updates in one handler → React batches them into one render.
    setCart([])
    setOrderPlaced(true)
  }

  // ---- Derived values: computed fresh every render, never stored in state. ----
  const productsById = new Map(products.map((product) => [product.id, product]))
  const lines = cart.flatMap((line) => {
    const product = productsById.get(line.productId)
    return product ? [{ ...line, product, totalCents: product.priceCents * line.quantity }] : []
  })
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotalCents = lines.reduce((sum, line) => sum + line.totalCents, 0)
  const freeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
  const shippingCents = freeShipping ? 0 : SHIPPING_CENTS
  const totalCents = subtotalCents + shippingCents

  return (
    <div className="shop">
      <section aria-label="Products">
        <h2>Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>{formatCents(product.priceCents)}</p>
              <button aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <aside aria-label="Cart" className="cart">
        <h2>Cart ({itemCount})</h2>

        {orderPlaced && <p role="status">Thanks for your order!</p>}

        {lines.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {lines.map(({ product, quantity, totalCents }) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.name}</strong> · {formatCents(product.priceCents)}
                  </div>
                  <div className="line-controls">
                    <button
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => changeQuantity(product.id, -1)}
                    >
                      −
                    </button>
                    <output aria-label={`Quantity of ${product.name}`}>{quantity}</output>
                    <button
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      +
                    </button>
                    <span>{formatCents(totalCents)}</span>
                    <button aria-label={`Remove ${product.name}`} onClick={() => removeLine(product.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="totals">
              <dt>Subtotal</dt>
              <dd>{formatCents(subtotalCents)}</dd>
              <dt>Shipping</dt>
              <dd>{freeShipping ? 'Free' : formatCents(shippingCents)}</dd>
              <dt>Total</dt>
              <dd>{formatCents(totalCents)}</dd>
            </dl>

            <p className="free-shipping">
              {freeShipping
                ? "🎉 You've got free shipping"
                : `Add ${formatCents(FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents)} more for free shipping`}
            </p>
          </>
        )}

        <button disabled={lines.length === 0} onClick={checkout}>
          Checkout
        </button>
      </aside>
    </div>
  )
}
