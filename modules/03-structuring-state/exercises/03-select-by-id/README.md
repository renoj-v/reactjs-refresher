# Exercise 3.3 — Trip planner (store IDs, not copies)

An itinerary editor: rename stops, change the number of nights, remove stops, and pick one to see its details.

**You'll practise:** avoiding duplicated state by storing an ID and looking the item up during render.

## Task

[`starter/TripPlanner.tsx`](starter/TripPlanner.tsx) stores the selected stop as an **object**. In the browser:

1. Choose "Lisbon", then rename it to "Porto" in the list. What do the details say?
2. Choose a stop, then remove it. What do the details say now?

Fix it by storing the selected stop's **id** instead.

## Acceptance criteria

- [ ] The first stop is selected initially, and its details show **"Lisbon · 3 nights"**.
- [ ] Clicking **"Choose ⟨n⟩"** selects that stop. Its button gets `aria-pressed="true"`, and the others get `"false"`.
- [ ] Renaming or changing the nights of the *selected* stop updates the details immediately.
- [ ] Removing the selected stop shows **"No stop selected"**.
- [ ] Details use "1 night" / "2 nights".

## Run it

```bash
npm run exercise 03 03
npm test -- 03-select-by-id
```
