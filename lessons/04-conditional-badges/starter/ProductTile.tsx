/*
 * LESSON 04 · Conditional badges
 * Topic 1 · Thinking in React (4 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Pick whichever pattern reads best:
 *
 *   function StockLabel({ stock }: { stock: number }) {
 *     if (stock === 0) return <span>Sold out</span>       // early return
 *
 *     return (
 *       <>
 *         {stock < 5 ? <span>Only {stock} left</span> : <span>In stock</span>}   // ternary
 *         {stock > 100 && <span>🔥 Popular</span>}                                 // &&
 *       </>
 *     )
 *   }
 *
 *   • Returning null renders nothing.
 *   • Use a ternary to choose between two things, and && for "this or nothing".
 *   • Give conditions names (const soldOut = stock === 0) so the JSX reads like the spec.
 *
 * ⚠ THE 0 TRAP: {count && <Badge />} renders the text "0" when count is 0,
 * because 0 is falsy but React still renders numbers. Make the left side a
 * real boolean: {count > 0 && <Badge />}.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Finish ProductTile below so every badge appears under the right conditions.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] A discontinued product renders nothing at all
 *   [ ] stock === 0 → a "Sold out" badge, and the "Add to cart" button is disabled
 *   [ ] stock 1–5   → "Only N left"
 *   [ ] stock above 5 → no stock badge
 *   [ ] salePrice < price → a "Save N%" badge (rounded), the sale price, and the original price in a <del>
 *   [ ] Not on sale → only the normal price
 *   [ ] Reviews show "(12 reviews)", and "(1 review)" for exactly one
 *   [ ] 0 reviews → nothing about reviews, and not even a stray "0"
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ {items.length && <List />}  → {items.length > 0 && <List />}
 *   ✗ Deeply nested ternaries     → name the conditions first, or use an early return
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 4               see it in the browser (hot reload)
 *   npm test -- lessons/04          run the tests in watch mode
 *   npm run lesson 4 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/conditional-rendering
 */

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

// #region 💡 Hint: why is a "0" showing up?  (open only if stuck)
// {product.reviewCount && …} evaluates to the number 0 when there are no
// reviews, and React renders numbers. Use {product.reviewCount > 0 && …}.
// #endregion
