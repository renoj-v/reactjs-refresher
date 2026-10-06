import path from 'node:path'
import { defineConfig, type Plugin } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

/**
 * Tests always import the code under test from `./starter/...`.
 * `npm run test:solutions` runs Vitest with `--mode solution`, and this plugin
 * rewrites those imports to `./solution/...` so the same tests verify the
 * reference solutions.
 */
function swapStarterForSolution(): Plugin {
  return {
    name: 'swap-starter-for-solution',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !/\.test\.tsx?$/.test(importer)) return null
      if (!source.startsWith('./starter/')) return null
      const swapped = source.replace('./starter/', './solution/')
      return this.resolve(swapped, importer, { ...options, skipSelf: true })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ...(mode === 'solution' ? [swapStarterForSolution()] : []),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve('test/setup.ts')],
    include: ['lessons/**/*.test.{ts,tsx}', 'playground/**/*.test.{ts,tsx}', 'final-project/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
}))
