// Lesson 11: demo page for the reference solution.

import { TodoList, type Todo } from './TodoList'
import './styles.css'

const initialTodos: Todo[] = [
  { id: 't1', text: 'Book flights', done: true },
  { id: 't2', text: 'Renew passport', done: false },
  { id: 't3', text: 'Buy travel adapter', done: false },
  { id: 't4', text: 'Pack bags', done: false },
]

export default function App() {
  return <TodoList initialTodos={initialTodos} />
}
