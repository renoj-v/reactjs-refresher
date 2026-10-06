/*
 * LESSON 18 · PROJECT: Kanban board
 * Topic 3 · Structuring state (6 of 6, topic project)
 * ──────────────────────────────────────────────────────────────────
 * A three-column board (To do → In progress → Done) with a work-in-progress
 * limit. Start in this file (state and reducer), then build ./Board.tsx (UI).
 * Combines: a flat state shape, useReducer with typed actions, derived
 * values, lifted state, and local UI state where it belongs.
 *
 *   ┌ To do (2) ──────────┐┌ In progress (3/3) ──┐┌ Done (1) ───────────┐
 *   │ Design login page   ││ API pagination      ││ Set up CI           │
 *   │ [←][→][✎][✕]        ││ [←][→][✎][✕]        ││ [←][→][✎][✕]        │
 *   │ Write e2e tests     ││ Fix flaky test      ││                     │
 *   │                     ││ Dark mode           ││                     │
 *   │ [New card…] [Add]   ││ [New card…] [Add]   ││ [New card…] [Add]   │
 *   └─────────────────────┘└─────────────────────┘└─────────────────────┘
 *                        1 of 6 cards done
 *
 * ── Spec: reducer (this file) ─────────────────────────────────────
 * Keep the state FLAT: one `cards` array, where each card has a `column`. Not
 * three nested arrays: moving a card would then mean editing two of them.
 *
 *   { type: 'added', id, title, column }   appends a card; ignored if the column is full
 *   { type: 'moved', id, direction: -1|1 }  one column left or right; ignored at the edges or if the target is full
 *   { type: 'renamed', id, title }          renames the card
 *   { type: 'deleted', id }                 removes the card
 *
 * WIP limit: 'doing' holds at most WIP_LIMIT (3) cards. When an action is
 * ignored, return the SAME state object.
 *
 * ── Spec: UI (./Board.tsx) ────────────────────────────────────────
 *   • Each column is a <section aria-label="To do"> (or "In progress", "Done")
 *     with a counted heading: "To do (2)", "In progress (3/3)" (shows the limit), "Done (1)".
 *   • Each card has buttons "Move <title> left", "Move <title> right",
 *     "Rename <title>" and "Delete <title>". Left is disabled in the first
 *     column, Right in the last, and moving INTO a full "In progress" is disabled.
 *   • Rename swaps the title for an input (label "Title") and a Save button.
 *     Editing mode is local state in the card component, not in the reducer.
 *   • Each column has an input "New card in <column>" and a button "Add card to <column>".
 *     Blank titles are ignored, and the input is disabled while the column is full.
 *   • A summary: "1 of 6 cards done".
 *
 * ── Done when ─────────────────────────────────────────────────────
 *   All tests pass:  npm test -- lessons/18
 *
 * ── Stretch goals ─────────────────────────────────────────────────
 *   • Search: dim cards that don't match a query (the query is state, the match is derived).
 *   • Count badges that turn red when a column is at its limit.
 *   • Undo: keep a past: BoardState[] stack in a wrapping reducer, plus an
 *     'undone' action. Immutability makes this nearly free!
 *   • Drag and drop with the native HTML Drag and Drop API, dispatching 'moved'.
 *
 * ── Check your understanding (Topic 3 recap) ──────────────────────
 *   1. A component stores both items and visibleItems (filtered by a query). What's the problem and the fix?
 *   2. What does "lifting state up" mean, and what makes a child "controlled"?
 *   3. Why is storing selectedItem (the object) riskier than storing selectedId?
 *   4. Why must a reducer be pure, and where should crypto.randomUUID() go instead?
 *   5. You switch chats and the previous contact's half-typed message shows up. Why, and what's the one-line fix?
 *   Answers are folded at the bottom of this file.
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 18               see it in the browser (hot reload)
 *   npm test -- lessons/18          run the tests in watch mode
 *   npm run lesson 18 --solution    compare with the reference solution
 */

export type ColumnId = 'todo' | 'doing' | 'done'

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress' },
  { id: 'done', title: 'Done' },
]

export const WIP_LIMIT = 3

export type Card = { id: string; title: string; column: ColumnId }

export type BoardState = { cards: Card[] }

export type BoardAction =
  | { type: 'added'; id: string; title: string; column: ColumnId }
  | { type: 'moved'; id: string; direction: -1 | 1 }
  | { type: 'renamed'; id: string; title: string }
  | { type: 'deleted'; id: string }

// TODO: a helper that says whether a column can accept another card (WIP limit)

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  // TODO: implement every action. Return `state` unchanged when an action is ignored.
  return state
}

// #region ✅ Answers to "Check your understanding"  (try first!)
// 1. visibleItems is redundant and can drift out of sync with items or the
//    query. Store only items and query, and compute visibleItems during render.
// 2. Moving shared state from the components that use it to their closest
//    common parent, which passes it down as props (plus callbacks to change it).
//    A controlled child is driven entirely by props and owns no state for it.
// 3. The object is a COPY. Edit the item in the list and the copy doesn't
//    change, so two sources of truth disagree. An id always resolves to the
//    current item.
// 4. React may call reducers more than once (StrictMode does), and purity
//    makes them predictable and testable. Generate IDs, timestamps and random
//    values in the event handler and pass them in the action.
// 5. The chat component stays at the same position in the tree, so React
//    preserves its state. key={contact.id} makes each contact a new instance.
// #endregion
