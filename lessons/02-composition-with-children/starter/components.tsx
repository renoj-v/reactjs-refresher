/*
 * LESSON 02 · Composition with children
 * Topic 1 · Thinking in React (2 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Whatever you put between a component's tags arrives as the `children`
 * prop. That's how you build layout components that don't know their
 * contents in advance:
 *
 *   import type { ReactNode } from 'react'
 *
 *   function Panel({ title, children }: { title: string; children: ReactNode }) {
 *     return (
 *       <section className="panel">
 *         <h2>{title}</h2>
 *         {children}
 *       </section>
 *     )
 *   }
 *
 *   <Panel title="Your cart">
 *     <CartItems />
 *     <CheckoutButton />
 *   </Panel>
 *
 * You can pass JSX through ANY prop, not just children. These are often
 * called "slots":
 *
 *   <Panel title="Your cart" footer={<CheckoutButton />}>…</Panel>
 *
 * Composition usually beats configuration. Instead of
 * <Panel showCheckout showItems />, let callers pass in what they need.
 *
 * TS corner: ReactNode covers anything React can render (elements,
 * strings, numbers, arrays, null). Use it for children and slot props.
 *
 * ⚠ Define components at the TOP LEVEL of a file, never inside another
 * component. A nested definition is a brand-new component type on every
 * render, so its state resets each time and the DOM is recreated.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Build two small building blocks in this file and compose them:
 *
 *   Card({ title, children, footer? })
 *     A generic container: an <h2> title, then the children, then the footer
 *     inside a <footer> element (only when a footer is passed).
 *
 *   Avatar({ name, src?, size? })
 *     • With src: an <img> with alt={name}.
 *     • Without src: the person's initials ("Ada Lovelace" → "AL", "Plato" → "P")
 *       with role="img" and aria-label={name}, so screen readers say the name
 *       rather than "A L".
 *     • size: 'sm' | 'md' | 'lg' (default 'md') → 32 / 48 / 64 px width and height.
 *
 *   ProfileCard({ user })
 *     A Card whose title is the user's name, whose body holds the Avatar and
 *     the bio, and whose footer has a "Message <first name>" button.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] Card renders the title as a level-2 heading, then its children
 *   [ ] Card renders the footer inside <footer> when passed
 *   [ ] Card renders no empty <footer> when no footer is passed
 *   [ ] Avatar with src renders an <img> with the name as alt text
 *   [ ] Avatar without src renders the initials, accessible as an image named after the person
 *   [ ] A single name gives a single initial
 *   [ ] Avatar is 48px by default and 64px with size="lg"
 *   [ ] ProfileCard shows the name heading, avatar, bio and a "Message Ada" button in the footer
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Boolean props for every variation   → accept children or slot props instead
 *   ✗ Declaring Avatar inside ProfileCard → keep every component at the top level
 *   ✗ Calling a component like {Card(props)} → render it: <Card {...props} />
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 2               see it in the browser (hot reload)
 *   npm test -- lessons/02          run the tests in watch mode
 *   npm run lesson 2 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 */

import type { ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Card({ title }: CardProps) {
  // TODO: render the title as an <h2>, then the children,
  // then (only if passed) the footer wrapped in a <footer> element.
  return (
    <section className="card">
      <strong>{title}</strong>
    </section>
  )
}

type AvatarProps = {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

// TODO: map each size to a pixel value: sm = 32, md = 48, lg = 64.

// TODO: write a small helper that turns "Ada Lovelace" into "AL".

export function Avatar({ name }: AvatarProps) {
  // TODO:
  //  - with `src`: render <img alt={name} … />
  //  - without `src`: render the initials with role="img" and aria-label={name}
  //  - apply the width/height for the size via the `style` prop
  return <span className="avatar">?</span>
}

export type User = {
  name: string
  bio: string
  avatarUrl?: string
}

export function ProfileCard({ user }: { user: User }) {
  // TODO: compose Card + Avatar. The footer is a button: "Message <first name>".
  return <p>{user.name}</p>
}

// #region 💡 Hint: typing children and slots  (open only if stuck)
//   import type { ReactNode } from 'react'
//   type CardProps = { title: string; children: ReactNode; footer?: ReactNode }
// #endregion

// #region 💡 Hint: sizes  (open only if stuck)
// Keep a constant lookup table OUTSIDE the component (it never changes):
//
//   const SIZES = { sm: 32, md: 48, lg: 64 } as const
//   <img style={{ width: SIZES[size], height: SIZES[size] }} … />
// #endregion
