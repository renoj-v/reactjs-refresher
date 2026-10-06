# Mini-project 1 — Recipe catalog

Build a static, data-driven recipe catalog. There's no state yet: filtering comes from the URL (`?tag=vegan`), so plain links act as filter chips. Module 2 replaces this with state.

**Combines:** components and composition, props, lists and keys, conditional rendering, derived data, and splitting a UI into a hierarchy.

```
┌──────────────────────────────────────────────────────────┐
│ ★ Featured: Shakshuka                                    │  ← featured section
├──────────────────────────────────────────────────────────┤
│ [All] [breakfast] [dessert] [quick] [vegan] …            │  ← tag chips (links)
│ Showing 4 recipes                                        │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│ │ Title      │ │ Title      │ │ Title      │             │  ← recipe cards
│ │ 45 min·Easy│ │ 1 h 15 min │ │ …          │             │
│ │ 🌱 #quick  │ │            │ │            │             │
│ └────────────┘ └────────────┘ └────────────┘             │
└──────────────────────────────────────────────────────────┘
```

## Spec

`RecipeCatalog({ recipes, activeTag?, featuredId? })`, in [`starter/RecipeCatalog.tsx`](starter/RecipeCatalog.tsx).

1. **`formatDuration(minutes)`**: `45` → `"45 min"`, `60` → `"1 h"`, `75` → `"1 h 15 min"`.
2. **Featured section:** if `featuredId` matches a recipe, show it in a `<section aria-label="Featured recipe">` above everything else, whatever the active tag.
3. **Tag chips:** an "All" link first (`href="?"`), then every **unique** tag across all recipes, **sorted alphabetically**, each linking to `?tag=<tag>`. The active chip (or "All" when there's no tag) gets `aria-current="page"`.
4. **Result count:** "Showing 4 recipes", or "Showing 1 recipe" for exactly one.
5. **Grid:** a card per recipe matching `activeTag` (all recipes when there's none). Each card has:
   - the title as a level-3 heading
   - the formatted duration and the difficulty (`Easy` / `Medium` / `Hard`)
   - a 🌱 marker with the accessible label "Vegetarian", only for vegetarian recipes
   - the recipe's tags as `#tag`
6. **Empty state:** when nothing matches, show `No recipes tagged “<tag>”.` and no grid.

Split the UI into components: for example `RecipeCatalog`, `FeaturedRecipe`, `TagChips`, `RecipeCard`, `DifficultyBadge`. `App.tsx` already reads `?tag=` from the URL for you.

## Acceptance criteria

`npm test -- 01-thinking-in-react/project` runs the checks:

- [ ] `formatDuration` handles minutes, whole hours and mixed values
- [ ] Featured recipe shows in its own labelled section
- [ ] Unique, sorted tag chips, with "All" first and the right `aria-current`
- [ ] Filtering by tag, with the correct count and pluralisation
- [ ] Empty state for an unknown tag
- [ ] Cards show title, duration, difficulty, vegetarian marker and tags

## Stretch goals

- Add a `maxMinutes` URL param (`?maxMinutes=30`) and combine it with the tag filter.
- Sort the grid by a `?sort=time|title` param.
- Give each difficulty its own colour using CSS Modules (`RecipeCard.module.css`).
- Show "+N more" when a recipe has more than 3 tags.

## Run it

```bash
npm run exercise 01 project
npm test -- 01-thinking-in-react/project
```
