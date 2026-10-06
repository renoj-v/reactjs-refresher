import { useState } from 'react'

export function ScoreKeeper() {
  const [score, setScore] = useState(0)

  // Adds points one at a time (imagine each point triggers an animation).
  // TODO: why does +3 only add 1? Fix it with an updater function.
  function addPoints(points: number) {
    for (let i = 0; i < points; i++) {
      setScore(score + 1)
    }
  }

  // TODO: from a score of 1 this should give (1 + 3) × 2 = 8.
  function bonusRound() {
    setScore(score + 3)
    setScore(score * 2)
  }

  // TODO: if you click +3 while this is waiting, those points get lost. Why?
  function addPointLater() {
    setTimeout(() => {
      setScore(score + 1)
    }, 2000)
  }

  return (
    <div className="scoreboard">
      <output aria-label="Score">{score}</output>
      <div className="buttons">
        <button onClick={() => addPoints(1)}>+1</button>
        <button onClick={() => addPoints(2)}>+2</button>
        <button onClick={() => addPoints(3)}>+3</button>
        <button onClick={bonusRound}>Bonus: +3 then ×2</button>
        <button onClick={addPointLater}>+1 in 2 s</button>
        <button onClick={() => setScore(0)}>Reset</button>
      </div>
    </div>
  )
}
