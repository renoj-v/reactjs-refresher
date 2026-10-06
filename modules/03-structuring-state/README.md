# Module 3 — Structuring state

> ⏱ ~10 min read · Then: 5 exercises + mini-project

Most React bugs aren't hook bugs. They're **state-shape** bugs: two pieces of state that disagree, a copy that went stale, or state living in the wrong component. This module is about choosing *what* to store and *where*.

## Principle 1: store the minimum, derive the rest

If you can compute it from props or other state, **don't store it**. Calculate it during render.

```tsx
// ❌ Redundant state, kept "in sync" by hand (or worse, with an Effect)
const [items, setItems] = useState(initialItems)
const [total, setTotal] = useState(0)
useEffect(() => setTotal(sum(items)), [items]) // an extra render, and briefly wrong

// ✅ Derived during render. Always correct, nothing to sync.
const [items, setItems] = useState(initialItems)
const total = sum(items)
```

"But isn't recalculating slow?" Almost never. And the React Compiler (enabled here) automatically memoizes derived values when the inputs haven't changed.

A related trap is **copying props into state**:

```tsx
function Message({ color }: { color: string }) {
  const [msgColor] = useState(color) // ❌ only reads `color` once; later changes are ignored
  const msgColor2 = color            // ✅ just use the prop
}
```

(Copying is OK only when you *intend* to ignore later updates, for example an editable draft seeded from `initialValue`. Name the prop `initialX` or `defaultX` to make that obvious.)

## Principle 2: avoid contradictions and duplication

```tsx
// ❌ Can be { isSending: true, isSent: true }. Impossible, but representable.
const [isSending, setIsSending] = useState(false)
const [isSent, setIsSent] = useState(false)

// ✅ One status value: impossible states can't exist.
type Status = 'typing' | 'sending' | 'sent'
const [status, setStatus] = useState<Status>('typing')
```

**Store IDs, not copies:**

```tsx
// ❌ `selected` is a copy. Edit the item in `items` and `selected` goes stale.
const [selected, setSelected] = useState(items[0])

// ✅ Store the id and look the item up during render.
const [selectedId, setSelectedId] = useState(items[0].id)
const selected = items.find((item) => item.id === selectedId)
```

Prefer **flat** state over deep nesting. A nested tree is painful to update immutably, while a flat lookup by ID is easy.

## Principle 3: lift state up to share it

When two components need the same state, move it to their **closest common parent** and pass it down. The children become **controlled**: driven by props rather than by their own state.

```tsx
function FAQ() {
  const [openId, setOpenId] = useState<string | null>('shipping')

  return (
    <>
      <Question id="shipping" isOpen={openId === 'shipping'} onToggle={() => setOpenId('shipping')} />
      <Question id="returns" isOpen={openId === 'returns'} onToggle={() => setOpenId('returns')} />
    </>
  )
}
```

Data flows **down** through props. Changes flow **up** through callback props. Each piece of state has a **single source of truth**: one component owns it.

## `useReducer`: when updates get complicated

When a component has many event handlers that update the same state, move the update logic into a **reducer**: a pure function `(state, action) => nextState`.

```tsx
type CartAction =
  | { type: 'added'; productId: string }
  | { type: 'removed'; productId: string }
  | { type: 'cleared' }

function cartReducer(cart: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'added':
      return [...cart, { productId: action.productId, quantity: 1 }]
    case 'removed':
      return cart.filter((line) => line.productId !== action.productId)
    case 'cleared':
      return []
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, [])
  return <button onClick={() => dispatch({ type: 'cleared' })}>Clear</button>
}
```

- Actions describe **what happened** (`'added'`), not how to change state (`'setCart'`).
- Reducers must be **pure**: no mutation, no fetching, no randomness (generate IDs in the handler and put them in the action).
- A discriminated union (`type: 'added' | …`) gives you type-checked actions and exhaustive `switch` statements.
- Reducers are plain functions, so you can unit-test them without rendering anything.

`useState` vs `useReducer` is a matter of taste. Reach for a reducer when updates are spread across many handlers, or when the next state depends on the previous state in non-trivial ways.

## Preserving and resetting state

React ties state to a component's **position in the tree**, not to the JSX variable or the data it shows. Same component type in the same position means state is kept:

```tsx
// Switching `contact` keeps the SAME <ChatThread> instance, so its draft survives!
<ChatThread contact={contact} />
```

To deliberately reset it, give it a **`key`** that changes. A different key means a different component instance, so React starts fresh:

```tsx
<ChatThread key={contact.id} contact={contact} />
```

## Common mistakes

| Mistake | Fix |
|---|---|
| Storing something you can compute (`fullName`, `total`, `filteredItems`) | Compute it during render |
| Syncing state with `useEffect(() => setX(…), [y])` | Derive it, or update both in the same event handler |
| `useState(props.value)` and expecting it to follow the prop | Use the prop directly, or reset with `key` |
| Storing the selected *object* | Store its id and look it up |
| Several booleans for one status | One union-typed status |
| Two sibling components each holding "their half" | Lift state to the common parent |
| Mutating, fetching, or calling `Math.random()` in a reducer | Keep reducers pure; do side effects in handlers |
| Expecting state to reset when props change | Change the component's `key` |

## Exercises

| # | Exercise | Practises |
|---|---|---|
| 01 | [Accordion](exercises/01-accordion) | Lifting state up, controlled components |
| 02 | [Search filter](exercises/02-search-filter) | Derived state, not copying props into state |
| 03 | [Select by ID](exercises/03-select-by-id) | Avoiding duplicated state |
| 04 | [Task reducer](exercises/04-task-reducer) | `useReducer`, typed actions, testing reducers |
| 05 | [Chat with `key`](exercises/05-chat-with-key) | Preserving vs. resetting state |
| 🏁 | [Mini-project: Kanban board](project) | Everything above |

## Check your understanding

1. A component has `items` and `visibleItems` (filtered by a search query) in state. What's the problem, and what's the fix?
2. What does "lifting state up" mean, and what makes a child "controlled"?
3. Why is storing `selectedItem` (the object) riskier than storing `selectedId`?
4. Why must a reducer be pure, and where should something like `crypto.randomUUID()` go instead?
5. You switch between chats and the previous contact's half-typed message shows up for the new contact. Why, and what's the one-line fix?

<details>
<summary>Answers</summary>

1. `visibleItems` is redundant. It can drift out of sync with `items` or the query. Store only `items` and `query`, and compute `visibleItems` during render.
2. Moving shared state from the components that use it to their closest common parent, which passes it down as props (plus callbacks to change it). A controlled child is driven entirely by props and doesn't own the state.
3. The object is a *copy*. When the item is edited in the list, the copy doesn't change, so two sources of truth disagree. An id always resolves to the current item.
4. React may call reducers more than once (StrictMode does), and purity is what makes them predictable and testable. Generate IDs, timestamps and random values in the event handler and pass them in the action payload.
5. The chat component stays at the same position in the tree, so React preserves its state. Give it `key={contact.id}` so a new contact means a new instance with fresh state.

</details>

## Read more on react.dev

- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [`useReducer` reference](https://react.dev/reference/react/useReducer)
- [You Might Not Need an Effect: adjusting state when a prop changes](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
