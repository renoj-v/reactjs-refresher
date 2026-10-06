export function LikeButton({ initialLikes }: { initialLikes: number }) {
  // TODO: add state to remember whether the post is liked.
  // TODO: toggle it on click.
  // TODO: derive the displayed count from `initialLikes` and that state.

  return (
    <div className="like">
      <button aria-pressed={false}>♡ Like</button>
      <span>{initialLikes} likes</span>
    </div>
  )
}
