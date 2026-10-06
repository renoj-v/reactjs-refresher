// Lesson 14: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import { useState } from 'react'

export type Product = { id: string; name: string; stock: number }

export function ProductSearch({ products }: { products: Product[] }) {
  // Minimal state = what the *user* controls. Everything else is derived.
  //  - `allProducts` was a copy of a prop: useState only reads its argument on the
  //    first render, so it silently ignored new `products`. Use the prop directly.
  //  - `visibleProducts` was computable from products + query + inStockOnly.
  //    Syncing it with an Effect cost an extra render and showed stale data in between.
  const [query, setQuery] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  // Derived during render: always consistent with the current props and state.
  // (The React Compiler memoizes this automatically when inputs don't change.)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) && (!inStockOnly || product.stock > 0),
  )

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

      {visibleProducts.length === 0 ? (
        <p>No products match “{query}”.</p>
      ) : (
        <>
          <p role="status">
            Showing {visibleProducts.length} of {products.length} products
          </p>
          <ul>
            {visibleProducts.map((product) => (
              <li key={product.id}>
                {product.name} <small>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
