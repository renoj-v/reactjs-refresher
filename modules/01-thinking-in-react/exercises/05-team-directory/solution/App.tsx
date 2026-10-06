import { members } from './data'
import { TeamDirectory } from './TeamDirectory'
import './styles.css'

export default function App() {
  return <TeamDirectory members={members} />
}
