# Exercise 1.1 — Product card

Build a reusable `ProductCard` for a shop's product grid.

**You'll practise:** JSX, typed props, optional props with defaults, expressions in `{}`.

## Task

Open [`starter/ProductCard.tsx`](starter/ProductCard.tsx) and finish the component. It receives:

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | |
| `price` | `number` | e.g. `12.5` |
| `imageUrl` | `string` | |
| `description` | `string` (optional) | |
| `currency` | `string` (optional) | Defaults to `'USD'` |

## Acceptance criteria

- [ ] The card is an `<article>` with the product name as a level-2 heading.
- [ ] An image shows `imageUrl` with the product name as its `alt` text.
- [ ] The price is formatted as currency: `12.5` → `$12.50`, and with `currency="EUR"`, `8` → `€8.00`.
- [ ] The description is shown only when one is passed.
- [ ] `App.tsx` renders at least two cards, one with a description and one without.

<details>
<summary>Hint: formatting currency</summary>

The browser has a built-in formatter, so you don't need a library:

```ts
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(12.5) // "$12.50"
```

</details>

## Run it

```bash
npm run exercise 01 01          # see it in the browser
npm test -- 01-product-card      # run the tests (watch mode)
npm run exercise 01 01 --solution  # compare with the reference solution
```
