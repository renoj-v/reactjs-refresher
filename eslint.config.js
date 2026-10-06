import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Some starters deliberately contain anti-patterns for you to fix. In starter/
// folders the React Hooks rules are warnings, so they show up as hints without
// failing `npm run lint`. Everywhere else they're errors.
const hooksRulesAsWarnings = Object.fromEntries(
  Object.keys(reactHooks.configs.flat.recommended.rules).map((rule) => [rule, 'warn']),
)

export default defineConfig([
  globalIgnores(['**/dist', '**/.next']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Rules of Hooks + the React Compiler-powered rules (purity, refs, set-state-in-effect, ...)
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Starter files intentionally contain unused props/vars until you finish the TODOs.
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Tests and config files don't need Fast Refresh rules. Lessons deliberately
    // keep helpers next to components in one file so each task stays self-contained.
    files: ['**/*.test.{ts,tsx}', '*.config.ts', 'runner/**', 'lessons/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['**/starter/**/*.{ts,tsx}'],
    rules: hooksRulesAsWarnings,
  },
  {
    files: ['scripts/**/*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
])
