import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LikeButton } from './starter/LikeButton'

describe('LikeButton', () => {
  it('starts unpressed with the initial count', () => {
    render(<LikeButton initialLikes={12} />)
    expect(screen.getByRole('button', { name: '♡ Like' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('12 likes')).toBeInTheDocument()
  })

  it('toggles to liked and increments the count', async () => {
    const user = userEvent.setup()
    render(<LikeButton initialLikes={12} />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button', { name: '♥ Liked' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('13 likes')).toBeInTheDocument()
  })

  it('un-likes on a second click', async () => {
    const user = userEvent.setup()
    render(<LikeButton initialLikes={12} />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button', { name: '♡ Like' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('12 likes')).toBeInTheDocument()
  })

  it('uses the singular for exactly one like', async () => {
    const user = userEvent.setup()
    render(<LikeButton initialLikes={0} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('1 like')).toBeInTheDocument()
  })

  it('keeps state separate for each instance', async () => {
    const user = userEvent.setup()
    render(
      <>
        <LikeButton initialLikes={5} />
        <LikeButton initialLikes={5} />
      </>,
    )
    const [first, second] = screen.getAllByRole('button')

    await user.click(first)

    expect(first).toHaveAttribute('aria-pressed', 'true')
    expect(second).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('6 likes')).toBeInTheDocument()
    expect(screen.getByText('5 likes')).toBeInTheDocument()
  })
})
