const fs = require('node:fs')
const path = require('node:path')

const marker = path.join(process.cwd(), '.claude', 'last-verification.txt')

if (!fs.existsSync(marker)) {
  console.error('No verification marker found. Run a relevant test or write .claude/last-verification.txt with the reason.')
  process.exit(2)
}

process.exit(0)

