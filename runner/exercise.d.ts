// Lets TypeScript understand the `@exercise/App` alias used by the runner.
declare module '@exercise/App' {
  import type { ComponentType } from 'react'
  const App: ComponentType
  export default App
}
