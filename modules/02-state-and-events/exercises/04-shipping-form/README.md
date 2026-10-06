# Exercise 2.4 — Shipping form (updating nested objects)

A checkout step where the customer edits their shipping details. A live summary shows what will be saved.

**You'll practise:** immutable updates to nested objects, one change handler for many inputs (`e.target.name`), and checkboxes.

> This is about *state updates*, not form submission. Module 4 covers real forms with Actions. Here, "Save" is a plain button.

## Task

[`starter/ShippingForm.tsx`](starter/ShippingForm.tsx) has the inputs wired up, but the handlers are buggy. Type into "Street", then look at the summary. Then tick "Gift wrap". Also try `npm run lint`: the React Compiler's lint rules catch one of the bugs for you.

## Acceptance criteria

- [ ] Typing in **Full name** or **Email** updates the summary.
- [ ] Typing in **Street**, **City** or **Postcode** updates that field **without wiping the other address fields**.
- [ ] Changing **Country** works.
- [ ] Ticking **Gift wrap** shows "🎁 Gift wrapped" in the summary, and unticking removes it.
- [ ] **Save** calls `onSave` with the complete, current order.
- [ ] **Reset** restores the initial values.
- [ ] The `initial` prop is never mutated. The tests pass a deeply frozen object, so any mutation throws.

<details>
<summary>Hint: one handler for the address fields</summary>

Give each address input a `name` that matches its key (`name="city"`), then:

```ts
function handleAddressChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target
  setOrder({ ...order, address: { ...order.address, [name]: value } })
}
```

</details>

## Run it

```bash
npm run exercise 02 04
npm test -- 04-shipping-form
```
