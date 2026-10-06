import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Board } from './starter/Board'
import { boardReducer, type BoardState } from './starter/boardReducer'

const makeState = (): BoardState =>
  Object.freeze({
    cards: Object.freeze(
      [
        { id: 'c1', title: 'Design login page', column: 'todo' as const },
        { id: 'c2', title: 'Write e2e tests', column: 'todo' as const },
        { id: 'c3', title: 'API pagination', column: 'doing' as const },
        { id: 'c4', title: 'Fix flaky test', column: 'doing' as const },
        { id: 'c6', title: 'Set up CI', column: 'done' as const },
      ].map((card) => Object.freeze(card)),
    ),
  }) as BoardState

const fullState = (): BoardState => ({
  cards: [...makeState().cards, { id: 'c5', title: 'Dark mode', column: 'doing' }],
})

describe('boardReducer', () => {
  it('adds a card to a column', () => {
    const next = boardReducer(makeState(), { type: 'added', id: 'n1', title: 'New idea', column: 'todo' })
    expect(next.cards.at(-1)).toEqual({ id: 'n1', title: 'New idea', column: 'todo' })
  })

  it('moves a card right and left', () => {
    const right = boardReducer(makeState(), { type: 'moved', id: 'c3', direction: 1 })
    expect(right.cards.find((c) => c.id === 'c3')?.column).toBe('done')
    const left = boardReducer(right, { type: 'moved', id: 'c3', direction: -1 })
    expect(left.cards.find((c) => c.id === 'c3')?.column).toBe('doing')
  })

  it('ignores moves past the edges (returns the same state)', () => {
    const state = makeState()
    expect(boardReducer(state, { type: 'moved', id: 'c1', direction: -1 })).toBe(state)
    expect(boardReducer(state, { type: 'moved', id: 'c6', direction: 1 })).toBe(state)
  })

  it('enforces the WIP limit for moves and adds', () => {
    const state = fullState()
    expect(boardReducer(state, { type: 'moved', id: 'c1', direction: 1 })).toBe(state)
    expect(boardReducer(state, { type: 'added', id: 'x', title: 'Too much', column: 'doing' })).toBe(state)
  })

  it('renames and deletes cards', () => {
    const renamed = boardReducer(makeState(), { type: 'renamed', id: 'c2', title: 'Write Playwright tests' })
    expect(renamed.cards.find((c) => c.id === 'c2')?.title).toBe('Write Playwright tests')
    const deleted = boardReducer(renamed, { type: 'deleted', id: 'c2' })
    expect(deleted.cards.map((c) => c.id)).not.toContain('c2')
  })
})

describe('Board', () => {
  const column = (name: string) => within(screen.getByRole('region', { name }))

  it('shows column headings with counts, the WIP limit and a summary', () => {
    render(<Board initialState={makeState()} />)
    expect(column('To do').getByRole('heading', { name: 'To do (2)' })).toBeInTheDocument()
    expect(column('In progress').getByRole('heading', { name: 'In progress (2/3)' })).toBeInTheDocument()
    expect(column('Done').getByRole('heading', { name: 'Done (1)' })).toBeInTheDocument()
    expect(screen.getByText('1 of 5 cards done')).toBeInTheDocument()
  })

  it('moves cards between columns', async () => {
    const user = userEvent.setup()
    render(<Board initialState={makeState()} />)
    await user.click(screen.getByRole('button', { name: 'Move Design login page right' }))
    expect(column('In progress').getByText('Design login page')).toBeInTheDocument()
    expect(column('In progress').getByRole('heading', { name: 'In progress (3/3)' })).toBeInTheDocument()
  })

  it('disables moves at the edges and into a full column', () => {
    render(<Board initialState={fullState()} />)
    expect(screen.getByRole('button', { name: 'Move Design login page left' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Set up CI right' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Design login page right' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Set up CI left' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Dark mode right' })).toBeEnabled()
  })

  it('adds a card to a column and ignores blank titles', async () => {
    const user = userEvent.setup()
    render(<Board initialState={makeState()} />)
    await user.type(screen.getByLabelText('New card in Done'), 'Ship v1')
    await user.click(screen.getByRole('button', { name: 'Add card to Done' }))
    expect(column('Done').getByText('Ship v1')).toBeInTheDocument()
    expect(screen.getByLabelText('New card in Done')).toHaveValue('')

    await user.type(screen.getByLabelText('New card in To do'), '   ')
    await user.click(screen.getByRole('button', { name: 'Add card to To do' }))
    expect(column('To do').getByRole('heading', { name: 'To do (2)' })).toBeInTheDocument()
  })

  it('disables adding to a full column', () => {
    render(<Board initialState={fullState()} />)
    expect(screen.getByLabelText('New card in In progress')).toBeDisabled()
  })

  it('renames and deletes a card', async () => {
    const user = userEvent.setup()
    render(<Board initialState={makeState()} />)

    await user.click(screen.getByRole('button', { name: 'Rename Fix flaky test' }))
    const input = screen.getByLabelText('Title')
    await user.clear(input)
    await user.type(input, 'Quarantine flaky test')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(column('In progress').getByText('Quarantine flaky test')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete Set up CI' }))
    expect(screen.queryByText('Set up CI')).toBeNull()
    expect(screen.getByText('0 of 4 cards done')).toBeInTheDocument()
  })
})
