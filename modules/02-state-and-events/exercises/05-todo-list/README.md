# Exercise 2.5 — Todo list (updating arrays)

Yes, a todo list, but this one makes you implement every kind of array update: add, edit one item, remove, reorder, and remove many.

**You'll practise:** immutable array updates with `map`, `filter`, spread, `toSpliced`/`with`, and derived counts.

## Task

Finish [`starter/TodoList.tsx`](starter/TodoList.tsx). The **Add** handler already has a bug; the others are empty.

## Acceptance criteria

- [ ] **Add:** typing in "New todo" and clicking **Add** appends the todo, trims whitespace, ignores empty input, and clears the field.
- [ ] **Toggle:** each todo's checkbox (labelled with its text) toggles `done`.
- [ ] **Delete:** a "Delete ⟨text⟩" button removes that todo.
- [ ] **Reorder:** "Move ⟨text⟩ up" / "Move ⟨text⟩ down" buttons swap it with its neighbour. Up is disabled for the first item, and Down for the last.
- [ ] **Clear completed (N):** removes all done todos, and is disabled when there are none.
- [ ] A status line shows **"2 of 4 done"**.
- [ ] `initialTodos` is never mutated (the tests freeze it deeply).

<details>
<summary>Hint: swapping two items immutably</summary>

```ts
const next = [...todos]
;[next[i], next[j]] = [next[j], next[i]]   // fine: `next` is a fresh copy
// or, without the copy-then-swap:
todos.with(i, todos[j]).with(j, todos[i])
```

</details>

<details>
<summary>Hint: new IDs</summary>

`crypto.randomUUID()` is built into browsers and Node.

</details>

## Run it

```bash
npm run exercise 02 05
npm test -- 05-todo-list
```
