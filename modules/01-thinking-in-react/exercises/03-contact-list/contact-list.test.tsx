import { render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactList, type Contact } from './starter/ContactList'

// Frozen so that any attempt to sort/mutate the prop in place throws.
const contacts: readonly Contact[] = Object.freeze([
  { id: 'c1', name: 'Zoe Washburne', email: 'zoe@serenity.space' },
  { id: 'c2', name: 'Kaylee Frye', email: 'kaylee@serenity.space', favorite: true },
  { id: 'c3', name: 'Malcolm Reynolds', email: 'mal@serenity.space' },
  { id: 'c4', name: 'Inara Serra', email: 'inara@companions.org', favorite: true },
])

const renderList = (list = contacts) => render(<ContactList contacts={list as Contact[]} />)

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContactList', () => {
  // Runs first on purpose: React only logs the missing-key warning once per component.
  it('does not log a missing-key warning', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderList()
    const keyWarnings = error.mock.calls.filter((args) => String(args[0]).includes('key'))
    expect(keyWarnings).toEqual([])
  })

  it('shows the number of contacts in the heading', () => {
    renderList()
    expect(screen.getByRole('heading', { name: 'Contacts (4)' })).toBeInTheDocument()
  })

  it('renders each contact with a mailto: link', () => {
    renderList()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'mal@serenity.space' })).toHaveAttribute('href', 'mailto:mal@serenity.space')
  })

  it('lists favourites first, each group sorted by name', () => {
    renderList()
    const names = screen.getAllByRole('listitem').map((li) => li.textContent)
    expect(names[0]).toContain('Inara Serra')
    expect(names[1]).toContain('Kaylee Frye')
    expect(names[2]).toContain('Malcolm Reynolds')
    expect(names[3]).toContain('Zoe Washburne')
  })

  it('marks favourites with an accessible ★', () => {
    renderList()
    const [first, , third] = screen.getAllByRole('listitem')
    expect(within(first).getByLabelText('Favourite')).toBeInTheDocument()
    expect(within(third).queryByLabelText('Favourite')).toBeNull()
  })

  it('shows an empty state when there are no contacts', () => {
    renderList([])
    expect(screen.getByText('No contacts yet.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).toBeNull()
  })
})
