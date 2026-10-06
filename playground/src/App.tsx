import { useState } from 'react'

// Your sandbox. Delete everything here and experiment freely.
export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Playground</h1>
      <p>Edit <code>playground/src/App.tsx</code> and save; the page hot-reloads.</p>
      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </main>
  )
}
