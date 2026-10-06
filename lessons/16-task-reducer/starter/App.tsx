// Lesson 16: demo page shown by `npm run lesson 16`. Instructions are at the top of ./tasksReducer.ts

import { TaskManager } from './TaskManager'
import type { Task } from './tasksReducer'
import './styles.css'

const initialTasks: Task[] = [
  { id: 't1', text: 'Write release notes', done: true },
  { id: 't2', text: 'Review pull request #42', done: false },
  { id: 't3', text: 'Update dependencies', done: false },
]

export default function App() {
  return <TaskManager initialTasks={initialTasks} />
}
