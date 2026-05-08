import { describe, expect, it } from 'vitest'
import { validateLogin } from '../../src/auth/validate-login'

describe('validateLogin', () => {
  it('allows valid users with normalized email', () => {
    const result = validateLogin({
      email: 'ada@example.com',
      password: 'correct-password',
    })

    expect(result.ok).toBe(true)
  })

  it('allows valid users with mixed-case email', () => {
    const result = validateLogin({
      email: 'ADA@EXAMPLE.COM',
      password: 'correct-password',
    })

    expect(result.ok).toBe(true)
  })
})
