// Lesson 16: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

export type Task = { id: string; text: string; done: boolean }

// A discriminated union: the `type` field tells TypeScript which payload exists.
// Actions read like an event log ("a task was toggled"), not like setters.
export type TaskAction =
  | { type: 'added'; id: string; text: string }
  | { type: 'toggled'; id: string }
  | { type: 'renamed'; id: string; text: string }
  | { type: 'deleted'; id: string }
  | { type: 'clearedCompleted' }

// Pure: same input → same output, no mutation, no side effects, no randomness.
// That's why the `id` comes in through the action instead of being generated here.
// It also makes the reducer trivially unit-testable without rendering anything.
export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }]
    case 'toggled':
      return tasks.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task))
    case 'renamed':
      return tasks.map((task) => (task.id === action.id ? { ...task, text: action.text } : task))
    case 'deleted':
      return tasks.filter((task) => task.id !== action.id)
    case 'clearedCompleted':
      return tasks.filter((task) => !task.done)
    default: {
      // Exhaustiveness check: if someone adds a new action type and forgets to
      // handle it, this line becomes a *type error*.
      const unhandled: never = action
      throw new Error(`Unhandled action: ${JSON.stringify(unhandled)}`)
    }
  }
}
