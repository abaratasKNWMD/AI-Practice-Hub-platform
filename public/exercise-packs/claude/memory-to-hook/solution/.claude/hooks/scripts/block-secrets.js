const input = JSON.parse(process.argv[2] ?? '{}')
const target = `${input.tool ?? ''} ${JSON.stringify(input.args ?? {})}`

if (/\.env|secret|token|credential/i.test(target)) {
  console.error('Blocked: secret-like path or argument')
  process.exit(2)
}

process.exit(0)
