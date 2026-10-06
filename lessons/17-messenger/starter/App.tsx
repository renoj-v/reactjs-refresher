// Lesson 17: demo page shown by `npm run lesson 17`. Instructions are at the top of ./Messenger.tsx

import { Messenger, type Contact } from './Messenger'
import './styles.css'

const contacts: Contact[] = [
  { id: 'taylor', name: 'Taylor' },
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
]

export default function App() {
  return <Messenger contacts={contacts} />
}
