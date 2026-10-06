// Lesson 15: demo page for the reference solution.

import { TripPlanner, type Stop } from './TripPlanner'
import './styles.css'

const stops: Stop[] = [
  { id: 's1', city: 'Lisbon', nights: 3 },
  { id: 's2', city: 'Seville', nights: 2 },
  { id: 's3', city: 'Valencia', nights: 1 },
]

export default function App() {
  return <TripPlanner initialStops={stops} />
}
