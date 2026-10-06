import { useState, type ChangeEvent } from 'react'
import type { Order } from './types'

type ShippingFormProps = {
  initial: Order
  onSave: (order: Order) => void
}

export function ShippingForm({ initial, onSave }: ShippingFormProps) {
  // `initial` only seeds the state. Later changes to the prop are ignored, which
  // is what we want for "edit a copy, then save". Module 3 covers this pattern.
  const [order, setOrder] = useState(initial)

  // One handler for all top-level text fields: the input's `name` is the key.
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  // Nested update: copy every object on the path to the change.
  // `...order.address` keeps the sibling fields; the computed key overrides one.
  function handleAddressChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setOrder({ ...order, address: { ...order.address, [name]: value } })
  }

  // Checkboxes expose `checked`, not `value`. Still a new object, never a mutation.
  function handleGiftWrapChange(e: ChangeEvent<HTMLInputElement>) {
    setOrder({ ...order, giftWrap: e.target.checked })
  }

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
          {/* Because we never mutated `initial`, resetting is just setting it back. */}
          <button type="button" onClick={() => setOrder(initial)}>
            Reset
          </button>
          {/* Side effect (telling the parent) lives in the event handler. */}
          <button type="button" onClick={() => onSave(order)}>
            Save
          </button>
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
