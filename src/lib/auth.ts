export type User = {
  name: string
  surname: string
  idNumber: string
  email: string
  password: string
}

const USERS_KEY = 'acg_users'
const SESSION_KEY = 'acg_current_user_email'

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as User[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(input: User): { ok: true } | { ok: false; error: string } {
  const users = readUsers()
  const exists = users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())
  if (exists) return { ok: false, error: 'Email already registered' }

  // Basic validation
  if (!input.name.trim() || !input.surname.trim()) {
    return { ok: false, error: 'Name and surname are required' }
  }
  if (!/^[0-9]{6,20}$/.test(input.idNumber)) {
    return { ok: false, error: 'ID number must be 6-20 digits' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { ok: false, error: 'Invalid email address' }
  }
  if (input.password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters' }
  }

  users.push({ ...input, email: input.email.toLowerCase() })
  writeUsers(users)
  // Auto-login new user
  localStorage.setItem(SESSION_KEY, input.email.toLowerCase())
  return { ok: true }
}

export function login(input: { email: string; password: string }):
  | { ok: true }
  | { ok: false; error: string } {
  const users = readUsers()
  const email = input.email.toLowerCase()
  const user = users.find((u) => u.email === email)
  if (!user) return { ok: false, error: 'No account found for this email' }
  if (user.password !== input.password) return { ok: false, error: 'Incorrect password' }
  localStorage.setItem(SESSION_KEY, email)
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser(): User | null {
  const email = localStorage.getItem(SESSION_KEY)
  if (!email) return null
  const users = readUsers()
  return users.find((u) => u.email === email) ?? null
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(SESSION_KEY)
}

