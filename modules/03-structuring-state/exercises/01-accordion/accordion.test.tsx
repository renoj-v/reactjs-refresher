import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion, type FaqItem } from './starter/Accordion'

const faq: FaqItem[] = [
  { id: 'shipping', question: 'How long does shipping take?', answer: 'Two to four days.' },
  { id: 'returns', question: 'Can I return an item?', answer: 'Within 30 days.' },
  { id: 'warranty', question: 'Is there a warranty?', answer: 'Two years.' },
]

const question = (name: string) => screen.getByRole('button', { name })

describe('Accordion', () => {
  it('opens the default panel initially', () => {
    render(<Accordion items={faq} defaultOpenId="returns" />)
    expect(question('Can I return an item?')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Within 30 days.')).toBeInTheDocument()
    expect(question('How long does shipping take?')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Two to four days.')).toBeNull()
  })

  it('starts fully closed without a default', () => {
    render(<Accordion items={faq} />)
    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('closes the open panel when another one opens', async () => {
    const user = userEvent.setup()
    render(<Accordion items={faq} defaultOpenId="shipping" />)

    await user.click(question('Is there a warranty?'))

    expect(screen.getByText('Two years.')).toBeInTheDocument()
    expect(screen.queryByText('Two to four days.')).toBeNull()
    expect(question('How long does shipping take?')).toHaveAttribute('aria-expanded', 'false')
  })

  it('only ever has one panel open', async () => {
    const user = userEvent.setup()
    render(<Accordion items={faq} />)
    await user.click(question('How long does shipping take?'))
    await user.click(question('Can I return an item?'))
    await user.click(question('Is there a warranty?'))

    const expanded = screen.getAllByRole('button').filter((b) => b.getAttribute('aria-expanded') === 'true')
    expect(expanded).toHaveLength(1)
  })

  it('closes the open panel when its question is clicked again', async () => {
    const user = userEvent.setup()
    render(<Accordion items={faq} defaultOpenId="shipping" />)
    await user.click(question('How long does shipping take?'))
    expect(question('How long does shipping take?')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Two to four days.')).toBeNull()
  })
})
