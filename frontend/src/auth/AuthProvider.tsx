import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, prepareAuthRequest } from '../lib/api'
import type { AuthCredentials, RegisterPayload, User } from '../types/user'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/api/user')
      setUser(response.data)
      return response.data
    } catch {
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    let is_active = true

    async function bootstrapSession() {
      try {
        const response = await api.get<User>('/api/user')
        if (is_active) {
          setUser(response.data)
        }
      } catch {
        if (is_active) {
          setUser(null)
        }
      } finally {
        if (is_active) {
          setIsLoading(false)
        }
      }
    }

    void bootstrapSession()

    return () => {
      is_active = false
    }
  }, [])

  useEffect(() => {
    const interceptor_id = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const request_url = error.config?.url ?? ''
        const is_session_check = request_url.includes('/api/user')

        if (error.response?.status === 401 && !is_session_check) {
          setUser(null)
          navigate('/login', { replace: true })
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(interceptor_id)
    }
  }, [navigate])

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      await prepareAuthRequest()
      await api.post('/login/', credentials)
      await refreshUser()
    },
    [refreshUser],
  )

  const register = useCallback(
    async (payload: RegisterPayload) => {
      await prepareAuthRequest()
      await api.post('/register/', payload)
      await refreshUser()
    },
    [refreshUser],
  )

  const logout = useCallback(async () => {
    await prepareAuthRequest()
    await api.post('/logout/')
    setUser(null)
    navigate('/', { replace: true })
  }, [navigate])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
