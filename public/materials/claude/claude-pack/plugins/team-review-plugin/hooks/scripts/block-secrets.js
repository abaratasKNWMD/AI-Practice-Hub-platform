const secretPatterns = [/sk-[a-zA-Z0-9_-]{20,}/, /ghp_[a-zA-Z0-9_]{20,}/]

let input = ''
process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
  if (secretPatterns.some(pattern => pattern.test(input))) {
    console.error('Secret-like value detected by team-review plugin.')
    process.exit(2)
  }
  process.exit(0)
})

