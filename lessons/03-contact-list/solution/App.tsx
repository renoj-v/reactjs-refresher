// Lesson 03: demo page for the reference solution.

import { ContactList, type Contact } from './ContactList'

const contacts: Contact[] = [
  { id: 'c1', name: 'Zoe Washburne', email: 'zoe@serenity.space' },
  { id: 'c2', name: 'Kaylee Frye', email: 'kaylee@serenity.space', favorite: true },
  { id: 'c3', name: 'Malcolm Reynolds', email: 'mal@serenity.space' },
  { id: 'c4', name: 'Inara Serra', email: 'inara@companions.org', favorite: true },
]

export default function App() {
  return (
    <>
      <ContactList contacts={contacts} />
      <ContactList contacts={[]} />
    </>
  )
}
