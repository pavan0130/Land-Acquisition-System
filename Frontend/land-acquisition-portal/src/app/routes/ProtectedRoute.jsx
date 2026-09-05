import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { canAccessRoute } from '../../utils/roles'
import Loader from '../../components/common/Loader'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing, role } = useAuth()
  const location = useLocation()

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader label="Verifying session…" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!canAccessRoute(role, location.pathname)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
