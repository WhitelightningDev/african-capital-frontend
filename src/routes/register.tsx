import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { registerUser } from '@/lib/auth'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

type Form = {
  name: string
  surname: string
  idNumber: string
  email: string
  password: string
}

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({
    name: '',
    surname: '',
    idNumber: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function validate(f: Form): string | null {
    if (!f.name.trim()) return 'Name is required'
    if (!f.surname.trim()) return 'Surname is required'
    if (!/^[0-9]{6,20}$/.test(f.idNumber)) return 'ID number must be 6-20 digits'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Invalid email address'
    if (f.password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate(form)
    if (v) {
      setError(v)
      return
    }
    setLoading(true)
    const res = registerUser(form)
    setLoading(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate({ to: '/' })
  }

  const update = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }))

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-gray-600 mb-6">Fill in your details to register</p>
        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update('name')}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                id="surname"
                type="text"
                value={form.surname}
                onChange={update('surname')}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
              ID Number
            </label>
            <input
              id="idNumber"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.idNumber}
              onChange={update('idNumber')}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digits only"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update('email')}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={update('password')}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 6 characters"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

