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
      {/* React keeps state for "the same component type at the same position".
          Without a key, <ChatThread> is the same instance whichever contact is
          shown, so its draft and messages carry over.
          A key that changes with the contact tells React: "this is a different
          thread". The old instance unmounts, and a new one mounts with fresh state. */}
      <ChatThread key={selected.id} contact={selected} />
    </div>
  )
}

function ChatThread({ contact }: { contact: Contact }) {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    setMessages([...messages, text])
    setDraft('')
  }

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
