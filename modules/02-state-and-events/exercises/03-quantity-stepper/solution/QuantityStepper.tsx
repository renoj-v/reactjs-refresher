import { useState } from 'react'

type QuantityStepperProps = {
  initial?: number
  min?: number
  max?: number
  onChange?: (next: number) => void
}

export function QuantityStepper({ initial = 1, min = 1, max = 10, onChange }: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(initial)

  // One place that both updates state and notifies the parent.
  // The side effect (onChange) runs in the event handler, exactly once per click.
  // Updater functions must stay pure: StrictMode calls them twice in dev to
  // catch exactly the bug the starter had.
  function changeBy(delta: number) {
    const next = Math.min(max, Math.max(min, quantity + delta))
    if (next === quantity) return
    setQuantity(next)
    onChange?.(next)
  }

  // Derived booleans: no extra state needed.
  const atMin = quantity <= min
  const atMax = quantity >= max

  return (
    <div>
      <div className="stepper">
        {/* The visible "−" means nothing to a screen reader; aria-label gives the button a real name. */}
        <button aria-label="Decrease quantity" disabled={atMin} onClick={() => changeBy(-1)}>
          −
        </button>
        <output aria-label="Quantity">{quantity}</output>
        <button aria-label="Increase quantity" disabled={atMax} onClick={() => changeBy(1)}>
          +
        </button>
      </div>
      {atMax && <p className="limit">Limit {max} per order</p>}
    </div>
  )
}
