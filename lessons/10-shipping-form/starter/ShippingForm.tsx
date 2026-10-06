/*
 * LESSON 10 · Shipping form (updating objects)
 * Topic 2 · State & events (4 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Treat state as READ-ONLY. Mutating it doesn't trigger a render, and it
 * breaks anything that compares old and new values (including the React
 * Compiler's memoization). Instead, create new objects:
 *
 *   const [order, setOrder] = useState({
 *     customer: 'Ada',
 *     address: { street: '1 Main St', city: 'London' },
 *   })
 *
 *   order.address.city = 'Paris'                    ✗ mutation: no re-render
 *
 *   setOrder({                                      ✓ new objects down to the change
 *     ...order,
 *     address: { ...order.address, city: 'Paris' },
 *   })
 *
 * One handler for many inputs: give each input a `name` matching its key,
 * then use a computed property:
 *
 *   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
 *     setOrder({ ...order, [e.target.name]: e.target.value })
 *   }
 *
 * Checkboxes expose e.target.checked, not .value.
 *
 * TS corner: a separately declared handler needs its event type:
 * ChangeEvent<HTMLInputElement> (or <HTMLInputElement | HTMLSelectElement>).
 *
 * (This lesson is about STATE UPDATES, not form submission. Proper forms
 * with Actions come in a later topic, so "Save" is a plain button here.)
 *
 * ── Your task ─────────────────────────────────────────────────────
 * The inputs below are wired up, but the handlers are buggy. Type into
 * "Street" and watch the summary, then tick "Gift wrap". Also run
 * `npm run lint`: the React Compiler's lint rules catch one of the bugs.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] Typing in Full name updates the summary
 *   [ ] Editing City keeps Street and Postcode (no wiped siblings)
 *   [ ] Changing Country works
 *   [ ] Gift wrap toggles "🎁 Gift wrapped" on and off
 *   [ ] Save calls onSave with the complete, current order
 *   [ ] Reset restores the initial values
 *   (The tests pass a DEEPLY FROZEN `initial`, so any mutation throws.)
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Spreading only the top level of nested state  → copy every level on the path to the change
 *   ✗ obj.x = 1; setObj(obj)                        → setObj({ ...obj, x: 1 })
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 10               see it in the browser (hot reload)
 *   npm test -- lessons/10          run the tests in watch mode
 *   npm run lesson 10 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/updating-objects-in-state
 */

import { useState, type ChangeEvent } from 'react'
import type { Order } from './types'

type ShippingFormProps = {
  initial: Order
  onSave: (order: Order) => void
}

export function ShippingForm({ initial, onSave }: ShippingFormProps) {
  const [order, setOrder] = useState(initial)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  // TODO: bug: typing in one address field wipes the others.
  function handleAddressChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setOrder({ ...order, address: { [e.target.name]: e.target.value } as Order['address'] })
  }

  // TODO: bug: this mutates state (and the `initial` prop!).
  function handleGiftWrapChange(e: ChangeEvent<HTMLInputElement>) {
    order.giftWrap = e.target.checked
    setOrder(order)
  }

  // TODO: Save should call onSave with the current order.
  // TODO: Reset should restore the initial values.

  return (
    <div className="checkout">
      <fieldset>
        <legend>Shipping details</legend>
        <label>
          Full name
          <input name="name" value={order.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={order.email} onChange={handleChange} />
        </label>
        <label>
          Street
          <input name="street" value={order.address.street} onChange={handleAddressChange} />
        </label>
        <label>
          City
          <input name="city" value={order.address.city} onChange={handleAddressChange} />
        </label>
        <label>
          Postcode
          <input name="postcode" value={order.address.postcode} onChange={handleAddressChange} />
        </label>
        <label>
          Country
          <select name="country" value={order.address.country} onChange={handleAddressChange}>
            <option value="UK">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={order.giftWrap} onChange={handleGiftWrapChange} />
          Gift wrap
        </label>
        <div className="actions">
          <button type="button">Reset</button>
          <button type="button">Save</button>
        </div>
      </fieldset>

      <aside aria-label="Summary">
        <h3>Ships to</h3>
        <p>
          {order.name} ({order.email})
        </p>
        <p>
          {order.address.street}, {order.address.city} {order.address.postcode}, {order.address.country}
        </p>
        {order.giftWrap && <p>🎁 Gift wrapped</p>}
      </aside>
    </div>
  )
}

// #region 💡 Hint: one handler for the address fields  (open only if stuck)
//   function handleAddressChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//     const { name, value } = e.target
//     setOrder({ ...order, address: { ...order.address, [name]: value } })
//   }
// #endregion
