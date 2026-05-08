import { existsSync, readFileSync } from 'fs'
import path from 'path'

const required = [
  'prompts.md',
  'rescue-prompts.md',
  'solution-guide.md',
  'expected.diff',
  'rubric.md',
  'self-assessment.md',
  'instructor-mode.md',
  'mock-data/input.json',
  'pr-simulated/PR.md'
]

const missing = required.filter(file => !existsSync(path.join(process.cwd(), file)))
if (missing.length) {
  console.error('Missing files:', missing.join(', '))
  process.exit(1)
}

const readme = readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')
if (!readme.includes('Harness de evaluacion')) {
  console.error('README does not mention exercise title')
  process.exit(1)
}

console.log('Validator OK: exercise pack is complete')
