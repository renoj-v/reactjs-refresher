# React Refresher

A hands-on, self-paced course for relearning **modern React**: React 19, TypeScript, and the React Compiler, built around current best practices. No class components, no Create React App, and no `useEffect` for data fetching.

Each module follows the same loop:

1. **Read** a short lesson (about 10 minutes) with small, real-world examples.
2. **Solve** 3–5 exercises that build in difficulty. Each one has starter code with TODOs.
3. **Get instant feedback** from tests that fail until your solution is right.
4. **Compare** with a reference solution whose comments explain the *why*.
5. **Build** a mini-project that combines the module's ideas, then answer 5 quick conceptual questions.

## Quick start

Requires **Node 22.22+** (`.nvmrc` pins Node 24: run `nvm use`).

```bash
npm install
npm run exercise 01 01          # open exercise 1.1's starter in the browser
npm test -- modules/01          # run Module 1's tests in watch mode
```

Then open [`modules/01-thinking-in-react/README.md`](modules/01-thinking-in-react/README.md) and start reading. Tick things off in [`PROGRESS.md`](PROGRESS.md) as you go.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the blank [`playground/`](playground) sandbox for free experimentation |
| `npm run exercise 03 02` | Runs Module 3, Exercise 2's **starter** in the browser (hot reload) |
| `npm run exercise 03 02 --solution` | Runs the reference **solution** instead |
| `npm run exercise 03 project` | Runs Module 3's mini-project |
| `npm run exercise list` | Lists every module and exercise |
| `npm test -- modules/03` | Runs one module's tests in watch mode. Any path fragment works: `npm test -- 02-score-keeper` |
| `npm test` | Runs every test in watch mode. Expect lots of red until you've solved things! |
| `npm run test:solutions` | Runs the same tests against the reference solutions |
| `npm run verify` | Course self-check: every starter must fail and every solution must pass |
| `npm run typecheck` | TypeScript type-check |
| `npm run lint` | ESLint, including the official React Hooks / React Compiler rules |

### How the tests find your code

Each exercise's tests import from `./starter/…`, which is your code. `npm run test:solutions` runs the same test files with those imports redirected to `./solution/…` (see [`vitest.config.ts`](vitest.config.ts)). So a test passing against `solution/` is exactly the bar your starter needs to clear.

> 💡 **Tip:** Keep `npm test -- <exercise-name>` running in a terminal while you work. Each test name maps to one acceptance criterion in the exercise README, so a red test tells you exactly which requirement is missing.

## Course map

| # | Module | Mini-project | Status |
|---|---|---|---|
| 01 | [Thinking in React](modules/01-thinking-in-react): components, JSX, props, composition, lists, keys, conditional rendering | Recipe catalog | ✅ Ready |
| 02 | [State & events](modules/02-state-and-events): `useState`, snapshots, batching, updaters, immutable updates | Shopping cart | ✅ Ready |
| 03 | [Structuring state](modules/03-structuring-state): lifting state, derived state, `useReducer`, `key` | Kanban board | ✅ Ready |
| 04 | Forms: controlled vs. uncontrolled, form Actions, `useActionState`, `useFormStatus`, `useOptimistic` | Comments widget | 🚧 Next batch |
| 05 | Refs & the DOM: `useRef`, ref as a prop, `useImperativeHandle` | Image carousel | 🚧 |
| 06 | Effects, used properly: synchronizing with external systems, cleanup, *You Might Not Need an Effect*, `useSyncExternalStore` | Pomodoro timer | 🚧 |
| 07 | Context & app-wide state: `createContext`, `use(Context)`, external stores | Multi-step checkout | 🚧 |
| 08 | Custom hooks: extracting logic, rules of hooks, API design | Hooks library | 🚧 |
| 09 | Data fetching & async UI: Suspense, `use()`, error boundaries, TanStack Query | Movie watchlist | 🚧 |
| 10 | Routing: React Router (data mode), nested routes, loaders and actions | Blog CMS | 🚧 |
| 11 | Performance: rendering, React Compiler, `memo`, `useTransition`, `useDeferredValue`, Profiler | Fast data grid | 🚧 |
| 12 | Testing: RTL philosophy, user-event, async UI, MSW | Test suite for the Blog CMS | 🚧 |
| 13 | TypeScript with React: props, events, reducers, context, generic components | Typed form builder | 🚧 |
| 14 | Server Components & full-stack React: a separate Next.js App Router project | Guestbook | 🚧 |
| 🏁 | [Final project](final-project): a mini issue tracker combining everything | | Spec ready |

**Why Refs come before Effects:** react.dev teaches them in that order. Refs are the simpler escape hatch, and knowing them makes Effect cleanup easier to understand.

**TypeScript from day one:** every exercise is `.tsx`, and lessons include a short "TS corner". Module 13 goes deep on the advanced patterns.

## Tech stack

All versions are pinned exactly in [`package.json`](package.json).

| Tool | Version | Notes |
|---|---|---|
| React / React DOM | 19.3 | |
| Vite | 8.3 | with `@vitejs/plugin-react` 6 |
| React Compiler | `babel-plugin-react-compiler` 1.0 | Enabled via the stable Babel route (`@rolldown/plugin-babel` + `reactCompilerPreset`). The Rust/OXC compiler is still experimental. |
| TypeScript | 6.0 | TypeScript 7 (the native Go port) is out, but `typescript-eslint` doesn't support it yet |
| Vitest | 5.0 | jsdom environment |
| React Testing Library | 16.3 | with `user-event` 14 and `jest-dom` |
| ESLint | 10 | with `eslint-plugin-react-hooks` 7 (Rules of Hooks + Compiler rules) and `typescript-eslint` |
| Styling | Plain CSS | CSS Modules work out of the box; there's no Tailwind |

Later modules add React Router, TanStack Query, MSW and Next.js. Their versions are checked and pinned when those modules are built.

## Repo layout

```
README.md                 → you are here
PROGRESS.md               → your checklist
modules/
  01-thinking-in-react/
    README.md             → lesson, common mistakes, quiz, react.dev links
    exercises/
      01-product-card/
        README.md         → task + acceptance criteria
        starter/          → your code (App.tsx is what the browser shows)
        solution/         → reference solution, with comments explaining why
        *.test.tsx        → tests (run against starter/)
    project/              → mini-project: README spec, starter/, solution/, tests
playground/               → blank Vite + React sandbox (npm run dev)
final-project/            → spec for the capstone app
runner/                   → tiny harness that powers `npm run exercise`
scripts/                  → exercise runner + verify script
```

## Ground rules for learning

- **Try before peeking.** Struggle for 10 minutes before opening `solution/`. When you do look, read the comments.
- **Starters may contain deliberate bugs.** Some exercises are "find and fix", and the README says so.
- **Lint warnings in `starter/` are hints.** The React Hooks plugin catches many anti-patterns the exercises are about.
- **Use the playground** whenever a lesson snippet makes you wonder "what if…?"
