const { spawnSync } = require('node:child_process')

const command = process.env.TEST_COMMAND || 'pnpm test'
const result = spawnSync(command, { shell: true, stdio: 'inherit' })

process.exit(result.status ?? 1)

