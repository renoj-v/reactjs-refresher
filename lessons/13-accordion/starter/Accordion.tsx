/*
 * LESSON 13 · FAQ accordion (lifting state up)
 * Topic 3 · Structuring state (1 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Most React bugs aren't hook bugs. They're STATE-SHAPE bugs: two pieces of
 * state that disagree, a copy that went stale, or state living in the wrong
 * component. This topic is about choosing WHAT to store and WHERE.
 *
 * LIFTING STATE UP: when two components need the same state, move it to
 * their CLOSEST COMMON PARENT and pass it down. The children become
 * CONTROLLED: driven by props instead of their own state.
 *
 *   function FAQ() {
 *     const [openId, setOpenId] = useState<string | null>('shipping')
 *     return (
 *       <>
 *         <Question id="shipping" isOpen={openId === 'shipping'} onToggle={() => setOpenId('shipping')} />
 *         <Question id="returns"  isOpen={openId === 'returns'}  onToggle={() => setOpenId('returns')} />
 *       </>
 *     )
 *   }
 *
 * Data flows DOWN through props, and changes flow UP through callback props.
 * Each piece of state has a SINGLE SOURCE OF TRUTH: one component owns it.
 *
 * Accessibility: a button that shows or hides content uses
 * aria-expanded={isOpen}, plus aria-controls pointing at the content's id.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * A shop's FAQ where only ONE answer may be open at a time. Right now each
 * Panel keeps its own isOpen state, so several can be open at once, and
 * panels can't know about each other's state.
 *   1. Remove the state from Panel. Make it controlled with isOpen and onToggle props.
 *   2. Lift "which panel is open" into Accordion. Store the open panel's id, or null.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] The panel matching defaultOpenId starts open, and its answer is visible
 *   [ ] With no defaultOpenId, every panel starts closed
 *   [ ] Opening a panel closes the one that was open
 *   [ ] Only one panel is ever open
 *   [ ] Clicking the open panel's question closes it
 *   (Each question is a button with aria-expanded. A closed panel's answer isn't rendered.)
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Syncing sibling states with Effects  → lift the state to their common parent
 *   ✗ A boolean per panel                  → one `openId` makes "two open" impossible
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 13               see it in the browser (hot reload)
 *   npm test -- lessons/13          run the tests in watch mode
 *   npm run lesson 13 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/sharing-state-between-components
 */

import { useState } from 'react'

export type FaqItem = { id: string; question: string; answer: string }

// TODO: make Panel controlled. It should get `isOpen` and `onToggle` from its parent.
function Panel({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="panel">
      <h3>
        <button aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          {item.question}
        </button>
      </h3>
      {isOpen && <p>{item.answer}</p>}
    </div>
  )
}

type AccordionProps = {
  items: FaqItem[]
  defaultOpenId?: string
}

export function Accordion({ items }: AccordionProps) {
  // TODO: lift the "which panel is open" state up to here (start from `defaultOpenId`).
  return (
    <div className="accordion">
      {items.map((item) => (
        <Panel key={item.id} item={item} />
      ))}
    </div>
  )
}
