// Lesson 11: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import { useState } from 'react'

export type Todo = {
  id: string
  text: string
  done: boolean
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const text = draft.trim()
    if (!text) return
    // Spread into a *new* array. `push` would mutate the existing one, and
    // passing the same reference to setTodos lets React skip the re-render.
    setTodos([...todos, { id: crypto.randomUUID(), text, done: false }])
    setDraft('')
  }

  function handleToggle(id: string) {
    // map → new array; for the matching item, spread → new object.
    // Untouched items are reused as-is (that's fine; we didn't change them).
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  function handleDelete(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= todos.length) return
    // `with(i, value)` (ES2023) is the immutable version of `arr[i] = value`.
    setTodos(todos.with(index, todos[target]).with(target, todos[index]))
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.done))
  }

  // Derived from state, never stored separately.
  const doneCount = todos.filter((todo) => todo.done).length

  return (
    <div className="todos">
      <div className="add-row">
        <label>
          New todo
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        </label>
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          // Keys are ids, not indexes. When items move, React moves the matching
          // DOM nodes (and any state inside them) along with the data.
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
              {todo.text}
            </label>
            <button aria-label={`Move ${todo.text} up`} disabled={index === 0} onClick={() => handleMove(index, -1)}>
              ↑
            </button>
            <button
              aria-label={`Move ${todo.text} down`}
              disabled={index === todos.length - 1}
              onClick={() => handleMove(index, 1)}
            >
              ↓
            </button>
            <button aria-label={`Delete ${todo.text}`} onClick={() => handleDelete(todo.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="status">
        <span>
          {doneCount} of {todos.length} done
        </span>
        <button disabled={doneCount === 0} onClick={handleClearCompleted}>
          Clear completed ({doneCount})
        </button>
      </div>
    </div>
  )
}
