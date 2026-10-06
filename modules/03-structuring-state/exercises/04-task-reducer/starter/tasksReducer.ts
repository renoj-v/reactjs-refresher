export type Task = { id: string; text: string; done: boolean }

// Actions describe *what happened*, in past tense.
export type TaskAction =
  | { type: 'added'; id: string; text: string }
  | { type: 'toggled'; id: string }
  | { type: 'renamed'; id: string; text: string }
  | { type: 'deleted'; id: string }
  | { type: 'clearedCompleted' }

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  // TODO: handle every action type. Never mutate `tasks`.
  return tasks
}
