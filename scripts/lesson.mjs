#!/usr/bin/env node
// Usage:
//   npm run lesson 7               → runs lessons/07-*/starter in the browser
//   npm run lesson 7 --solution    → runs the reference solution instead
//   npm run lesson list            → lists every lesson
//   npm run lesson 7 --port 3000   → extra flags are passed to Vite
import { spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const lessonsDir = path.join(root, 'lessons')

const args = process.argv.slice(2)
const useSolution = args.includes('--solution')
let lessonArg
const viteArgs = []
for (const arg of args) {
  if (arg === '--solution') continue
  if (lessonArg === undefined && !arg.startsWith('-')) lessonArg = arg
  else viteArgs.push(arg)
}

const lessons = readdirSync(lessonsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

if (!lessonArg || lessonArg === 'list') {
  for (const lesson of lessons) console.log(`  ${lesson}`)
  if (!lessonArg) console.log('\nUsage: npm run lesson <number> [--solution]')
  process.exit(0)
}

const prefix = lessonArg.padStart(2, '0') + '-'
const lesson = lessons.find((name) => name.startsWith(prefix))
if (!lesson) fail(`No lesson "${lessonArg}". Try: npm run lesson list`)

const target = path.join(lessonsDir, lesson, useSolution ? 'solution' : 'starter')
if (!existsSync(path.join(target, 'App.tsx'))) fail(`Expected an App.tsx in ${path.relative(root, target)}`)

const label = `Lesson ${lesson.replace('-', ' · ')} (${useSolution ? 'solution' : 'starter'})`
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
