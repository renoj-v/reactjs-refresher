// Lesson 06: demo page for the reference solution.

import { recipes } from './data'
import { RecipeCatalog } from './RecipeCatalog'
import './styles.css'

export default function App() {
  // No state yet: the active tag comes from the URL, e.g. ?tag=vegan.
  // Clicking a chip (a plain link) reloads the page with a new tag.
  const activeTag = new URLSearchParams(window.location.search).get('tag') ?? undefined

  return <RecipeCatalog recipes={recipes} activeTag={activeTag} featuredId="r1" />
}
