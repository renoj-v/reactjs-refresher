# Exercise 1.4 — Conditional badges

A shop's product tile shows different badges depending on stock, discounts and reviews. Get every condition right, including the classic `0` bug.

**You'll practise:** `&&`, ternaries, early `return null`, and avoiding the `0` trap.

## Task

Finish `ProductTile` in [`starter/ProductTile.tsx`](starter/ProductTile.tsx).

```ts
type Product = {
  name: string
  price: number
  salePrice?: number
  stock: number
  reviewCount: number
  discontinued?: boolean
}
```

## Acceptance criteria

- [ ] A **discontinued** product renders nothing at all.
- [ ] `stock === 0` → a **"Sold out"** badge, and the "Add to cart" button is disabled.
- [ ] `stock` between 1 and 5 → **"Only N left"**. No stock badge above 5.
- [ ] When `salePrice` is lower than `price`: a **"Save N%"** badge (rounded), the sale price, and the original price inside a `<del>` element. Otherwise just the normal price.
- [ ] Reviews show as **"(12 reviews)"**, or **"(1 review)"** for exactly one.
- [ ] With **0 reviews**, nothing about reviews is rendered, *not even a stray `0`*.

<details>
<summary>Hint: why is a "0" showing up?</summary>

`{reviewCount && <span>…</span>}` evaluates to `0` when `reviewCount` is `0`, and React renders numbers. Make the left side a real boolean: `reviewCount > 0 && …`.

</details>

## Run it

```bash
npm run exercise 01 04
npm test -- 04-conditional-badges
```
