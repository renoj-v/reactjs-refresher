import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar, Card, ProfileCard } from './starter/components'

describe('Card', () => {
  it('renders the title as a level-2 heading and the children', () => {
    render(
      <Card title="Your cart">
        <p>2 items</p>
      </Card>,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Your cart' })).toBeInTheDocument()
    expect(screen.getByText('2 items')).toBeInTheDocument()
  })

  it('renders the footer inside a <footer> when one is passed', () => {
    render(
      <Card title="Your cart" footer={<button>Checkout</button>}>
        <p>2 items</p>
      </Card>,
    )
    expect(screen.getByRole('button', { name: 'Checkout' }).closest('footer')).not.toBeNull()
  })

  it('does not render an empty <footer> when no footer is passed', () => {
    const { container } = render(<Card title="Your cart">2 items</Card>)
    expect(container.querySelector('footer')).toBeNull()
  })
})

describe('Avatar', () => {
  it('renders an image with the name as alt text when src is given', () => {
    render(<Avatar name="Ada Lovelace" src="https://example.com/ada.png" />)
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute('src', 'https://example.com/ada.png')
  })

  it('renders initials, accessible as an image, when there is no src', () => {
    render(<Avatar name="Ada Lovelace" />)
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL')
  })

  it('uses a single initial for a single name', () => {
    render(<Avatar name="Plato" />)
    expect(screen.getByRole('img', { name: 'Plato' })).toHaveTextContent(/^P$/)
  })

  it('is 48px by default and 64px when size="lg"', () => {
    render(
      <>
        <Avatar name="Default Size" />
        <Avatar name="Large Size" size="lg" />
      </>,
    )
    expect(screen.getByRole('img', { name: 'Default Size' })).toHaveStyle({ width: '48px', height: '48px' })
    expect(screen.getByRole('img', { name: 'Large Size' })).toHaveStyle({ width: '64px', height: '64px' })
  })
})

describe('ProfileCard', () => {
  it('composes a card with the name, avatar, bio and a message button', () => {
    render(<ProfileCard user={{ name: 'Ada Lovelace', bio: 'Poetical science.', avatarUrl: 'https://example.com/ada.png' }} />)
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument()
    expect(screen.getByText('Poetical science.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Message Ada' }).closest('footer')).not.toBeNull()
  })
})
