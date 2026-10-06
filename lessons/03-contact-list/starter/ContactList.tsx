/*
 * LESSON 03 · Contact list
 * Topic 1 · Thinking in React (3 of 6)
 * ──────────────────────────────────────────────────────────────────
 * ── Concepts ──────────────────────────────────────────────────────
 * Use `map` to turn data into elements. Every item needs a stable, unique `key`:
 *
 *   function ProductList({ products }: { products: Product[] }) {
 *     return (
 *       <ul>
 *         {products.map((product) => (
 *           <li key={product.id}>{product.name}</li>
 *         ))}
 *       </ul>
 *     )
 *   }
 *
 * Keys tell React which item is which between renders. Use an ID from your
 * data. AVOID ARRAY INDEXES as keys when the list can be reordered,
 * filtered or inserted into: React would match up the wrong items, and their
 * state (such as a half-typed input) would end up on the wrong row.
 *
 * Props are READ-ONLY. To show a sorted or filtered version, derive a new
 * array with a non-mutating method:
 *
 *   const sorted = products.toSorted((a, b) => a.name.localeCompare(b.name))  // ✓ new array
 *   products.sort(…)                                                          // ✗ mutates props
 *
 * ── Your task ─────────────────────────────────────────────────────
 * Finish ContactList below. The starter "works" but has problems. Run it and
 * open the browser console.
 *
 * ── Done when (each line is one test) ─────────────────────────────
 *   [ ] No "unique key" warning is logged
 *   [ ] The heading shows the count: "Contacts (4)"
 *   [ ] Each contact is a list item with their name and a mailto: link showing their email
 *   [ ] Favourites come first, then everyone else; each group is sorted by name
 *   [ ] Favourites show <span aria-label="Favourite">★</span>
 *   [ ] An empty list shows "No contacts yet." and no <ul>
 *   (The tests pass a FROZEN array, so calling .sort() on the prop will throw.)
 *
 * ── Common mistakes ───────────────────────────────────────────────
 *   ✗ key on an inner element             → the key goes on the outermost element returned from map
 *   ✗ key={index} on a sortable list      → key={item.id}
 *   ✗ contacts.sort(…)                    → contacts.toSorted(…)
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 3               see it in the browser (hot reload)
 *   npm test -- lessons/03          run the tests in watch mode
 *   npm run lesson 3 --solution    compare with the reference solution
 *
 * ── Read more ─────────────────────────────────────────────────────
 *   https://react.dev/learn/rendering-lists
 */

export type Contact = {
  id: string
  name: string
  email: string
  favorite?: boolean
}

export function ContactList({ contacts }: { contacts: Contact[] }) {
  // TODO: favourites first, then alphabetical. Don't mutate `contacts`!
  // TODO: show "No contacts yet." when the list is empty.

  return (
    <section>
      <h2>Contacts</h2>
      {/* TODO: show the count in the heading */}
      <ul>
        {/* TODO: this logs a warning in the console. Why? */}
        {contacts.map((contact) => (
          <li>
            {contact.name}
            {/* TODO: email as a mailto: link, ★ for favourites */}
          </li>
        ))}
      </ul>
    </section>
  )
}

// #region 💡 Hint: sorting on two criteria  (open only if stuck)
//   contacts.toSorted((a, b) => {
//     if (Boolean(a.favorite) !== Boolean(b.favorite)) return a.favorite ? -1 : 1
//     return a.name.localeCompare(b.name)
//   })
// #endregion
