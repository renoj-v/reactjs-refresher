# Final project: Tracker, a mini issue tracker

Build a small Linear/GitHub-Issues-style app that brings together everything in the course. Unlike the exercises there's no starter code: you set it up, you choose the structure, and you write the tests.

> Start after Module 13. Module 14 offers an optional stretch: porting the app to Next.js.

## What you're building

```
┌───────────────┬────────────────────────────────────────────────────┐
│ Tracker       │  Issues                          [ + New issue ]   │
│               │  [Search…]  Status ▾  Priority ▾  Assignee ▾       │
│ ▸ All issues  │  ─────────────────────────────────────────────────  │
│ ▸ My issues   │  TRK-12  Login button misaligned   ● In progress  P2│
│ ▸ Projects    │  TRK-11  Add dark mode             ○ Todo         P3│
│   • Web       │  TRK-10  Crash on empty cart       ● Done         P1│
│   • Mobile    │  …                                                 │
│               │                                                    │
│ ☾ Theme       │                                                    │
└───────────────┴────────────────────────────────────────────────────┘
```

**Stack:** Vite + React 19 + TypeScript + React Compiler (same as this repo), React Router (data mode), TanStack Query, MSW as a fake REST API, and Vitest + RTL.

## Data model

```ts
type Status = 'backlog' | 'todo' | 'in_progress' | 'done' | 'cancelled'
type Priority = 1 | 2 | 3 | 4 // 1 = urgent

type Issue = {
  id: string            // "TRK-12"
  title: string
  description: string   // plain text or markdown
  status: Status
  priority: Priority
  assigneeId: string | null
  projectId: string
  createdAt: string     // ISO date
  updatedAt: string
}

type User = { id: string; name: string; avatarUrl?: string }
type Project = { id: string; name: string; key: string }
```

Seed MSW with about **1,000 issues** so performance actually matters.

### Fake API (MSW handlers)

| Method | Path | Notes |
|---|---|---|
| GET | `/api/issues?status=&priority=&assignee=&project=&q=&page=` | Paginated, 50 per page |
| GET | `/api/issues/:id` | |
| POST | `/api/issues` | Validates `title` (required, ≤ 120 chars). Returns 422 with field errors |
| PATCH | `/api/issues/:id` | Partial update |
| DELETE | `/api/issues/:id` | |
| GET | `/api/users`, `/api/projects` | |

Add 300–800 ms of random latency, plus a 5% random failure rate that you can toggle, so you have to handle loading and error states properly.

## Milestones

### 1. Setup and data model
- Scaffold with Vite, enable the React Compiler and ESLint (copy this repo's configs).
- Write the MSW handlers and seed data, running in the browser and in tests.
- ✅ *Done when:* `GET /api/issues` returns data in the browser's Network tab.

### 2. Routing and issue list *(Modules 9, 10)*
- Routes: `/issues`, `/issues/:id`, `/projects/:projectId`, plus a 404 and a route error boundary.
- Layout route with a sidebar and `<Outlet>`.
- Filters live in the **URL search params**, so a URL with filters can be shared.
- Fetch with TanStack Query. Show skeletons while loading and an error state with retry.
- ✅ *Done when:* changing a filter updates the URL, the back button restores the previous filter, and refreshing keeps it.

### 3. Issue detail and editing *(Modules 3, 4, 9)*
- Detail view (a side panel or full page) with editable status, priority and assignee. Each change is a mutation that invalidates or updates the list cache.
- Inline title editing: `Esc` cancels, `Enter` saves.
- ✅ *Done when:* editing in the detail view immediately shows in the list.

### 4. Create issue with optimistic UI *(Modules 4, 5)*
- "New issue" dialog using a native `<dialog>` and a ref, with the form using `useActionState`, server validation errors shown per field, and `useFormStatus` on the submit button.
- The new issue appears in the list **optimistically**, and rolls back with a toast if the request fails.
- Focus moves into the dialog on open and returns to the trigger on close.
- ✅ *Done when:* with the failure rate turned up, a failed create rolls back cleanly.

### 5. Filters, search and performance *(Modules 7, 8, 11)*
- Theme (light/dark/system) via context, persisted with your `useLocalStorage` hook.
- A "current user" context, used for "My issues".
- Search is debounced (`useDeferredValue` or your `useDebouncedValue`). Typing never feels laggy with 1,000 issues.
- Profile the list with React DevTools. Confirm the compiler is memoizing rows, and fix anything that re-renders needlessly.
- Keyboard shortcuts via a custom hook: `c` opens the create dialog, `/` focuses search, and `j`/`k` move the selection.
- ✅ *Done when:* the Profiler shows that changing one issue's status re-renders only that row (plus its parents).

### 6. Test suite *(Module 12)*
- At least 15 tests, all using MSW and RTL, covering filtering via the URL, creating an issue (including validation errors), optimistic rollback, the detail-edit → list update, and the 404 and error routes.
- Unit tests for any reducers and custom hooks.
- ✅ *Done when:* `npm test` passes, and no test relies on implementation details such as class names or internal state.

## Acceptance checklist

- [ ] TypeScript strict mode, no `any`
- [ ] `npm run lint` is clean (React Hooks + Compiler rules)
- [ ] No `useEffect` used for data fetching, and every remaining Effect synchronizes with something external
- [ ] Every interactive element is reachable and usable by keyboard, with visible focus
- [ ] Loading, empty and error states exist for every async view
- [ ] Filters and selection survive a page refresh (URL as state)

## Stretch goals

- **Board view:** a Kanban by status with native drag and drop (reuse your Module 3 project!).
- **Bulk actions:** multi-select with shift-click, then change status for all selected issues at once.
- **Undo:** "Issue deleted. Undo" toast.
- **Comments** on issues with optimistic posting.
- **Next.js port:** after Module 14, rebuild the list and detail views as Server Components, with Server Functions for mutations. Compare the amount of client JS.
