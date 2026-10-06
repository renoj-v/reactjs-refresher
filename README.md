# React Refresher

A hands-on, self-paced course for relearning **modern React**: React 19, TypeScript, and the React Compiler, built around current best practices. No class components, no Create React App, and no `useEffect` for data fetching.

Each lesson lives in the code you're about to edit. There's no separate reading.

1. **Open the lesson's main starter file.** The comment at the top teaches the concept, gives you the task, and lists the acceptance criteria (one per test).
2. **Write code** below the comment, following the `TODO`s.
3. **Get instant feedback** from tests that fail until your solution is right.
4. **Stuck?** Folded `// #region 💡 Hint` blocks sit at the bottom of the file.
5. **Compare** with `solution/`, whose comments explain the *why*.

Every sixth lesson is a **topic project** that combines what came before. It ends with five "Check your understanding" questions, and the answers are folded at the bottom of the file.

## Quick start

Requires **Node 22.22+** (`.nvmrc` pins Node 24: run `nvm use`).

```bash
npm install
npm run lesson 1              # opens lesson 1's starter in the browser
npm test -- lessons/01        # runs lesson 1's tests in watch mode
```

Then open `lessons/01-product-card/starter/ProductCard.tsx` and start reading at the top. Tick lessons off in [`PROGRESS.md`](PROGRESS.md) as you go.

> 💡 **VS Code tip:** run **Fold All Regions** (`⌘K ⌘8` / `Ctrl+K Ctrl+8`) so the hints stay collapsed until you want them.

## Commands

| Command | What it does |
|---|---|
| `npm run lesson 7` | Runs lesson 7's **starter** in the browser (hot reload) |
| `npm run lesson 7 --solution` | Runs the reference **solution** instead |
| `npm run lesson list` | Lists every lesson |
| `npm test -- lessons/07` | Runs one lesson's tests in watch mode |
| `npm test` | Runs every test in watch mode. Expect lots of red until you've solved things! |
| `npm run dev` | Starts the blank [`playground/`](playground) sandbox for free experimentation |
| `npm run test:solutions` | Runs the same tests against the reference solutions |
| `npm run verify` | Course self-check: every starter must fail and every solution must pass |
| `npm run typecheck` | TypeScript type-check |
| `npm run lint` | ESLint, including the official React Hooks / React Compiler rules |

### How the tests find your code

Each lesson's tests import from `./starter/…`, which is your code. `npm run test:solutions` runs the same test files with those imports redirected to `./solution/…` (see [`vitest.config.ts`](vitest.config.ts)). So a test passing against `solution/` is exactly the bar your starter needs to clear.

## Lessons

| # | Lesson | Topic |
|---|---|---|
| 01 | Product card: components, JSX, props | **1 · Thinking in React** |
| 02 | Composition with `children` | |
| 03 | Contact list: lists and keys | |
| 04 | Conditional badges: conditional rendering, the `0` trap | |
| 05 | Team directory: Thinking in React, purity | |
| 06 | 🏁 **Project:** Recipe catalog | |
| 07 | Like button: events, `useState` | **2 · State & events** |
| 08 | Score keeper: snapshots, batching, updaters | |
| 09 | Quantity stepper: event-handler props, where side effects go | |
| 10 | Shipping form: updating objects | |
| 11 | Todo list: updating arrays | |
| 12 | 🏁 **Project:** Shopping cart | |
| 13 | FAQ accordion: lifting state up | **3 · Structuring state** |
| 14 | Search filter: derived state | |
| 15 | Trip planner: store IDs, not copies | |
| 16 | Task manager: `useReducer` | |
| 17 | Messenger: resetting state with `key` | |
| 18 | 🏁 **Project:** Kanban board | |
| 19–24 | *Coming next:* form Actions, `useActionState`, `useFormStatus`, `useOptimistic` | 4 · Forms |
| 25–30 | `useRef`, ref as a prop, `useImperativeHandle` | 5 · Refs & the DOM |
| 31–36 | Synchronizing with external systems, cleanup, *You Might Not Need an Effect* | 6 · Effects |
| 37–42 | `createContext`, `use(Context)`, external stores | 7 · Context |
| 43–48 | Extracting logic, rules of hooks, API design | 8 · Custom hooks |
| 49–54 | Suspense, `use()`, error boundaries, TanStack Query | 9 · Data fetching |
| 55–60 | React Router (data mode), loaders and actions | 10 · Routing |
| 61–66 | React Compiler, `memo`, `useTransition`, `useDeferredValue`, Profiler | 11 · Performance |
| 67–72 | RTL philosophy, user-event, async UI, MSW | 12 · Testing |
| 73–78 | Typing props, events, reducers, context, generic components | 13 · TypeScript |
| 79–84 | RSC mental model, `"use client"` / `"use server"`, Server Functions (Next.js) | 14 · Server Components |
| 🏁 | [Final project](final-project/spec.ts): a mini issue tracker | |

## Tech stack

All versions are pinned exactly in [`package.json`](package.json).

| Tool | Version | Notes |
|---|---|---|
| React / React DOM | 19.3 | |
| Vite | 8.3 | with `@vitejs/plugin-react` 6 |
| React Compiler | `babel-plugin-react-compiler` 1.0 | Enabled via the stable Babel route. The Rust/OXC compiler is still experimental. |
| TypeScript | 6.0 | TypeScript 7 is out, but `typescript-eslint` doesn't support it yet |
| Vitest | 5.0 | jsdom environment |
| React Testing Library | 16.3 | with `user-event` 14 and `jest-dom` |
| ESLint | 10 | with `eslint-plugin-react-hooks` 7 and `typescript-eslint` |
| Styling | Plain CSS | CSS Modules work out of the box; there's no Tailwind |

## Repo layout

```
README.md                 → you are here (the only README)
PROGRESS.md               → your checklist
lessons/
  01-product-card/
    starter/              → your code; the main file starts with the lesson
    solution/             → reference solution, with comments explaining why
    *.test.tsx            → tests (run against starter/)
  …
  06-project-recipe-catalog/   → every 6th lesson is a topic project
playground/               → blank Vite + React sandbox (npm run dev)
final-project/spec.ts     → spec for the capstone app
runner/, scripts/         → the machinery behind `npm run lesson` and `npm run verify`
```

## Ground rules for learning

- **Try before peeking.** Struggle for 10 minutes before opening `solution/`.
- **Some starters contain deliberate bugs.** The lesson comment says so when they do.
- **Lint warnings in `starter/` are hints.** The React Hooks plugin catches many of the anti-patterns the lessons are about.
- **Use the playground** whenever a snippet makes you wonder "what if…?"
