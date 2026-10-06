// Lesson 03: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

export type Contact = {
  id: string
  name: string
  email: string
  favorite?: boolean
}

function byFavoriteThenName(a: Contact, b: Contact) {
  if (Boolean(a.favorite) !== Boolean(b.favorite)) return a.favorite ? -1 : 1
  return a.name.localeCompare(b.name)
}

export function ContactList({ contacts }: { contacts: Contact[] }) {
  // Early return for the empty state keeps the main JSX focused on the happy path.
  if (contacts.length === 0) {
    return <p>No contacts yet.</p>
  }

  // Props are read-only. `toSorted` returns a *new* array; `contacts.sort()` would
  // reorder the parent's array behind its back (and throws on a frozen array).
  // We derive the sorted list during render instead of storing it anywhere.
  const sorted = contacts.toSorted(byFavoriteThenName)

  return (
    <section>
      <h2>Contacts ({contacts.length})</h2>
      <ul>
        {sorted.map((contact) => (
          // The key goes on the outermost element returned from `map`.
          // We use the contact's stable id, *not* the array index: after sorting,
          // indexes no longer identify the same person between renders.
          <li key={contact.id}>
            {contact.favorite && <span aria-label="Favourite">★ </span>}
            {contact.name} — <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
