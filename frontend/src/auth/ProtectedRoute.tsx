import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { AuthLoadingScreen } from '../components/AuthLoadingScreen'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <AuthLoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
