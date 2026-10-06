import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { recipes } from './starter/data'
import { formatDuration, RecipeCatalog } from './starter/RecipeCatalog'

const cardTitles = () => screen.queryAllByRole('heading', { level: 3 }).map((h) => h.textContent)
const cardFor = (title: string) => {
  const card = screen.getAllByRole('heading', { level: 3, name: title }).at(-1)?.closest('article')
  if (!card) throw new Error(`No <article> card found for "${title}"`)
  return card
}

describe('formatDuration', () => {
  it('formats minutes, whole hours and mixed durations', () => {
    expect(formatDuration(45)).toBe('45 min')
    expect(formatDuration(60)).toBe('1 h')
    expect(formatDuration(75)).toBe('1 h 15 min')
    expect(formatDuration(180)).toBe('3 h')
  })
})

describe('RecipeCatalog', () => {
  it('shows the featured recipe in a labelled section', () => {
    render(<RecipeCatalog recipes={recipes} featuredId="r2" activeTag="vegan" />)
    const featured = screen.getByRole('region', { name: 'Featured recipe' })
    expect(within(featured).getByText('Chicken katsu curry')).toBeInTheDocument()
  })

  it('renders unique, sorted tag chips with "All" first', () => {
    render(<RecipeCatalog recipes={recipes} />)
    const chips = screen.getAllByRole('link').map((link) => link.textContent)
    expect(chips).toEqual([
      'All',
      'breakfast',
      'dessert',
      'dinner',
      'french',
      'japanese',
      'lunch',
      'one-pan',
      'quick',
      'vegan',
    ])
    expect(screen.getByRole('link', { name: 'vegan' })).toHaveAttribute('href', '?tag=vegan')
  })

  it('marks the active chip with aria-current="page"', () => {
    const { unmount } = render(<RecipeCatalog recipes={recipes} />)
    expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'page')
    unmount()

    render(<RecipeCatalog recipes={recipes} activeTag="french" />)
    expect(screen.getByRole('link', { name: 'french' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'All' })).not.toHaveAttribute('aria-current')
  })

  it('shows every recipe and a count when there is no active tag', () => {
    render(<RecipeCatalog recipes={recipes} />)
    expect(cardTitles()).toHaveLength(6)
    expect(screen.getByText('Showing 6 recipes')).toBeInTheDocument()
  })

  it('filters by the active tag', () => {
    render(<RecipeCatalog recipes={recipes} activeTag="french" />)
    expect(cardTitles()).toEqual(['Beef bourguignon', 'Lemon tart'])
    expect(screen.getByText('Showing 2 recipes')).toBeInTheDocument()
  })

  it('uses the singular for a single result', () => {
    render(<RecipeCatalog recipes={recipes} activeTag="dessert" />)
    expect(screen.getByText('Showing 1 recipe')).toBeInTheDocument()
  })

  it('shows an empty state when no recipe matches', () => {
    render(<RecipeCatalog recipes={recipes} activeTag="pizza" />)
    expect(screen.getByText('No recipes tagged “pizza”.')).toBeInTheDocument()
    expect(cardTitles()).toEqual([])
  })

  it('shows duration, difficulty, vegetarian marker and tags on each card', () => {
    render(<RecipeCatalog recipes={recipes} />)
    const katsu = within(cardFor('Chicken katsu curry'))
    expect(katsu.getByText(/1 h 15 min/)).toBeInTheDocument()
    expect(katsu.getByText('Medium')).toBeInTheDocument()
    expect(katsu.queryByLabelText('Vegetarian')).toBeNull()
    expect(katsu.getByText(/#dinner/)).toBeInTheDocument()

    expect(within(cardFor('Overnight oats')).getByLabelText('Vegetarian')).toBeInTheDocument()
  })
})
