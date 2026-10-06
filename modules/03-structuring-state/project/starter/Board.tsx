import { useReducer } from 'react'
import { boardReducer, COLUMNS, type BoardState } from './boardReducer'

export function Board({ initialState }: { initialState: BoardState }) {
  const [state, dispatch] = useReducer(boardReducer, initialState)

  // TODO: derived values (cards per column, done count, …)

  return (
    <div className="board-wrapper">
      <div className="board">
        {COLUMNS.map((column) => (
          <section key={column.id} aria-label={column.title} className="column">
            {/* TODO: heading with count (and "/3" for In progress) */}
            <h2>{column.title}</h2>
            {/* TODO: cards (a Card component with move/rename/delete) */}
            {/* TODO: add-card input + button */}
          </section>
        ))}
      </div>
      {/* TODO: "N of M cards done" */}
    </div>
  )
}
