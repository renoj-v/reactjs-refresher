import { products } from './data'
import { Shop } from './Shop'
import './styles.css'

export default function App() {
  return <Shop products={products} />
}
