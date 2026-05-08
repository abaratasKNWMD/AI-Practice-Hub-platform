type LoginInput = {
  email: string
  password: string
}

const user = {
  email: 'ada@example.com',
  passwordHash: 'correct-password',
}

function verifyPassword(password: string, passwordHash: string) {
  return password === passwordHash
}

export function validateLogin(input: LoginInput) {
  const candidateEmail = input.email.trim().toLowerCase()
  const ok = user.email.toLowerCase() === candidateEmail && verifyPassword(input.password, user.passwordHash)

  return { ok }
}
