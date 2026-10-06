/*
 * LESSON 17 · Messenger (resetting state with key)
 * Topic 3 · Structuring state (5 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * React ties state to a component's POSITION IN THE TREE, not to the JSX
 * variable or the data it shows. The same component type in the same
 * position keeps its state:
 *
 *   // Switching `contact` keeps the SAME <ChatThread> instance, so its draft survives!
 *   <ChatThread contact={contact} />
 *
 * To reset it on purpose, give it a KEY that changes. A different key means
 * a different instance, so React unmounts the old one and starts fresh:
 *
 *   <ChatThread key={contact.id} contact={contact} />
 *
 * ── Your task ─────────────────────────────────────────────────────
 * A two-pane chat: pick a contact on the left and chat on the right.
 *   1. Implement Send in ChatThread: append the trimmed draft to the messages
 *      and clear the input. Ignore blank drafts.
 *   2. In the browser, type a message to Taylor (don't send it), then switch
 *      to Alice. The draft is still there, now addressed to Alice! Sent
 *      messages leak too. Fix it WITHOUT changing ChatThread.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] The heading reads "Chat with <name>", and the selected contact's button has aria-pressed="true"
 *   [ ] Send adds the trimmed message and clears the input
 *   [ ] Blank messages are ignored
 *   [ ] Switching contacts gives an empty draft
 *   [ ] Switching contacts shows no messages from the previous thread
 *
 * ── Stretch goal (not tested) ─────────────────────────────────────
 * Users would rather keep unsent drafts PER CONTACT. Lift the drafts into
 * Messenger as Record<contactId, string> and make the input controlled. Why
 * doesn't `key` alone help with that?
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Expecting state to reset when props change   → change the component's key
 *   ✗ An Effect that clears state when a prop changes  → key, again (no Effect needed)
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 17               see it in the browser (hot reload)
 *   npm test -- lessons/17          run the tests in watch mode
 *   npm run lesson 17 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/preserving-and-resetting-state
 */

import { useState } from 'react'

export type Contact = { id: string; name: string }

export function Messenger({ contacts }: { contacts: Contact[] }) {
  const [selectedId, setSelectedId] = useState(contacts[0].id)
  const selected = contacts.find((c) => c.id === selectedId) ?? contacts[0]

  return (
    <div className="messenger">
      <nav aria-label="Contacts">
        {contacts.map((contact) => (
          <button key={contact.id} aria-pressed={contact.id === selectedId} onClick={() => setSelectedId(contact.id)}>
            {contact.name}
          </button>
        ))}
      </nav>
      {/* TODO: switching contacts should give a fresh ChatThread. One attribute fixes it. */}
      <ChatThread contact={selected} />
    </div>
  )
}

function ChatThread({ contact }: { contact: Contact }) {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  // TODO: append the trimmed draft (if any) to messages, then clear the draft.
  function handleSend() {}

  return (
    <section className="thread">
      <h2>Chat with {contact.name}</h2>
      <ul aria-label="Messages">
        {messages.map((message, i) => (
          // Index keys are OK here: messages are only ever appended, never reordered.
          <li key={i}>{message}</li>
        ))}
      </ul>
      <div className="compose">
        <input aria-label="Message" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </section>
  )
}
