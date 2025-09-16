import { createFileRoute, redirect } from '@tanstack/react-router'
import Header from '@/components/Header'
import { getCurrentUser, isLoggedIn } from '@/lib/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!isLoggedIn()) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardPage,
})

function DashboardPage() {
  const user = getCurrentUser()
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome {user?.name ?? ''}.</p>
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-700">Your dashboard content goes here.</p>
        </div>
      </main>
    </div>
  )
}

