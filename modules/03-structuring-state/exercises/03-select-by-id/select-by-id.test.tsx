import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TripPlanner, type Stop } from './starter/TripPlanner'

const stops: Stop[] = [
  { id: 's1', city: 'Lisbon', nights: 3 },
  { id: 's2', city: 'Seville', nights: 2 },
  { id: 's3', city: 'Valencia', nights: 1 },
]

function setup() {
  const user = userEvent.setup()
  render(<TripPlanner initialStops={stops} />)
  const details = () => within(screen.getByRole('region', { name: 'Details' }))
  return { user, details }
}

describe('TripPlanner', () => {
  it('selects the first stop initially', () => {
    const { details } = setup()
    expect(details().getByText('Lisbon · 3 nights')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Choose 1' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Choose 2' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('selects another stop and pluralises nights', async () => {
    const { user, details } = setup()
    await user.click(screen.getByRole('button', { name: 'Choose 3' }))
    expect(details().getByText('Valencia · 1 night')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Choose 3' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Choose 1' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('updates the details when the selected stop is renamed', async () => {
    const { user, details } = setup()
    const city = screen.getByLabelText('Stop 1 city')
    await user.clear(city)
    await user.type(city, 'Porto')
    expect(details().getByText('Porto · 3 nights')).toBeInTheDocument()
  })

  it('updates the details when the selected stop’s nights change', async () => {
    const { user, details } = setup()
    await user.click(screen.getByRole('button', { name: 'Choose 2' }))
    const nights = screen.getByLabelText('Stop 2 nights')
    await user.clear(nights)
    await user.type(nights, '5')
    expect(details().getByText('Seville · 5 nights')).toBeInTheDocument()
  })

  it('shows "No stop selected" after the selected stop is removed', async () => {
    const { user, details } = setup()
    await user.click(screen.getByRole('button', { name: 'Choose 2' }))
    await user.click(screen.getByRole('button', { name: 'Remove 2' }))
    expect(details().getByText('No stop selected')).toBeInTheDocument()
  })
})
