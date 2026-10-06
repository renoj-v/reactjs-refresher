# Exercise 1.3 — Contact list

Render an address book from an array of contacts.

**You'll practise:** `map`, keys, deriving a sorted copy without mutating props, empty states.

## Task

Finish `ContactList` in [`starter/ContactList.tsx`](starter/ContactList.tsx). The starter "works" but has some problems. Run it and open the browser console.

## Acceptance criteria

- [ ] A heading shows the count: **"Contacts (3)"**.
- [ ] Each contact is a list item with their name and a `mailto:` link showing their email.
- [ ] Favourites come first, then everyone else. Each group is sorted alphabetically by name.
- [ ] Favourites show a "★" with the accessible label "Favourite" (`<span aria-label="Favourite">★</span>`).
- [ ] The `contacts` prop is **not mutated**. The tests pass a frozen array, so `.sort()` on it will throw.
- [ ] No "unique key" warning is logged.
- [ ] With no contacts, show **"No contacts yet."** instead of an empty list.

<details>
<summary>Hint: sorting without mutating</summary>

`toSorted()` returns a new array (ES2023). A comparator can sort on two criteria:

```ts
contacts.toSorted((a, b) => {
  if (a.favorite !== b.favorite) return a.favorite ? -1 : 1
  return a.name.localeCompare(b.name)
})
```

</details>

## Run it

```bash
npm run exercise 01 03
npm test -- 03-contact-list
```
