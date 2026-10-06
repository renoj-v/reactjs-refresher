// Lesson 10: demo page for the reference solution.

import { ShippingForm } from './ShippingForm'
import type { Order } from './types'
import './styles.css'

const savedOrder: Order = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  address: { street: '12 St James Square', city: 'London', postcode: 'SW1Y 4JH', country: 'UK' },
  giftWrap: false,
}

export default function App() {
  return <ShippingForm initial={savedOrder} onSave={(order) => alert(JSON.stringify(order, null, 2))} />
}
