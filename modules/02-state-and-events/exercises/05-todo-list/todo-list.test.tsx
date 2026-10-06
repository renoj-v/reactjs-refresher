import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TodoList, type Todo } from './starter/TodoList'

const makeTodos = (): Todo[] =>
  Object.freeze(
    [
      { id: 't1', text: 'Book flights', done: true },
      { id: 't2', text: 'Renew passport', done: false },
      { id: 't3', text: 'Buy travel adapter', done: false },
      { id: 't4', text: 'Pack bags', done: false },
    ].map((todo) => Object.freeze(todo)),
  ) as Todo[]

function setup() {
  const user = userEvent.setup()
  render(<TodoList initialTodos={makeTodos()} />)
  return { user }
}

const texts = () => screen.getAllByRole('checkbox').map((box) => box.closest('label')?.textContent)

describe('TodoList', () => {
  it('shows the done count', () => {
    setup()
    expect(screen.getByText('1 of 4 done')).toBeInTheDocument()
  })

  it('adds a trimmed todo, clears the input and ignores empty input', async () => {
    const { user } = setup()
    const input = screen.getByLabelText('New todo')

    await user.type(input, '  Print boarding pass  ')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(texts().at(-1)).toBe('Print boarding pass')
    expect(input).toHaveValue('')

    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(texts()).toHaveLength(5)
    expect(screen.getByText('1 of 5 done')).toBeInTheDocument()
  })

  it('toggles a todo', async () => {
    const { user } = setup()
    const passport = screen.getByRole('checkbox', { name: 'Renew passport' })
    await user.click(passport)
    expect(passport).toBeChecked()
    expect(screen.getByText('2 of 4 done')).toBeInTheDocument()
  })

  it('deletes a todo', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: 'Delete Buy travel adapter' }))
    expect(texts()).toEqual(['Book flights', 'Renew passport', 'Pack bags'])
  })

  it('moves todos up and down', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button', { name: 'Move Pack bags up' }))
    expect(texts()).toEqual(['Book flights', 'Renew passport', 'Pack bags', 'Buy travel adapter'])

    await user.click(screen.getByRole('button', { name: 'Move Book flights down' }))
    expect(texts()).toEqual(['Renew passport', 'Book flights', 'Pack bags', 'Buy travel adapter'])
  })

  it('disables moving past the ends', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Move Book flights up' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Pack bags down' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Move Pack bags up' })).toBeEnabled()
  })

  it('clears completed todos and disables the button when none are done', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('checkbox', { name: 'Pack bags' }))
    await user.click(screen.getByRole('button', { name: 'Clear completed (2)' }))

    expect(texts()).toEqual(['Renew passport', 'Buy travel adapter'])
    expect(screen.getByRole('button', { name: 'Clear completed (0)' })).toBeDisabled()
  })
})
