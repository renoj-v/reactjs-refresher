import { useReducer, useState, type Dispatch } from 'react'
import {
  boardReducer,
  canAcceptCard,
  COLUMNS,
  targetColumn,
  WIP_LIMIT,
  type BoardAction,
  type BoardState,
  type Card,
  type ColumnId,
} from './boardReducer'

export function Board({ initialState }: { initialState: BoardState }) {
  const [state, dispatch] = useReducer(boardReducer, initialState)
  const { cards } = state

  // Derived: computed from the single source of truth on every render.
  const doneCount = cards.filter((card) => card.column === 'done').length

  return (
    <div className="board-wrapper">
      <div className="board">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={cards.filter((card) => card.column === column.id)}
            allCards={cards}
            dispatch={dispatch}
          />
        ))}
      </div>
      <p className="summary">
        {doneCount} of {cards.length} cards done
      </p>
    </div>
  )
}

type ColumnProps = {
  id: ColumnId
  title: string
  cards: Card[]
  allCards: Card[]
  dispatch: Dispatch<BoardAction>
}

function Column({ id, title, cards, allCards, dispatch }: ColumnProps) {
  // The add-card draft is local UI state: nothing else needs to know about it.
  const [draft, setDraft] = useState('')
  const full = !canAcceptCard(allCards, id)

  function handleAdd() {
    const text = draft.trim()
    if (!text) return
    dispatch({ type: 'added', id: crypto.randomUUID(), title: text, column: id })
    setDraft('')
  }

  return (
    <section aria-label={title} className="column">
      <h2>
        {title} ({cards.length}
        {id === 'doing' && `/${WIP_LIMIT}`})
      </h2>
      <ul>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} allCards={allCards} dispatch={dispatch} />
        ))}
      </ul>
      <div className="add-card">
        <input
          aria-label={`New card in ${title}`}
          value={draft}
          disabled={full}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button aria-label={`Add card to ${title}`} disabled={full} onClick={handleAdd}>
          Add
        </button>
      </div>
    </section>
  )
}

type CardItemProps = {
  card: Card
  allCards: Card[]
  dispatch: Dispatch<BoardAction>
}

function CardItem({ card, allCards, dispatch }: CardItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)

  // Same rules as the reducer, so the buttons can't offer a move the reducer would ignore.
  const canMove = (direction: -1 | 1) => {
    const to = targetColumn(card.column, direction)
    return to !== undefined && canAcceptCard(allCards, to)
  }

  if (isEditing) {
    return (
      <li className="card">
        <input aria-label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button
          onClick={() => {
            dispatch({ type: 'renamed', id: card.id, title: title.trim() || card.title })
            setIsEditing(false)
          }}
        >
          Save
        </button>
      </li>
    )
  }

  return (
    <li className="card">
      {card.title}
      <div className="card-actions">
        <button
          aria-label={`Move ${card.title} left`}
          disabled={!canMove(-1)}
          onClick={() => dispatch({ type: 'moved', id: card.id, direction: -1 })}
        >
          ←
        </button>
        <button
          aria-label={`Move ${card.title} right`}
          disabled={!canMove(1)}
          onClick={() => dispatch({ type: 'moved', id: card.id, direction: 1 })}
        >
          →
        </button>
        <button
          aria-label={`Rename ${card.title}`}
          onClick={() => {
            setTitle(card.title)
            setIsEditing(true)
          }}
        >
          ✎
        </button>
        <button aria-label={`Delete ${card.title}`} onClick={() => dispatch({ type: 'deleted', id: card.id })}>
          ✕
        </button>
      </div>
    </li>
  )
}
