# Mini-project 3 — Kanban board

A three-column board (To do → In progress → Done) with a work-in-progress limit.

**Combines:** choosing a flat state shape, `useReducer` with typed actions, derived values, lifting state up, and local UI state where it belongs.

```
┌ To do (2) ──────────┐┌ In progress (3/3) ──┐┌ Done (1) ───────────┐
│ Design login page   ││ API pagination      ││ Set up CI           │
│ [←][→][✎][✕]        ││ [←][→][✎][✕]        ││ [←][→][✎][✕]        │
│ Write e2e tests     ││ Fix flaky test      ││                     │
│ …                   ││ Dark mode           ││                     │
│ [New card…] [Add]   ││ [New card…] [Add]   ││ [New card…] [Add]   │
└─────────────────────┘└─────────────────────┘└─────────────────────┘
                     1 of 6 cards done
```

## Spec

### State and reducer ([`starter/boardReducer.ts`](starter/boardReducer.ts))

Keep the state **flat**: a single `cards` array where each card has a `column` field (`'todo' | 'doing' | 'done'`). Don't use three nested arrays, because moving a card would then mean editing two of them.

Implement `boardReducer(state, action)` for these actions:

| Action | Behaviour |
|---|---|
| `{ type: 'added', id, title, column }` | Appends a card. Ignored if the target column is full. |
| `{ type: 'moved', id, direction: -1 \| 1 }` | Moves the card one column left or right. Ignored at the edges or if the target column is full. |
| `{ type: 'renamed', id, title }` | Renames the card. |
| `{ type: 'deleted', id }` | Removes the card. |

The **WIP limit**: `'doing'` holds at most `WIP_LIMIT` (3) cards. When an action is ignored, return the *same* state object.

### UI ([`starter/Board.tsx`](starter/Board.tsx))

- [ ] Each column is a `<section aria-label="To do">` (or "In progress", "Done") with a heading showing its count: **"To do (2)"**, **"In progress (3/3)"** (shows the limit), **"Done (1)"**.
- [ ] Each card has buttons **"Move ⟨title⟩ left"**, **"Move ⟨title⟩ right"**, **"Rename ⟨title⟩"** and **"Delete ⟨title⟩"**.
  - Left is disabled in the first column, and Right in the last.
  - Moving *into* a full "In progress" column is disabled.
- [ ] **Rename** swaps the title for an input (labelled "Title") and a **Save** button. Editing mode is local UI state in the card component, not in the reducer.
- [ ] Each column has an input labelled **"New card in ⟨column⟩"** and an **"Add card to ⟨column⟩"** button. Blank titles are ignored. The input is disabled while the column is full.
- [ ] A summary: **"1 of 6 cards done"**.

## Acceptance criteria

`npm test -- 03-structuring-state/project` checks the reducer and the UI.

## Stretch goals

- **Search:** a box that dims cards not matching the query. The query is state, and matching is derived.
- **Card count badges** that turn red when a column is at its limit.
- **Undo:** keep a `past: BoardState[]` stack in a wrapping reducer and add an `'undone'` action. Immutability makes this nearly free!
- **Drag and drop** with the native HTML Drag and Drop API (`draggable`, `onDragStart`, `onDrop`) dispatching `moved`.

## Run it

```bash
npm run exercise 03 project
npm test -- 03-structuring-state/project
```
