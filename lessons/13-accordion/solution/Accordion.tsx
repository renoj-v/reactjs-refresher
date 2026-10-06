// Lesson 13: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import { useState } from 'react'

export type FaqItem = { id: string; question: string; answer: string }

type PanelProps = {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}

// Controlled: Panel has no state of its own. It renders whatever its parent
// says and reports clicks upward. That makes it reusable in any coordination
// scheme (one open, many open, all open…), decided by the parent.
function Panel({ item, isOpen, onToggle }: PanelProps) {
  const answerId = `faq-${item.id}`
  return (
    <div className="panel">
      <h3>
        {/* aria-expanded + aria-controls is the accessible "disclosure" pattern. */}
        <button aria-expanded={isOpen} aria-controls={answerId} onClick={onToggle}>
          {item.question}
        </button>
      </h3>
      {isOpen && <p id={answerId}>{item.answer}</p>}
    </div>
  )
}

type AccordionProps = {
  items: FaqItem[]
  defaultOpenId?: string
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  // One piece of state in the common parent: the id of the open panel.
  // Storing an id (instead of e.g. a boolean per panel) makes "two open at once"
  // impossible to represent.
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)

  return (
    <div className="accordion">
      {items.map((item) => (
        <Panel
          key={item.id}
          item={item}
          isOpen={item.id === openId}
          // Clicking the open panel closes it; clicking another opens that one instead.
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  )
}
