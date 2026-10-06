import { QuantityStepper } from './QuantityStepper'
import './styles.css'

export default function App() {
  return (
    <div className="product">
      <h2>Cold brew concentrate</h2>
      <p>$14.00 · 1 L bottle</p>
      <QuantityStepper initial={1} max={5} onChange={(next) => console.log('Quantity changed to', next)} />
      <p className="hint-text">Open the console and click the buttons.</p>
    </div>
  )
}
