// Lesson 15: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

import { useState } from 'react'

export type Stop = { id: string; city: string; nights: number }

export function TripPlanner({ initialStops }: { initialStops: Stop[] }) {
  const [stops, setStops] = useState(initialStops)
  // Store the id. The id never goes stale: the *current* stop object is always
  // looked up from `stops`, the single source of truth.
  const [selectedId, setSelectedId] = useState<string | null>(initialStops[0]?.id ?? null)

  // Derived. If the stop was removed, `find` returns undefined → "No stop selected".
  // No extra cleanup code is needed in removeStop.
  const selected = stops.find((stop) => stop.id === selectedId)

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
            <button aria-pressed={stop.id === selectedId} onClick={() => setSelectedId(stop.id)}>
              Choose {index + 1}
            </button>
            <button onClick={() => removeStop(stop.id)}>Remove {index + 1}</button>
          </li>
        ))}
      </ol>

      <section aria-label="Details" className="details">
        {selected ? (
          <p>
            {selected.city} · {selected.nights} {selected.nights === 1 ? 'night' : 'nights'}
          </p>
        ) : (
          <p>No stop selected</p>
        )}
      </section>
    </div>
  )
}
