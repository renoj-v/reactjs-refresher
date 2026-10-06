// Lesson 12: instructions are at the top of ./Shop.tsx

export type Product = {
  id: string
  name: string
  priceCents: number
}

export const products: Product[] = [
  { id: 'p1', name: 'Pour-over dripper', priceCents: 3400 },
  { id: 'p2', name: 'Burr grinder', priceCents: 12900 },
  { id: 'p3', name: 'Paper filters', priceCents: 650 },
  { id: 'p4', name: 'Gooseneck kettle', priceCents: 5990 },
]

export const formatCents = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
