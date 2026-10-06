/*
 * LESSON 07 · Like button
 * Topic 2 · State & events (1 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Props come from outside. STATE is a component's own memory: data that
 * changes over time because of user interaction. When state changes, React
 * re-renders the component with the new value.
 *
 * Responding to events: pass a FUNCTION, don't call one.
 *
 *   <button onClick={handleClick}>Add</button>          ✓ passes the function
 *   <button onClick={handleClick()}>Add</button>        ✗ calls it during render
 *   <button onClick={() => onAdd(product.id)}>Add</button>  ✓ inline arrow is fine
 *
 * useState:
 *
 *   import { useState } from 'react'
 *
 *   function Toggle() {
 *     const [on, setOn] = useState(false)      // [current value, setter]
 *     return <button onClick={() => setOn(!on)}>{on ? 'On' : 'Off'}</button>
 *   }
 *
 *   • Each INSTANCE of a component has its own state: two <Toggle />s share nothing.
 *   • Hooks (functions starting with `use`) must be called at the TOP LEVEL of a
 *     component: not in loops, conditions or nested functions.
 *   • An expensive initial value can be passed as a function: useState(() => loadDraft())
 *
 * Store the MINIMUM state. Anything you can calculate from props and state
 * should be calculated during render, not stored.
 *
 * Accessibility: a button that toggles on and off should say so with
 * aria-pressed={true|false}. Screen readers then announce it as a toggle button.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Build a like button for a social feed. It gets initialLikes (the server's
 * count before you liked the post).
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] It starts unpressed (aria-pressed="false"), reading "♡ Like", with "12 likes" next to it
 *   [ ] Clicking toggles it to pressed, reading "♥ Liked", and the count goes up to 13
 *   [ ] Clicking again un-likes it and the count goes back to 12
 *   [ ] Exactly one like reads "1 like"
 *   [ ] Two LikeButtons on the page are independent
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ onClick={setLiked(!liked)}          → onClick={() => setLiked(!liked)}
 *   ✗ Storing `count` AND `liked`         → store `liked` and derive the count
 *   ✗ Calling useState inside an if       → always call hooks at the top level
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 7               see it in the browser (hot reload)
 *   npm test -- lessons/07          run the tests in watch mode
 *   npm run lesson 7 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/responding-to-events
 *   https://react.dev/learn/state-a-components-memory
 */

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  // TODO: add state to remember whether the post is liked.
  // TODO: toggle it on click.
  // TODO: derive the displayed count from `initialLikes` and that state.

  return (
    <div className="like">
      <button aria-pressed={false}>♡ Like</button>
      <span>{initialLikes} likes</span>
    </div>
  )
}

// #region 💡 Hint: how much state do you need?  (open only if stuck)
// Just one boolean, `liked`. The displayed count is initialLikes + (liked ? 1 : 0).
// #endregion
