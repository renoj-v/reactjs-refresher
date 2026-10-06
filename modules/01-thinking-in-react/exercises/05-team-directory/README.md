# Exercise 1.5 — Team directory (Thinking in React)

Your designer handed you this mockup for a company directory:

```
┌───────────────────────────────────────────────┐
│ 6 people across 3 departments                 │  ← TeamDirectory
│                                               │
│ Engineering (3)                               │  ← DepartmentSection
│  ┌─────────────────────────────────────────┐  │
│  │ Priya Patel · Staff Engineer  [On call] │  │  ← MemberRow
│  │ Tom Becker · Frontend Engineer          │  │
│  │ Lena Ortiz · SRE              [On call] │  │
│  └─────────────────────────────────────────┘  │
│ Design (2)                                    │
│  …                                            │
│ Sales (1)                                     │
│  …                                            │
└───────────────────────────────────────────────┘
```

Build it as a **static** UI (props only, no state) from a flat array of members.

**You'll practise:** step 1 of "Thinking in React" (breaking a UI into a component hierarchy) and step 2 (building a static version), plus grouping data in a pure helper.

## Task

In [`starter/TeamDirectory.tsx`](starter/TeamDirectory.tsx):

1. Implement `groupByDepartment(members)`. It returns `{ department, members }[]` with departments in **order of first appearance**, and must not mutate its input.
2. Split the UI into at least three components: `TeamDirectory` → `DepartmentSection` → `MemberRow`. The tests only check behaviour, but the solution shows the intended split.

## Acceptance criteria

- [ ] `groupByDepartment` groups members, keeps first-appearance order, and doesn't mutate the input.
- [ ] A summary line: **"6 people across 3 departments"**.
- [ ] One `<section>` per department with a level-2 heading like **"Engineering (3)"**.
- [ ] Each member appears in their department's section with their name and role.
- [ ] On-call members show an **"On call"** badge. Others don't.

<details>
<summary>Hint: grouping in modern JS</summary>

`Map.groupBy(items, (item) => key)` returns a `Map`, and a `Map` remembers insertion order:

```ts
const map = Map.groupBy(members, (m) => m.department)
Array.from(map, ([department, members]) => ({ department, members }))
```

</details>

## Run it

```bash
npm run exercise 01 05
npm test -- 05-team-directory
```
