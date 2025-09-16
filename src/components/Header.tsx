import { Link, useNavigate } from '@tanstack/react-router'
import { getCurrentUser, logout } from '@/lib/auth'
import { useState } from 'react'
import logo from '../logo.svg'

export default function Header() {
  const navigate = useNavigate()
  // Force re-render after logout
  const [, setTick] = useState(0)
  const user = getCurrentUser()

  const baseLink =
    'px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md transition-colors'

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="ACG" className="h-7 w-7" />
              <span className="hidden sm:inline text-sm font-semibold tracking-wide text-gray-900">
                African Capital Group
              </span>
            </Link>
          </div>

          {/* Primary Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/dashboard"
              className={baseLink}
              activeProps={{ className: 'text-blue-700' }}
            >
              Dashboard
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className={baseLink}
                  activeProps={{ className: 'text-blue-700' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={baseLink}
                  activeProps={{ className: 'text-blue-700' }}
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Account Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-gray-200">
                  <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-800">
                    Hi, <span className="font-medium">{user.name}</span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center rounded-md bg-gray-900 text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  onClick={() => {
                    logout()
                    setTick((t) => t + 1)
                    navigate({ to: '/login' })
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
