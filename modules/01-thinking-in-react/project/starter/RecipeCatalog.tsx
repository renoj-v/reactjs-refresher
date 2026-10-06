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
  // TODO: implement the spec in ../README.md
  return (
    <div className="catalog">
      <p>{recipes.length} recipes to show. Start building!</p>
    </div>
  )
}
