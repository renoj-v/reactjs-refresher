/*
 * LESSON 15 · Trip planner (store IDs, not copies)
 * Topic 3 · Structuring state (3 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * AVOID DUPLICATION: store IDs, not copies.
 *
 *   ✗ const [selected, setSelected] = useState(items[0])
 *     `selected` is a COPY. Edit the item in `items`, and `selected` goes stale.
 *
 *   ✓ const [selectedId, setSelectedId] = useState(items[0].id)
 *     const selected = items.find((item) => item.id === selectedId)   // looked up during render
 *
 * AVOID CONTRADICTIONS: one status value instead of several booleans.
 *
 *   ✗ const [isSending, setIsSending] = useState(false)
 *     const [isSent, setIsSent] = useState(false)       // can be "sending AND sent"
 *   ✓ const [status, setStatus] = useState<'typing' | 'sending' | 'sent'>('typing')
 *
 * AVOID DEEP NESTING. A nested tree is painful to update immutably, while a
 * flat list (or a lookup by ID) is easy.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * An itinerary editor: rename stops, change nights, remove stops, and choose
 * one to see its details. The starter stores the selected stop as an OBJECT.
 * In the browser:
 *   1. Choose "Lisbon", then rename it to "Porto" in the list. What do the details say?
 *   2. Choose a stop, then remove it. What do the details say now?
 * Fix both by storing the selected stop's ID.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] The first stop is selected initially: details show "Lisbon · 3 nights",
 *       and its "Choose 1" button has aria-pressed="true" (the others "false")
 *   [ ] Choosing another stop selects it ("Valencia · 1 night", singular)
 *   [ ] Renaming the selected stop updates the details immediately
 *   [ ] Changing the selected stop's nights updates the details immediately
 *   [ ] Removing the selected stop shows "No stop selected"
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ Storing the selected object      → store its id and look it up
 *   ✗ Several booleans for one status  → one union-typed status
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 15               see it in the browser (hot reload)
 *   npm test -- lessons/15          run the tests in watch mode
 *   npm run lesson 15 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/choosing-the-state-structure
 */

import { useState } from 'react'

export type Stop = { id: string; city: string; nights: number }

export function TripPlanner({ initialStops }: { initialStops: Stop[] }) {
  const [stops, setStops] = useState(initialStops)
  // TODO: this is a *copy* of an item in `stops`. What happens when that item changes?
  const [selected, setSelected] = useState<Stop | null>(initialStops[0] ?? null)

  function updateStop(id: string, changes: Partial<Stop>) {
    setStops(stops.map((stop) => (stop.id === id ? { ...stop, ...changes } : stop)))
  }

  function removeStop(id: string) {
    setStops(stops.filter((stop) => stop.id !== id))
  }

  return (
    <div className="planner">
      <ol>
        {stops.map((stop, index) => (
          <li key={stop.id}>
            <input
              aria-label={`Stop ${index + 1} city`}
              value={stop.city}
              onChange={(e) => updateStop(stop.id, { city: e.target.value })}
            />
            <input
              aria-label={`Stop ${index + 1} nights`}
              type="number"
              min={1}
              value={stop.nights}
              onChange={(e) => updateStop(stop.id, { nights: Number(e.target.value) })}
            />
            <button aria-pressed={selected?.id === stop.id} onClick={() => setSelected(stop)}>
              Choose {index + 1}
            </button>
            <button onClick={() => removeStop(stop.id)}>Remove {index + 1}</button>
          </li>
        ))}
      </ol>

      <section aria-label="Details" className="details">
        {/* TODO: pluralise "night"/"nights" */}
        {selected ? (
          <p>
            {selected.city} · {selected.nights} nights
          </p>
        ) : (
          <p>No stop selected</p>
        )}
      </section>
    </div>
  )
}
