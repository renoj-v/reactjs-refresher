import { useReducer, useState } from 'react'
import { tasksReducer, type Task } from './tasksReducer'

export function TaskManager({ initialTasks }: { initialTasks: Task[] }) {
  // The update logic now lives in one tested, pure function. The component
  // just says *what happened* by dispatching actions.
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  // The draft is local UI state and not part of the task list, so useState is right here.
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const text = draft.trim()
    if (!text) return
    // Impure work (random id) happens in the handler; the reducer stays pure.
    dispatch({ type: 'added', id: crypto.randomUUID(), text })
    setDraft('')
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
            onToggle={() => dispatch({ type: 'toggled', id: task.id })}
            onRename={(text) => dispatch({ type: 'renamed', id: task.id, text })}
            onDelete={() => dispatch({ type: 'deleted', id: task.id })}
          />
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'clearedCompleted' })}>Clear completed</button>
    </div>
  )
}

type TaskRowProps = {
  task: Task
  onToggle: () => void
  onRename: (text: string) => void
  onDelete: () => void
}

// Not every piece of state belongs in the reducer. Editing mode is local to a
// row and irrelevant to the rest of the app.
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
