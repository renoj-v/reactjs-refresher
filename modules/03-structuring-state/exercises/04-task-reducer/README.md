# Exercise 3.4 — Task manager (`useReducer`)

[`starter/TaskManager.tsx`](starter/TaskManager.tsx) works, but its update logic is scattered across five event handlers. Move it into a **reducer**.

**You'll practise:** `useReducer`, describing updates as typed actions, keeping reducers pure, and testing a reducer without React.

## Task

1. Implement `tasksReducer(tasks, action)` in [`starter/tasksReducer.ts`](starter/tasksReducer.ts). The `TaskAction` union type is already written.
2. Refactor `TaskManager` to use `useReducer(tasksReducer, initialTasks)`. Each handler becomes a single `dispatch(...)`.
3. Keep the reducer **pure**. Generate the new task's `id` in the event handler and pass it in the action.

The UI tests already pass. They're there to make sure your refactor doesn't break anything.

## Acceptance criteria

Reducer:
- [ ] `added` appends `{ id, text, done: false }` using the id from the action.
- [ ] `toggled` flips `done` for that task only.
- [ ] `renamed` changes that task's text.
- [ ] `deleted` removes that task.
- [ ] `clearedCompleted` removes every done task.
- [ ] It never mutates the previous state (the tests freeze it) and always returns a new array for a change.

UI (keep green):
- [ ] Add, toggle, rename (Edit → Save) and delete all still work.

<details>
<summary>Hint: reducer shape</summary>

```ts
export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }]
    // …
  }
}
```

With a discriminated union, TypeScript knows that `action.text` exists inside `case 'added'`.

</details>

## Run it

```bash
npm run exercise 03 04
npm test -- 04-task-reducer
```
