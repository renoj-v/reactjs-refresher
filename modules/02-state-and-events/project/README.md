# Mini-project 2 — Shopping cart

A small coffee-gear shop with a working cart.

**Combines:** `useState`, event handlers, updater functions, immutable object and array updates, and derived values.

```
┌──────────────────────────────────┬──────────────────────────────┐
│ Products                         │ Cart (3)                     │
│ ┌──────────┐ ┌──────────┐        │ Pour-over  $34.00            │
│ │ Pour-over│ │ Grinder  │ …      │   [−] 2 [+]  $68.00 [Remove] │
│ │ $34.00   │ │ $129.00  │        │ Filters    $6.50             │
│ │[Add …]   │ │[Add …]   │        │   [−] 1 [+]   $6.50 [Remove] │
│ └──────────┘ └──────────┘        │ ───────────────────────────  │
│                                  │ Subtotal          $74.50     │
│                                  │ Shipping            Free     │
│                                  │ 🎉 You've got free shipping   │
│                                  │ Total             $74.50     │
│                                  │ [Checkout]                   │
└──────────────────────────────────┴──────────────────────────────┘
```

## Spec

`Shop({ products })`, in [`starter/Shop.tsx`](starter/Shop.tsx). Prices are in **cents** (integers) so totals never suffer from floating-point errors like `0.1 + 0.2`. Format them only for display.

1. **Product list:** each product card has an **"Add ⟨name⟩ to cart"** button (use `aria-label`; the visible text can just say "Add to cart").
2. **Adding:** adds a line with quantity 1, or increases the quantity if it's already in the cart.
3. **Cart** (`<aside aria-label="Cart">`):
   - Heading **"Cart (N)"**, where N is the total number of items (sum of quantities).
   - Each line shows the name, the quantity, and the line total, plus buttons **"Decrease quantity of ⟨name⟩"**, **"Increase quantity of ⟨name⟩"** and **"Remove ⟨name⟩"**.
   - Decreasing from 1 removes the line.
   - Empty cart: **"Your cart is empty."**
4. **Totals:**
   - Subtotal = Σ price × quantity.
   - Shipping is **$4.99**, or **Free** when the subtotal is **$50.00 or more**.
   - Below the threshold, show **"Add $X more for free shipping"**. At or above it, show **"🎉 You've got free shipping"**.
   - Total = subtotal + shipping.
   - Each amount appears next to its label: `Subtotal $74.50`, `Shipping Free`, `Total $74.50`.
5. **Checkout:** a **Checkout** button (disabled when the cart is empty) clears the cart and shows **"Thanks for your order!"**. Adding something again hides the message.

Store cart lines as `{ productId, quantity }` and look up product details when rendering. Don't copy product objects into the cart. Module 3 explains why.

## Acceptance criteria

`npm test -- 02-state-and-events/project` checks all of the above.

## Stretch goals

- Persist the cart to `localStorage`. Use a lazy initializer (`useState(() => …)`) to read it. Writing it back is a job for Module 6 (Effects).
- Add a discount-code input: `COFFEE10` takes 10% off the subtotal.
- Animate the cart count when it changes (CSS only).
- Limit each line to 10 and disable "Increase" at the limit (reuse your Module 2.3 stepper!).

## Run it

```bash
npm run exercise 02 project
npm test -- 02-state-and-events/project
```
