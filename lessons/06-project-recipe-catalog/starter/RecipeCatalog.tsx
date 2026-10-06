/*
 * LESSON 06 · PROJECT: Recipe catalog
 * Topic 1 · Thinking in React (6 of 6, topic project)
 * ──────────────────────────────────────────────────────────────────
 * Build a static, data-driven recipe catalog. There's no state yet:
 * filtering comes from the URL (?tag=vegan), so plain links work as filter
 * chips. ./App.tsx already reads the tag for you.
 *
 * Combines: components and composition, props, lists and keys, conditional
 * rendering, derived data, and splitting a UI into a hierarchy.
 *
 *   ┌──────────────────────────────────────────────────────────┐
 *   │ ★ Featured: Shakshuka                                    │  ← featured section
 *   ├──────────────────────────────────────────────────────────┤
 *   │ [All] [breakfast] [dessert] [quick] [vegan] …            │  ← tag chips (links)
 *   │ Showing 4 recipes                                        │
 *   │ ┌────────────┐ ┌────────────┐ ┌────────────┐             │
 *   │ │ Title      │ │ Title      │ │ …          │             │  ← recipe cards
 *   │ │ 45 min·Easy│ │ 1 h 15 min │ │            │             │
 *   │ │ 🌱 #quick  │ │            │ │            │             │
 *   │ └────────────┘ └────────────┘ └────────────┘             │
 *   └──────────────────────────────────────────────────────────┘
 *
 * ── Spec ──────────────────────────────────────────────────────────
 *   1. formatDuration(minutes): 45 → "45 min", 60 → "1 h", 75 → "1 h 15 min".
 *   2. Featured: if featuredId matches a recipe, show it in a
 *      <section aria-label="Featured recipe"> above everything else, whatever the active tag.
 *   3. Tag chips: an "All" link first (href="?"), then every UNIQUE tag across
 *      all recipes, SORTED alphabetically, each linking to ?tag=<tag>. The
 *      active chip (or "All" when there's no tag) gets aria-current="page".
 *   4. Count: "Showing 4 recipes", or "Showing 1 recipe" for exactly one.
 *   5. Grid: one card per recipe matching activeTag (all recipes if there's none):
 *        • the title as a level-3 heading
 *        • the formatted duration, and the difficulty as Easy / Medium / Hard
 *        • 🌱 with aria-label="Vegetarian", for vegetarian recipes only
 *        • the tags as #tag
 *   6. Empty state: No recipes tagged “<tag>”. (and no grid)
 *
 * Split it into components, e.g. FeaturedRecipe, TagChips, RecipeCard, DifficultyBadge.
 *
 * ── Done when ─────────────────────────────────────────────────────
 *   All tests pass:  npm test -- lessons/06
 *
 * ── Stretch goals ─────────────────────────────────────────────────
 *   • A ?maxMinutes=30 URL param, combined with the tag filter.
 *   • Sort the grid by a ?sort=time|title param.
 *   • A colour per difficulty using CSS Modules (RecipeCard.module.css).
 *   • Show "+N more" when a recipe has more than 3 tags.
 *
 * ── Check your understanding (Topic 1 recap) ──────────────────────
 *   1. Why must component names start with a capital letter?
 *   2. What is a key for, and why is an array index a risky choice?
 *   3. What does {unreadCount && <Badge count={unreadCount} />} render when unreadCount is 0?
 *   4. Why shouldn't you declare a component inside another component's body?
 *   5. What does "a component should be pure" mean, and what in this repo relies on it?
 *   Answers are folded at the bottom of this file.
 *
 * ── Run it ────────────────────────────────────────────────────────
 *   npm run lesson 6               see it in the browser (hot reload)
 *   npm test -- lessons/06          run the tests in watch mode
 *   npm run lesson 6 --solution    compare with the reference solution
 */

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Recipe = {
  id: string
  title: string
  minutes: number
  difficulty: Difficulty
  vegetarian: boolean
  tags: string[]
}

export function formatDuration(minutes: number): string {
  // TODO: 45 → "45 min", 60 → "1 h", 75 → "1 h 15 min"
  return `${minutes}`
}

// TODO: Build your component hierarchy here, e.g.
//   FeaturedRecipe, TagChips, RecipeCard, DifficultyBadge

type RecipeCatalogProps = {
  recipes: Recipe[]
  activeTag?: string
  featuredId?: string
}

export function RecipeCatalog({ recipes }: RecipeCatalogProps) {
  // TODO: implement the spec at the top of this file
  return (
    <div className="catalog">
      <p>{recipes.length} recipes to show. Start building!</p>
    </div>
  )
}

// #region ✅ Answers to "Check your understanding"  (try first!)
// 1. JSX uses capitalization to tell them apart: lowercase tags (<div>) become
//    HTML elements, and capitalized ones (<Card>) are treated as components to call.
// 2. A key identifies an item across renders, so React keeps its DOM and state
//    attached to the right item. Indexes shift when items are reordered,
//    inserted or removed, so React reuses the wrong DOM and state for the wrong data.
// 3. The text "0". React renders numbers, so 0 && … evaluates to 0 and shows it.
//    Use unreadCount > 0 && ….
// 4. Each render creates a new function, which React sees as a different
//    component type. It unmounts the old one and mounts the new one, so state
//    is lost, the DOM is recreated and focus disappears.
// 5. Same props (and state) in, same JSX out, with no side effects during
//    render (no mutating props or globals, no fetching). StrictMode's double
//    render and the React Compiler's automatic memoization both depend on it.
// #endregion
