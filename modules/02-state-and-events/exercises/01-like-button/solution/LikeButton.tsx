import { useState } from 'react'

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  // The *minimal* state is one boolean. Each LikeButton instance gets its own.
  const [liked, setLiked] = useState(false)

  // The count is derived, not stored: it's always correct by construction.
  const count = initialLikes + (liked ? 1 : 0)

  return (
    <div className="like">
      {/* aria-pressed turns a plain button into an accessible toggle button.
          Screen readers announce it as "Like, toggle button, pressed". */}
      <button aria-pressed={liked} onClick={() => setLiked(!liked)}>
        {liked ? '♥ Liked' : '♡ Like'}
      </button>
      <span>
        {count} {count === 1 ? 'like' : 'likes'}
      </span>
    </div>
  )
}
