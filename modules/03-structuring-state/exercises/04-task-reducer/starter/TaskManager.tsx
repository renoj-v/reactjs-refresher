import { useState } from 'react'
import type { Task } from './tasksReducer'

// TODO: replace useState + these handlers with useReducer(tasksReducer, initialTasks).

export function TaskManager({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const text = draft.trim()
    if (!text) return
    setTasks([...tasks, { id: crypto.randomUUID(), text, done: false }])
    setDraft('')
  }

  function handleToggle(id: string) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function handleRename(id: string, text: string) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)))
  }

  function handleDelete(id: string) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.done))
  }

  return (
    <div className="tasks">
      <div className="add-row">
        <input aria-label="New task" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={() => handleToggle(task.id)}
            onRename={(text) => handleRename(task.id, text)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </ul>
      <button onClick={handleClearCompleted}>Clear completed</button>
    </div>
  )
}

type TaskRowProps = {
  task: Task
  onToggle: () => void
  onRename: (text: string) => void
  onDelete: () => void
}

// Note: `isEditing` and `editText` stay as local useState. They're UI state
// that only this row cares about, so they don't belong in the shared reducer.
function TaskRow({ task, onToggle, onRename, onDelete }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  return (
    <li>
      {isEditing ? (
        <>
          <input aria-label={`Edit ${task.text}`} value={editText} onChange={(e) => setEditText(e.target.value)} />
          <button
            onClick={() => {
              onRename(editText.trim() || task.text)
              setIsEditing(false)
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <label>
            <input type="checkbox" checked={task.done} onChange={onToggle} />
            {task.text}
          </label>
          <button
            aria-label={`Edit ${task.text}`}
            onClick={() => {
              setEditText(task.text)
              setIsEditing(true)
            }}
          >
            ✎
          </button>
        </>
      )}
      <button aria-label={`Delete ${task.text}`} onClick={onDelete}>
        ✕
      </button>
    </li>
  )
}
