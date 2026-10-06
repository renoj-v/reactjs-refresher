import { Accordion, type FaqItem } from './Accordion'
import './styles.css'

const faq: FaqItem[] = [
  { id: 'shipping', question: 'How long does shipping take?', answer: 'Orders ship within 24 hours and arrive in 2–4 business days.' },
  { id: 'returns', question: 'Can I return an item?', answer: 'Yes. Unused items can be returned within 30 days for a full refund.' },
  { id: 'warranty', question: 'Is there a warranty?', answer: 'All grinders and kettles come with a two-year warranty.' },
]

export default function App() {
  return (
    <>
      <h2>Frequently asked questions</h2>
      <Accordion items={faq} defaultOpenId="shipping" />
    </>
  )
}
