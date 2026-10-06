// Lesson 05: demo page shown by `npm run lesson 5`. Instructions are at the top of ./TeamDirectory.tsx

import { members } from './data'
import { TeamDirectory } from './TeamDirectory'
import './styles.css'

export default function App() {
  return <TeamDirectory members={members} />
}
