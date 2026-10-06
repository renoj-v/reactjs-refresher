# Exercise 3.5 — Messenger (resetting state with `key`)

A two-pane chat app. Pick a contact on the left and chat on the right.

**You'll practise:** how React decides to keep or reset state (position in the tree), and resetting state on purpose with `key`.

## Task

In [`starter/Messenger.tsx`](starter/Messenger.tsx):

1. Implement **Send** in `ChatThread`: append the trimmed draft to the thread's messages and clear the input. Ignore empty drafts.
2. In the browser, type a message to Taylor (don't send it), then switch to Alice. Taylor's draft is still there, now addressed to Alice! Sent messages leak across contacts too. Fix it **without** changing `ChatThread`.

## Acceptance criteria

- [ ] The thread heading reads **"Chat with ⟨name⟩"**, and the selected contact's button has `aria-pressed="true"`.
- [ ] **Send** adds the message to the thread and clears the input. Blank messages are ignored.
- [ ] Switching contacts gives an **empty draft**.
- [ ] Switching contacts shows **no messages from the previous thread**.

## Stretch goal (not tested)

Users would actually prefer their unsent drafts to be *kept per contact*: switch away and back, and the draft is still there. Implement it by lifting the drafts up into `Messenger` as `Record<contactId, string>` and making the input controlled by props. Why does `key` alone not help here?

## Run it

```bash
npm run exercise 03 05
npm test -- 05-chat-with-key
```
