import { ProfileCard } from './components'
import './styles.css'

export default function App() {
  return (
    <div className="stack">
      <ProfileCard
        user={{
          name: 'Ada Lovelace',
          bio: 'Writes the first algorithms. Enjoys poetical science.',
          avatarUrl: 'https://i.pravatar.cc/128?img=47',
        }}
      />
      <ProfileCard user={{ name: 'Grace Hopper', bio: 'Finds bugs. Literally.' }} />
    </div>
  )
}
