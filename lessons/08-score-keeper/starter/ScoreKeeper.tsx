/*
 * LESSON 08 · Score keeper (snapshots and updaters)
 * Topic 2 · State & events (2 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * STATE IS A SNAPSHOT. Calling a setter doesn't change the variable you
 * already have. It asks React to re-render with a new value. Inside the
 * current render, `count` is fixed:
 *
 *   const [count, setCount] = useState(0)
 *
 *   function handleClick() {
 *     setCount(count + 1)
 *     console.log(count)                    // 0, still this render's snapshot
 *     setTimeout(() => alert(count), 3000)  // also 0
 *   }
 *
 * So this adds only 1, not 3:
 *
 *   setCount(count + 1)   // setCount(0 + 1)
 *   setCount(count + 1)   // setCount(0 + 1)
 *   setCount(count + 1)   // setCount(0 + 1)
 *
 * BATCHING: React collects all state updates from one event and re-renders
 * once at the end. To compute the next state from the PREVIOUS one,
 * including updates queued earlier in the same event, pass an UPDATER FUNCTION:
 *
 *   setCount((c) => c + 1)  // 0 → 1
 *   setCount((c) => c + 1)  // 1 → 2
 *   setCount((c) => c + 1)  // 2 → 3
 *
 * Use updaters whenever the next state depends on the previous one and you
 * might queue several updates, or when the update happens later (timers, async).
 *
 * ── Your task ─────────────────────────────────────────────────────
 * This is "predict, then fix". The code below LOOKS right, but most buttons
 * are broken.
 *
 *   Step 1: without running anything, predict the score (starting from 0) after:
 *     a) clicking +3 once
 *     b) clicking "Bonus: +3 then ×2" once
 *     c) clicking "+1 in 2 s", then +3 straight away, then waiting 2 seconds
 *     Then run `npm run lesson 8` and check. (Answers are folded at the bottom.)
 *
 *   Step 2: fix every handler with updater functions. Keep the addPoints
 *     helper's loop; the point is making queued updates work.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] The score starts at 0
 *   [ ] +1, +2 and +3 add 1, 2 and 3 points
 *   [ ] "Bonus: +3 then ×2" from a score of 1 gives 8
 *   [ ] "+1 in 2 s" adds to the score at the moment the timer fires: click it,
 *       then +3, and after 2 s the score is 4
 *   [ ] Reset sets the score to 0
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ setX(x + 1) several times in one handler    → setX((x) => x + 1)
 *   ✗ Reading state inside a timeout or promise    → it's a stale snapshot; use an updater
 *   ✗ Expecting `x` to change right after setX(…)  → it changes on the NEXT render
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 8               see it in the browser (hot reload)
 *   npm test -- lessons/08          run the tests in watch mode
 *   npm run lesson 8 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/state-as-a-snapshot
 *   https://react.dev/learn/queueing-a-series-of-state-updates
 */

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

// #region 💡 Hint: step 1 answers (predict first!)  (open only if stuck)
// a) 1. addPoints calls setScore(score + 1) three times, but `score` is 0
//    in this render's snapshot every time.
// b) 0. setScore(0 + 3), then setScore(0 * 2). Both read the same snapshot,
//    and the last one wins.
// c) 1. The timeout's callback closed over score = 0 from the render where
//    you clicked. Two seconds later it sets 0 + 1, wiping out the +3.
// #endregion
