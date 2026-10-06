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
