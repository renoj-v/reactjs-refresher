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
