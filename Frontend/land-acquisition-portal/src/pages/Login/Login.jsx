import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Lock, LogIn, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { demoAccounts } from '../../services/authApi'
import { ROLE_LABELS } from '../../utils/roles'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const accounts = demoAccounts()
  const redirectTo = location.state?.from?.pathname ?? '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ username, password })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message ?? 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  const quickFill = (acc) => {
    setUsername(acc.username)
    setPassword('password')
  }

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-md border border-navy-100 bg-white shadow-card lg:grid-cols-[1.1fr_1fr]">
      <div className="hidden flex-col justify-between bg-navy-800 p-8 text-white lg:flex">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-saffron-400">Secure Government Portal</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
            National Land Acquisition &amp; Management System
          </h2>
          <p className="mt-3 text-sm text-navy-200">
            A unified platform for project monitoring, land records, compensation disbursement and
            rehabilitation tracking across central, state and district authorities.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-navy-200">
          <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-saffron-400" /> JWT / OAuth2 secured sign-in</li>
          <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-saffron-400" /> Role-based access control</li>
          <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-saffron-400" /> Real-time status &amp; notifications</li>
        </ul>
      </div>

      <div className="p-8">
        <h1 className="text-xl font-bold text-navy-900">Sign in to your account</h1>
        <p className="mt-1 text-sm text-navy-500">Use your official credentials to continue.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="gov-label" htmlFor="username">Username</label>
            <div className="relative">
              <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
              <input
                id="username"
                className="gov-input pl-9"
                placeholder="e.g. district.collector"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="gov-label" htmlFor="password">Password</label>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
              <input
                id="password"
                type="password"
                className="gov-input pl-9"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={loading} className="gov-btn-primary w-full">
            <LogIn size={16} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t border-navy-100 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-500">Demo accounts (password: password)</p>
          <div className="grid grid-cols-2 gap-2">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => quickFill(acc)}
                className="rounded-sm border border-navy-100 px-2.5 py-2 text-left text-xs hover:border-saffron-400 hover:bg-saffron-50"
              >
                <p className="font-semibold text-navy-800">{ROLE_LABELS[acc.role]}</p>
                <p className="text-navy-400">{acc.username}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
