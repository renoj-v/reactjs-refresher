import { ProductCard } from './ProductCard'
import './styles.css'

export default function App() {
  return (
    <div className="grid">
      <ProductCard
        name="Ceramic pour-over"
        price={34}
        imageUrl="https://picsum.photos/seed/pourover/400/300"
        description="Hand-glazed dripper for a clean, bright cup."
      />
      {/* Same component, different data: that's the point of props. */}
      <ProductCard name="Gooseneck kettle" price={59.9} currency="EUR" imageUrl="https://picsum.photos/seed/kettle/400/300" />
    </div>
  )
}
