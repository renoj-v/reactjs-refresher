/*
 * LESSON 14 · Search filter (derived state)
 * Topic 3 · Structuring state (2 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * STORE THE MINIMUM, DERIVE THE REST. If you can compute something from
 * props or other state, don't store it. Calculate it during render.
 *
 *   ✗ Redundant state, kept "in sync" with an Effect (an extra render, and briefly wrong):
 *       const [items, setItems] = useState(initialItems)
 *       const [total, setTotal] = useState(0)
 *       useEffect(() => setTotal(sum(items)), [items])
 *
 *   ✓ Derived during render. Always correct, nothing to sync:
 *       const [items, setItems] = useState(initialItems)
 *       const total = sum(items)
 *
 * "Isn't recalculating slow?" Almost never. And the React Compiler memoizes
 * derived values automatically when their inputs haven't changed.
 *
 * DON'T COPY PROPS INTO STATE:
 *
 *   function Message({ color }: { color: string }) {
 *     const [msgColor] = useState(color)  // ✗ reads `color` once; later changes are ignored
 *     const msgColor2 = color             // ✓ just use the prop
 *   }
 *
 * Copying is fine only when you INTEND to ignore later updates, for example
 * an editable draft seeded from a value. Name the prop initialX or defaultX so
 * that's obvious.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * A product search with a text filter and an "In stock only" checkbox. The
 * starter MOSTLY works, but it's built on redundant state, and that causes a real bug.
 *   1. Run `npm run lint`. The React Hooks plugin already complains about this file.
 *   2. In the browser, click "Restock everything". The parent passes new
 *      products, and the list ignores them. Why?
 *   3. Refactor down to the MINIMAL state. For each piece, ask: can I
 *      compute this from props or other state?
 *   You won't need useEffect at all.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] Initially all products show, with "Showing 5 of 5 products"
 *   [ ] "Search products" filters by name, case-insensitively
 *   [ ] "In stock only" hides stock === 0, and combines with the search
 *   [ ] No matches: No products match “<query>”. (and no list)
 *   [ ] When the parent passes a new products array, the list reflects it immediately
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Storing fullName, total or filteredItems                  → compute them during render
 *   ✗ useEffect(() => setX(f(y)), [y])                          → const x = f(y)
 *   ✗ useState(props.value), expecting it to follow the prop    → use the prop directly
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 14               see it in the browser (hot reload)
 *   npm test -- lessons/14          run the tests in watch mode
 *   npm run lesson 14 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state
 *   https://react.dev/learn/you-might-not-need-an-effect
 */

import { useEffect, useState } from 'react'

export type Product = { id: string; name: string; stock: number }

export function ProductSearch({ products }: { products: Product[] }) {
  // TODO: which of these four pieces of state are actually needed?
  const [allProducts] = useState(products)
  const [query, setQuery] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(products)

  useEffect(() => {
    // TODO: this also ignores `inStockOnly`
    setVisibleProducts(allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())))
  }, [allProducts, query])

  return (
    <div className="search">
      <label>
        Search products
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <label className="checkbox">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
        In stock only
      </label>

      {/* TODO: "Showing X of Y products", and the empty state */}
      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name} <small>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
