import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from './App'

// A sample test so you can see the testing setup working in the playground.
it('counts clicks', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('button', { name: /clicked 0 times/i }))
  expect(screen.getByRole('button', { name: /clicked 1 times/i })).toBeInTheDocument()
})
