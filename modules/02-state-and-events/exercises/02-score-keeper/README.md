# Exercise 2.2 — Score keeper (snapshots and updaters)

A basketball scoreboard. The code *looks* right, but most buttons are broken. This is a "predict, then fix" exercise.

**You'll practise:** state as a snapshot, batching, updater functions, and stale state in timers.

## Step 1: predict (no running code yet!)

Read [`starter/ScoreKeeper.tsx`](starter/ScoreKeeper.tsx). Starting from a score of **0**, write down what the score will be after clicking:

1. **+3** once
2. **Bonus: +3 then ×2** once
3. **+1 in 2 s**, then immediately **+3**, then wait 2 seconds

Now run `npm run exercise 02 02` and check your predictions.

<details>
<summary>Answers and explanations</summary>

1. **1.** `addPoints` calls `setScore(score + 1)` three times, but `score` is `0` in this render's snapshot each time.
2. **0.** Both setters read the same snapshot: `setScore(0 + 3)`, then `setScore(0 * 2)`, and the last one wins.
3. **1.** The timeout's callback closed over `score = 0` from the render when you clicked. Two seconds later it sets `0 + 1`, wiping out the +3.

</details>

## Step 2: fix it

Use **updater functions** so every button works, whatever else is queued or pending.

## Acceptance criteria

- [ ] **+1**, **+2** and **+3** add 1, 2 and 3 points.
- [ ] **Bonus: +3 then ×2** from a score of 1 gives **8**.
- [ ] **+1 in 2 s** adds one point to whatever the score is *when the timer fires*: click it, then +3 → score is **4** after 2 s.
- [ ] **Reset** sets the score to 0.
- [ ] Keep the `addPoints` helper (looping once per point). Don't replace it with `setScore(score + points)`. The point of this exercise is making queued updates work.

## Run it

```bash
npm run exercise 02 02
npm test -- 02-score-keeper
```
