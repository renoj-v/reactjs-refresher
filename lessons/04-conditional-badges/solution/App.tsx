// Lesson 04: demo page for the reference solution.

import { ProductTile, type Product } from './ProductTile'
import './styles.css'

const products: Product[] = [
  { name: 'Trail runner', price: 120, stock: 14, reviewCount: 87 },
  { name: 'Rain shell', price: 180, salePrice: 135, stock: 3, reviewCount: 1 },
  { name: 'Wool beanie', price: 25, stock: 0, reviewCount: 0 },
  { name: 'Old model tent', price: 300, stock: 2, reviewCount: 40, discontinued: true },
]

export default function App() {
  return (
    <div className="tiles">
      {products.map((product) => (
        <ProductTile key={product.name} product={product} />
      ))}
    </div>
  )
}
