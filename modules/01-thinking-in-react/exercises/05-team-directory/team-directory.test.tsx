import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { groupByDepartment, TeamDirectory, type Member } from './starter/TeamDirectory'

const members: Member[] = [
  { id: 'm1', name: 'Priya Patel', role: 'Staff Engineer', department: 'Engineering', onCall: true },
  { id: 'm2', name: 'Jonas Berg', role: 'Product Designer', department: 'Design' },
  { id: 'm3', name: 'Tom Becker', role: 'Frontend Engineer', department: 'Engineering' },
  { id: 'm4', name: 'Aiko Tanaka', role: 'Account Executive', department: 'Sales' },
  { id: 'm5', name: 'Lena Ortiz', role: 'SRE', department: 'Engineering', onCall: true },
  { id: 'm6', name: 'Sam Okafor', role: 'Design Lead', department: 'Design' },
]

const sectionFor = (heading: string) => {
  const section = screen.getByRole('heading', { level: 2, name: heading }).closest('section')
  if (!section) throw new Error(`"${heading}" heading is not inside a <section>`)
  return section
}

describe('groupByDepartment', () => {
  it('groups members by department in order of first appearance', () => {
    const groups = groupByDepartment(members)
    expect(groups.map((g) => g.department)).toEqual(['Engineering', 'Design', 'Sales'])
    expect(groups[0].members.map((m) => m.name)).toEqual(['Priya Patel', 'Tom Becker', 'Lena Ortiz'])
  })

  it('does not mutate the input', () => {
    const frozen = Object.freeze([...members])
    expect(() => groupByDepartment(frozen as Member[])).not.toThrow()
    expect(frozen.map((m) => m.id)).toEqual(['m1', 'm2', 'm3', 'm4', 'm5', 'm6'])
  })
})

describe('TeamDirectory', () => {
  it('shows a summary line', () => {
    render(<TeamDirectory members={members} />)
    expect(screen.getByText('6 people across 3 departments')).toBeInTheDocument()
  })

  it('renders a section with a counted heading per department, in order', () => {
    render(<TeamDirectory members={members} />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(['Engineering (3)', 'Design (2)', 'Sales (1)'])
  })

  it('lists each member with their role inside their department section', () => {
    render(<TeamDirectory members={members} />)
    const design = within(sectionFor('Design (2)'))
    expect(design.getAllByRole('listitem')).toHaveLength(2)
    expect(design.getByText('Jonas Berg')).toBeInTheDocument()
    expect(design.getByText(/Product Designer/)).toBeInTheDocument()
    expect(design.queryByText('Priya Patel')).toBeNull()
  })

  it('shows an "On call" badge only for on-call members', () => {
    render(<TeamDirectory members={members} />)
    expect(within(sectionFor('Engineering (3)')).getAllByText('On call')).toHaveLength(2)
    expect(within(sectionFor('Design (2)')).queryByText('On call')).toBeNull()
  })
})
