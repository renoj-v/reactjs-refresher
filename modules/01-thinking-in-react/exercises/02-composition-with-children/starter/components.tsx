import type { ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Card({ title }: CardProps) {
  // TODO: render the title as an <h2>, then the children,
  // then (only if passed) the footer wrapped in a <footer> element.
  return (
    <section className="card">
      <strong>{title}</strong>
    </section>
  )
}

type AvatarProps = {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

// TODO: map each size to a pixel value: sm = 32, md = 48, lg = 64.

// TODO: write a small helper that turns "Ada Lovelace" into "AL".

export function Avatar({ name }: AvatarProps) {
  // TODO:
  //  - with `src`: render <img alt={name} … />
  //  - without `src`: render the initials with role="img" and aria-label={name}
  //  - apply the width/height for the size via the `style` prop
  return <span className="avatar">?</span>
}

export type User = {
  name: string
  bio: string
  avatarUrl?: string
}

export function ProfileCard({ user }: { user: User }) {
  // TODO: compose Card + Avatar. The footer is a button: "Message <first name>".
  return <p>{user.name}</p>
}
