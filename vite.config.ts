import path from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// `npm run dev` serves /playground.
// `npm run exercise 03 02` sets EXERCISE_DIR and serves /runner, which
// renders that exercise's App.tsx (see scripts/exercise.mjs).
const exerciseDir = process.env.EXERCISE_DIR

export default defineConfig({
  root: exerciseDir ? 'runner' : 'playground',
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: exerciseDir ? { '@exercise': path.resolve(exerciseDir) } : {},
  },
  define: {
    __EXERCISE_LABEL__: JSON.stringify(process.env.EXERCISE_LABEL ?? ''),
  },
  server: { open: true },
})
