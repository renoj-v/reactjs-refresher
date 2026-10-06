import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ShippingForm } from './starter/ShippingForm'
import type { Order } from './starter/types'

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
  return value
}

const makeInitial = (): Order =>
  deepFreeze({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    address: { street: '12 St James Square', city: 'London', postcode: 'SW1Y 4JH', country: 'UK' },
    giftWrap: false,
  })

function setup() {
  const user = userEvent.setup()
  const onSave = vi.fn()
  const initial = makeInitial()
  render(<ShippingForm initial={initial} onSave={onSave} />)
  const summary = within(screen.getByRole('complementary', { name: 'Summary' }))
  return { user, onSave, initial, summary }
}

describe('ShippingForm', () => {
  it('updates the summary when the name changes', async () => {
    const { user, summary } = setup()
    const name = screen.getByLabelText('Full name')
    await user.clear(name)
    await user.type(name, 'Grace Hopper')
    expect(summary.getByText(/Grace Hopper/)).toBeInTheDocument()
  })

  it('updates one address field without wiping the others', async () => {
    const { user, summary } = setup()
    const city = screen.getByLabelText('City')
    await user.clear(city)
    await user.type(city, 'Bath')

    expect(screen.getByLabelText('Street')).toHaveValue('12 St James Square')
    expect(screen.getByLabelText('Postcode')).toHaveValue('SW1Y 4JH')
    expect(summary.getByText('12 St James Square, Bath SW1Y 4JH, UK')).toBeInTheDocument()
  })

  it('changes the country', async () => {
    const { user, summary } = setup()
    await user.selectOptions(screen.getByLabelText('Country'), 'FR')
    expect(summary.getByText(/, FR$/)).toBeInTheDocument()
  })

  it('toggles gift wrap', async () => {
    const { user, summary } = setup()
    const giftWrap = screen.getByRole('checkbox', { name: 'Gift wrap' })

    await user.click(giftWrap)
    expect(giftWrap).toBeChecked()
    expect(summary.getByText('🎁 Gift wrapped')).toBeInTheDocument()

    await user.click(giftWrap)
    expect(giftWrap).not.toBeChecked()
    expect(summary.queryByText('🎁 Gift wrapped')).toBeNull()
  })

  it('saves the complete, current order', async () => {
    const { user, onSave } = setup()
    const postcode = screen.getByLabelText('Postcode')
    await user.clear(postcode)
    await user.type(postcode, 'BA1 1LT')
    await user.click(screen.getByRole('checkbox', { name: 'Gift wrap' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSave).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      address: { street: '12 St James Square', city: 'London', postcode: 'BA1 1LT', country: 'UK' },
      giftWrap: true,
    })
  })

  it('resets to the initial values', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText('City'), ' Town')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByLabelText('City')).toHaveValue('London')
  })
})
