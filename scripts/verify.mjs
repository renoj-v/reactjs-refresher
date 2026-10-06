#!/usr/bin/env node
// Course self-check: every exercise test file must FAIL against starter/
// and PASS against solution/.
//   npm run verify                → all modules
//   npm run verify -- modules/02  → one module
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const filters = process.argv.slice(2)
const outDir = mkdtempSync(path.join(tmpdir(), 'verify-'))

function run(mode) {
  const outputFile = path.join(outDir, `${mode}.json`)
  const args = ['vitest', 'run', ...filters, '--reporter=json', `--outputFile=${outputFile}`, 'modules/']
  if (mode === 'solution') args.push('--mode', 'solution')
  spawnSync('npx', args, { stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' })
  const report = JSON.parse(readFileSync(outputFile, 'utf8'))
  return report.testResults.map((file) => ({
    file: path.relative(process.cwd(), file.name),
    failed: file.status !== 'passed',
  }))
}

const starter = run('starter')
const solution = run('solution')

let problems = 0
for (const { file, failed } of starter) {
  if (!failed) {
    problems++
    console.log(`✗ starter already passes: ${file}`)
  }
}
for (const { file, failed } of solution) {
  if (failed) {
    problems++
    console.log(`✗ solution fails: ${file}`)
  }
}

console.log(`\nChecked ${starter.length} test files.`)
if (problems) {
  console.log(`${problems} problem(s) found.`)
  process.exit(1)
}
console.log('✓ Every starter fails and every solution passes.')
