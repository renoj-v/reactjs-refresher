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
