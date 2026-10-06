/*
 * LESSON 01 · Product card
 * Topic 1 · Thinking in React (1 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * A React app is a tree of COMPONENTS: plain functions that take PROPS and
 * return JSX describing what the UI should look like right now. You never
 * say "add this node, remove that one". You describe the result, and React
 * works out the DOM changes.
 *
 *   type GreetingProps = { name: string }
 *
 *   export function Greeting({ name }: GreetingProps) {
 *     return <h1>Hello, {name}!</h1>
 *   }
 *
 *   <Greeting name="Ada" />          // usage
 *
 * Rules worth knowing:
 *   • Component names start with a Capital letter. <greeting /> would be an HTML tag.
 *   • Return ONE root element. Use a fragment <>…</> if you don't want a wrapper div.
 *   • JSX is JavaScript, so a few attributes differ from HTML:
 *       className (not class), htmlFor (not for), style={{ maxWidth: 240 }} (an object)
 *   • Curly braces { } drop into JavaScript, for EXPRESSIONS only (values,
 *     calls, ternaries), not statements like if/for:
 *       <p>Total: {price.toFixed(2)}</p>
 *
 * Props are a component's read-only inputs. Destructure them, and give
 * optional ones a default right in the pattern:
 *
 *   type ButtonProps = { label: string; variant?: 'primary' | 'secondary' }
 *
 *   function Button({ label, variant = 'primary' }: ButtonProps) {
 *     return <button className={`btn btn-${variant}`}>{label}</button>
 *   }
 *
 * TS corner: describe props with a `type`, and mark optional props with `?`.
 * You don't need React.FC; annotating the props parameter is the modern style.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Finish the ProductCard component below. It receives:
 *
 *   name: string · price: number (e.g. 12.5) · imageUrl: string
 *   description?: string · currency?: string (defaults to 'USD')
 *
 * Also add a second card in ./App.tsx.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] The card is an <article> with the name as a level-2 heading
 *   [ ] An image shows imageUrl, with the product name as its alt text
 *   [ ] The price is formatted: 12.5 → "$12.50"; with currency="EUR", 8 → "€8.00"
 *   [ ] The description shows only when one is passed
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ class="…" / for="…"                → className / htmlFor
 *   ✗ Wrapping everything in a <div>      → a fragment <>…</> works as the single root
 *   ✗ Missing or meaningless alt text     → describe the image (here: the product name)
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 1               see it in the browser (hot reload)
 *   npm test -- lessons/01          run the tests in watch mode
 *   npm run lesson 1 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/your-first-component
 *   https://react.dev/learn/writing-markup-with-jsx
 *   https://react.dev/learn/passing-props-to-a-component
 */

type ProductCardProps = {
  name: string
  price: number
  imageUrl: string
  description?: string
  currency?: string
}

// TODO: destructure the remaining props (give `currency` a default of 'USD').
export function ProductCard({ name }: ProductCardProps) {
  return (
    <article className="product-card">
      {/* TODO: make the name a level-2 heading */}
      <div>{name}</div>

      {/* TODO: render the image with a meaningful alt text */}

      {/* TODO: render the price formatted as currency (e.g. "$12.50") */}

      {/* TODO: render the description, but only if there is one */}
    </article>
  )
}

// #region 💡 Hint: formatting currency  (open only if stuck)
// The browser has a built-in formatter, so you don't need a library:
//
//   new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(12.5) // "$12.50"
// #endregion
