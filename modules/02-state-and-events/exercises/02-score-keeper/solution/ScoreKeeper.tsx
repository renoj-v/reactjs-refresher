import { useState } from 'react'

export function ScoreKeeper() {
  const [score, setScore] = useState(0)

  function addPoints(points: number) {
    for (let i = 0; i < points; i++) {
      // `score` is a snapshot: it's the same number for every loop iteration.
      // An updater receives the *pending* state, so the queued updates chain:
      // 0 → 1 → 2 → 3. React still batches them into a single re-render.
      setScore((s) => s + 1)
    }
  }

  function bonusRound() {
    // Updaters run in order against the latest pending value: (s + 3) then (× 2).
    setScore((s) => s + 3)
    setScore((s) => s * 2)
  }

  function addPointLater() {
    setTimeout(() => {
      // This callback was created during an older render. Reading `score` here
      // would give that render's (stale) value. The updater asks React for
      // the current value at the moment the timer fires.
      setScore((s) => s + 1)
    }, 2000)
  }

  return (
    <div className="scoreboard">
      {/* <output> is the semantic element for a calculated result. */}
      <output aria-label="Score">{score}</output>
      <div className="buttons">
        <button onClick={() => addPoints(1)}>+1</button>
        <button onClick={() => addPoints(2)}>+2</button>
        <button onClick={() => addPoints(3)}>+3</button>
        <button onClick={bonusRound}>Bonus: +3 then ×2</button>
        <button onClick={addPointLater}>+1 in 2 s</button>
        {/* Reset doesn't depend on the previous value, so a plain value is fine. */}
        <button onClick={() => setScore(0)}>Reset</button>
      </div>
    </div>
  )
}
