# Exercise 2.1 — Like button

A social feed needs a like button that remembers whether *you* liked a post and updates the count.

**You'll practise:** `useState`, click handlers, per-instance state, and `aria-pressed` for toggle buttons.

## Task

Finish `LikeButton` in [`starter/LikeButton.tsx`](starter/LikeButton.tsx). It receives `initialLikes` (the count from the server, before you liked it).

## Acceptance criteria

- [ ] The button starts unpressed (`aria-pressed="false"`) and reads **"♡ Like"**.
- [ ] Clicking toggles it to pressed (`aria-pressed="true"`), reading **"♥ Liked"**.
- [ ] The count next to it shows **"12 likes"**, goes up by one when liked, and back down when unliked.
- [ ] It says **"1 like"** for exactly one.
- [ ] Two `LikeButton`s on the page are independent.

<details>
<summary>Hint: how much state do you need?</summary>

Only one piece: `liked` (a boolean). The displayed count can be **calculated**: `initialLikes + (liked ? 1 : 0)`. Keeping a separate `count` state would mean two things to keep in sync.

</details>

## Run it

```bash
npm run exercise 02 01
npm test -- 01-like-button
```
