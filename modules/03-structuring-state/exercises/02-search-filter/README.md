# Exercise 3.2 — Search filter (derived state)

A product search with a text filter and an "In stock only" checkbox. The starter *mostly* works, but it's built on redundant state, and that causes a real bug.

**You'll practise:** identifying redundant state, deriving values during render, and not copying props into state.

## Task

Read [`starter/ProductSearch.tsx`](starter/ProductSearch.tsx). Then:

1. Run `npm run lint`. The React Hooks ESLint plugin already complains about this file. Read what it says.
2. In the browser, click **"Restock everything"**. The parent passes a new `products` array… and the list ignores it. Why?
3. Refactor down to the **minimal state**. Ask of each piece: *can I compute this from props or other state?*

## Acceptance criteria

- [ ] Typing in **"Search products"** filters by name, case-insensitively.
- [ ] **"In stock only"** hides products with `stock === 0`, and combines with the search.
- [ ] A status line reads **"Showing 2 of 5 products"**.
- [ ] No matches: **No products match “xyz”.**
- [ ] When the parent passes a new `products` array, the list reflects it immediately.
- [ ] No `useEffect` is needed. (The tests can't check this, but the linter can: `npm run lint`.)

## Run it

```bash
npm run exercise 03 02
npm test -- 02-search-filter
```
