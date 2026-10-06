# Module 2 — State & events

> ⏱ ~10 min read · Then: 5 exercises + mini-project

Props come from outside. **State** is a component's own memory: data that changes over time because of user interaction. When state changes, React re-renders the component with the new value.

## Responding to events

Pass a **function**, don't call one:

```tsx
function AddToCartButton({ productName }: { productName: string }) {
  function handleClick() {
    console.log(`Added ${productName}`)
  }

  return <button onClick={handleClick}>Add to cart</button> // ✅ passes the function
  // <button onClick={handleClick()}>                       // ❌ calls it during render
}
```

Inline arrows are fine too: `onClick={() => onAdd(product.id)}`.

Components often take **event-handler props**, named `onSomething` by convention, so the parent decides what happens:

```tsx
function QuantityButton({ onIncrement }: { onIncrement: () => void }) {
  return <button onClick={onIncrement}>+</button>
}
```

**TS corner:** for an inline handler, TypeScript infers the event type. When you write a handler separately, annotate it, e.g. `(e: React.ChangeEvent<HTMLInputElement>) => …`. Module 13 covers event types in depth.

## `useState`

```tsx
import { useState } from 'react'

function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <button aria-pressed={liked} onClick={() => setLiked(!liked)}>
      {liked ? '♥ Liked' : '♡ Like'}
    </button>
  )
}
```

- `useState(initial)` returns the current value and a setter.
- Each **instance** of a component has its own state. Two `<LikeButton />`s don't share anything.
- Hooks (functions starting with `use`) must be called at the **top level** of a component: not in loops, conditions, or nested functions.
- If the initial value is expensive to compute, pass a function: `useState(() => loadDraft())`.

## State is a snapshot

Calling the setter doesn't change the variable you already have. It asks React to **re-render** with a new value. Inside the current render, `count` is fixed:

```tsx
const [count, setCount] = useState(0)

function handleClick() {
  setCount(count + 1)
  console.log(count)            // 0, the snapshot from this render
  setTimeout(() => alert(count), 3000) // still 0
}
```

So this only adds **1**, not 3:

```tsx
setCount(count + 1) // setCount(0 + 1)
setCount(count + 1) // setCount(0 + 1)
setCount(count + 1) // setCount(0 + 1)
```

## Batching and updater functions

React **batches** all state updates from one event and re-renders once at the end. To compute the next state from the *previous* one (including updates queued earlier in the same event), pass an **updater function**:

```tsx
setCount((c) => c + 1) // 0 → 1
setCount((c) => c + 1) // 1 → 2
setCount((c) => c + 1) // 2 → 3
```

Use updaters whenever the next state depends on the previous one and you might queue several updates, or when the update happens later (timers, async). Updaters must be **pure**: no side effects, no calling `onChange` inside them.

## Updating objects: copy, don't mutate

Treat state as read-only. Mutating it doesn't trigger a render, and it breaks things that rely on comparing old and new values (including the React Compiler's memoization).

```tsx
const [order, setOrder] = useState({
  customer: 'Ada',
  address: { street: '1 Main St', city: 'London' },
})

// ❌ mutation, no re-render
order.address.city = 'Paris'

// ✅ new objects all the way down to the change
setOrder({
  ...order,
  address: { ...order.address, city: 'Paris' },
})
```

One handler for many inputs, keyed by the input's `name`:

```tsx
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setOrder({ ...order, [e.target.name]: e.target.value })
}
```

## Updating arrays

Prefer methods that **return a new array**:

| Goal | ❌ Mutates | ✅ Returns new array |
|---|---|---|
| Add | `push`, `unshift` | `[...items, item]`, `[item, ...items]` |
| Remove | `splice` | `items.filter((i) => i.id !== id)` |
| Replace / edit | `items[i] = x` | `items.map((i) => (i.id === id ? { ...i, done: true } : i))`, `items.with(index, x)` |
| Sort / reverse | `sort`, `reverse` | `items.toSorted(…)`, `items.toReversed()` |
| Insert at | `splice` | `items.toSpliced(index, 0, item)` |

Copying an array is **shallow**: the objects inside are still shared. Editing an item means copying that item too (the `map` + spread pattern above).

For deeply nested updates, [Immer](https://github.com/immerjs/use-immer) lets you write "mutating" code that produces immutable updates. Most of the time, flatter state (Module 3) is the better fix.

## Where side effects go

Event handlers are **the** place for side effects: updating state, calling `onSomething` props, posting to a server, logging analytics. Rendering stays pure.

## Common mistakes

| Mistake | Fix |
|---|---|
| `onClick={handleClick()}` | `onClick={handleClick}` or `onClick={() => handleClick(id)}` |
| Expecting the value to change right after `setX(…)` | Use the new value you computed, or read it on the next render |
| `setCount(count + 1)` several times in one handler | `setCount((c) => c + 1)` |
| Mutating then setting: `items.push(x); setItems(items)` | `setItems([...items, x])`. Same reference = React may skip the render |
| Spreading only the top level of nested state | Copy every level on the path to the change |
| Side effects inside an updater function | Updaters are pure. Do side effects in the handler |
| Calling `useState` conditionally | Always call hooks unconditionally at the top level |

## Exercises

| # | Exercise | Practises |
|---|---|---|
| 01 | [Like button](exercises/01-like-button) | `useState`, events, per-instance state, `aria-pressed` |
| 02 | [Score keeper](exercises/02-score-keeper) | Snapshots, batching, updater functions |
| 03 | [Quantity stepper](exercises/03-quantity-stepper) | Event-handler props, bounds, where side effects go |
| 04 | [Shipping form](exercises/04-shipping-form) | Immutable nested object updates, one handler for many inputs |
| 05 | [Todo list](exercises/05-todo-list) | Immutable array add/edit/remove/reorder |
| 🏁 | [Mini-project: Shopping cart](project) | Everything above |

## Check your understanding

1. What's the difference between `onClick={save}` and `onClick={save()}`?
2. Inside a click handler you call `setCount(count + 1)` and then `console.log(count)`. What's logged, and why?
3. When should you pass an updater function (`setX(prev => …)`) instead of a value?
4. Why doesn't `todos.push(newTodo); setTodos(todos)` reliably update the screen?
5. You have `{ user: { address: { city } } }` in state. Which objects must be copied to change `city`?

<details>
<summary>Answers</summary>

1. `onClick={save}` passes the function for React to call on click. `onClick={save()}` calls it immediately during render and passes its return value as the handler.
2. The old value. State is a snapshot for the whole render. The setter schedules a re-render with the new value; it doesn't change the local `count` variable.
3. When the next state depends on the previous state, especially if you queue several updates in one event or the update runs later (timeouts, async callbacks), so you'd otherwise read a stale snapshot.
4. `push` mutates the existing array, so `setTodos` receives the same reference. React compares with `Object.is`, sees no change, and may skip re-rendering. Mutation also breaks memoization and time-travel debugging. Create a new array instead.
5. All three on the path: the outer state object, `user`, and `address`. Siblings that didn't change can be reused as-is.

</details>

## Read more on react.dev

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Render and Commit](https://react.dev/learn/render-and-commit)
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [`useState` reference](https://react.dev/reference/react/useState)
