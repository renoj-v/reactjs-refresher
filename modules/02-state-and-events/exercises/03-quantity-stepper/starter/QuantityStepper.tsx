import { useState } from 'react'

type QuantityStepperProps = {
  initial?: number
  min?: number
  max?: number
  onChange?: (next: number) => void
}

export function QuantityStepper({ initial = 1, onChange }: QuantityStepperProps) {
  const [quantity, setQuantity] = useState(initial)

  // TODO: there's a bug in here that StrictMode exposes. What's wrong with it?
  function increase() {
    setQuantity((q) => {
      const next = q + 1
      onChange?.(next)
      return next
    })
  }

  // TODO: implement decrease (and keep it free of that bug)
  function decrease() {}

  // TODO: respect `min`/`max`: disable the buttons, show "Limit N per order" at max
  return (
    <div className="stepper">
      <button onClick={decrease}>−</button>
      <output aria-label="Quantity">{quantity}</output>
      <button onClick={increase}>+</button>
    </div>
  )
}
