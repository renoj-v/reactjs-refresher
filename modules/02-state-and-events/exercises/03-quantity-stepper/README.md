# Exercise 2.3 — Quantity stepper

The − / + control on a product page. It keeps its own quantity and tells its parent whenever the value changes.

**You'll practise:** event-handler props (`onChange`), bounds and disabled states, and where side effects belong.

## Task

[`starter/QuantityStepper.tsx`](starter/QuantityStepper.tsx) half-works, but it has a subtle bug. The tests render it inside `<StrictMode>`, just like `main.tsx` does in a real app. Try clicking + in the browser with the console open.

Props: `initial` (default 1), `min` (default 1), `max` (default 10), `onChange?(next: number)`.

## Acceptance criteria

- [ ] Shows the current quantity (in an `<output aria-label="Quantity">`).
- [ ] The buttons are labelled **"Decrease quantity"** and **"Increase quantity"** for screen readers (the visible text is just − and +).
- [ ] `onChange` is called **exactly once** per click, with the new value.
- [ ] "Decrease" is disabled at `min`, and "Increase" is disabled at `max`.
- [ ] At `max`, a hint shows: **"Limit 10 per order"**.

<details>
<summary>Hint: why is onChange called twice?</summary>

In development, StrictMode calls your **updater functions twice** to help you find impure ones. An updater should only calculate the next state. Calling `onChange` inside it is a side effect. Side effects belong in the **event handler**: work out `next` there, then call both `setQuantity(next)` and `onChange?.(next)`.

</details>

## Run it

```bash
npm run exercise 02 03
npm test -- 03-quantity-stepper
```
