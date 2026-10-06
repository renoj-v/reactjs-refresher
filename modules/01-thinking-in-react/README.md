# Module 1 — Thinking in React

> ⏱ ~10 min read · Then: 5 exercises + mini-project

A React app is a tree of **components**: plain functions that take **props** and return **JSX** describing what the UI should look like *right now*. You never tell the DOM "add this node, remove that one". You describe the result, and React works out the DOM changes.

## Components are functions

```tsx
type GreetingProps = { name: string }

export function Greeting({ name }: GreetingProps) {
  return <h1>Hello, {name}!</h1>
}

// Usage
<Greeting name="Ada" />
```

Rules worth knowing:

- Component names start with a **capital letter**. `<greeting />` is treated as an HTML tag.
- Return **one root element**. Use a fragment `<>…</>` if you don't want a wrapper `div`.
- Define components at the **top level** of a module, never inside another component. A nested definition is a brand-new component type on every render, so its state resets each time.

## JSX in 30 seconds

JSX is JavaScript, so a few attribute names differ from HTML:

```tsx
<label htmlFor="email" className="field">       {/* not for / class */}
  Email
  <input id="email" type="email" style={{ maxWidth: 240 }} />  {/* style is an object */}
</label>
```

Curly braces `{}` drop into JavaScript. Use them for expressions only (values, calls, ternaries), not for statements like `if` or `for`.

```tsx
const price = 12.5
<p>Total: {price.toFixed(2)}</p>
```

## Props: a component's inputs

Props are read-only. Destructure them, and give defaults where it helps:

```tsx
type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
}

function Button({ label, variant = 'primary' }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{label}</button>
}
```

**TS corner:** describe props with a `type` (or `interface`). Optional props get `?`. You don't need `React.FC`; annotating the props parameter is the modern convention.

## Composition with `children`

Whatever you put between a component's tags arrives as the `children` prop. This is how you build layout components without knowing their contents in advance:

```tsx
import type { ReactNode } from 'react'

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

<Panel title="Your cart">
  <CartItems />
  <CheckoutButton />
</Panel>
```

Composition usually beats configuration. Instead of `<Panel showCheckout showItems />`, let callers pass what they need. You can also pass JSX through any prop, not just `children`, for example `footer={<CheckoutButton />}`.

## Rendering lists

Use `map` to turn data into elements. Every item needs a stable, unique `key`:

```tsx
type Product = { id: string; name: string }

function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

Keys tell React which item is which between renders. Use an ID from your data. **Avoid array indexes as keys** when the list can be reordered, filtered, or inserted into: React will match up the wrong items, and their state (such as a half-typed input) ends up on the wrong row.

Want sorted or filtered output? Derive it with non-mutating methods. Props must never be mutated.

```tsx
const sorted = products.toSorted((a, b) => a.name.localeCompare(b.name)) // ✅ new array
products.sort(...)                                                        // ❌ mutates props
```

## Conditional rendering

Pick whichever pattern reads best:

```tsx
function StockLabel({ stock }: { stock: number }) {
  if (stock === 0) return <span className="badge">Sold out</span> // early return

  return (
    <>
      {stock < 5 ? <span>Only {stock} left</span> : <span>In stock</span>} {/* ternary */}
      {stock > 100 && <span>🔥 Popular</span>}                             {/* && */}
    </>
  )
}
```

Returning `null` renders nothing.

⚠️ **The `0` trap:** `{count && <Badge />}` renders the text **`0`** when `count` is `0`, because `0` is falsy but React still renders numbers. Use a real boolean instead: `{count > 0 && <Badge />}`.

## Keep components pure

Given the same props, a component should return the same JSX and change nothing outside itself during render. React may render a component more than once. In development, `<StrictMode>` deliberately double-renders to surface impure code. Side effects belong in event handlers (Module 2) or, rarely, Effects (Module 6).

The **React Compiler** (enabled in this repo) relies on purity. It automatically memoizes pure components, which is why you'll rarely write `useMemo`/`memo` by hand anymore (more in Module 11).

## Thinking in React: the process

When you get a mockup:

1. **Break the UI into a component hierarchy.** Draw boxes; one component should ideally do one thing.
2. **Build a static version** from props only, with no state yet.
3. **Find the minimal state** (Module 2–3).
4. **Decide where state lives.**
5. **Add inverse data flow** (child → parent via callback props).

This module covers steps 1 and 2.

## Common mistakes

| Mistake | Fix |
|---|---|
| `class="…"`, `for="…"` | `className`, `htmlFor` |
| Using array index as `key` on a dynamic list | Use a stable ID from the data |
| `{items.length && <List />}` renders `0` | `{items.length > 0 && <List />}` |
| Mutating props (`props.items.sort()`) | Derive: `items.toSorted(…)` |
| Declaring a component inside another component | Move it to the top level; pass data through props |
| Calling a component as a function: `{Card(props)}` | Render it: `<Card {...props} />` |
| Wrapping everything in `<div>` just for one root | Use a fragment `<>…</>` |

## Exercises

Run an exercise in the browser with `npm run exercise 01 <number>` and its tests with `npm test -- modules/01`.

| # | Exercise | Practises |
|---|---|---|
| 01 | [Product card](exercises/01-product-card) | JSX, props, optional props, formatting |
| 02 | [Composition with children](exercises/02-composition-with-children) | `children`, JSX as props, small reusable pieces |
| 03 | [Contact list](exercises/03-contact-list) | `map`, keys, non-mutating sort, empty states |
| 04 | [Conditional badges](exercises/04-conditional-badges) | `&&`, ternaries, early `return null`, the `0` trap |
| 05 | [Team directory](exercises/05-team-directory) | Splitting a mockup into components, grouping data |
| 🏁 | [Mini-project: Recipe catalog](project) | Everything above |

## Check your understanding

1. Why must component names start with a capital letter?
2. What is a `key` for, and why is an array index a risky choice?
3. What does `{unreadCount && <Badge count={unreadCount} />}` render when `unreadCount` is `0`?
4. Why shouldn't you declare a component inside another component's body?
5. What does "a component should be pure" mean, and what in this repo relies on it?

<details>
<summary>Answers</summary>

1. JSX uses capitalization to tell them apart: lowercase tags (`<div>`) become HTML elements, and capitalized ones (`<Card>`) are treated as components to call.
2. A key identifies an item across renders so React can keep its DOM and state attached to the right item. If items are reordered, inserted, or removed, indexes shift. React then reuses the wrong DOM and state for the wrong data.
3. The text `0`. Numbers are rendered, so `0 && …` evaluates to `0`, and React shows it. Use `unreadCount > 0 && …`.
4. Each render creates a new function, which React sees as a different component type. It unmounts the old one and mounts the new one, so state is lost, the DOM is recreated, and focus disappears.
5. Same props (and state) in, same JSX out, with no side effects during render (no mutating props or globals, no fetching). StrictMode's double render and the React Compiler's automatic memoization both depend on it.

</details>

## Read more on react.dev

- [Your First Component](https://react.dev/learn/your-first-component)
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
