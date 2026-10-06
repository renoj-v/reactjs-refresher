import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScoreKeeper } from './starter/ScoreKeeper'

const score = () => screen.getByLabelText('Score')
const button = (name: string) => screen.getByRole('button', { name })

afterEach(() => {
  vi.useRealTimers()
})

describe('ScoreKeeper', () => {
  it('starts at 0', () => {
    render(<ScoreKeeper />)
    expect(score()).toHaveTextContent('0')
  })

  it('adds 1, 2 and 3 points', async () => {
    const user = userEvent.setup()
    render(<ScoreKeeper />)

    await user.click(button('+1'))
    expect(score()).toHaveTextContent('1')
    await user.click(button('+2'))
    expect(score()).toHaveTextContent('3')
    await user.click(button('+3'))
    expect(score()).toHaveTextContent('6')
  })

  it('bonus round adds 3 then doubles', async () => {
    const user = userEvent.setup()
    render(<ScoreKeeper />)

    await user.click(button('+1'))
    await user.click(button('Bonus: +3 then ×2'))
    expect(score()).toHaveTextContent('8')
  })

  it('the delayed point uses the score at the time the timer fires', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ScoreKeeper />)

    await user.click(button('+1 in 2 s'))
    await user.click(button('+3'))
    expect(score()).toHaveTextContent('3')

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(score()).toHaveTextContent('4')
  })

  it('resets to 0', async () => {
    const user = userEvent.setup()
    render(<ScoreKeeper />)
    await user.click(button('+2'))
    await user.click(button('Reset'))
    expect(score()).toHaveTextContent('0')
  })
})
