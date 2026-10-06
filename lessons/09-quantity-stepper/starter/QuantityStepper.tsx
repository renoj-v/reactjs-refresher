/*
 * LESSON 09 · Quantity stepper
 * Topic 2 · State & events (3 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Components often take EVENT-HANDLER PROPS, named onSomething by
 * convention, so the parent decides what happens:
 *
 *   function QuantityButton({ onIncrement }: { onIncrement: () => void }) {
 *     return <button onClick={onIncrement}>+</button>
 *   }
 *
 * WHERE SIDE EFFECTS GO. Event handlers are THE place for side effects:
 * updating state, calling onSomething props, posting to a server, logging.
 * Rendering stays pure, and so do updater functions.
 *
 *   ✗  setQty((q) => { onChange(q + 1); return q + 1 })   // side effect inside an updater
 *   ✓  const next = qty + 1
 *      setQty(next)
 *      onChange(next)                                      // side effect in the handler
 *
 * Why it matters: in development, StrictMode calls updater functions TWICE
 * to expose impure ones. The ✗ version would call onChange twice per click.
 *
 * Accessibility: a button whose visible text is just "−" means nothing to a
 * screen reader. Give it a real name with aria-label="Decrease quantity".
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Build the − / + control from a product page. It keeps its own quantity and
 * tells the parent via onChange. The starter half-works but has a subtle bug.
 * The tests render it inside <StrictMode>, just as main.tsx does in a real
 * app. Click + in the browser with the console open.
 *
 *   Props: initial (default 1), min (default 1), max (default 10), onChange?(next)
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] It shows the quantity in <output aria-label="Quantity">, with buttons named
 *       "Decrease quantity" and "Increase quantity" (visible text − and +)
 *   [ ] The buttons increase and decrease the quantity
 *   [ ] onChange is called EXACTLY ONCE per click, with the new value
 *   [ ] "Decrease" is disabled at min
 *   [ ] "Increase" is disabled at max, and a hint shows "Limit 5 per order" (with max=5)
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Calling parent callbacks inside updaters or during render  → call them in the event handler
 *   ✗ Icon-only buttons without aria-label                       → always give the button a name
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 9               see it in the browser (hot reload)
 *   npm test -- lessons/09          run the tests in watch mode
 *   npm run lesson 9 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/responding-to-events#passing-event-handlers-as-props
 *   https://react.dev/learn/keeping-components-pure#detecting-impure-calculations-with-strict-mode
 */

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

// #region 💡 Hint: why is onChange called twice?  (open only if stuck)
// StrictMode calls your updater function twice in dev. Work out `next` in the
// handler, then call setQuantity(next) and onChange?.(next) separately.
// One helper, changeBy(delta), can serve both buttons.
// #endregion
