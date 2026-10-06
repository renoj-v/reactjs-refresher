// Lesson 02: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import type { ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
  // Any JSX can be passed through a prop, not just `children`. This "slot"
  // pattern lets callers decide what goes in the footer.
  footer?: ReactNode
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
      {/* Only render the <footer> wrapper when there's something to put in it. */}
      {footer && <footer>{footer}</footer>}
    </section>
  )
}

// Lookup tables like this live outside the component: they never change,
// so there's no reason to recreate them on every render.
const SIZES = { sm: 32, md: 48, lg: 64 } as const

type AvatarProps = {
  name: string
  src?: string
  size?: keyof typeof SIZES
}

// A plain function, not a component: it returns a string, not JSX.
function getInitials(name: string) {
  const words = name.trim().split(/\s+/)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const px = SIZES[size]
  const style = { width: px, height: px, fontSize: px * 0.4 }

  // An early return keeps each branch easy to read.
  if (src) {
    return <img className="avatar" src={src} alt={name} style={style} />
  }

  // Without these attributes a screen reader would read out "A L".
  // role="img" + aria-label make it behave like the <img> version.
  return (
    <span className="avatar" role="img" aria-label={name} style={style}>
      {getInitials(name)}
    </span>
  )
}

export type User = {
  name: string
  bio: string
  avatarUrl?: string
}

export function ProfileCard({ user }: { user: User }) {
  const firstName = user.name.split(' ')[0]

  // ProfileCard doesn't re-implement any layout. It *composes* Card and Avatar.
  // If the card design changes, only Card needs editing.
  return (
    <Card title={user.name} footer={<button>Message {firstName}</button>}>
      <Avatar name={user.name} src={user.avatarUrl} size="lg" />
      <p>{user.bio}</p>
    </Card>
  )
}
