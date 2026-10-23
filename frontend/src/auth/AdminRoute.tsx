import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { AuthLoadingScreen } from '../components/AuthLoadingScreen'

// Só esconde a tela de quem não é admin; quem bloqueia de verdade é a Policy no backend (403).
export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <AuthLoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
