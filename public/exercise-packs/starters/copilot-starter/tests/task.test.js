import { task } from '../src/task.js'

if (!task({ ok: true }).ok) throw new Error('task failed')
console.log('test OK')
