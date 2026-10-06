import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// `@exercise` is aliased to the exercise folder picked by `npm run exercise`.
import App from '@exercise/App'
import './runner.css'

declare const __EXERCISE_LABEL__: string

document.title = __EXERCISE_LABEL__

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header className="runner-banner">{__EXERCISE_LABEL__}</header>
    <main className="runner-main">
      <App />
    </main>
  </StrictMode>,
)
