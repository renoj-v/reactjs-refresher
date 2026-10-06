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
