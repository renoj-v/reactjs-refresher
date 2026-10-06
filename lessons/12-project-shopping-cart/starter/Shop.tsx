/*
 * LESSON 12 · PROJECT: Shopping cart
 * Topic 2 · State & events (6 of 6, topic project)
 * ──────────────────────────────────────────────────────────────────
 * A small coffee-gear shop with a working cart.
 * Combines: useState, event handlers, updater functions, immutable object
 * and array updates, and derived values.
 *
 *   ┌──────────────────────────────────┬──────────────────────────────┐
 *   │ Products                         │ Cart (3)                     │
 *   │ ┌──────────┐ ┌──────────┐        │ Pour-over  $34.00            │
 *   │ │ Pour-over│ │ Grinder  │ …      │   [−] 2 [+]  $68.00 [Remove] │
 *   │ │ $34.00   │ │ $129.00  │        │ Filters    $6.50             │
 *   │ │[Add …]   │ │[Add …]   │        │   [−] 1 [+]   $6.50 [Remove] │
 *   │ └──────────┘ └──────────┘        │ Subtotal          $74.50     │
 *   │                                  │ Shipping            Free     │
 *   │                                  │ 🎉 You've got free shipping   │
 *   │                                  │ Total             $74.50     │
 *   │                                  │ [Checkout]                   │
 *   └──────────────────────────────────┴──────────────────────────────┘
 *
 * Prices are in CENTS (integers), so totals never hit floating-point errors
 * like 0.1 + 0.2. Format them only for display (formatCents in ./data.ts).
 *
 * ── Spec ──────────────────────────────────────────────────────────
 *   1. Product list: each card has an "Add <name> to cart" button (aria-label;
 *      the visible text can just say "Add to cart").
 *   2. Adding: adds a line with quantity 1, or increases the quantity if the
 *      product is already in the cart.
 *   3. Cart, <aside aria-label="Cart">:
 *        • Heading "Cart (N)", where N is the sum of quantities
 *        • Each line: name, quantity, line total, plus buttons
 *          "Decrease quantity of <name>", "Increase quantity of <name>", "Remove <name>"
 *        • Decreasing from 1 removes the line
 *        • Empty cart: "Your cart is empty."
 *   4. Totals:
 *        • Subtotal = Σ price × quantity
 *        • Shipping $4.99, or "Free" when the subtotal is $50.00 or more
 *        • Below the threshold: "Add $X more for free shipping".
 *          At or above it: "🎉 You've got free shipping"
 *        • Total = subtotal + shipping
 *        • Each amount sits right after its label (e.g. a <dt>/<dd> pair)
 *   5. Checkout (disabled when the cart is empty) clears the cart and shows
 *      "Thanks for your order!". Adding something again hides the message.
 *
 * Store cart lines as { productId, quantity } and look up product details
 * during render. Don't copy product objects into the cart (lesson 15 explains why).
 *
 * ── Done when ─────────────────────────────────────────────────────
 *   All tests pass:  npm test -- lessons/12
 *
 * ── Stretch goals ─────────────────────────────────────────────────
 *   • Read the cart from localStorage with a lazy initializer: useState(() => …).
 *     (Writing it back is a job for Effects, in a later topic.)
 *   • A discount code input: COFFEE10 takes 10% off the subtotal.
 *   • Animate the cart count when it changes (CSS only).
 *   • Limit each line to 10 (reuse lesson 09's stepper idea).
 *
 * ── Check your understanding (Topic 2 recap) ──────────────────────
 *   1. What's the difference between onClick={save} and onClick={save()}?
 *   2. A click handler calls setCount(count + 1), then console.log(count). What's logged, and why?
 *   3. When should you pass an updater function, setX(prev => …), instead of a value?
 *   4. Why doesn't todos.push(newTodo); setTodos(todos) reliably update the screen?
 *   5. With { user: { address: { city } } } in state, which objects must be copied to change city?
 *   Answers are folded at the bottom of this file.
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 12               see it in the browser (hot reload)
 *   npm test -- lessons/12          run the tests in watch mode
 *   npm run lesson 12 --solution    compare with the reference solution
 */

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
        {/* TODO: implement the cart (spec at the top of this file) */}
        <p>Your cart is empty.</p>
      </aside>
    </div>
  )
}

// #region ✅ Answers to "Check your understanding"  (try first!)
// 1. onClick={save} passes the function for React to call on click.
//    onClick={save()} calls it immediately during render and passes the return value.
// 2. The old value. State is a snapshot for the whole render; the setter only
//    schedules a re-render with the new value.
// 3. When the next state depends on the previous one, especially if you queue
//    several updates in one event or the update runs later (timeouts, async),
//    where you'd otherwise read a stale snapshot.
// 4. push mutates the existing array, so setTodos receives the same reference.
//    React compares with Object.is, sees no change and may skip the render.
//    Mutation also breaks memoization. Create a new array instead.
// 5. All three on the path: the state object, user, and address. Siblings
//    that didn't change can be reused as they are.
// #endregion
