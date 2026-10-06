/*
 * LESSON 16 · Task manager (useReducer)
 * Topic 3 · Structuring state (4 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * When many event handlers update the same state, move the update logic into
 * a REDUCER: a pure function (state, action) => nextState.
 *
 *   type CartAction =
 *     | { type: 'added'; productId: string }
 *     | { type: 'removed'; productId: string }
 *     | { type: 'cleared' }
 *
 *   function cartReducer(cart: CartLine[], action: CartAction): CartLine[] {
 *     switch (action.type) {
 *       case 'added':   return [...cart, { productId: action.productId, quantity: 1 }]
 *       case 'removed': return cart.filter((l) => l.productId !== action.productId)
 *       case 'cleared': return []
 *     }
 *   }
 *
 *   const [cart, dispatch] = useReducer(cartReducer, [])
 *   <button onClick={() => dispatch({ type: 'cleared' })}>Clear</button>
 *
 *   • Actions describe WHAT HAPPENED ('added'), not how to change state ('setCart').
 *   • Reducers must be PURE: no mutation, no fetching, no randomness. Generate
 *     IDs in the event handler and put them in the action.
 *   • A discriminated union (type: 'added' | …) gives type-checked actions:
 *     inside `case 'added'`, TypeScript knows action.productId exists.
 *   • Reducers are plain functions, so you can test them without rendering anything.
 *
 * useState or useReducer? It's a matter of taste. Reach for a reducer when
 * updates are spread across many handlers, or when the next state depends on
 * the previous one in non-trivial ways.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * ./TaskManager.tsx works, but its update logic is scattered across five
 * event handlers. Move it into a reducer.
 *   1. Implement tasksReducer below. The TaskAction type is already written.
 *   2. Refactor TaskManager to useReducer(tasksReducer, initialTasks). Each
 *      handler becomes a single dispatch(…).
 *   3. Keep the reducer PURE: generate the new task's id in the handler.
 *   The UI test already passes. It's there so your refactor doesn't break anything.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] added: appends { id, text, done: false } using the action's id, as a new array
 *   [ ] toggled: flips done for that task only
 *   [ ] renamed: changes that task's text
 *   [ ] deleted: removes that task
 *   [ ] clearedCompleted: removes every done task
 *   [ ] A changed task is a NEW object; the previous state isn't mutated (it's frozen)
 *   [ ] The TaskManager UI test stays green
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ crypto.randomUUID() or Date.now() inside the reducer  → put them in the action
 *   ✗ Mutating, then returning the same array               → return a new array
 *   ✗ Putting local UI state (isEditing) in the reducer     → keep it in useState where it's used
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 16               see it in the browser (hot reload)
 *   npm test -- lessons/16          run the tests in watch mode
 *   npm run lesson 16 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/extracting-state-logic-into-a-reducer
 *   https://react.dev/reference/react/useReducer
 */

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

// #region 💡 Hint: reducer shape  (open only if stuck)
//   export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
//     switch (action.type) {
//       case 'added':
//         return [...tasks, { id: action.id, text: action.text, done: false }]
//       // …
//     }
//   }
// #endregion
