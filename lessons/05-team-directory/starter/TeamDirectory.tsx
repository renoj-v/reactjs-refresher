/*
 * LESSON 05 · Team directory
 * Topic 1 · Thinking in React (5 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * When you get a mockup, "Thinking in React" goes like this:
 *
 *   1. Break the UI into a component hierarchy. Draw boxes; each component
 *      should ideally do one thing.
 *   2. Build a STATIC version from props only, with no state yet.
 *   3. Find the minimal state.              (lessons 07 and up)
 *   4. Decide where that state lives.       (lessons 13 and up)
 *   5. Add inverse data flow (child → parent via callback props).
 *
 * This lesson covers steps 1 and 2.
 *
 * KEEP COMPONENTS PURE. Given the same props, a component returns the same
 * JSX and changes nothing outside itself during render. React may render a
 * component more than once; in development, <StrictMode> deliberately
 * double-renders to surface impure code. Side effects belong in event
 * handlers (lesson 07 onwards).
 *
 * Shape data with plain, pure functions outside the component, and call them
 * during render. Don't store the result anywhere: derived data can't go stale.
 *
 * The React Compiler (enabled in this repo) relies on purity. It
 * automatically memoizes pure components, which is why you'll rarely write
 * useMemo or memo by hand anymore.
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Your designer handed you this mockup:
 *
 *   ┌───────────────────────────────────────────────┐
 *   │ 6 people across 3 departments                 │  ← TeamDirectory
 *   │                                               │
 *   │ Engineering (3)                               │  ← DepartmentSection
 *   │  ┌─────────────────────────────────────────┐  │
 *   │  │ Priya Patel · Staff Engineer  [On call] │  │  ← MemberRow
 *   │  │ Tom Becker · Frontend Engineer          │  │
 *   │  │ Lena Ortiz · SRE              [On call] │  │
 *   │  └─────────────────────────────────────────┘  │
 *   │ Design (2)  …                                 │
 *   │ Sales (1)   …                                 │
 *   └───────────────────────────────────────────────┘
 *
 *   1. Implement groupByDepartment(members). It returns { department, members }[]
 *      with departments in ORDER OF FIRST APPEARANCE, and must not mutate its input.
 *   2. Split the UI into TeamDirectory → DepartmentSection → MemberRow.
 *      The tests only check behaviour; the solution shows the intended split.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] groupByDepartment groups members, keeping first-appearance order
 *   [ ] groupByDepartment doesn't mutate its input
 *   [ ] A summary line: "6 people across 3 departments"
 *   [ ] One <section> per department, each with a level-2 heading like "Engineering (3)", in order
 *   [ ] Each member appears in their department's section with their name and role
 *   [ ] On-call members show an "On call" badge; nobody else does
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ One giant component                → one component per box in the mockup
 *   ✗ Grouping inside JSX with nested loops → a small pure helper, called during render
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 5               see it in the browser (hot reload)
 *   npm test -- lessons/05          run the tests in watch mode
 *   npm run lesson 5 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/thinking-in-react
 *   https://react.dev/learn/keeping-components-pure
 */

export type Member = {
  id: string
  name: string
  role: string
  department: string
  onCall?: boolean
}

export type DepartmentGroup = {
  department: string
  members: Member[]
}

export function groupByDepartment(members: Member[]): DepartmentGroup[] {
  // TODO: group by department, preserving first-appearance order. Don't mutate `members`.
  return []
}

// TODO: create a `MemberRow` component (name · role, plus an "On call" badge when needed).

// TODO: create a `DepartmentSection` component (<section> + <h2>Department (count)</h2> + list of MemberRows).

export function TeamDirectory({ members }: { members: Member[] }) {
  // TODO: summary line "N people across M departments", then one DepartmentSection per group.
  return (
    <div>
      {members.map((member) => (
        <p key={member.id}>{member.name}</p>
      ))}
    </div>
  )
}

// #region 💡 Hint: grouping in modern JS  (open only if stuck)
// Map.groupBy (ES2024) returns a Map, and Maps remember insertion order:
//
//   const map = Map.groupBy(members, (m) => m.department)
//   Array.from(map, ([department, members]) => ({ department, members }))
// #endregion
