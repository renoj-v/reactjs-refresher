import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { products } from './starter/data'
import { Shop } from './starter/Shop'

function setup() {
  const user = userEvent.setup()
  render(<Shop products={products} />)
  const cart = within(screen.getByRole('complementary', { name: 'Cart' }))
  const add = (name: string) => user.click(screen.getByRole('button', { name: `Add ${name} to cart` }))
  return { user, cart, add }
}

/** Returns the text of the element right after the given label (e.g. dt → dd). */
function amountFor(cart: ReturnType<typeof within>, label: string) {
  const labelEl = cart.getByText(label, { selector: 'dt, th, span, div, p, td' })
  return labelEl.nextElementSibling?.textContent ?? labelEl.parentElement?.textContent
}

describe('Shop', () => {
  it('starts with an empty cart and a disabled checkout', () => {
    const { cart } = setup()
    expect(cart.getByRole('heading', { name: 'Cart (0)' })).toBeInTheDocument()
    expect(cart.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(cart.getByRole('button', { name: 'Checkout' })).toBeDisabled()
  })

  it('adds products and increases the quantity when added again', async () => {
    const { cart, add } = setup()
    await add('Pour-over dripper')
    await add('Pour-over dripper')
    await add('Paper filters')

    expect(cart.getByRole('heading', { name: 'Cart (3)' })).toBeInTheDocument()
    expect(cart.getAllByRole('listitem')).toHaveLength(2)
    expect(cart.getByText('$68.00')).toBeInTheDocument() // 2 × $34.00 line total
  })

  it('increases, decreases and removes lines', async () => {
    const { user, cart, add } = setup()
    await add('Paper filters')
    await add('Burr grinder')

    await user.click(cart.getByRole('button', { name: 'Increase quantity of Paper filters' }))
    expect(cart.getByRole('heading', { name: 'Cart (3)' })).toBeInTheDocument()

    await user.click(cart.getByRole('button', { name: 'Remove Burr grinder' }))
    expect(cart.queryByText('Burr grinder')).toBeNull()

    await user.click(cart.getByRole('button', { name: 'Decrease quantity of Paper filters' }))
    await user.click(cart.getByRole('button', { name: 'Decrease quantity of Paper filters' }))
    expect(cart.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  it('charges shipping below $50 and says how much more is needed', async () => {
    const { cart, add } = setup()
    await add('Pour-over dripper') // $34.00
    await add('Paper filters') // $6.50

    expect(amountFor(cart, 'Subtotal')).toContain('$40.50')
    expect(amountFor(cart, 'Shipping')).toContain('$4.99')
    expect(amountFor(cart, 'Total')).toContain('$45.49')
    expect(cart.getByText('Add $9.50 more for free shipping')).toBeInTheDocument()
  })

  it('gives free shipping at $50 or more', async () => {
    const { cart, add } = setup()
    await add('Pour-over dripper')
    await add('Pour-over dripper')
    await add('Paper filters') // $74.50

    expect(amountFor(cart, 'Subtotal')).toContain('$74.50')
    expect(amountFor(cart, 'Shipping')).toContain('Free')
    expect(amountFor(cart, 'Total')).toContain('$74.50')
    expect(cart.getByText("🎉 You've got free shipping")).toBeInTheDocument()
  })

  it('checks out: clears the cart and thanks the customer', async () => {
    const { user, cart, add } = setup()
    await add('Burr grinder')
    await user.click(cart.getByRole('button', { name: 'Checkout' }))

    expect(cart.getByText('Thanks for your order!')).toBeInTheDocument()
    expect(cart.getByText('Your cart is empty.')).toBeInTheDocument()

    await add('Paper filters')
    expect(cart.queryByText('Thanks for your order!')).toBeNull()
  })
})
