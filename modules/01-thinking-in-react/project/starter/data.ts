import type { Recipe } from './RecipeCatalog'

export const recipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Shakshuka',
    minutes: 35,
    difficulty: 'easy',
    vegetarian: true,
    tags: ['breakfast', 'one-pan'],
  },
  {
    id: 'r2',
    title: 'Chicken katsu curry',
    minutes: 75,
    difficulty: 'medium',
    vegetarian: false,
    tags: ['dinner', 'japanese'],
  },
  {
    id: 'r3',
    title: 'Overnight oats',
    minutes: 10,
    difficulty: 'easy',
    vegetarian: true,
    tags: ['breakfast', 'quick', 'vegan'],
  },
  {
    id: 'r4',
    title: 'Beef bourguignon',
    minutes: 180,
    difficulty: 'hard',
    vegetarian: false,
    tags: ['dinner', 'french'],
  },
  {
    id: 'r5',
    title: 'Lemon tart',
    minutes: 90,
    difficulty: 'hard',
    vegetarian: true,
    tags: ['dessert', 'french'],
  },
  {
    id: 'r6',
    title: 'Chickpea salad',
    minutes: 15,
    difficulty: 'easy',
    vegetarian: true,
    tags: ['lunch', 'quick', 'vegan'],
  },
]
