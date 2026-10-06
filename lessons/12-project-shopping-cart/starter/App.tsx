// Lesson 12: demo page shown by `npm run lesson 12`. Instructions are at the top of ./Shop.tsx

import { products } from './data'
import { Shop } from './Shop'
import './styles.css'

export default function App() {
  return <Shop products={products} />
}
