import { useState } from 'react'

export type Todo = {
  id: string
  text: string
  done: boolean
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [draft, setDraft] = useState('')

  // TODO: bug: mutates state. Also: trim, ignore empty, clear the input.
  function handleAdd() {
    todos.push({ id: crypto.randomUUID(), text: draft, done: false })
    setTodos(todos)
  }

  // TODO
  function handleToggle(id: string) {}

  // TODO
  function handleDelete(id: string) {}

  // TODO: direction is -1 (up) or +1 (down)
  function handleMove(index: number, direction: -1 | 1) {}

  // TODO
  function handleClearCompleted() {}

  // TODO: derive the number of completed todos

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
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
              {todo.text}
            </label>
            {/* TODO: Move up / Move down / Delete buttons with accessible names */}
          </li>
        ))}
      </ul>

      {/* TODO: "N of M done" and the "Clear completed (N)" button */}
    </div>
  )
}
