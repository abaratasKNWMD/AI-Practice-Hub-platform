const fs = require('node:fs')

let input = ''
process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
  const payload = input ? JSON.parse(input) : {}
  const text = JSON.stringify(payload.tool_input || {})
  const patterns = [
    /sk-[a-zA-Z0-9_-]{20,}/,
    /ghp_[a-zA-Z0-9_]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /BEGIN (RSA|OPENSSH|EC) PRIVATE KEY/
  ]

  if (patterns.some(pattern => pattern.test(text))) {
    console.error('Potential secret detected. Remove the credential before writing this file.')
    process.exit(2)
  }

  process.exit(0)
})

