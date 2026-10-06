import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { QuantityStepper } from './starter/QuantityStepper'

// StrictMode on purpose: it surfaces impure updater functions, like a real dev build does.
const renderStepper = (props: Parameters<typeof QuantityStepper>[0] = {}) =>
  render(
    <StrictMode>
      <QuantityStepper {...props} />
    </StrictMode>,
  )

const quantity = () => screen.getByLabelText('Quantity')
const increase = () => screen.getByRole('button', { name: 'Increase quantity' })
const decrease = () => screen.getByRole('button', { name: 'Decrease quantity' })

describe('QuantityStepper', () => {
  it('shows the initial quantity with labelled buttons', () => {
    renderStepper({ initial: 3 })
    expect(quantity()).toHaveTextContent('3')
    expect(increase()).toHaveTextContent('+')
    expect(decrease()).toHaveTextContent('−')
  })

  it('increases and decreases', async () => {
    const user = userEvent.setup()
    renderStepper({ initial: 3 })
    await user.click(increase())
    expect(quantity()).toHaveTextContent('4')
    await user.click(decrease())
    await user.click(decrease())
    expect(quantity()).toHaveTextContent('2')
  })

  it('calls onChange exactly once per click with the new value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderStepper({ initial: 3, onChange })

    await user.click(increase())
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(4)

    await user.click(decrease())
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(3)
  })

  it('disables Decrease at min', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderStepper({ initial: 2, min: 1, onChange })
    await user.click(decrease())
    expect(decrease()).toBeDisabled()
    expect(increase()).toBeEnabled()
    expect(quantity()).toHaveTextContent('1')
  })

  it('disables Increase at max and shows the limit', async () => {
    const user = userEvent.setup()
    renderStepper({ initial: 4, max: 5 })
    expect(screen.queryByText(/limit/i)).toBeNull()

    await user.click(increase())

    expect(increase()).toBeDisabled()
    expect(quantity()).toHaveTextContent('5')
    expect(screen.getByText('Limit 5 per order')).toBeInTheDocument()
  })
})
