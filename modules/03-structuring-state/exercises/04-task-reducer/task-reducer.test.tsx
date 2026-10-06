import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TaskManager } from './starter/TaskManager'
import { tasksReducer, type Task } from './starter/tasksReducer'

const makeTasks = (): Task[] =>
  Object.freeze(
    [
      { id: 't1', text: 'Write release notes', done: true },
      { id: 't2', text: 'Review pull request #42', done: false },
      { id: 't3', text: 'Update dependencies', done: false },
    ].map((task) => Object.freeze(task)),
  ) as Task[]

describe('tasksReducer', () => {
  it('added: appends a new, not-done task with the id from the action', () => {
    const tasks = makeTasks()
    const next = tasksReducer(tasks, { type: 'added', id: 'new', text: 'Deploy' })
    expect(next).toHaveLength(4)
    expect(next.at(-1)).toEqual({ id: 'new', text: 'Deploy', done: false })
    expect(next).not.toBe(tasks)
  })

  it('toggled: flips done for that task only', () => {
    const next = tasksReducer(makeTasks(), { type: 'toggled', id: 't2' })
    expect(next.map((t) => t.done)).toEqual([true, true, false])
  })

  it('renamed: changes that task’s text', () => {
    const next = tasksReducer(makeTasks(), { type: 'renamed', id: 't3', text: 'Bump React' })
    expect(next[2]).toEqual({ id: 't3', text: 'Bump React', done: false })
    expect(next[0].text).toBe('Write release notes')
  })

  it('deleted: removes that task', () => {
    const next = tasksReducer(makeTasks(), { type: 'deleted', id: 't1' })
    expect(next.map((t) => t.id)).toEqual(['t2', 't3'])
  })

  it('clearedCompleted: removes every done task', () => {
    const next = tasksReducer(makeTasks(), { type: 'clearedCompleted' })
    expect(next.map((t) => t.id)).toEqual(['t2', 't3'])
  })

  it('does not reuse the old task object when a task changes', () => {
    const tasks = makeTasks()
    const next = tasksReducer(tasks, { type: 'toggled', id: 't2' })
    expect(next[1]).not.toBe(tasks[1])
    expect(tasks[1].done).toBe(false)
  })
})

describe('TaskManager (keep these green while refactoring)', () => {
  it('adds, toggles, renames and deletes tasks', async () => {
    const user = userEvent.setup()
    render(<TaskManager initialTasks={makeTasks()} />)

    await user.type(screen.getByLabelText('New task'), 'Deploy to staging')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByRole('checkbox', { name: 'Deploy to staging' })).not.toBeChecked()

    await user.click(screen.getByRole('checkbox', { name: 'Update dependencies' }))
    expect(screen.getByRole('checkbox', { name: 'Update dependencies' })).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Edit Review pull request #42' }))
    const editInput = screen.getByRole('textbox', { name: 'Edit Review pull request #42' })
    await user.clear(editInput)
    await user.type(editInput, 'Merge pull request #42')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByRole('checkbox', { name: 'Merge pull request #42' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete Write release notes' }))
    expect(screen.queryByText('Write release notes')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Clear completed' }))
    expect(screen.queryByText('Update dependencies')).toBeNull()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })
})
