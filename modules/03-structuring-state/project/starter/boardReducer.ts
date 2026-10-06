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
