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
