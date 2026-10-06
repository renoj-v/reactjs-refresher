/*
 * LESSON 11 · Todo list (updating arrays)
 * Topic 2 · State & events (5 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Prefer array methods that RETURN A NEW ARRAY:
 *
 *   Goal            ✗ mutates            ✓ returns a new array
 *   ──────────────  ───────────────────  ─────────────────────────────────────────
 *   add             push, unshift        [...items, item]   [item, ...items]
 *   remove          splice               items.filter((i) => i.id !== id)
 *   edit one        items[i] = x         items.map((i) => (i.id === id ? { ...i, done: true } : i))
 *                                        items.with(index, x)
 *   sort/reverse    sort, reverse        items.toSorted(…)  items.toReversed()
 *   insert at       splice               items.toSpliced(index, 0, item)
 *
 * Copying an array is SHALLOW: the objects inside are still shared. Editing
 * one item means copying that item too (the map + spread pattern above).
 *
 * For deeply nested updates, Immer (use-immer) lets you write "mutating" code
 * that produces immutable updates. Usually, flatter state is the better fix.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Yes, a todo list. But this one makes you implement every kind of array
 * update: add, edit one item, remove, reorder, and remove many. The Add
 * handler already has a bug; the others are empty.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] A status line shows "1 of 4 done"
 *   [ ] Add appends the trimmed text, clears the input, and ignores blank input
 *   [ ] Each todo's checkbox (labelled with its text) toggles done
 *   [ ] A "Delete <text>" button removes that todo
 *   [ ] "Move <text> up" / "Move <text> down" swap it with its neighbour
 *   [ ] Up is disabled on the first item, and Down on the last
 *   [ ] "Clear completed (N)" removes done todos, and is disabled when N is 0
 *   (initialTodos is deeply frozen.)
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ todos.push(x); setTodos(todos)   → setTodos([...todos, x]); same reference = React may skip the render
 *   ✗ Storing doneCount in state       → derive it: todos.filter((t) => t.done).length
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 11               see it in the browser (hot reload)
 *   npm test -- lessons/11          run the tests in watch mode
 *   npm run lesson 11 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/updating-arrays-in-state
 */

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

// #region 💡 Hint: swapping two items immutably  (open only if stuck)
//   todos.with(i, todos[j]).with(j, todos[i])
// #endregion

// #region 💡 Hint: new IDs  (open only if stuck)
// crypto.randomUUID() is built into browsers and Node.
// #endregion
