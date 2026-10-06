export type Contact = {
  id: string
  name: string
  email: string
  favorite?: boolean
}

export function ContactList({ contacts }: { contacts: Contact[] }) {
  // TODO: favourites first, then alphabetical. Don't mutate `contacts`!
  // TODO: show "No contacts yet." when the list is empty.

  return (
    <section>
      <h2>Contacts</h2>
      {/* TODO: show the count in the heading */}
      <ul>
        {/* TODO: this logs a warning in the console. Why? */}
        {contacts.map((contact) => (
          <li>
            {contact.name}
            {/* TODO: email as a mailto: link, ★ for favourites */}
          </li>
        ))}
      </ul>
    </section>
  )
}
