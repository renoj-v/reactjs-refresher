# Exercise 3.1 — FAQ accordion (lifting state up)

A shop's FAQ page where only **one** answer may be open at a time.

**You'll practise:** lifting state to a common parent, turning a component into a *controlled* one, and accessible disclosure buttons.

## Task

In [`starter/Accordion.tsx`](starter/Accordion.tsx), each `Panel` keeps its own `isOpen` state, so several can be open at once. Panels can't know about each other's state, so the parent has to own it.

1. Remove the state from `Panel`. Make it controlled with `isOpen` and `onToggle` props.
2. Move the "which panel is open" state up into `Accordion`. Store the *id* of the open panel, or `null`.

## Acceptance criteria

- [ ] The panel matching `defaultOpenId` starts open; with no `defaultOpenId`, all start closed.
- [ ] Opening a panel closes the one that was open.
- [ ] Clicking the open panel's question closes it (so all can be closed).
- [ ] Each question is a button with `aria-expanded` reflecting its state.
- [ ] A closed panel's answer is not rendered.

## Run it

```bash
npm run exercise 03 01
npm test -- 01-accordion
```
