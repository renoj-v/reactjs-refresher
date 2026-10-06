import { LikeButton } from './LikeButton'
import './styles.css'

const posts = [
  { id: 1, text: 'Just shipped our new onboarding flow 🚀', likes: 12 },
  { id: 2, text: 'Hot take: CSS is a programming language.', likes: 0 },
]

export default function App() {
  return (
    <div className="feed">
      {posts.map((post) => (
        <article key={post.id} className="post">
          <p>{post.text}</p>
          <LikeButton initialLikes={post.likes} />
        </article>
      ))}
    </div>
  )
}
