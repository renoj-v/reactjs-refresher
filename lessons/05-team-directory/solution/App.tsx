// Lesson 05: demo page for the reference solution.

import { members } from './data'
import { TeamDirectory } from './TeamDirectory'
import './styles.css'

export default function App() {
  return <TeamDirectory members={members} />
}
