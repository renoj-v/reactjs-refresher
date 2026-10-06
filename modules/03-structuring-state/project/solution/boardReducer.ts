export type ColumnId = 'todo' | 'doing' | 'done'

export const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress' },
  { id: 'done', title: 'Done' },
]

export const WIP_LIMIT = 3

// Flat state: one array, with each card knowing its column. Moving a card is
// a single-field update, not "remove from one array and insert into another".
export type Card = { id: string; title: string; column: ColumnId }

export type BoardState = { cards: Card[] }

export type BoardAction =
  | { type: 'added'; id: string; title: string; column: ColumnId }
  | { type: 'moved'; id: string; direction: -1 | 1 }
  | { type: 'renamed'; id: string; title: string }
  | { type: 'deleted'; id: string }

// Exported so the UI can use the *same* rule to disable buttons. The rule
// lives in one place, and the reducer enforces it even if the UI forgets.
export function canAcceptCard(cards: Card[], column: ColumnId): boolean {
  if (column !== 'doing') return true
  return cards.filter((card) => card.column === 'doing').length < WIP_LIMIT
}

export function targetColumn(column: ColumnId, direction: -1 | 1): ColumnId | undefined {
  const index = COLUMNS.findIndex((c) => c.id === column)
  return COLUMNS[index + direction]?.id
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'added': {
      // Returning the *same* object when nothing changes lets React skip the re-render.
      if (!canAcceptCard(state.cards, action.column)) return state
      return { cards: [...state.cards, { id: action.id, title: action.title, column: action.column }] }
    }
    case 'moved': {
      const card = state.cards.find((c) => c.id === action.id)
      if (!card) return state
      const to = targetColumn(card.column, action.direction)
      if (!to || !canAcceptCard(state.cards, to)) return state
      return { cards: state.cards.map((c) => (c.id === action.id ? { ...c, column: to } : c)) }
    }
    case 'renamed':
      return { cards: state.cards.map((c) => (c.id === action.id ? { ...c, title: action.title } : c)) }
    case 'deleted':
      return { cards: state.cards.filter((c) => c.id !== action.id) }
    default: {
      const unhandled: never = action
      throw new Error(`Unhandled action: ${JSON.stringify(unhandled)}`)
    }
  }
}
