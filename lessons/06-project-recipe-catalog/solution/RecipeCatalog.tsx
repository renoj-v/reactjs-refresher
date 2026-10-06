// Lesson 06: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

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
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} h`
  return `${hours} h ${rest} min`
}

// Pure helpers: derive what the UI needs from the raw data.
function getAllTags(recipes: Recipe[]): string[] {
  // A Set removes duplicates; toSorted returns a new sorted array.
  return [...new Set(recipes.flatMap((recipe) => recipe.tags))].toSorted()
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <span className={`difficulty difficulty-${difficulty}`}>{DIFFICULTY_LABELS[difficulty]}</span>
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="recipe-card">
      <h3>{recipe.title}</h3>
      <p className="meta">
        {formatDuration(recipe.minutes)} · <DifficultyBadge difficulty={recipe.difficulty} />
        {/* `vegetarian` is a real boolean, so && is safe here. */}
        {recipe.vegetarian && (
          <>
            {' '}
            <span aria-label="Vegetarian">🌱</span>
          </>
        )}
      </p>
      <p className="tags">{recipe.tags.map((tag) => `#${tag}`).join(' ')}</p>
    </article>
  )
}

function FeaturedRecipe({ recipe }: { recipe: Recipe }) {
  // Composition: the featured section reuses the same data with a different layout.
  return (
    <section className="featured" aria-label="Featured recipe">
      <small>★ Featured</small>
      <h3>{recipe.title}</h3>
      <p>
        {formatDuration(recipe.minutes)} · <DifficultyBadge difficulty={recipe.difficulty} />
      </p>
    </section>
  )
}

function TagChips({ tags, activeTag }: { tags: string[]; activeTag?: string }) {
  return (
    <nav aria-label="Filter by tag">
      <ul className="chips">
        <li>
          {/* aria-current tells assistive tech (and our CSS) which chip is active. */}
          <a href="?" aria-current={activeTag ? undefined : 'page'}>
            All
          </a>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`?tag=${encodeURIComponent(tag)}`} aria-current={tag === activeTag ? 'page' : undefined}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type RecipeCatalogProps = {
  recipes: Recipe[]
  activeTag?: string
  featuredId?: string
}

export function RecipeCatalog({ recipes, activeTag, featuredId }: RecipeCatalogProps) {
  // Everything below is *derived* from props. Nothing is stored or synced.
  const featured = recipes.find((recipe) => recipe.id === featuredId)
  const tags = getAllTags(recipes)
  const visible = activeTag ? recipes.filter((recipe) => recipe.tags.includes(activeTag)) : recipes

  return (
    <div className="catalog">
      {featured && <FeaturedRecipe recipe={featured} />}

      <TagChips tags={tags} activeTag={activeTag} />

      {visible.length === 0 ? (
        <p>No recipes tagged “{activeTag}”.</p>
      ) : (
        <>
          <p>
            Showing {visible.length} {visible.length === 1 ? 'recipe' : 'recipes'}
          </p>
          <div className="grid">
            {visible.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
