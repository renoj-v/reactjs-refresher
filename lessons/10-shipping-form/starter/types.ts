// Lesson 10: instructions are at the top of ./ShippingForm.tsx

export type Address = {
  street: string
  city: string
  postcode: string
  country: string
}

export type Order = {
  name: string
  email: string
  address: Address
  giftWrap: boolean
}
