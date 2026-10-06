#!/usr/bin/env node
// Usage:
//   npm run exercise 03 02             → runs modules/03-*/exercises/02-*/starter
//   npm run exercise 03 02 --solution  → runs the reference solution instead
//   npm run exercise 03 project        → runs the module's mini-project starter
//   npm run exercise list              → lists every module and exercise
//   npm run exercise 03 02 --port 3000 → extra flags are passed to Vite
import { spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const modulesDir = path.join(root, 'modules')

// The first two plain arguments pick the exercise; any other flags (e.g. --port 3000)
// are passed straight through to Vite.
const args = process.argv.slice(2)
const useSolution = args.includes('--solution')
const positional = []
const viteArgs = []
for (const arg of args) {
  if (arg === '--solution') continue
  if (positional.length < 2 && !arg.startsWith('-') && viteArgs.length === 0) positional.push(arg)
  else viteArgs.push(arg)
}
const [moduleArg, exerciseArg] = positional

const dirs = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort()
    : []

const findByPrefix = (dir, num) => {
  const prefix = String(num).padStart(2, '0') + '-'
  return dirs(dir).find((name) => name.startsWith(prefix))
}

if (!moduleArg || moduleArg === 'list') {
  for (const mod of dirs(modulesDir)) {
    console.log(mod)
    for (const ex of dirs(path.join(modulesDir, mod, 'exercises'))) console.log(`  ${ex}`)
    if (existsSync(path.join(modulesDir, mod, 'project'))) console.log('  project')
  }
  if (!moduleArg) console.log('\nUsage: npm run exercise <module> <exercise|project> [--solution]')
  process.exit(0)
}

const moduleName = findByPrefix(modulesDir, moduleArg)
if (!moduleName) fail(`No module found for "${moduleArg}". Try: npm run exercise list`)
if (!exerciseArg) fail('Missing exercise number. Example: npm run exercise 03 02')

let base
let label
if (exerciseArg === 'project') {
  base = path.join(modulesDir, moduleName, 'project')
  label = `${moduleName} › project`
} else {
  const exercisesDir = path.join(modulesDir, moduleName, 'exercises')
  const exerciseName = findByPrefix(exercisesDir, exerciseArg)
  if (!exerciseName) fail(`No exercise "${exerciseArg}" in ${moduleName}. Try: npm run exercise list`)
  base = path.join(exercisesDir, exerciseName)
  label = `${moduleName} › ${exerciseName}`
}

const target = path.join(base, useSolution ? 'solution' : 'starter')
if (!existsSync(path.join(target, 'App.tsx'))) fail(`Expected an App.tsx in ${path.relative(root, target)}`)

label += useSolution ? ' (solution)' : ' (starter)'
console.log(`\n▶ ${label}\n  ${path.relative(root, target)}\n`)

const vite = spawn('npx', ['vite', ...viteArgs], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, EXERCISE_DIR: target, EXERCISE_LABEL: label },
  shell: process.platform === 'win32',
})
vite.on('exit', (code) => process.exit(code ?? 0))

function fail(message) {
  console.error(message)
  process.exit(1)
}
