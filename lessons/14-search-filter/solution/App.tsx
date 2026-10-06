// Lesson 14: demo page for the reference solution.

import { useState } from 'react'
import { ProductSearch, type Product } from './ProductSearch'
import './styles.css'

const initialProducts: Product[] = [
  { id: 'p1', name: 'Pour-over dripper', stock: 12 },
  { id: 'p2', name: 'Burr grinder', stock: 0 },
  { id: 'p3', name: 'Paper filters', stock: 140 },
  { id: 'p4', name: 'Gooseneck kettle', stock: 3 },
  { id: 'p5', name: 'Glass carafe', stock: 0 },
]

export default function App() {
  const [products, setProducts] = useState(initialProducts)

  return (
    <>
      <button onClick={() => setProducts(products.map((p) => ({ ...p, stock: p.stock + 10 })))}>
        Restock everything
      </button>
      <ProductSearch products={products} />
    </>
  )
}
