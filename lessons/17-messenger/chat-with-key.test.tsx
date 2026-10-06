import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Messenger, type Contact } from './starter/Messenger'

const contacts: Contact[] = [
  { id: 'taylor', name: 'Taylor' },
  { id: 'alice', name: 'Alice' },
]

function setup() {
  const user = userEvent.setup()
  render(<Messenger contacts={contacts} />)
  const messages = () => within(screen.getByRole('list', { name: 'Messages' })).queryAllByRole('listitem')
  const send = async (text: string) => {
    await user.type(screen.getByLabelText('Message'), text)
    await user.click(screen.getByRole('button', { name: 'Send' }))
  }
  return { user, messages, send }
}

describe('Messenger', () => {
  it('shows the selected contact', async () => {
    const { user } = setup()
    expect(screen.getByRole('heading', { name: 'Chat with Taylor' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Alice' }))
    expect(screen.getByRole('heading', { name: 'Chat with Alice' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Alice' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('sends a message and clears the input', async () => {
    const { messages, send } = setup()
    await send('  Hi Taylor!  ')
    expect(messages().map((li) => li.textContent)).toEqual(['Hi Taylor!'])
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })

  it('ignores blank messages', async () => {
    const { messages, send } = setup()
    await send('   ')
    expect(messages()).toHaveLength(0)
  })

  it('gives each contact an empty draft', async () => {
    const { user } = setup()
    await user.type(screen.getByLabelText('Message'), 'Unsent words for Taylor')
    await user.click(screen.getByRole('button', { name: 'Alice' }))
    expect(screen.getByLabelText('Message')).toHaveValue('')
  })

  it('does not leak messages between contacts', async () => {
    const { user, messages, send } = setup()
    await send('Secret for Taylor')
    await user.click(screen.getByRole('button', { name: 'Alice' }))
    expect(messages()).toHaveLength(0)
  })
})
