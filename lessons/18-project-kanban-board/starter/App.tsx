// Lesson 18: demo page shown by `npm run lesson 18`. Instructions are at the top of ./boardReducer.ts

import { Board } from './Board'
import type { BoardState } from './boardReducer'
import './styles.css'

const initialState: BoardState = {
  cards: [
    { id: 'c1', title: 'Design login page', column: 'todo' },
    { id: 'c2', title: 'Write e2e tests', column: 'todo' },
    { id: 'c3', title: 'API pagination', column: 'doing' },
    { id: 'c4', title: 'Fix flaky test', column: 'doing' },
    { id: 'c5', title: 'Dark mode', column: 'doing' },
    { id: 'c6', title: 'Set up CI', column: 'done' },
  ],
}

export default function App() {
  return <Board initialState={initialState} />
}
