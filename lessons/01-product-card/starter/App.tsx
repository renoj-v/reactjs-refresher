// Lesson 01: demo page shown by `npm run lesson 1`. Instructions are at the top of ./ProductCard.tsx

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
      {/* TODO: add a second card without a description, priced in EUR */}
    </div>
  )
}
