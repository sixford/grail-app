// components/subcomponents/RequireAuth.jsx
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'

export default function RequireAuth() {
  const context = useOutletContext()
  const { isAuthenticated } = context

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return <Outlet context={context} />
}