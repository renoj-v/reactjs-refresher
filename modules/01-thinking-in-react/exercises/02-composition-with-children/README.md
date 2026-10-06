# Exercise 1.2 — Composition with `children`

Build two small reusable building blocks, `Card` and `Avatar`, then compose them into a `ProfileCard` for a team app.

**You'll practise:** the `children` prop, passing JSX through other props (`footer`), and building UI from small pieces.

## Task

All three components live in [`starter/components.tsx`](starter/components.tsx).

### `Card({ title, children, footer? })`
A generic container. It doesn't know or care what's inside it.

### `Avatar({ name, src?, size? })`
- With `src`: an `<img>` whose `alt` is the person's name.
- Without `src`: a circle showing the person's **initials** (`"Ada Lovelace"` → `"AL"`, `"Plato"` → `"P"`). Give it `role="img"` and `aria-label={name}` so screen readers announce the name rather than "A L".
- `size` is `'sm' | 'md' | 'lg'` (default `'md'`), mapped to 32 / 48 / 64 px width and height.

### `ProfileCard({ user })`
Composes the two: a `Card` whose title is the user's name, whose body holds the `Avatar` and the bio, and whose footer has a "Message ⟨first name⟩" button.

## Acceptance criteria

- [ ] `Card` renders its `title` as a level-2 heading and its `children` below it.
- [ ] `Card` renders `footer` inside a `<footer>` element only when a footer is passed.
- [ ] `Avatar` renders an image with the name as alt text when `src` is given.
- [ ] `Avatar` renders the initials, accessible as an image named after the person, when there's no `src`.
- [ ] `Avatar` is 64px wide when `size="lg"` and 48px by default.
- [ ] `ProfileCard` shows the name heading, avatar, bio and a "Message Ada" button for Ada Lovelace.

<details>
<summary>Hint: typing children</summary>

```ts
import type { ReactNode } from 'react'
type CardProps = { title: string; children: ReactNode; footer?: ReactNode }
```

`ReactNode` covers anything React can render: elements, strings, numbers, arrays, `null`.

</details>

## Run it

```bash
npm run exercise 01 02
npm test -- 02-composition
```
