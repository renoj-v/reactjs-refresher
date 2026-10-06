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
